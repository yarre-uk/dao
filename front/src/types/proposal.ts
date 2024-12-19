import { bytes } from '@/types';

export enum ProposalStatus {
  Created,
  Processed,
  Canceled,
}

export type ProposalEvent = {
  id: bytes;
  sender: bytes;
  state: ProposalStatus;
};

export type ProposalData = {
  sender: bytes;
  calldatas: bytes[];
  proposedAt: bigint;
  description: string;
  votingStartedAt: bigint;
  forVotes: bigint;
  againstVotes: bigint;
  state: number;
};

export type FullProposalEvent = {
  event: ProposalEvent;
  proposal: ProposalData;
};
