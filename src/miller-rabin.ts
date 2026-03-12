/**
 * Generates a random BigInt between min (inclusive) and max (inclusive).
 * This avoids the precision loss of Math.random() with large numbers.
 */
function getRandomBigInt(min: bigint, max: bigint): bigint {
  const range = max - min;
  const bits = range.toString(2).length;
  let res: bigint;
  
  do {
    let randStr = "";
    for (let i = 0; i < bits; i++) {
      randStr += Math.random() > 0.5 ? "1" : "0";
    }
    res = BigInt("0b" + randStr);
  } while (res > range);
  
  return res + min;
}

/**
 * Miller-Rabin Primality Test
 * @param n - The number to test (BigInt)
 * @param k - Number of iterations (accuracy). Default is 40 for high confidence.
 */
export function isPrimeMillerRabin(n: bigint, k: number = 40): boolean {
  // 1. Basic cases
  if (n <= 1n) return false;
  if (n <= 3n) return true;
  if (n % 2n === 0n) return false;

  // 2. Write n-1 as 2^s * d
  let d = n - 1n;
  let s = 0n;
  while (d % 2n === 0n) {
    d /= 2n;
    s++;
  }

  // 3. Witness loop
  for (let i = 0; i < k; i++) {
    // Generate a random base 'a' in range [2, n-2] safely
    const a = getRandomBigInt(2n, n - 2n);
    let x = powerModular(a, d, n);

    if (x === 1n || x === n - 1n) continue;

    let composite = true;
    for (let r = 1n; r < s; r++) {
      x = (x * x) % n;
      if (x === n - 1n) {
        composite = false;
        break;
      }
    }

    if (composite) return false;
  }

  return true;
}

/**
 * Efficient Modular Exponentiation (base^exp % mod)
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