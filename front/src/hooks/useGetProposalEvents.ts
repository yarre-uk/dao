import { readContract } from '@wagmi/core';
import { wagmiConfig } from 'wagmiConfig';
import { useQuery } from '@tanstack/react-query';

import { gql, request } from 'graphql-request';

import { proxyGovernanceAbi, proxyGovernanceAddress } from '@/constants';
import { ProposalData } from '@/types';
import { ProposalEvent } from '@/types/proposal';

const query = gql`
  {
    proposals(first: 5) {
      id
      owner
      state
      blockNumber
    }
  }
`;
const url = 'https://api.studio.thegraph.com/query/80935/dao/version/latest';

const useGetProposalEvents = () => {
  const { data, status } = useQuery<{
    proposals: ProposalEvent[];
  }>({
    queryKey: ['data'],
    async queryFn() {
      return await request(url, query);
    },
  });

  const fetchProposal = async () => {
    if (status !== 'success' || !data) {
      return undefined;
    }

    const proposals = (await readContract(wagmiConfig, {
      abi: proxyGovernanceAbi,
      address: proxyGovernanceAddress,
      functionName: 'getProposals',
      args: [data.proposals.map((event) => event.id)],
    })) as ProposalData[];

    return data.proposals.map((event, index) => {
      return {
        event,
        proposal: proposals[index],
      };
    });
  };

  return { fetchProposal };
};

export default useGetProposalEvents;
