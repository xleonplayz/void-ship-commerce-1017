export const dynamic='force-dynamic';
export async function GET(){try{const r=await fetch((process.env.ORDERS_URL||'http://orders:8081')+'/orders',{cache:'no-store'});
return Response.json({service:'private-admin',orders:await r.json()})}catch(e){return Response.json({error:e.message},{status:502})}}