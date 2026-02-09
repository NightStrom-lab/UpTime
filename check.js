export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url).searchParams.get("url");

  if(!url){
    return new Response(JSON.stringify({error:"No URL"}),{status:400});
  }

  try{
    const res = await fetch(url,{ method:"GET" });
    return new Response(JSON.stringify({
      status: res.status
    }),{
      headers:{ "Content-Type":"application/json" }
    });
  }catch(e){
    return new Response(JSON.stringify({
      status:"BROKEN_PIPE",
      message:e.message
    }),{ status:500 });
  }
}