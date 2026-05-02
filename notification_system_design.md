# Stage 1 — API Design

## What we are building

So basically here we are building a notification system where users will get updates like placements, results, events etc.

The main idea is simple:
- user can see notifications
- mark them as read
- and also get new notifications instantly

like how real apps works (no need to refresh again and again)

---

## APIs

### 1. Get Notifications

GET /notifications

This API will return all notifications for a user.

Example:

{
  "notifications": [
    {
      "id": "1",
      "type": "placement",
      "message": "CSX hiring",
      "isRead": false,
      "createdAt": "2026-04-22"
    }
  ]
}

Basically frontend will call this and show data.

---

### 2. Mark as Read

PATCH /notifications/:id/read

When user clicks on notification, we call this API and mark it as read.

Nothing much complex here.

---

### 3. Create Notification

POST /notifications

This API is mostly used internally when some event happens in system (like result declared or company hiring).

Example:

{
  "userId": 101,
  "type": "result",
  "message": "Mid sem results out"
}

---

## Real-time Notifications

If we only use APIs, frontend has to keep calling again and again (polling), which is not effecient.

So better way is using WebSockets.

So whenever a new notification is created:
- backend directly pushes it to user

This makes system more realtime and reduces unnecessary API calls.

---

## Final thought

I tried to keep APIs simple and REST based so it is easy to understand and also scalable later.

Not going too complex here, just keeping things clean and practical.
# Stage 2 — Database Design

## Database choice

i am using PostgreSQL becuase data is structured and easy to manage. also it supports indexing which helps in perfomance.

---

## Table strcture

basic table for notifcations:

CREATE TABLE notifications(
 id UUID PRIMARY KEY,
 userId INT,
 type VARCHAR,
 message TEXT,
 isRead BOOLEAN,
 createdAt TIMESTAMP
);

---

## Problems at scale

- if data becomes very large (like millions of rows)  
- queries can become slow sometimes  
- many users accesing at same time  

---

## Solutions

- create index on (userId , isRead )  → faster query  
- use pagination (dont fetch all at once)  
- archive old data if not req  

---

## small note

keeping schema simple so easy to scale later, not making it too complex


# Stage 3 — Query Optimization

## Given query

SELECT * FROM notifications
WHERE studentID = 1042 AND isRead = false
ORDER BY createdAt DESC;

---

## why it is slow

- no index so full table scan happens  
- also sorting takes time when data is large  
- as rows increase perfomance drops  

---

## solution

create index on needed cols:

CREATE INDEX idx_user_read_time
ON notifications(studentID , isRead , createdAt DESC);

this will make query much faster

---

## why not index all cols

- insert/update will become slow  
- extra memory usage  
- not really needed  

---

## another query

SELECT studentID
FROM notifications
WHERE notificationType = 'Placement'
AND createdAt >= NOW() - INTERVAL '7 days';

---

## small note

main idea is reduce full scan and use index properly so query runs faster

# Stage 4 — Performance

## problem

every time user open page → DB hit  
this is not good if users increse  

---

## solns

- Redis cache → fast access  
- pagination (dont load all)  
- lazy loading (only when scroll)  
- websockets insted of polling  

---

## best

Redis + websockets → less DB load  

---

## note

main idea is avoid DB hit again n again


# Stage 5 — Reliability

## probelm

send_email → save_db → push_notif  

issues:
- if email fail whole flow break  
- no retry  
- all are sync (slow)  

---

## soln

use queue (Kafka / RabbitMQ)

---

## flow

API → queue → worker  

---

## logic

enqueue(notif)

worker:
 save_db()  
 send_email (retry)  
 push_notif()  

---

## note

makes system async + more reliabe