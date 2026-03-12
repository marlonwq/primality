/**
 * Fermat Primality Test
 * @param n - The number to test (BigInt)
 * @param iterations - Number of trials (higher is more accurate)
 * @returns boolean - True if probably prime, false if composite
 */
export function isPrimeFermat(n: bigint, iterations: number = 5): boolean {
  if (n <= 1n) return false;
  if (n <= 3n) return true;
  if (n % 2n === 0n) return false;

  for (let i = 0; i < iterations; i++) {
    // Generate a random base 'a' in range [2, n-2]
    const a = BigInt(Math.floor(Math.random() * (Number(n) - 4))) + 2n;
    
    if (powerModular(a, n - 1n, n) !== 1n) {
      return false; // Definitely composite
    }
  }

  return true; // Probably prime
}

/**
 * Helper to calculate (base^exp) % mod efficiently
 */
function powerModular(base: bigint, exp: bigint, mod: bigint): bigint {
  let res = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) res = (res * base) % mod;
    base = (base * base) % mod;
    exp = exp / 2n;
  }
  return res;
}