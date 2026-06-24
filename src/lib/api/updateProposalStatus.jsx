import { serverMutation } from "../core/server"

export const updateProposalStatus=async(id,data)=>{
    const path=`/api/update/proposal?proposalId=${id}`
    return serverMutation(path,data,"PATCH")
}