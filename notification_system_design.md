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