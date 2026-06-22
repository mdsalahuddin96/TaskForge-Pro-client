import { getProposal } from '@/lib/api/getProposal';
import React from 'react';
import ProposalCard from './ProposalCard';

const ProposalPage =async () => {
    const proposals=await getProposal()
    return (
        <div>
            {proposals.map((proposal)=><ProposalCard key={proposal?._id} proposal={proposal}></ProposalCard>)}
        </div>
    );
};

export default ProposalPage;