export type NotificationType =
  | "customer_signup"
  | "order_created"
  | "product_created"
  | "blog_created"
  | "product_review_created"
  | "blog_comment_created";

export interface NotificationItem {
  notification_id: number;
  type: NotificationType | string;
  title: string;
  message: string;
  entity_type: string;
  entity_id: string;
  actor_account_id: number | null;
  metadata_json: Record<string, any> | string | null;
  is_read: boolean;
  created_at: string;
  read_at: string | null;
}

export interface NotificationListResponse {
  items: NotificationItem[];
  pagination: {
    total: number;
    unread_count: number;
    limit: number;
    offset: number;
    filter: "all" | "unread";
  };
}
