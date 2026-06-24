
import { serverMutation } from "../core/server";

export const deleteTask=(id)=>{
    const path=`/api/delete/task/${id}`;
    return serverMutation(path,{},"DELETE")
}