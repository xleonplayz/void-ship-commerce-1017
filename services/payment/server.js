import http from 'node:http';

http.createServer(async(req,res)=>{let code=200,body;
if(req.url==='/charge'&&req.method==='POST'){try{let s='';
for await(const c of req)s+=c;
const p=JSON.parse(s);
if(!(p.amount>0))throw Error('positive amount required');
body={id:'payment-demo',status:'authorized',amount:p.amount,live:false}}catch(e){code=422;
body={error:e.message}}}else body={ok:true,service:'payment-mock',live:false};
console.info('payment-mock',req.method,req.url);
res.writeHead(code,{'content-type':'application/json'});
res.end(JSON.stringify(body));
}).listen(Number(process.env.PORT||8084),'0.0.0.0');

