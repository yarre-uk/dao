import { keccak256, stringToBytes } from 'viem';

import { bytes } from '@/types/shared';

export const ADMIN_ROLE: bytes = keccak256(stringToBytes('ADMIN_ROLE'));
