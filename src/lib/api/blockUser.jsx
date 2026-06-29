
import { serverMutation } from "../core/server";

export const blockUser=(id,data)=>{
    const path=`/api/block/user/${id}`;
    return serverMutation(path,data,"PATCH")
}