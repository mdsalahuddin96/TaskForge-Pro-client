const baseURL=process.env.NEXT_PUBLIC_API_URL;

export const serverMutation=async(path,data,method="POST")=>{
    const res=await fetch(`${baseURL}${path}`,{
        method:method,
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data)
    })
    return res.json()
}

export const serverFetch=async(path)=>{
    const res=await fetch(`${baseURL}${path}`)
    const data=await res.json()
    return data;
}