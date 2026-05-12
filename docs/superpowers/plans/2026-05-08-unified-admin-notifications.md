# Unified Admin Notifications Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build one persistent notification stream for admin bell + notifications page from signup, order, product, blog, review, and blog comment events.

**Architecture:** Add a `notifications` table as source of truth, expose it through one backend module, then switch admin UI to read the same API for both header and inbox. Emit notifications at the end of each successful business write so commerce/content flows stay primary and notification writes stay secondary.

**Tech Stack:** Express, MySQL, Next.js App Router, React, TypeScript, Tailwind CSS

---

### Task 1: Add Notification Storage + Backend API

**Files:**
- Modify: `admin/database_schema.sql`
- Create: `backend/src/add_notifications_table.js`
- Create: `backend/src/modules/notifications/models/notifications.model.js`
- Create: `backend/src/modules/notifications/repositories/notifications.repo.js`
- Create: `backend/src/modules/notifications/services/notifications.service.js`
- Create: `backend/src/modules/notifications/controllers/notifications.controller.js`
- Create: `backend/src/modules/notifications/notifications.routes.js`
- Modify: `backend/src/app/routes.js`

- [ ] **Step 1: Add schema for persistent notifications**

Use this table shape in `admin/database_schema.sql` and the one-off backend setup script:

```sql
CREATE TABLE IF NOT EXISTS notifications (
  notification_id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id VARCHAR(50) NOT NULL,
  actor_account_id INT NULL,
  metadata_json JSON NULL,
  is_read TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP NULL
);
```

- [ ] **Step 2: Wire backend module and routes**

Mount the module in `backend/src/app/routes.js`:

```js
const notificationsRoutes = require('../modules/notifications/notifications.routes');
router.use('/notifications', notificationsRoutes);
```

Expose:
- `GET /api/notifications?limit=&offset=&filter=all|unread`
- `GET /api/notifications/recent?limit=`
- `PATCH /api/notifications/:id/read`
- `PATCH /api/notifications/read-all`

- [ ] **Step 3: Verify API boots and returns empty data**

Run:

```powershell
node backend/src/add_notifications_table.js
Invoke-RestMethod http://localhost:5000/api/notifications/recent?limit=5
```

Expected: `success: true` and empty list on fresh DB.

### Task 2: Emit Notifications From Existing Writes

**Files:**
- Modify: `backend/src/modules/auth/services/auth.service.js`
- Modify: `backend/src/modules/orders/services/orders.service.js`
- Modify: `backend/src/modules/products/services/products.service.js`
- Modify: `backend/src/modules/blogs/services/blogs.service.js`

- [ ] **Step 1: Add a shared notification write call after each successful save**

Use this pattern inside each service:

```js
try {
  await notificationsService.create({
    type: 'product_created',
    title: `New product: ${name}`,
    message: `${name} was created successfully.`,
    entity_type: 'product',
    entity_id: String(productId),
    metadata_json: { product_name: name }
  });
} catch (error) {
  console.warn('[notifications] create failed:', error.message);
}
```

- [ ] **Step 2: Cover signup, order, product, and blog events**

Emit:
- `customer_signup` from `auth.service.js`
- `order_created` from `orders.service.js`
- `product_created` from `products.service.js`
- `blog_created` from `blogs.service.js`

- [ ] **Step 3: Verify source writes still succeed if notification insert fails**

Run the create flows once, then check backend logs and `GET /api/notifications/recent`.

### Task 3: Make Product Reviews Real

**Files:**
- Modify: `backend/src/modules/orders/repositories/orders.repo.js`
- Modify: `backend/src/modules/orders/dtos/orders.dto.js`
- Create: `backend/src/modules/reviews/models/reviews.model.js`
- Create: `backend/src/modules/reviews/repositories/reviews.repo.js`
- Create: `backend/src/modules/reviews/services/reviews.service.js`
- Create: `backend/src/modules/reviews/controllers/reviews.controller.js`
- Create: `backend/src/modules/reviews/reviews.routes.js`
- Modify: `backend/src/app/routes.js`
- Create: `src/features/account/services/reviewService.ts`
- Modify: `src/app/account/page.tsx`
- Modify: `admin/src/features/reviews/services/reviewService.ts`
- Modify: `admin/src/features/reviews/hooks/useReviews.ts`
- Modify: `admin/src/app/reviews/page.tsx`

- [ ] **Step 1: Return order items from backend so review form knows which product was bought**

Update `orders.repo.js` and `orders.dto.js` so `order.items` includes `product_id`, `product_name`, `variant_id`, `quantity`, and `price_at_purchase`.

