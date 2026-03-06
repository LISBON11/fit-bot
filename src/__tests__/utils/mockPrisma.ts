import { mockDeep, type DeepMockProxy } from 'jest-mock-extended';
import type { PrismaClient } from '../../generated/prisma/index.js';

export function createMockPrismaClient(): DeepMockProxy<PrismaClient> {
  return mockDeep<PrismaClient>();
}
