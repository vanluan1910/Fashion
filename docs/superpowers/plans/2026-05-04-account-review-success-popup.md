# Account Review Success Popup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the browser alert shown after a successful review submission on the account page with a centered in-app success popup.

**Architecture:** Keep the existing review modal and submission loading flow, then add a separate success modal state in the same page component. On successful submission, close the review form modal, reset form state, and open the success modal using the same overlay and animation style already used by the account page.

**Tech Stack:** Next.js App Router, React state, Framer Motion, React Icons, Tailwind CSS

---

### Task 1: Add Success Popup State and Submit Flow Changes

**Files:**
- Modify: `src/app/account/page.tsx`
- Test: manual state flow through local build verification

- [ ] **Step 1: Add the missing success popup state**

Update the review state block to include a dedicated success modal flag:

```tsx
const [isReviewOpen, setIsReviewOpen] = React.useState(false);
const [isReviewSuccessOpen, setIsReviewSuccessOpen] = React.useState(false);
const [rating, setRating] = React.useState(5);
const [hoverRating, setHoverRating] = React.useState(0);
const [comment, setComment] = React.useState("");
const [isSubmittingReview, setIsSubmittingReview] = React.useState(false);
```

- [ ] **Step 2: Extract a close helper for the success popup**

Add a small helper near the other page logic so the success popup can be closed from overlay, close icon, or action button:

```tsx
const closeReviewSuccessPopup = () => {
  setIsReviewSuccessOpen(false);
};
```

- [ ] **Step 3: Replace the alert-based submit success branch**

Change the review submit handler inside the existing button so success becomes:

```tsx
setIsSubmittingReview(true);
await new Promise((resolve) => setTimeout(resolve, 1500));
setIsReviewOpen(false);
setIsSubmittingReview(false);
setComment("");
setRating(5);
setHoverRating(0);
setIsReviewSuccessOpen(true);
```

And remove:

```tsx
alert("Cảm ơn bạn đã đánh giá!");
```

### Task 2: Render the Centered Success Popup

**Files:**
- Modify: `src/app/account/page.tsx`
- Test: visual inspection through build/runtime verification

- [ ] **Step 1: Add an AnimatePresence block for success feedback**

Insert a second modal block after the review modal with the same page-level overlay pattern:

```tsx
<AnimatePresence>
  {isReviewSuccessOpen && (
    <div className="fixed inset-0 z-[10002] flex items-center justify-center px-4">
      ...
    </div>
  )}
</AnimatePresence>
```

- [ ] **Step 2: Build the popup card content**

Use the existing modal visual language with:

```tsx
<div className="p-6 border-b border-[#eee] flex justify-between items-center bg-[#faf9f7]">
  <div>
    <h4 className="text-[18px] font-normal text-[#333] mb-0.5">Đánh giá đã được gửi</h4>
    <p className="text-[10px] font-bold text-[#999] uppercase tracking-[2px]">Cảm ơn bạn đã chia sẻ trải nghiệm</p>
  </div>
  <button onClick={closeReviewSuccessPopup}>...</button>
</div>
```

And a centered body with:

```tsx
<div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-5">
  <FaCheckCircle size={28} />
</div>
<p className="text-[14px] text-[#666] leading-7 mb-6">
  Cảm ơn bạn đã gửi đánh giá. Phản hồi của bạn sẽ giúp những khách hàng khác lựa chọn sản phẩm dễ dàng hơn.
</p>
<button onClick={closeReviewSuccessPopup} className="...">
  Đóng
</button>
```

- [ ] **Step 3: Make every dismiss path behave the same**

Wire all dismiss entry points to the same helper:

```tsx
onClick={closeReviewSuccessPopup}
```

Apply it to:
- overlay
- top-right close icon button
- bottom action button

### Task 3: Verify the Replacement

**Files:**
- Modify: none
- Test: search + production build

- [ ] **Step 1: Verify the alert is gone**

Run:

```powershell
rg -n "alert\\(" src/app/account/page.tsx
```

Expected:

```text
No review-success alert remains in the account review flow.
```

- [ ] **Step 2: Verify the popup state exists**

Run:

```powershell
rg -n "isReviewSuccessOpen|closeReviewSuccessPopup" src/app/account/page.tsx
```

Expected:

```text
The new success popup state and close helper are present in the account page.
```

- [ ] **Step 3: Verify the app still builds**

Run:

```powershell
npm.cmd run build
```

Expected:

```text
Next.js production build completes successfully.
```
