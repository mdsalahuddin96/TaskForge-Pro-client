
import { serverMutation } from "../core/server";

export const updateUser=(id,data)=>{
    const path=`/api/update/user/${id}`;
    return serverMutation(path,data,"PATCH")
}