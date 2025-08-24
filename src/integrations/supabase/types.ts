export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      admin_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          key: string
          updated_at: string
          value: Json | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          value?: Json | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          value?: Json | null
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          color: string | null
          created_at: string
          id: string
          product_id: string
          quantity: number
          size: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: string
          product_id: string
          quantity?: number
          size?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: string
          product_id?: string
          quantity?: number
          size?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean
          meta_description: string | null
          meta_title: string | null
          name: string
          parent_id: string | null
          slug: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          meta_description?: string | null
          meta_title?: string | null
          name: string
          parent_id?: string | null
          slug: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      coupon_usages: {
        Row: {
          coupon_id: string
          created_at: string
          discount_amount: number
          id: string
          order_id: string | null
          user_id: string | null
        }
        Insert: {
          coupon_id: string
          created_at?: string
          discount_amount: number
          id?: string
          order_id?: string | null
          user_id?: string | null
        }
        Update: {
          coupon_id?: string
          created_at?: string
          discount_amount?: number
          id?: string
          order_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coupon_usages_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coupon_usages_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coupon_usages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      coupons: {
        Row: {
          code: string
          created_at: string
          description: string | null
          expires_at: string | null
          id: string
          is_active: boolean
          maximum_discount: number | null
          minimum_amount: number | null
          name: string
          starts_at: string | null
          type: string
          updated_at: string
          usage_count: number | null
          usage_limit: number | null
          user_limit: number | null
          value: number
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          maximum_discount?: number | null
          minimum_amount?: number | null
          name: string
          starts_at?: string | null
          type: string
          updated_at?: string
          usage_count?: number | null
          usage_limit?: number | null
          user_limit?: number | null
          value: number
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          maximum_discount?: number | null
          minimum_amount?: number | null
          name?: string
          starts_at?: string | null
          type?: string
          updated_at?: string
          usage_count?: number | null
          usage_limit?: number | null
          user_limit?: number | null
          value?: number
        }
        Relationships: []
      }
      Customer: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      hero_section: {
        Row: {
          button1_link: string | null
          button1_text: string | null
          button2_link: string | null
          button2_text: string | null
          created_at: string
          description: string | null
          heading: string
          id: string
          image_url: string
          subheading: string | null
        }
        Insert: {
          button1_link?: string | null
          button1_text?: string | null
          button2_link?: string | null
          button2_text?: string | null
          created_at?: string
          description?: string | null
          heading: string
          id?: string
          image_url: string
          subheading?: string | null
        }
        Update: {
          button1_link?: string | null
          button1_text?: string | null
          button2_link?: string | null
          button2_text?: string | null
          created_at?: string
          description?: string | null
          heading?: string
          id?: string
          image_url?: string
          subheading?: string | null
        }
        Relationships: []
      }
      inventory_logs: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          new_quantity: number
          notes: string | null
          previous_quantity: number
          product_id: string
          quantity: number
          reference_id: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          new_quantity: number
          notes?: string | null
          previous_quantity: number
          product_id: string
          quantity: number
          reference_id?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          new_quantity?: number
          notes?: string | null
          previous_quantity?: number
          product_id?: string
          quantity?: number
          reference_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_logs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "inventory_logs_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscriptions: {
        Row: {
          email: string
          id: string
          is_active: boolean
          name: string | null
          subscribed_at: string
          unsubscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean
          name?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean
          name?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          link: string | null
          message: string
          status: Database["public"]["Enums"]["notification_status"] | null
        }
        Insert: {
          created_at?: string
          id?: string
          link?: string | null
          message: string
          status?: Database["public"]["Enums"]["notification_status"] | null
        }
        Update: {
          created_at?: string
          id?: string
          link?: string | null
          message?: string
          status?: Database["public"]["Enums"]["notification_status"] | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          color: string | null
          created_at: string
          id: string
          order_id: string
          product_details: Json | null
          product_id: string | null
          product_name: string
          product_sku: string | null
          quantity: number
          size: string | null
          total_price: number
          unit_price: number
          variant_details: Json | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: string
          order_id: string
          product_details?: Json | null
          product_id?: string | null
          product_name: string
          product_sku?: string | null
          quantity: number
          size?: string | null
          total_price: number
          unit_price: number
          variant_details?: Json | null
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: string
          order_id?: string
          product_details?: Json | null
          product_id?: string | null
          product_name?: string
          product_sku?: string | null
          quantity?: number
          size?: string | null
          total_price?: number
          unit_price?: number
          variant_details?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          billing_address: Json | null
          cancelled_at: string | null
          created_at: string
          currency: string
          customer_email: string
          customer_name: string
          customer_notes: string | null
          customer_phone: string | null
          delivered_at: string | null
          discount_amount: number
          id: string
          notes: string | null
          order_items: Json | null
          order_number: string
          payment_method: Database["public"]["Enums"]["payment_method"]
          payment_status: Database["public"]["Enums"]["payment_status"]
          shipped_at: string | null
          shipping_address: Json | null
          shipping_amount: number
          status: Database["public"]["Enums"]["order_status"]
          subtotal: number
          tax_amount: number
          total_amount: number
          tracking_number: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          billing_address?: Json | null
          cancelled_at?: string | null
          created_at?: string
          currency?: string
          customer_email: string
          customer_name: string
          customer_notes?: string | null
          customer_phone?: string | null
          delivered_at?: string | null
          discount_amount?: number
          id?: string
          notes?: string | null
          order_items?: Json | null
          order_number: string
          payment_method?: Database["public"]["Enums"]["payment_method"]
          payment_status?: Database["public"]["Enums"]["payment_status"]
          shipped_at?: string | null
          shipping_address?: Json | null
          shipping_amount?: number
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number
          tax_amount?: number
          total_amount: number
          tracking_number?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          billing_address?: Json | null
          cancelled_at?: string | null
          created_at?: string
          currency?: string
          customer_email?: string
          customer_name?: string
          customer_notes?: string | null
          customer_phone?: string | null
          delivered_at?: string | null
          discount_amount?: number
          id?: string
          notes?: string | null
          order_items?: Json | null
          order_number?: string
          payment_method?: Database["public"]["Enums"]["payment_method"]
          payment_status?: Database["public"]["Enums"]["payment_status"]
          shipped_at?: string | null
          shipping_address?: Json | null
          shipping_amount?: number
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number
          tax_amount?: number
          total_amount?: number
          tracking_number?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      product_reviews: {
        Row: {
          admin_response: string | null
          created_at: string | null
          customer_email: string
          customer_name: string
          id: string
          is_approved: boolean | null
          is_verified: boolean | null
          product_id: string | null
          rating: number
          responded_at: string | null
          review_text: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          admin_response?: string | null
          created_at?: string | null
          customer_email: string
          customer_name: string
          id?: string
          is_approved?: boolean | null
          is_verified?: boolean | null
          product_id?: string | null
          rating: number
          responded_at?: string | null
          review_text?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          admin_response?: string | null
          created_at?: string | null
          customer_email?: string
          customer_name?: string
          id?: string
          is_approved?: boolean | null
          is_verified?: boolean | null
          product_id?: string | null
          rating?: number
          responded_at?: string | null
          review_text?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variants: {
        Row: {
          actual_price: number | null
          color: string | null
          cost_price: number | null
          created_at: string
          discounted_price: number
          id: string
          inventory_quantity: number
          is_active: boolean
          product_id: string
          size: string | null
          sku: string | null
          updated_at: string
        }
        Insert: {
          actual_price?: number | null
          color?: string | null
          cost_price?: number | null
          created_at?: string
          discounted_price: number
          id?: string
          inventory_quantity?: number
          is_active?: boolean
          product_id: string
          size?: string | null
          sku?: string | null
          updated_at?: string
        }
        Update: {
          actual_price?: number | null
          color?: string | null
          cost_price?: number | null
          created_at?: string
          discounted_price?: number
          id?: string
          inventory_quantity?: number
          is_active?: boolean
          product_id?: string
          size?: string | null
          sku?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          brand: string | null
          care_instructions: string | null
          category_id: string | null
          created_at: string
          description: string | null
          discounted_price: number | null
          fabric_details: Json | null
          id: string
          images: Json | null
          inventory_quantity: number
          is_accessories: boolean | null
          is_active: boolean
          is_beads: boolean | null
          is_digital: boolean
          is_featured: boolean
          is_new_arrival: boolean
          is_perfumes: boolean
          is_top_seller: boolean
          meta_description: string | null
          meta_title: string | null
          min_stock_level: number | null
          name: string
          original_price: number | null
          price: number
          short_description: string | null
          Size: string | null
          size_chart_id: string | null
          sku: string | null
          slug: string
          thumbnail_index: number | null
          updated_at: string
          variants: Json | null
        }
        Insert: {
          brand?: string | null
          care_instructions?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          discounted_price?: number | null
          fabric_details?: Json | null
          id?: string
          images?: Json | null
          inventory_quantity: number
          is_accessories?: boolean | null
          is_active?: boolean
          is_beads?: boolean | null
          is_digital?: boolean
          is_featured?: boolean
          is_new_arrival?: boolean
          is_perfumes?: boolean
          is_top_seller?: boolean
          meta_description?: string | null
          meta_title?: string | null
          min_stock_level?: number | null
          name: string
          original_price?: number | null
          price: number
          short_description?: string | null
          Size?: string | null
          size_chart_id?: string | null
          sku?: string | null
          slug: string
          thumbnail_index?: number | null
          updated_at?: string
          variants?: Json | null
        }
        Update: {
          brand?: string | null
          care_instructions?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          discounted_price?: number | null
          fabric_details?: Json | null
          id?: string
          images?: Json | null
          inventory_quantity?: number
          is_accessories?: boolean | null
          is_active?: boolean
          is_beads?: boolean | null
          is_digital?: boolean
          is_featured?: boolean
          is_new_arrival?: boolean
          is_perfumes?: boolean
          is_top_seller?: boolean
          meta_description?: string | null
          meta_title?: string | null
          min_stock_level?: number | null
          name?: string
          original_price?: number | null
          price?: number
          short_description?: string | null
          Size?: string | null
          size_chart_id?: string | null
          sku?: string | null
          slug?: string
          thumbnail_index?: number | null
          updated_at?: string
          variants?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_size_chart_id_fkey"
            columns: ["size_chart_id"]
            isOneToOne: false
            referencedRelation: "size_charts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          date_of_birth: string | null
          email: string
          first_name: string | null
          id: string
          is_active: boolean
          last_name: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          email: string
          first_name?: string | null
          id?: string
          is_active?: boolean
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string
          first_name?: string | null
          id?: string
          is_active?: boolean
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      size_charts: {
        Row: {
          category: string | null
          chart_data: Json
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          chart_data: Json
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          chart_data?: Json
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      special_offers: {
        Row: {
          created_at: string
          description: string | null
          discount_percent: number | null
          end_time: string | null
          extra_discount_percent: number | null
          id: string
          promo_code: string | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          discount_percent?: number | null
          end_time?: string | null
          extra_discount_percent?: number | null
          id?: string
          promo_code?: string | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          discount_percent?: number | null
          end_time?: string | null
          extra_discount_percent?: number | null
          id?: string
          promo_code?: string | null
          title?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      wishlists: {
        Row: {
          created_at: string
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlists_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wishlists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      assign_admin_role: {
        Args: { user_email: string }
        Returns: undefined
      }
      generate_order_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_newsletter_subscriptions: {
        Args: Record<PropertyKey, never>
        Returns: {
          email: string
          id: string
          is_active: boolean
          subscribed_at: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      insert_newsletter_subscription: {
        Args: { email_param: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "customer" | "moderator"
      notification_status: "active" | "inactive"
      order_status:
        | "pending"
        | "confirmed"
        | "processing"
        | "shipped"
        | "delivered"
        | "cancelled"
        | "refunded"
      payment_method:
        | "cash_on_delivery"
        | "credit_card"
        | "debit_card"
        | "bank_transfer"
        | "mobile_wallet"
      payment_status: "pending" | "paid" | "failed" | "refunded" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "customer", "moderator"],
      notification_status: ["active", "inactive"],
      order_status: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
        "refunded",
      ],
      payment_method: [
        "cash_on_delivery",
        "credit_card",
        "debit_card",
        "bank_transfer",
        "mobile_wallet",
      ],
      payment_status: ["pending", "paid", "failed", "refunded", "cancelled"],
    },
  },
} as const
