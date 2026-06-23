
import React from 'react';
import ProposalCard from './ProposalCard';
import { getClientProposals } from '@/lib/api/getClientProposals';

const ProposalPage =async () => {
    const proposals=await getClientProposals()
    return (
        <div className='space-y-4'>
            {proposals.map((proposal)=><ProposalCard key={proposal?._id} proposal={proposal}></ProposalCard>)}
        </div>
    );
};

export default ProposalPage;