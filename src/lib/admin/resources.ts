export type ResourceDef = {
  key: string; // url segment
  table: string; // db table name
  label: string;
  group: "Content" | "Commerce" | "Site Config" | "Communications" | "System";
  pk?: string; // default 'id'
  defaultSort?: { column: string; ascending: boolean };
};

export const RESOURCES: ResourceDef[] = [
  // Content
  { key: "blog", table: "blog", label: "Blog Posts", group: "Content", defaultSort: { column: "created_at", ascending: false } },
  { key: "gallery", table: "gallery", label: "Gallery", group: "Content" },
  { key: "ai-gallery", table: "ai_gallery", label: "AI Gallery", group: "Content" },
  { key: "videos", table: "videos", label: "Videos", group: "Content" },
  { key: "reviews", table: "reviews", label: "Reviews", group: "Content" },
  { key: "latest-designs", table: "latest_designs", label: "Latest Designs", group: "Content" },
  { key: "stitched-dress", table: "stitched_dress", label: "Stitched Dresses", group: "Content" },

  // Commerce
  { key: "products", table: "products", label: "Products", group: "Commerce" },
  { key: "orders", table: "orders", label: "Orders", group: "Commerce", defaultSort: { column: "created_at", ascending: false } },
  { key: "coupons", table: "coupons", label: "Coupons", group: "Commerce" },
  { key: "price-list", table: "price_list", label: "Price List", group: "Commerce" },
  { key: "service-charges", table: "service_charges", label: "Service Charges", group: "Commerce" },
  { key: "appointments", table: "appointments", label: "Appointments", group: "Commerce", defaultSort: { column: "created_at", ascending: false } },
  { key: "design-requests", table: "design_requests", label: "Design Requests", group: "Commerce", defaultSort: { column: "created_at", ascending: false } },
  { key: "job-applications", table: "job_applications", label: "Job Applications", group: "Commerce", defaultSort: { column: "created_at", ascending: false } },

  // Site Config
  { key: "hero-section", table: "hero_section", label: "Hero Section", group: "Site Config" },
  { key: "hero-little-stitch", table: "hero_section_little_stitch", label: "Hero (Little Stitch)", group: "Site Config" },
  { key: "hero-services", table: "hero_section_services", label: "Hero (Services)", group: "Site Config" },
  { key: "homepage-carousel", table: "homepage_carousel", label: "Homepage Carousel", group: "Site Config" },
  { key: "homepage-sections", table: "homepage_sections", label: "Homepage Sections", group: "Site Config" },
  { key: "carousel", table: "carousel", label: "Carousel", group: "Site Config" },
  { key: "bulkorder-carousel", table: "bulkorder_carousel", label: "Bulk Order Carousel", group: "Site Config" },
  { key: "promotional-banners", table: "promotional_banners", label: "Promotional Banners", group: "Site Config" },
  { key: "discount-offers", table: "discount_offers", label: "Discount Offers", group: "Site Config" },
  { key: "notifications", table: "notifications", label: "Notifications", group: "Site Config" },
  { key: "brands", table: "brands", label: "Brands", group: "Site Config" },
  { key: "fabric-details", table: "fabric_details", label: "Fabric Details", group: "Site Config" },
  { key: "stitching-services", table: "stitching_services", label: "Stitching Services", group: "Site Config" },
  { key: "career-jobs", table: "career_jobs", label: "Career Jobs", group: "Site Config" },

  // Communications
  { key: "contact-messages", table: "contact_messages", label: "Contact Messages", group: "Communications", defaultSort: { column: "created_at", ascending: false } },
  { key: "newsletter", table: "newsletter_subscriptions", label: "Newsletter Subscribers", group: "Communications", defaultSort: { column: "created_at", ascending: false } },
  { key: "chat-messages", table: "chat_messages", label: "Chat Messages", group: "Communications", defaultSort: { column: "created_at", ascending: false } },

  // System
  { key: "banner-analytics", table: "banner_analytics", label: "Banner Analytics", group: "System", defaultSort: { column: "created_at", ascending: false } },
  { key: "user-roles", table: "user_roles", label: "User Roles", group: "System" },
  { key: "audit-log", table: "admin_audit_log", label: "Audit Log", group: "System", defaultSort: { column: "created_at", ascending: false } },
];

export const RESOURCE_GROUPS: ResourceDef["group"][] = [
  "Content",
  "Commerce",
  "Site Config",
  "Communications",
  "System",
];

export function findResource(key: string) {
  return RESOURCES.find((r) => r.key === key);
}
