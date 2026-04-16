# 💎 UI Guidelines (Luxury Boutique Standards)

To maintain the premium, high-aesthetic of **The Curated Atelier**, follow these rigid guidelines for component styling, layout, and colors:

## 1. Color Palette & Semantic Meaning
- **Primary Brand**: `#715b39` - The signature bronze/gold. Use for key actions, brand labels, and active states.
- **Secondary Accent**: `#bfa37c` - Lighter gold for containers and subtle borders.
- **Background**: `#faf9f7` - Off-white / Cream. Avoid pure white (`#ffffff`) for large surfaces to reduce eye strain and feel more "expensive".
- **Surface**: `#ffffff` - Pure white is reserved for high-elevation cards and floating elements.
- **Error**: `#ba1a1a` - Deep ruby red for critical errors or delete actions.

## 2. Typography & Fonts
- **Primary Font**: **Be Vietnam Pro**. Optimized for Vietnamese characters.
- **Title hierarchy**:
    - `h1/h2`: `font-black`, `tracking-tight` or `tracking-[0.2em]` for uppercase "editorial" labels.
    - `Labels`: `text-[9px]` or `text-[10px]`, `font-black`, `uppercase`, `tracking-widest`.
- **Numeric Data**: Use `font-bold` and `tracking-tighter` for currency. If the font supports tabular numerals, ensure they are enabled.

## 3. Elevation & Depth (The Luxury Feel)
- **Luxury Shadow**: `box-shadow: 0 12px 24px rgba(113, 91, 57, 0.06);`. Subtle, soft, and deep.
- **Glassmorphism**: 
    - Headers and floating toolbars must use `backdrop-blur-xl` and `bg-surface/90`.
    - Border: `1px solid rgba(113, 91, 57, 0.08)`.
- **Rounded Corners**:
    - Main containers: `rounded-[40px]` or `rounded-3xl` (24px).
    - Buttons/Inputs: `rounded-full` or `rounded-xl`.

## 4. Layout & Spacing
- **Breathing Room**: Never cram content. Use `p-8` to `p-12` for main content areas.
- **Vertical Rhythm**: Use `gap-8` between major sections to maintain a clear visual hierarchy.
- **Editorial Style**: Use localized, descriptive headers (e.g., "Phân tích trạng thái" instead of just "Thống kê").

## 5. Micro-interactions
- **Hover States**: Components should gently scale up (`scale-[1.02]`) or brighten on hover.
- **Transitions**: Every route change and modal opening must use a fade-in or slide-in transition (Duration: 500ms - 700ms).

---
*Standards for The Curated Atelier - Crafted with Passion.*
