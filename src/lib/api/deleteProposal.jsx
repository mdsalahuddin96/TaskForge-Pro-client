
import { serverMutation } from "../core/server";

export const deleteProposal=(id)=>{
    const path=`/api/delete/proposal/${id}`;
    return serverMutation(path,{},"DELETE")
}