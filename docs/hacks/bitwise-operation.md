# Bitwise Operator Hacks in C 

> A focused, no-nonsense guide to mastering **bitwise operators in C**, from basics to real hacking tricks.

---

## 1. Why Bitwise Operators Matter

Bitwise operators let you:

* Manipulate data at the **bit level**
* Write **fast, memory-efficient code**
* Control **flags, registers, permissions**
* Work close to **hardware & OS internals**

If you understand bitwise operators, you think like a **systems programmer**.

---
Basic Knowledge is Here: [Bitwise Operator](https://s-nishad.github.io/devhacks/hacks/bitwise-operators.html) 
---
                  

## 9. Creating a Bit Mask

### Single Bit Mask

```c
1 << n
```

Example:

```c
1 << 3  // 00001000
```

### Multi-bit Mask

```c
(1 << width) - 1
```

Example:

```c
(1 << 4) - 1  // 00001111
```

---

## 10. Set, Clear, Toggle & Test Bits

### Set a Bit (Turn ON)

```c
x |= (1 << n);
```

### Clear a Bit (Turn OFF)

```c
x &= ~(1 << n);
```

### Toggle a Bit

```c
x ^= (1 << n);
```

### Test a Bit

```c
int bit = (x >> n) & 1;
```

---

## 11. bis & bic - Alternative Form of Set and Clear

`bis` and `bic` are **semantic aliases** for set-bit and clear-bit operations.
They do the **same work**, but improve **readability** in low-level code.

### Definitions

```c
#define bis(x, m) ((x) | (m))
#define bic(x, m) ((x) & ~(m))
```

### Relationship to Set/Clear Bit

| Operation | Traditional      | Using bis / bic        |                        |
| --------- | ---------------- | ---------------------- | ---------------------- |
| Set bit   | `x               | = (1 << n)`            | `x = bis(x, (1 << n))` |
| Clear bit | `x &= ~(1 << n)` | `x = bic(x, (1 << n))` |                        |

### Example

```c
int flags = 0;

flags = bis(flags, 1 << 2); // set bit 2
flags = bic(flags, 1 << 2); // clear bit 2
```

✔ Same behavior
✔ Clear intention
✔ Widely used in embedded & kernel-style code

---

## 12. Extract a Bit Range

```c
int get_bits(int n, int start, int end)
{
    int width = end - start + 1;
    int mask = (1 << width) - 1;
    return (n >> start) & mask;
}
```

---

## 13. Replace a Bit Range

```c
int set_bits(int n, int start, int end, int value)
{
    int width = end - start + 1;
    int mask = ((1 << width) - 1) << start;

    n &= ~mask;
    n |= (value << start) & mask;
    return n;
}
```

---

## 14. Classic Hacker Bit Tricks

### Check power of two

```c
(n & (n - 1)) == 0
```

### Clear lowest set bit

```c
n &= (n - 1);
```

### Isolate lowest set bit

```c
n & -n
```

### Swap without temp

```c
a ^= b;
b ^= a;
a ^= b;
```

---


## Golden Rule

> **Shift → Mask → Operate**

---

Bits are control. Keep hacking.
