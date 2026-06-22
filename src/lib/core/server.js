const baseURL=process.env.SERVER_BASE_URL;

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
    console.log("baseURL",baseURL)
    const res=await fetch(`${baseURL}${path}`)
    const data=await res.json()
    return data;
}