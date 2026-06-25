
import { serverMutation } from "../core/server";

export const updateTask=(id,data)=>{
    const path=`/api/update/task/${id}`;
    
    return serverMutation(path,data,"PATCH")
}