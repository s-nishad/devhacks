# Single Linked List in C 

> “Memory is raw power.  
> Pointers decide who controls it.”

---

## What is this?

A **Single Linked List** is a chain of dynamically allocated memory blocks.

Each node contains:
- data
- a pointer to the next node

No index.  
No bounds checking.  
Only pointers.

---

## Node Definition

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;
```

---

## Memory Layout

```
HEAD
 ↓
+------+-----+     +------+-----+     +------+-----+
|  10  |  o--+---> |  20  |  o--+---> |  30  | NULL|
+------+-----+     +------+-----+     +------+-----+
```

---

## insertAtBeginning → Root Injection

```c
void insertAtBeginning(Node **head, int value) {
    Node *n = (Node *)malloc(sizeof(Node));
    if (!n) return;

    n->data = value;
    n->next = *head;
    *head = n;
}
```

Effect:

```
HEAD → NEW → A → B → C
```

---

## insertAtEnd → Tail Injection

```c
void insertAtEnd(Node **head, int value) {
    Node *n = (Node *)malloc(sizeof(Node));
    n->data = value;
    n->next = NULL;

    if (*head == NULL) {
        *head = n;
        return;
    }

    Node *cur = *head;
    while (cur->next)
        cur = cur->next;

    cur->next = n;
}
```

---

## Insert Q After P

```c
void insertAfter(Node *p, int value) {
    if (!p) return;

    Node *q = (Node *)malloc(sizeof(Node));
    q->data = value;
    q->next = p->next;
    p->next = q;
}
```

---

## Delete Q After P

```c
void deleteAfter(Node *p) {
    if (!p || !p->next) return;

    Node *q = p->next;
    p->next = q->next;
    free(q);
}
```

---

## Test Program

```c
int main() {
    Node *head = NULL;

    insertAtBeginning(&head, 10);
    insertAtBeginning(&head, 5);
    insertAtEnd(&head, 20);

    insertAfter(head, 99);
    deleteAfter(head);

    Node *cur = head;
    while (cur) {
        printf("%d -> ", cur->data);
        cur = cur->next;
    }
    printf("NULL\n");

    return 0;
}
```

---

## Hackers Touch

- Node* → access
- Node** → control
- malloc → create
- free → destroy
- Wrong pointer → segfault

---

> Control memory, or memory controls you.