export const SHOP_CATEGORY_LABELS = {
  men: "Thời trang nam",
  women: "Thời trang nữ",
  accessories: "Phụ kiện",
} as const;

export const SHOP_SUBCATEGORY_LABELS = {
  "t-shirts": "Áo thun",
  shirts: "Áo sơ mi",
  jackets: "Áo khoác",
  sweaters: "Áo len",
  jeans: "Quần jeans",
  suits: "Bộ suit",
  dresses: "Váy đầm",
  skirts: "Chân váy",
  handbags: "Túi xách",
  shoes: "Giày dép",
  hats: "Mũ nón",
  accessories: "Phụ kiện khác",
  "winter wear": "Đồ mùa đông",
  "summer specials": "Đồ mùa hè",
  tops: "Áo kiểu",
  bottoms: "Quần",
} as const;

type ShopCategoryKey = keyof typeof SHOP_CATEGORY_LABELS;
type ShopSubCategoryKey = keyof typeof SHOP_SUBCATEGORY_LABELS;

export const normalizeShopText = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

const CATEGORY_ALIASES: Record<string, ShopCategoryKey> = {
  men: "men",
  nam: "men",
  "thoi trang nam": "men",
  women: "women",
  nu: "women",
  "thoi trang nu": "women",
  accessories: "accessories",
  accessory: "accessories",
  "phu kien": "accessories",
};

const SUBCATEGORY_ALIASES: Record<string, ShopSubCategoryKey> = {
  "t-shirts": "t-shirts",
  tshirts: "t-shirts",
  "t shirts": "t-shirts",
  "ao thun": "t-shirts",
  shirts: "shirts",
  "ao so mi": "shirts",
  jackets: "jackets",
  "ao khoac": "jackets",
  sweaters: "sweaters",
  "ao len": "sweaters",
  jeans: "jeans",
  "quan jeans": "jeans",
  suits: "suits",
  "bo suit": "suits",
  "bo vest": "suits",
  dresses: "dresses",
  "vay dam": "dresses",
  skirts: "skirts",
  "chan vay": "skirts",
  handbags: "handbags",
  "tui xach": "handbags",
  shoes: "shoes",
  "giay dep": "shoes",
  hats: "hats",
  "mu non": "hats",
  accessories: "accessories",
  "phu kien khac": "accessories",
  "winter wear": "winter wear",
  "do mua dong": "winter wear",
  "summer specials": "summer specials",
  "do mua he": "summer specials",
  tops: "tops",
  "ao kieu": "tops",
  bottoms: "bottoms",
  quan: "bottoms",
};

export const normalizeShopCategory = (value: string) => {
  const normalized = normalizeShopText(value);
  return CATEGORY_ALIASES[normalized] || normalized;
};

export const normalizeShopSubCategory = (value: string) => {
  const normalized = normalizeShopText(value);
  return SUBCATEGORY_ALIASES[normalized] || normalized;
};

export const getShopCategoryLabel = (value: string) => {
  const key = normalizeShopCategory(value) as ShopCategoryKey;
  return SHOP_CATEGORY_LABELS[key] || value;
};

export const getShopSubCategoryLabel = (value: string) => {
  const key = normalizeShopSubCategory(value) as ShopSubCategoryKey;
  return SHOP_SUBCATEGORY_LABELS[key] || value;
};
