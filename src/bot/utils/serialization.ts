export function cloneWithoutClasses<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;

  // Checking for Prisma Decimal or similar objects that have a toNumber method
  const asRecord = obj as Record<string, unknown>;
  if ('toNumber' in asRecord && typeof asRecord.toNumber === 'function') {
    return asRecord.toNumber() as unknown as T;
  }

  if (Array.isArray(obj)) {
    return obj.map(cloneWithoutClasses) as unknown as T;
  }

  const result: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    result[key] = cloneWithoutClasses(asRecord[key]);
  }

  return result as T;
}
