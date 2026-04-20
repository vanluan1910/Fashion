# Hướng dẫn sử dụng Lexical Playground

Chào mừng bạn đến với **Lexical Playground**! Đây là một trình soạn thảo văn bản giàu tính năng (Rich Text Editor) được xây dựng trên nền tảng framework [Lexical](https://lexical.dev/) của Meta (Facebook).

Tài liệu này sẽ hướng dẫn bạn cách cài đặt, vận hành và sử dụng các tính năng cao cấp của Playground.

---

## 1. Khởi tạo và Chạy project

Nếu bạn đang ở trong thư mục `lexical-playground`, hãy thực hiện các bước sau:

### Cài đặt thư viện
Sử dụng npm hoặc yarn để cài đặt các dependency cần thiết:
```bash
npm install
# hoặc
yarn install
```

### Chạy ở chế độ phát triển (Development)
Mở terminal và chạy lệnh:
```bash
npm run dev
```
Trình soạn thảo sẽ mặc định chạy tại địa chỉ: `http://localhost:3000` (hoặc cổng được cấu hình trong `package.json`)

---

## 2. Các tính năng chính (Features)

### Chỉnh sửa văn bản cơ bản
- **Định dạng:** Đậm (Bold), Nghiêng (Italic), Gạch chân (Underline), Gạch ngang (Strikethrough), Code.
- **Căn lề:** Trái, Phải, Giữa, Đều hai bên.
- **Màu sắc:** Thay đổi màu chữ và màu nền (Background color).

### Nội dung nâng cao
- **Bảng (Tables):** Cho phép bạn chèn bảng, thêm/xóa hàng/cột và gộp ô.
- **Hình ảnh:** Chèn ảnh từ URL hoặc tải lên từ máy tính.
- **Markdown:** Hỗ trợ các cú pháp Markdown cơ bản như `#` cho Tiêu đề, `-` cho danh sách, v.v.
- **Excalidraw:** Tích hợp công cụ vẽ sơ đồ ngay trong trình soạn thảo.
- **Công thức Toán học (Equation):** Chèn các công thức TeX/LaTeX.
- **Poll (Bình chọn):** Tạo các bảng khảo sát nhanh.
- **Sticky Notes:** Thêm các ghi chú dán màu sắc.

### Chế độ Cộng tác (Collaboration)
Playground hỗ trợ làm việc nhóm thời gian thực thông qua thư viện `yjs` và `y-websocket`. Bạn có thể bật tính năng này trong phần **Settings**.

---

## 3. Các phím tắt thông dụng (Shortcuts)

| Phím tắt | Chức năng |
| :--- | :--- |
| `Ctrl + B` | In đậm |
| `Ctrl + I` | In nghiêng |
| `Ctrl + U` | Gạch chân |
| `Ctrl + Z` | Hoàn tác (Undo) |
| `Ctrl + Shift + Z` | Làm lại (Redo) |
| `Ctrl + K` | Thêm liên kết (Link) |
| `Alt + Shift + 1-6` | Tiêu đề H1 - H6 |

---

## 4. Cấu trúc Project (Dành cho Developer)

- **`src/nodes/`**: Chứa định nghĩa của các Node tùy chỉnh (như ImageNode, TableNode, ExcalidrawNode).
- **`src/plugins/`**: Chứa logic xử lý các tính năng (như ToolbarPlugin, AutoLinkPlugin, DragDropPastePlugin).
- **`src/themes/`**: Nơi định nghĩa CSS class cho các thành phần của editor (được quản lý thông qua `PlaygroundEditorTheme.ts`).
- **`src/Editor.tsx`**: Thành phần chính lắp ghép các plugin lại với nhau.

---

## 5. Tùy chỉnh (Customization)

### Thay đổi Theme
Bạn có thể điều chỉnh giao diện tại file `src/themes/PlaygroundEditorTheme.ts`. Mỗi thuộc tính trong đối tượng theme sẽ tương ứng với một class CSS trong file CSS của bạn.

### Thêm Plugin mới
Để thêm một tính năng mới:
1. Tạo một file plugin trong thư mục `src/plugins/`.
2. Import và khai báo plugin đó trong `src/Editor.tsx` bên trong component `<LexicalExtensionComposer>`.

---

## 6. Lưu và Xuất dữ liệu

Lexical lưu trữ dữ liệu dưới dạng JSON. Bạn có thể lấy trạng thái hiện tại của editor thông qua:
```javascript
const editorState = editor.getEditorState();
const jsonString = JSON.stringify(editorState.toJSON());
```

---
*Chúc bạn có trải nghiệm tuyệt vời với Lexical Playground!*
