import http from 'node:http';

const orders=[];
const get=async(url,options)=>{const r=await fetch(url,options);
if(!r.ok)throw Error('upstream HTTP '+r.status);
return r.json()};

http.createServer(async(req,res)=>{let code=200,body;
try{
 if(req.url==='/health')body={ok:true,service:'orders'};

 else if(req.url==='/orders')body={orders};

 else if(req.url==='/catalog')body=await get((process.env.CATALOG_URL||'http://catalog:8082')+'/items');

 else if((req.url==='/cart'||req.url==='/checkout')&&req.method==='POST'){
  let raw='';
for await(const c of req)raw+=c;
const input=JSON.parse(raw);
if(!input.sku||!Number.isInteger(input.qty)||input.qty<1||input.qty>100)throw Error('invalid cart');

  const item=await get((process.env.CATALOG_URL||'http://catalog:8082')+'/items/'+encodeURIComponent(input.sku));

  if(item.stock<input.qty)throw Error('insufficient stock');

  const price=await get((process.env.PRICING_URL||'http://pricing:8083')+'/price/'+encodeURIComponent(input.sku)+'?qty='+input.qty);

  body={item,price};

  if(req.url==='/checkout'){const payment=await get((process.env.PAYMENT_URL||'http://payment:8084')+'/charge',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({amount:price.total_cents})});
body={id:'demo-'+(orders.length+1),...body,payment};
orders.push(body);
code=201;
}
 }else{code=404;
body={error:'not found'}}
 }catch(e){code=502;
body={error:e.message,service:'orders'}}console.info('orders',req.method,req.url,code);
res.writeHead(code,{'content-type':'application/json'});
res.end(JSON.stringify(body));
}).listen(Number(process.env.PORT||8081),'0.0.0.0');

