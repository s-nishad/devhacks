# Doubly Linked List in C 
> “One pointer forward, one pointer backward.  
> Full control of memory flow.”

---

## What is ?

A **Doubly Linked List (DLL)** is a sequence of memory blocks where:
- each node knows **who comes next**
- and **who came before**

You can traverse:
- forward →
- backward ←

More power. More responsibility.

---

## Node Definition (Two-Way Weapon)

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *prev;   // link to previous node
    struct Node *next;   // link to next node
} Node;
```

---

## Memory Layout

```
NULL ←───┐
        ▼
+------+-----+-----+     +------+-----+-----+     +------+-----+-----+
| prev | 10  | next|<--->| prev | 20  | next|<--->| prev | 30  | next|
+------+-----+-----+     +------+-----+-----+     +------+-----+-----+
        ▲                                                │
        └────────────────────────────────────────────────┘
                         NULL
```

---

## insertAtBeginning → Double Root Injection

```c
void insertAtBeginning(Node **head, int value) {
    Node *n = (Node *)malloc(sizeof(Node));
    if (!n) return;

    n->data = value;
    n->prev = NULL;
    n->next = *head;

    if (*head != NULL)
        (*head)->prev = n;

    *head = n;
}
```

### Effect

```
Before:
NULL ← A ⇄ B ⇄ C

After:
NULL ← NEW ⇄ A ⇄ B ⇄ C
```

---

## insertAtEnd → Tail Injection

```c
void insertAtEnd(Node **head, int value) {
    Node *n = (Node *)malloc(sizeof(Node));
    if (!n) return;

    n->data = value;
    n->next = NULL;

    if (*head == NULL) {
        n->prev = NULL;
        *head = n;
        return;
    }

    Node *cur = *head;
    while (cur->next)
        cur = cur->next;

    cur->next = n;
    n->prev = cur;
}
```

---

## Insert Q After P → Precision Injection

```c
void insertAfter(Node *p, int value) {
    if (!p) return;

    Node *q = (Node *)malloc(sizeof(Node));
    q->data = value;

    q->next = p->next;
    q->prev = p;

    if (p->next)
        p->next->prev = q;

    p->next = q;
}
```

### Effect

```
P ⇄ X

After:
P ⇄ Q ⇄ X
```

---

## Delete Q After P → Clean Extraction

```c
void deleteAfter(Node *p) {
    if (!p || !p->next) return;

    Node *q = p->next;

    p->next = q->next;
    if (q->next)
        q->next->prev = p;

    free(q);
}
```

### Effect

```
Before:
P ⇄ Q ⇄ X

After:
P ⇄ X
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
    printf("Forward: ");
    while (cur) {
        printf("%d ⇄ ", cur->data);
        if (!cur->next) break;
        cur = cur->next;
    }
    printf("NULL\n");

    printf("Backward: ");
    while (cur) {
        printf("%d ⇄ ", cur->data);
        cur = cur->prev;
    }
    printf("NULL\n");

    return 0;
}
```

---

## Hacker Rules

- Forget `prev` update → corrupted list 
- Wrong order of assignment → instant crash
- Always update **4 links** when inserting/deleting

---

## Final Hacks

> “Singly lists give speed.  
> Doubly lists give dominance.”

Control both directions.  
Master memory.