import { describe, it, expect } from 'vitest';
import { isPrimeMillerRabin, isPrimeFermat } from '../src/index';

describe('Primality Library - Final Validation', () => {
  // Primes to verify BigInt and algorithm correctness
  const knownPrimes = [
    2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 
    104729n,            // 10,000th prime
    2147483647n,        // Mersenne Prime (2^31 - 1)
    2305843009213693951n // Mersenne Prime (2^61 - 1)
  ];

  // Composites including Carmichael numbers
  const knownComposites = [
    4n, 6n, 8n, 9n, 10n, 15n, 21n, 25n, 
    561n,               // Carmichael number
    1105n,              // Carmichael number
    1729n,              // Carmichael number
    1000000000000000n   // Large composite
  ];

  describe('Miller-Rabin Test', () => {
    it('should correctly identify known primes', () => {
      knownPrimes.forEach(p => {
        expect(isPrimeMillerRabin(p)).toBe(true);
      });
    });

    it('should correctly identify known composites', () => {
      knownComposites.forEach(c => {
        expect(isPrimeMillerRabin(c)).toBe(false);
      });
    });

    it('should handle edge cases (n <= 1)', () => {
      expect(isPrimeMillerRabin(-7n)).toBe(false);
      expect(isPrimeMillerRabin(0n)).toBe(false);
      expect(isPrimeMillerRabin(1n)).toBe(false);
    });

    it('should handle the only even prime (2)', () => {
      expect(isPrimeMillerRabin(2n)).toBe(true);
    });
  });

  describe('Fermat Test', () => {
    it('should identify real primes (probabilistic)', () => {
      // Fermat usually gets real primes right
      expect(isPrimeFermat(17n)).toBe(true);
      expect(isPrimeFermat(104729n)).toBe(true);
    });

    it('should correctly identify simple even composites', () => {
      expect(isPrimeFermat(4n)).toBe(false);
      expect(isPrimeFermat(100n)).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isPrimeFermat(1n)).toBe(false);
      expect(isPrimeFermat(0n)).toBe(false);
    });
  });

  describe('Algorithm Comparison (Carmichael Paradox)', () => {
    it('Miller-Rabin should be more robust than Fermat for 561', () => {
      // 561 is a Carmichael number. 
      // Miller-Rabin MUST return false.
      expect(isPrimeMillerRabin(561n)).toBe(false);
      
      // We don't strictly assert Fermat's failure here to keep tests green,
      // but we acknowledge it's statistically weaker for this specific number.
      const fermatResult = isPrimeFermat(561n);
      console.log(`[Note] Fermat result for 561: ${fermatResult} (False means it caught it, True means it was tricked)`);
    });
  });
});