# File Handling in C, A Complete Hands-on Hacking

This hacks explains **file handling in C using stdio** from the ground up.
It assumes you know basic C syntax but **have not implemented file I/O hands-on yet**.

---

## 1. What Is a File in C?

A file is data stored on disk (HDD/SSD) and managed by the Operating System.
In C, we never access the disk directly.

Instead, the flow is:

C Program  
→ C Standard Library (`stdio`)  
→ System Calls (`open`, `read`, `write`)  
→ Kernel  
→ Disk

---

## 2. What Is `FILE *`?

```c
FILE *fp;
```

- `FILE` is a structure defined inside `<stdio.h>`
- `fp` points to a **memory structure**, NOT the file on disk
- This structure contains:
  - File descriptor (fd)
  - Buffer
  - Current position
  - Mode (read/write)
  - EOF and error flags

Conceptually:

```
fp → FILE structure → file descriptor → kernel → disk file
```

---

## 3. Opening and Closing a File

### `fopen()`

```c
FILE *fp = fopen("data.txt", "r");
```

- Opens a file
- Creates an internal buffer
- Returns `NULL` on failure

### `fclose()`

```c
fclose(fp);
```

- Flushes buffered data
- Releases OS resources
- Must always be called

### Error Check

```c
if (fp == NULL) {
    perror("fopen failed");
}
```

---

## 4. File Open Modes (IMPORTANT)

### Basic Modes

| Mode | Meaning |
|----|----|
| `"r"` | Read (file must exist) |
| `"w"` | Write (truncate or create) |
| `"a"` | Append (write at end) |

### Extended Modes (`+`)

| Mode | Meaning |
|----|----|
| `"r+"` | Read + write (must exist) |
| `"w+"` | Read + write (truncate/create) |
| `"a+"` | Read + append |

### Binary Modes

| Mode | Meaning |
|----|----|
| `"rb"` | Read binary |
| `"wb"` | Write binary |
| `"rb+"` | Read/write binary |

Use binary mode for:
- Images
- Structs
- Network data

---

## 5. Writing Text to a File

### Using `fprintf`

```c
FILE *fp = fopen("demo.txt", "w");
fprintf(fp, "Name: %s\nAge: %d\n", "Nishad", 25);
fclose(fp);
```

---

### Using `fputs`

```c
FILE *fp = fopen("demo.txt", "a");
fputs("This is appended text\n", fp);
fclose(fp);
```

---

## 6. Reading Text from a File

### Using `fgets` (RECOMMENDED)

```c
FILE *fp = fopen("demo.txt", "r");
char buf[100];

while (fgets(buf, sizeof(buf), fp)) {
    printf("%s", buf);
}

fclose(fp);
```

---

### Using `fscanf` (RISKY)

```c
char name[20];
int age;

fscanf(fp, "Name: %s\nAge: %d", name, &age);
```

---

## 7. Binary File I/O (`fread` / `fwrite`)

### Writing a Struct

```c
struct Person {
    int id;
    float height;
};

struct Person p = {1, 5.8};

FILE *fp = fopen("data.bin", "wb");
fwrite(&p, sizeof(p), 1, fp);
fclose(fp);
```

---

### Reading a Struct

```c
struct Person p;

FILE *fp = fopen("data.bin", "rb");
fread(&p, sizeof(p), 1, fp);
printf("%d %.2f\n", p.id, p.height);
fclose(fp);
```

---

## 8. End-of-File Handling (`feof`)

### ⛔ WRONG

```c
while (!feof(fp)) {
    fgets(buf, 100, fp);
}
```

### ✅ CORRECT

```c
while (fgets(buf, sizeof(buf), fp) != NULL) {
    printf("%s", buf);
}
```

---

## 9. File Cursor Control (`fseek`, `ftell`)

```c
fseek(fp, 0, SEEK_SET);
fseek(fp, 10, SEEK_CUR);
fseek(fp, 0, SEEK_END);
```

---

## 10. Buffering (CRITICAL CONCEPT)

stdio uses **buffered I/O**.

```c
fprintf(fp, "Hello");
fclose(fp);
```

---

## 11. Complete Combined Example

```c
#include <stdio.h>

int main() {
    FILE *fp = fopen("demo.txt", "w+");
    if (!fp) return 1;

    fprintf(fp, "Line 1\n");
    fputs("Line 2\n", fp);

    fseek(fp, 0, SEEK_SET);

    char buf[50];
    while (fgets(buf, sizeof(buf), fp)) {
        printf("%s", buf);
    }

    fclose(fp);
    return 0;
}
```

---

## 12. Common Mistakes to Avoid

- Forgetting `fclose`
- Using `feof` incorrectly
- Writing structs blindly
- Assuming write is immediate
- Using `fscanf` for general input

---

## 13. Summary

✔ `FILE *` is a pointer to a memory structure  
✔ stdio is buffered  
✔ Modes control existence, truncation, and position  
✔ `fgets` is safer than `fscanf`  
✔ `fread/fwrite` are fast but risky  
✔ Always close files  