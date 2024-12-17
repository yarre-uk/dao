import { proxyGovernedAbi, proxyGovernedAddress } from '.';

export const proxyContract = {
  address: proxyGovernedAddress,
  abi: proxyGovernedAbi,
} as const;
