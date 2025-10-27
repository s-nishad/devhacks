# Bitwise Operators

Bitwise operators are operators in C, C++, Python, and many other languages that allow us to manipulate individual bits of integer data directly, extremely useful for low-level programming, performance optimization, flags, and embedded systems.

---

## Bitwise AND (`&`)

**Operation:** Sets each bit to 1 if *both* bits are 1.  
**Use case:** Masking bits (extracting certain bits).

| a | b | a & b |
|---|---|--------|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**Example:**
```cpp
int a = 12;  // 1100 (binary)
int b = 10;  // 1010
int c = a & b;  // 1000 = 8
```

---

## Bitwise OR (`|`)

**Operation:** Sets each bit to 1 if *at least one* bit is 1.  
**Use case:** Combine bits or set certain flags.

| a | b | a \| b |
|---|---|--------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

**Example:**
```cpp
int a = 12;  // 1100
int b = 10;  // 1010
int c = a | b;  // 1110 = 14
```

---

## Bitwise XOR (`^`)

**Operation:** Sets each bit to 1 if the bits are *different*.  
**Use case:** Toggling bits, simple encryption, or swapping without temp variable.

| a | b | a ^ b |
|---|---|--------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

**Example:**
```cpp
int a = 12;  // 1100
int b = 10;  // 1010
int c = a ^ b;  // 0110 = 6
```

---

## Bitwise NOT (`~`)

**Operation:** Inverts all bits (1 → 0, 0 → 1).  
**Use case:** Negation or complement.

**Example:**
```cpp
int a = 12;  // 0000 1100
int c = ~a;  // 1111 0011 = -13 (in 2’s complement)
```

---

## Left Shift (`<<`)

**Operation:** Shifts bits to the left, filling with zeros.  
Each left shift **multiplies by 2**.

**Example:**
```cpp
int a = 5;   // 0000 0101
int c = a << 1;  // 0000 1010 = 10
```

💡 `a << n` → equals `a * 2^n`

---

## Right Shift (`>>`)

**Operation:** Shifts bits to the right.  
Each right shift **divides by 2** (for positive numbers).

**Example:**
```cpp
int a = 20;  // 0001 0100
int c = a >> 2;  // 0000 0101 = 5
```

💡 `a >> n` → equals `a / 2^n`

---

## Bit Manipulation Tricks

| Operation | Expression | Example |
|------------|-------------|----------|
| Check if bit `i` is set | `(n >> i) & 1` | Check if 3rd bit of `n` is 1 |
| Set bit `i` | `n \| (1 << i)` | Turn on 2nd bit |
| Clear bit `i` | `n & ~(1 << i)` | Turn off 2nd bit |
| Toggle bit `i` | `n ^ (1 << i)` | Flip 2nd bit |
| Remove last set bit | `n & (n - 1)` | Turns off the rightmost 1 |
| Get lowest set bit | `n & -n` | Isolates rightmost 1 |

---

## Summary

Bitwise operators are **fast** and **powerful** for:
- Device drivers & OS kernels  
- Network packet handling  
- Cryptography and compression  
- Game development and graphics  

Mastering bitwise operations gives us deep control over how data is stored and processed at the binary level.

---
