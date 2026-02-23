import { mockDeep, type DeepMockProxy } from 'jest-mock-extended';
import type { PrismaClient } from '@prisma/client';

export function createMockPrismaClient(): DeepMockProxy<PrismaClient> {
  return mockDeep<PrismaClient>();
}
