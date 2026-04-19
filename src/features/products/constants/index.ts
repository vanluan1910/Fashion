import { Product } from "../types/product";

export const SAMPLE_PRODUCT: Product = {
  id: 1,
  name: "Túi Xách Da Cao Cấp Cho Nữ",
  price: 599,
  oldPrice: 1000,
  image: "images/1.png",
  images: ["images/1.png", "images/2.png", "images/3.png", "images/4.png"],
  description: "Trải nghiệm sự sang trọng với mẫu túi xách da cao cấp dành riêng cho phái đẹp. Được chế tác từ chất liệu da tự nhiên tinh xảo, sản phẩm không chỉ mang lại vẻ ngoài thời thượng mà còn đảm bảo độ bền vượt trội theo thời gian. Thiết kế ngăn chứa thông minh giúp bạn dễ dàng sắp xếp vật dụng cá nhân một cách gọn gàng.",
  shortDescription: "Túi xách da cao cấp với thiết kế hiện đại, phù hợp cho mọi dịp từ công sở đến các buổi tiệc sang trọng. Chất liệu bền bỉ và kiểu dáng thời trang.",
  category: "Thời trang",
  rating: 4.8,
  reviewsCount: 2262,
  unitsSold: 3252,
  status: "Còn hàng",
  colors: ["Trắng", "Đen", "Đỏ", "Cam", "Vàng", "Xanh lá", "Xanh dương", "Hồng", "Tím"],
  sizes: ["XS", "S", "M", "L", "XL"],
  sku: "01-2345678",
  specifications: {
    brand: "Dolar Luxury",
    connectorType: "Khóa kéo cao cấp",
    batteryCapacity: "Không áp dụng",
    specialFeature: "Chống nước nhẹ",
    weight: "500g",
    warranty: "6 Tháng",
    ports: "Nhiều ngăn tiện lợi",
    dimensions: "32.25 * 25.2 * 36.3 cm",
    display: "Da trơn bóng",
    origin: "Việt Nam"
  }
};
