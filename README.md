# Deterministic Global Posting Scheduler


## Setup
TERMINAL 1 - spin up infrastructure
```
docker-compose up
```

TERMINAL 2 - initialize resources
```
./scripts/init.sh
cd ingest
yarn install
yarn db:migrations
```


TERMINAL 3 - run api
```
cd api
yarn install
yarn dev
```


TERMINAL 4 - run worker
```
cd ingest
yarn install
yarn dev
```




## Problem Statement

Let:

- **N** = number of users
- **M** = number of social media platforms
- **P_ij(t)** = probability distribution of user *i* posting to platform *j* at time *t* during the day

Design a queueing strategy that guarantees:

> The probability of two users posting at the same time is zero.

---

## Key Interpretation

The problem is underspecified unless we define what “same time” means.

### Definition

Two posts are considered **simultaneous** if and only if:

They share the same logical posting timestamp.

We do **not** define simultaneity using:

- Wall-clock arrival time
- Millisecond precision
- External platform API execution time

Instead, we define a **system-level logical time**.

---

## System Model

### 1. Logical Clock

We introduce a global logical clock:

L ∈ ℕ

This is implemented using a database-backed monotonic sequence:

SELECT nextval(‘global_post_sequence’);

Properties:

- Globally unique
- Strictly increasing
- Atomic
- Strongly consistent

---

### 2. Post Structure

Each post contains:

- `sequenceId` → logical posting time
- `desiredTime` → sampled from P_ij
- `platform`
- `content`
- metadata fields

Example:

| sequenceId | desiredTime | platform | content |
|------------|------------|----------|---------|
| 1          | 09:00:00   | tiktok   | ...     |
| 2          | 09:00:00   | instagram| ...     |

Even if both users desire to post at 09:00:00, they receive different logical timestamps.

---

### 3. Guarantee

Because `sequenceId` is assigned via an atomic, strictly increasing sequence:

For any two posts A and B:

sequenceId(A) ≠ sequenceId(B)

Therefore:

P(two posts share the same logical time) = 0

This guarantee holds by construction, not by probability.

---

## Architecture

### API Layer (Scheduler)

1. Receive post request
2. Assign `sequenceId = nextval()`
3. Enqueue message to SQS
4. Return response to client

### Queue

- Standard SQS queue
- Ordering not required (ordering is encoded in sequenceId)

### Worker Layer

1. Consume message
2. Persist to database (UNIQUE constraint on sequenceId)
3. Publish to external platform
4. Update status

---

## Why This Works

- Probability distributions only influence **arrival pressure**
- Logical sequence enforces **deterministic serialization**
- Physical execution may occur in parallel
- Logical simultaneity is impossible

---

## Scalability

- `nextval()` scales to tens of thousands of increments per second
- Workers can scale horizontally
- No single execution bottleneck
- Serialization occurs only at logical timestamp assignment

---

## Edge Case Handling

### Duplicate SQS Delivery
Protected by:

UNIQUE(sequenceId)

### API Crash After Sequence Assignment
May create gaps in sequence. This does not violate correctness.

### Retries
Retries generate new logical timestamps.
Uniqueness is preserved.

---

## Conclusion

This design guarantees zero probability of two users posting at the same time by:
1.	Defining posting time as a logical timestamp
2.	Assigning timestamps via a globally consistent atomic sequence
3.	Decoupling probabilistic arrival from deterministic serialization

The system transforms a stochastic arrival process into a deterministic, totally ordered execution model through a single serialization authority.

Logical simultaneity is structurally impossible by construction.
Physical execution overlap is irrelevant to the guarantee.
