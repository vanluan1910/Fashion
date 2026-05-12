# SAFETINO Horizontal Logo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the stacked storefront logo usage with a new horizontal SAFETINO logo asset so the wordmark is easier to read.

**Architecture:** Generate a sibling PNG asset from the existing square logo by extracting the icon and wordmark, placing them on one transparent canvas, and then update shared header/footer components to reference the new asset with revised dimensions.

**Tech Stack:** Next.js, React, Tailwind CSS, PowerShell with `System.Drawing`

---

### Task 1: Create the Horizontal Logo Asset

**Files:**
- Create: `public/images/lo_go_horizontal.png`
- Modify: none
- Test: manual asset inspection

- [ ] **Step 1: Inspect the current logo bounds**

Run:

```powershell
Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile('d:\Fashion\public\images\lo_go.png')
# Confirm alpha bounds for icon/text extraction before generating the new asset.
```

- [ ] **Step 2: Generate the horizontal logo**

Run a PowerShell script that:

```powershell
# 1. Crops the upper icon region from lo_go.png
# 2. Crops the lower SAFETINO wordmark region from lo_go.png
# 3. Rescales each crop for horizontal balance
# 4. Draws both pieces onto a transparent canvas
# 5. Saves public/images/lo_go_horizontal.png
```

- [ ] **Step 3: Inspect the output visually**

Confirm:

```text
The symbol appears on the left, the SAFETINO wordmark appears on the right, the background remains transparent, and the wordmark is visibly larger than in the stacked layout.
```

### Task 2: Update Shared Storefront Logo Usage

**Files:**
- Modify: `src/shared/components/Header.tsx`
- Modify: `src/shared/components/Footer.tsx`
- Test: manual component inspection

- [ ] **Step 1: Update logo references**

Replace:

```tsx
src="/images/lo_go.png"
```

With:

```tsx
src="/images/lo_go_horizontal.png"
```

- [ ] **Step 2: Adjust display dimensions**

Set header/footer sizing so the new asset uses more horizontal room without distorting the logo.

- [ ] **Step 3: Re-check layout**

Confirm:

```text
Desktop header, mobile header, and footer all render the wider logo without clipping, stretching, or excess whitespace.
```

### Task 3: Verify the Change

**Files:**
- Modify: none
- Test: build/search verification

- [ ] **Step 1: Verify references**

Run:

```powershell
rg -n "/images/lo_go" src/shared/components
```

Expected:

```text
Only the intended updated references remain, pointing at /images/lo_go_horizontal.png.
```

- [ ] **Step 2: Verify asset exists**

Run:

```powershell
Get-Item d:\Fashion\public\images\lo_go_horizontal.png
```

Expected:

```text
The file exists and reports a recent timestamp.
```