- [ ] **Step 2: Add review create/list APIs**

Back end:

```js
POST /api/reviews
GET /api/reviews
PATCH /api/reviews/:id/approve
PATCH /api/reviews/:id/hide
PATCH /api/reviews/:id/delete
```

On create, insert into `product_reviews` and then emit `product_review_created`.

- [ ] **Step 3: Replace fake account review submit with real API call**

`src/app/account/page.tsx` should call `src/features/account/services/reviewService.ts` with:

```ts
{
  orderId: selectedOrder.id,
  productId: selectedProductId,
  rating,
  comment,
  accountId: user.id
}
```

Show product picker from `selectedOrder.items` before submit. Open success modal only after backend success.

- [ ] **Step 4: Move admin reviews page off mock data**

Point `admin/src/features/reviews/services/reviewService.ts` to backend review APIs, keep `useReviews` as the data/filter layer, and leave `admin/src/app/reviews/page.tsx` as the visual shell.

- [ ] **Step 5: Verify review event reaches notifications**

Run the account review flow, then confirm:

```powershell
Invoke-RestMethod http://localhost:5000/api/notifications/recent?limit=10
```

Expected: one `product_review_created` item with correct product and rating metadata.

### Task 4: Make Blog Comments Real

**Files:**
- Modify: `backend/src/modules/blogs/services/blogs.service.js`
- Modify: `backend/src/modules/blogs/controllers/blogs.controller.js`
- Modify: `backend/src/modules/blogs/blogs.routes.js`
- Create: `backend/src/modules/blogs/repositories/blog-comments.repo.js`
- Create: `src/features/blog/services/blogCommentService.ts`
- Modify: `src/features/blog/components/BlogComments.tsx`
- Modify: `src/app/blog/[slug]/page.tsx`

- [ ] **Step 1: Add comment list/create endpoints under blogs**

Expose:
- `GET /api/blogs/:id/comments`
- `POST /api/blogs/:id/comments`

Insert into `blog_comments`, then emit `blog_comment_created`.

- [ ] **Step 2: Connect blog detail page to the comment component**

Pass `post.id` from `src/app/blog/[slug]/page.tsx` into `BlogComments`, then make `BlogComments.tsx` a client component that loads and submits through `blogCommentService.ts`.

- [ ] **Step 3: Verify comment submit creates admin notification**

Submit one comment from the blog detail page and confirm it appears in `GET /api/notifications/recent`.

### Task 5: Switch Admin Header + Inbox To Unified API

**Files:**
- Modify: `admin/src/shared/config/api.ts`
- Create: `admin/src/features/notifications/types/index.ts`
- Create: `admin/src/features/notifications/services/notificationService.ts`
- Modify: `admin/src/shared/components/Header.tsx`
- Modify: `admin/src/app/notifications/page.tsx`

- [ ] **Step 1: Add notification endpoint constants**

Add `NOTIFICATIONS` and `REVIEWS` to `admin/src/shared/config/api.ts`.

- [ ] **Step 2: Replace signup-only bell data**

`Header.tsx` should call the unified notifications API, render unread count from backend, and map `type` to icon + link:
- signup -> `/customers`
- order -> `/orders`
- product -> `/products`
- blog -> `/blog`
- review -> `/reviews`
- blog comment -> `/blog`

- [ ] **Step 3: Replace inbox mock data with the same service**

`admin/src/app/notifications/page.tsx` should use the same API for:
- all / unread filter
- mark one as read
- mark all as read
- empty state

- [ ] **Step 4: Verify admin build**

Run:

```powershell
npm run build --prefix admin
```

Expected: production build passes with no notification-related errors.

### Task 6: Final Smoke Verification

**Files:**
- Modify: none
- Test: backend API, storefront build, admin build

- [ ] **Step 1: Verify storefront build after review/comment changes**

Run:

```powershell
npm run build
```

Expected: storefront build passes after `src/app/account/page.tsx`, `src/app/blog/[slug]/page.tsx`, and feature service updates.

- [ ] **Step 2: Verify notification read actions**

Run:

```powershell
Invoke-RestMethod -Method Patch http://localhost:5000/api/notifications/read-all
Invoke-RestMethod http://localhost:5000/api/notifications?limit=20&offset=0&filter=unread
```

Expected: unread list becomes empty after `read-all`.

- [ ] **Step 3: Manual end-to-end check**

Create one of each event, then confirm in admin:
- bell badge increases
- mixed event types render with correct labels/icons
- inbox shows same records as bell
- marking one item as read changes unread count immediately
