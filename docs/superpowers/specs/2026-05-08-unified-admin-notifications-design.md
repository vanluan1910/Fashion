# Unified Admin Notifications Design

## Goal

Build one real notification system for the admin application so the header bell and notifications page show new activity from the whole platform instead of only recent customer signups.

This system must cover new events from:

- customers
- orders
- products
- blog posts
- product reviews
- blog comments

## Problem

The current notification flow is fragmented and mostly fake.

### Current behavior

- `admin/src/shared/components/Header.tsx` fetches only `recent-signups`
- `admin/src/app/notifications/page.tsx` also depends on signup data and local mapping
- storefront review submission in `src/app/account/page.tsx` is only a local success modal and does not call backend
- review moderation in admin pages is currently mock data
- blog comments exist in schema, but the storefront comment flow is not connected to backend notifications

### Result

- the admin bell does not represent actual platform activity
- new customer reviews never appear in admin notifications
- order and content events are not unified into one timeline
- unread counts are not trustworthy

## Scope

This design covers one notification platform used by admin header and admin notifications page.

### In scope

- create persistent notification storage in backend
- create backend notification read APIs for admin
- create backend write hooks when important events happen
- connect storefront review submission to backend so real review notifications exist
- replace admin header and notifications page data source with the unified backend API

### Event sources in scope

- new customer signup
- new order created
- new product created
- new blog post created
- new product review submitted
- new blog comment submitted

### Out of scope

- push notifications, email, SMS
- per-admin personalization
- realtime sockets
- complex notification preferences

Polling is acceptable for this phase.

## Design Direction

Use a dedicated `notifications` table as the single source of truth.

Each meaningful business event writes one notification record. Admin UI reads from this table through one backend module. This is preferred over query-time aggregation because the platform needs a durable timeline, unread state, and consistent event representation across pages.

## Data Model

Add a new backend table for notifications.

### Table: `notifications`

Expected fields:

- `notification_id`
- `type`
- `title`
- `message`
- `entity_type`
- `entity_id`
- `actor_account_id` nullable
- `metadata_json` nullable
- `is_read`
- `created_at`
- `read_at` nullable

### Type rules

Supported types:

- `customer_signup`
- `order_created`
- `product_created`
- `blog_created`
- `product_review_created`
- `blog_comment_created`

### Entity rules

`entity_type` should identify the business object the admin may want to navigate to:

- `account`
- `order`
- `product`
- `blog`
- `product_review`
- `blog_comment`

`entity_id` stores the target record id.

### Metadata

`metadata_json` stores compact event-specific details needed by admin UI without forcing custom columns:

- customer full name
- order code or order id
- product name
- blog title
- review rating
- comment snippet

## Backend Architecture

Create a dedicated notifications module in backend.

### Module responsibilities

- insert notification records
- fetch recent notifications for admin header dropdown
- fetch paginated full notification list for admin notifications page
- mark one notification as read
- mark all notifications as read

### Suggested backend structure

- `backend/src/modules/notifications/models/notifications.model.js`
- `backend/src/modules/notifications/repositories/notifications.repo.js`
- `backend/src/modules/notifications/services/notifications.service.js`
- `backend/src/modules/notifications/controllers/notifications.controller.js`
- `backend/src/modules/notifications/notifications.routes.js`
- optional DTO helper if the module follows the existing backend pattern

### Route surface

Recommended admin-facing endpoints:

- `GET /api/notifications?limit=...&offset=...&filter=all|unread`
- `GET /api/notifications/recent?limit=...`
- `PATCH /api/notifications/:id/read`
- `PATCH /api/notifications/read-all`

## Notification Writing Strategy

Notification creation should happen at the point where the source action is successfully persisted.

### Customer signup

After account creation succeeds in auth service, create one `customer_signup` notification.

### Order created

After order insert succeeds in orders service, create one `order_created` notification.

### Product created

After product insert succeeds in products service, create one `product_created` notification.

### Blog created

After blog insert succeeds in blogs service, create one `blog_created` notification.

### Product review created

This requires a real backend review write flow.

Current storefront review submission is only UI state. The implementation must add a real review module or endpoint that writes to `product_reviews`, then creates a `product_review_created` notification after success.

### Blog comment created

If blog comments can be submitted from storefront, their backend create flow must insert into `blog_comments`, then create a `blog_comment_created` notification.

If storefront comment submission does not yet exist, the implementation may add only the backend-ready notification hook now and leave full public UI submission for a follow-up task, but the design assumes the backend notification path exists once comment creation is real.

## Admin UI Consumption

### Header bell

`admin/src/shared/components/Header.tsx` should stop calling `recent-signups`.

Instead it should call unified recent notifications API and render:

- unread count badge
- event icon by type
- title/message
- relative time
- target link by event type

The header remains a compact preview, not a full inbox.

### Notifications page

`admin/src/app/notifications/page.tsx` should consume the same notification source, not hardcoded mock data and not signup-only data.

It should support:

- all notifications
- unread filter
- mark one as read
- mark all as read
- empty state

### Navigation targets

Suggested targets:

- signup -> `/customers`
- order -> `/orders`
- product -> `/products`
- blog -> `/blog`
- review -> `/reviews`
- blog comment -> `/blog` or a future comment moderation surface

## Storefront and Review Flow

The review issue reported by the user is a symptom of missing backend persistence.

### Required change

`src/app/account/page.tsx` review submission must stop being a fake timeout-only success flow.

It should call backend review create endpoint with:

- order id
- product id if available
- rating
- comment
- customer/account context

Only after backend success should the success modal open.

### Reason

Without this change, no notification system can reliably show review events because the event never exists in backend.

## Error Handling

Notification creation should not silently corrupt main flows.

### Rule

Primary business operations remain source-of-truth:

- signup
- order create
- product create
- blog create
- review create
- comment create

If notification insert fails, backend should log the failure clearly. Whether the source action should fail too depends on implementation choice, but for this system the recommended behavior is:

- source action succeeds if core data persistence succeeds
- notification write failure is logged and surfaced in server logs

This keeps commerce and content operations resilient.

## Testing

### Backend verification

Verify each source action creates one notification record:

1. register customer
2. create order
3. create product
4. create blog post
5. submit product review
6. submit blog comment

### Admin verification

Verify:

1. header unread badge increases after new events
2. header list shows mixed event types
3. notifications page shows same data source as header
4. mark-as-read updates unread count
5. mark-all-as-read clears unread state

### Storefront verification

Verify product review from account page reaches backend and then appears in admin notifications and admin reviews view.

## Risks

### Main risks

1. review flow may not have enough product or order context in current storefront state
2. blog comments may still be static or incomplete
3. mixed mock and real admin pages can cause inconsistent expectations

### Mitigation

- make review create path explicit and require identifiers needed by `product_reviews`
- keep notification module generic so future event sources can be added without new tables
- migrate admin header and notifications page to real backend first, then clean remaining mock review surfaces as follow-up if needed

## Success Criteria

This design is successful when:

- admin bell shows mixed real activity from platform events
- admin notifications page uses real backend data
- new customer review creation produces a visible admin notification
- unread counts come from persistent backend state
- signup-only notification logic is fully removed from admin header and notifications page
