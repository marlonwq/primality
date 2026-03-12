# Primality
A high-performance TypeScript library for primality testing using Miller-Rabin and Fermat algorithms. Designed with BigInt support for cryptographic-grade calculations.

[![NPM Version](https://img.shields.io/npm/v/@marlonwq/primality)](https://www.npmjs.com/package/@marlonwq/primality)
[![NPM Downloads](https://img.shields.io/npm/dm/@marlonwq/primality)](https://www.npmjs.com/package/@marlonwq/primality)
![GitHub Repo stars](https://img.shields.io/github/stars/marlonwq/primality)
[![License](https://img.shields.io/npm/l/@marlonwq/primality)](https://github.com/marlonwq/primality/blob/main/LICENSE)

## Features
- **Miller-Rabin Test**: Robust probabilistic test.
- **Fermat Primality Test**: Fast probabilistic test based on Fermat's Little Theorem.
- **BigInt Support**: Test extremely large numbers without precision loss.
- **Zero Dependencies**: Lightweight and optimized for performance.

## Installation
```sh
pnpm add @marlonwq/primality
```

## Usage

```typescript
import { isPrimeMillerRabin, isPrimeFermat } from '@marlonwq/primality';

// Using Miller-Rabin (Recommended for high accuracy)
// Use the 'n' suffix for BigInt literals
const num1 = 104729n;
console.log(isPrimeMillerRabin(num1)); // true

// Using Fermat (Faster, but watch out for Carmichael numbers)
const num2 = 561n; 
console.log(isPrimeFermat(num2)); // true (Fermat's false positive)
console.log(isPrimeMillerRabin(num2)); // false (Miller-Rabin's correct answer)
```

## How it Works

<details>
<summary>Click to expand the mathematical background</summary>

The Miller-Rabin test is an evolution of **Fermat's Little Theorem**. Fermat states that if $p$ is prime, then for any integer $a$, $a^{p-1} \equiv 1 \pmod p$. However, some composite numbers (known as **Carmichael numbers**) also satisfy this condition, leading to false positives.

### The Miller-Rabin Secret
The core of Miller-Rabin is the fact that in a prime field $\mathbb{Z}_p$, the equation $x^2 \equiv 1 \pmod p$ has only two solutions: $x = 1$ and $x = p - 1$ (or $-1$).

**The Algorithm Steps:**
1. Write $n - 1$ as $2^s \cdot d$ by repeatedly factoring out powers of 2.
2. Pick a random base $a$ in the range $[2, n - 2]$.
3. Compute $x = a^d \pmod n$. If $x = 1$ or $x = n - 1$, the number is a **probable prime**.
4. Otherwise, square $x$ repeatedly ($x = x^2 \pmod n$) up to $s - 1$ times.
5. If at any point $x = n - 1$, the number is a **probable prime**.
6. If the loop finishes without ever hitting $n - 1$, the number is **definitely composite**.

### Accuracy
Miller-Rabin is a probabilistic algorithm. Each iteration ($k$) reduces the probability of a composite number being declared prime to less than $1/4$. With $k=40$, the error probability is less than $4^{-40}$ — a value so infinitesimal that it is statistically more likely for a meteor to strike your computer than for the test to provide a wrong answer.

</details>

## Contributing
We use `pnpm` as our package manager. To get started:

```
pnpm install
pnpm build
pnpm test
```
If you find this project helpful, please consider contributing in the following ways: Submitting a [pull request](https://github.com/marlonwq/primality/pulls), opening an [issue](https://github.com/marlonwq/primality/issues), giving the project a star or [buying me a coffee!](https://ko-fi.com/marlonwq)!

## License
[MIT](https://github.com/marlonwq/primality/blob/main/LICENSE)