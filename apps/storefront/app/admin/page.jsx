export const dynamic='force-dynamic';
export default async function Page(){let text;
try{const r=await fetch((process.env.ADMIN_URL||'http://admin:3001')+'/api/summary',{cache:'no-store'});
text=await r.text()}catch(e){text='Admin unavailable: '+e.message}return <><h1>Private operations summary</h1><pre>{text}</pre></>}