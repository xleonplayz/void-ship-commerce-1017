 'use client';
import {useState} from 'react';

export default function Store(){const [data,setData]=useState(null),[status,setStatus]=useState('Ready');
async function act(path,method='GET'){try{setStatus('Loading');
const r=await fetch('/api/shop'+path,{method,headers:{'content-type':'application/json'},body:method==='POST'?JSON.stringify({sku:'lamp-01',qty:2}):undefined});
const b=await r.json();
if(!r.ok)throw Error(b.error||r.status);
setData(b);
setStatus('Success')}catch(e){setStatus('Unavailable: '+e.message)}}return <><button id="catalog" onClick={()=>act('/catalog')}>Load catalog</button><button id="cart" onClick={()=>act('/cart','POST')}>Add two lamps</button><button id="checkout" onClick={()=>act('/checkout','POST')}>Place demo order</button><p id="status">{status}</p><pre id="data">{data?JSON.stringify(data,null,2):'No data loaded yet'}</pre></>}
