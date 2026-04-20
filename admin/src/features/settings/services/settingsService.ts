export interface SiteSettings {
  general: {
    siteName: string;
    tagline: string;
    metaDescription: string;
    contactEmail: string;
    hotline: string;
  };
  social: {
    facebook: string;
    instagram: string;
    tiktok: string;
    youtube: string;
  };
  appearance: {
    logoUrl: string;
    faviconUrl: string;
    primaryColor: string;
  };
}

const SETTINGS_STORAGE_KEY = "atelier_site_settings";

const DEFAULT_SETTINGS: SiteSettings = {
  general: {
    siteName: "Atelier Fashion & Lifestyle",
    tagline: "Đẳng cấp thời trang tối giản",
    metaDescription: "Atelier là nền tảng thời trang cao cấp chuyên cung cấp các sản phẩm thiết kế tối giản, tinh tế cho người hiện đại.",
    contactEmail: "contact@atelier.vn",
    hotline: "1900 8198"
  },
  social: {
    facebook: "https://facebook.com/atelier",
    instagram: "https://instagram.com/atelier",
    tiktok: "",
    youtube: ""
  },
  appearance: {
    logoUrl: "",
    faviconUrl: "",
    primaryColor: "#f74f2e"
  }
};

export const settingsService = {
  getSettings: (): SiteSettings => {
    if (typeof window === "undefined") return DEFAULT_SETTINGS;
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
  },

  saveSettings: (settings: SiteSettings) => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }
};
