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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_audit_log: {
        Row: {
          action: string
          changes: Json | null
          created_at: string
          id: string
          record_id: string | null
          table_name: string
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          changes?: Json | null
          created_at?: string
          id?: string
          record_id?: string | null
          table_name: string
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          changes?: Json | null
          created_at?: string
          id?: string
          record_id?: string | null
          table_name?: string
          user_email?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_gallery: {
        Row: {
          description: string | null
          display_order: number | null
          id: string
          image_url: string
          is_active: boolean | null
          timestamp: string
          title: string
        }
        Insert: {
          description?: string | null
          display_order?: number | null
          id?: string
          image_url: string
          is_active?: boolean | null
          timestamp?: string
          title: string
        }
        Update: {
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string
          is_active?: boolean | null
          timestamp?: string
          title?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          amount_summary: number
          appointment_date: string | null
          appointment_time: string | null
          created_at: string
          dc_charges: number
          email: string | null
          id: string
          name: string
          phone: string
          pick_drop_charges: Json | null
          price: number
          quantity: number
          service_type: string
          shirt_measurements: Json | null
          special_requirements: string | null
          status: string | null
          trouser_measurements: Json | null
          updated_at: string
          uploaded_image_url: string | null
          uploaded_images: Json | null
        }
        Insert: {
          amount_summary?: number
          appointment_date?: string | null
          appointment_time?: string | null
          created_at?: string
          dc_charges?: number
          email?: string | null
          id?: string
          name: string
          phone: string
          pick_drop_charges?: Json | null
          price?: number
          quantity?: number
          service_type: string
          shirt_measurements?: Json | null
          special_requirements?: string | null
          status?: string | null
          trouser_measurements?: Json | null
          updated_at?: string
          uploaded_image_url?: string | null
          uploaded_images?: Json | null
        }
        Update: {
          amount_summary?: number
          appointment_date?: string | null
          appointment_time?: string | null
          created_at?: string
          dc_charges?: number
          email?: string | null
          id?: string
          name?: string
          phone?: string
          pick_drop_charges?: Json | null
          price?: number
          quantity?: number
          service_type?: string
          shirt_measurements?: Json | null
          special_requirements?: string | null
          status?: string | null
          trouser_measurements?: Json | null
          updated_at?: string
          uploaded_image_url?: string | null
          uploaded_images?: Json | null
        }
        Relationships: []
      }
      banner_analytics: {
        Row: {
          banner_id: string
          conversion_goal: string | null
          created_at: string
          event_type: string
          id: string
          session_id: string | null
        }
        Insert: {
          banner_id: string
          conversion_goal?: string | null
          created_at?: string
          event_type: string
          id?: string
          session_id?: string | null
        }
        Update: {
          banner_id?: string
          conversion_goal?: string | null
          created_at?: string
          event_type?: string
          id?: string
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "banner_analytics_banner_id_fkey"
            columns: ["banner_id"]
            isOneToOne: false
            referencedRelation: "promotional_banners"
            referencedColumns: ["id"]
          },
        ]
      }
      blog: {
        Row: {
          author_name: string | null
          category: string | null
          content: string
          created_at: string
          excerpt: string | null
          featured_image_url: string | null
          id: string
          is_featured: boolean | null
          is_published: boolean
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_name?: string | null
          category?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string | null
          category?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      brands: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean
          logo_url: string | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      bulkorder_carousel: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          image_url: string
          is_active: boolean
          link: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url: string
          is_active?: boolean
          link?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string
          is_active?: boolean
          link?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      career_jobs: {
        Row: {
          created_at: string
          description: string
          display_order: number | null
          id: string
          is_active: boolean
          job_type: string | null
          location: string | null
          posted_at: string
          requirements: string | null
          salary_range: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          display_order?: number | null
          id?: string
          is_active?: boolean
          job_type?: string | null
          location?: string | null
          posted_at?: string
          requirements?: string | null
          salary_range?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          display_order?: number | null
          id?: string
          is_active?: boolean
          job_type?: string | null
          location?: string | null
          posted_at?: string
          requirements?: string | null
          salary_range?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      carousel: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          image_url: string
          is_active: boolean
          link: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url: string
          is_active?: boolean
          link?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string
          is_active?: boolean
          link?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string
          sender_email: string | null
          sender_name: string | null
          sender_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          sender_email?: string | null
          sender_name?: string | null
          sender_type: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          sender_email?: string | null
          sender_name?: string | null
          sender_type?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string | null
          subject: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string | null
          subject?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string | null
          subject?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      coupons: {
        Row: {
          active: boolean
          created_at: string
          description: string
          discount_type: Database["public"]["Enums"]["discount_type_enum"]
          discount_value: number
          id: string
          min_order: number
          title: string
          valid_days: string[] | null
        }
        Insert: {
          active?: boolean
          created_at?: string
          description: string
          discount_type: Database["public"]["Enums"]["discount_type_enum"]
          discount_value?: number
          id?: string
          min_order?: number
          title: string
          valid_days?: string[] | null
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string
          discount_type?: Database["public"]["Enums"]["discount_type_enum"]
          discount_value?: number
          id?: string
          min_order?: number
          title?: string
          valid_days?: string[] | null
        }
        Relationships: []
      }
      design_requests: {
        Row: {
          additional_notes: string | null
          bottom_style: string | null
          dress_type: string | null
          fabric_type: string | null
          generated_image_url: string | null
          id: string
          neck_design: string | null
          prompt: string
          sleeve_design: string | null
          suggestions: string | null
          timestamp: string
          user_id: string | null
        }
        Insert: {
          additional_notes?: string | null
          bottom_style?: string | null
          dress_type?: string | null
          fabric_type?: string | null
          generated_image_url?: string | null
          id?: string
          neck_design?: string | null
          prompt: string
          sleeve_design?: string | null
          suggestions?: string | null
          timestamp?: string
          user_id?: string | null
        }
        Update: {
          additional_notes?: string | null
          bottom_style?: string | null
          dress_type?: string | null
          fabric_type?: string | null
          generated_image_url?: string | null
          id?: string
          neck_design?: string | null
          prompt?: string
          sleeve_design?: string | null
          suggestions?: string | null
          timestamp?: string
          user_id?: string | null
        }
        Relationships: []
      }
      discount_offers: {
        Row: {
          code: string | null
          created_at: string
          description: string | null
          discount_amount: number | null
          discount_percentage: number | null
          display_order: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          slug: string | null
          title: string
          updated_at: string
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string
          description?: string | null
          discount_amount?: number | null
          discount_percentage?: number | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          slug?: string | null
          title: string
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string
          description?: string | null
          discount_amount?: number | null
          discount_percentage?: number | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          slug?: string | null
          title?: string
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      fabric_details: {
        Row: {
          care_instructions: string | null
          composition: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          care_instructions?: string | null
          composition?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          care_instructions?: string | null
          composition?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      gallery: {
        Row: {
          caption: string | null
          category: string | null
          created_at: string
          disclaimer: string | null
          display_order: number | null
          id: string
          image_url: string
          is_active: boolean | null
          updated_at: string
        }
        Insert: {
          caption?: string | null
          category?: string | null
          created_at?: string
          disclaimer?: string | null
          display_order?: number | null
          id?: string
          image_url: string
          is_active?: boolean | null
          updated_at?: string
        }
        Update: {
          caption?: string | null
          category?: string | null
          created_at?: string
          disclaimer?: string | null
          display_order?: number | null
          id?: string
          image_url?: string
          is_active?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      gallery_categories: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          id: string
          is_active: boolean
          label: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          label: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          label?: string
          slug?: string
          updated_at?: string
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
          display_order: number | null
          id: string
          image_height: number | null
          image_url: string | null
          image_width: number | null
          is_active: boolean | null
          object_fit: string | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          button1_link?: string | null
          button1_text?: string | null
          button2_link?: string | null
          button2_text?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_height?: number | null
          image_url?: string | null
          image_width?: number | null
          is_active?: boolean | null
          object_fit?: string | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          button1_link?: string | null
          button1_text?: string | null
          button2_link?: string | null
          button2_text?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_height?: number | null
          image_url?: string | null
          image_width?: number | null
          is_active?: boolean | null
          object_fit?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      hero_section_little_stitch: {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          image_url: string
          is_active: boolean
          link: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          image_url: string
          is_active?: boolean
          link?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string
          is_active?: boolean
          link?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      hero_section_services: {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          image_height: string | null
          image_url: string
          image_width: string | null
          is_active: boolean
          link: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          image_height?: string | null
          image_url: string
          image_width?: string | null
          is_active?: boolean
          link?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          image_height?: string | null
          image_url?: string
          image_width?: string | null
          is_active?: boolean
          link?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      homepage_carousel: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          image_url: string
          is_active: boolean
          link: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url: string
          is_active?: boolean
          link?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string
          is_active?: boolean
          link?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      homepage_sections: {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          is_visible: boolean
          section_key: string
          section_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          is_visible?: boolean
          section_key: string
          section_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          is_visible?: boolean
          section_key?: string
          section_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          applicant_name: string
          applied_at: string
          cover_letter: string | null
          created_at: string
          email: string
          id: string
          job_id: string | null
          phone: string
          resume_url: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          applicant_name: string
          applied_at?: string
          cover_letter?: string | null
          created_at?: string
          email: string
          id?: string
          job_id?: string | null
          phone: string
          resume_url?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          applicant_name?: string
          applied_at?: string
          cover_letter?: string | null
          created_at?: string
          email?: string
          id?: string
          job_id?: string | null
          phone?: string
          resume_url?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "career_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      latest_designs: {
        Row: {
          created_at: string
          description: string | null
          Disclaimer: string | null
          display_order: number | null
          id: string
          image_url: string
          is_active: boolean | null
          link: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          Disclaimer?: string | null
          display_order?: number | null
          id?: string
          image_url: string
          is_active?: boolean | null
          link?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          Disclaimer?: string | null
          display_order?: number | null
          id?: string
          image_url?: string
          is_active?: boolean | null
          link?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          email: string
          id: string
          is_active: boolean | null
          name: string | null
          subscribed_at: string
          unsubscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean | null
          name?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean | null
          name?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          is_active: boolean
          link_url: string | null
          message: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          is_active?: boolean
          link_url?: string | null
          message: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          is_active?: boolean
          link_url?: string | null
          message?: string
          updated_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string
          customer_address: string
          customer_city: string
          customer_email: string | null
          customer_name: string
          customer_phone: string
          estimated_delivery: string | null
          id: string
          items: Json
          notes: string | null
          shipping_cost: number
          status: string
          subtotal: number
          total_amount: number
          tracking_number: string | null
          tracking_url: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_address: string
          customer_city: string
          customer_email?: string | null
          customer_name: string
          customer_phone: string
          estimated_delivery?: string | null
          id?: string
          items?: Json
          notes?: string | null
          shipping_cost?: number
          status?: string
          subtotal?: number
          total_amount?: number
          tracking_number?: string | null
          tracking_url?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_address?: string
          customer_city?: string
          customer_email?: string | null
          customer_name?: string
          customer_phone?: string
          estimated_delivery?: string | null
          id?: string
          items?: Json
          notes?: string | null
          shipping_cost?: number
          status?: string
          subtotal?: number
          total_amount?: number
          tracking_number?: string | null
          tracking_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      price_list: {
        Row: {
          category: string
          created_at: string
          display_order: number | null
          id: string
          is_active: boolean
          price: number
          service_name: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          display_order?: number | null
          id?: string
          is_active?: boolean
          price: number
          service_name: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          display_order?: number | null
          id?: string
          is_active?: boolean
          price?: number
          service_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          available_sizes: string[] | null
          brand_id: string | null
          category: string | null
          created_at: string
          description: string | null
          discount_percentage: number | null
          discount_price: number | null
          display_order: number | null
          dopatta_details: Json | null
          fabric_detail_id: string | null
          fabric_type: string | null
          id: string
          images: Json
          is_active: boolean
          price_stitched: number
          price_unstitched: number
          shirt_details: Json | null
          stitching_details: Json | null
          stock_quantity: number
          title: string
          trouser_details: Json | null
          updated_at: string
        }
        Insert: {
          available_sizes?: string[] | null
          brand_id?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          discount_percentage?: number | null
          discount_price?: number | null
          display_order?: number | null
          dopatta_details?: Json | null
          fabric_detail_id?: string | null
          fabric_type?: string | null
          id?: string
          images?: Json
          is_active?: boolean
          price_stitched?: number
          price_unstitched?: number
          shirt_details?: Json | null
          stitching_details?: Json | null
          stock_quantity?: number
          title: string
          trouser_details?: Json | null
          updated_at?: string
        }
        Update: {
          available_sizes?: string[] | null
          brand_id?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          discount_percentage?: number | null
          discount_price?: number | null
          display_order?: number | null
          dopatta_details?: Json | null
          fabric_detail_id?: string | null
          fabric_type?: string | null
          id?: string
          images?: Json
          is_active?: boolean
          price_stitched?: number
          price_unstitched?: number
          shirt_details?: Json | null
          stitching_details?: Json | null
          stock_quantity?: number
          title?: string
          trouser_details?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_fabric_detail_id_fkey"
            columns: ["fabric_detail_id"]
            isOneToOne: false
            referencedRelation: "fabric_details"
            referencedColumns: ["id"]
          },
        ]
      }
      promotional_banners: {
        Row: {
          created_at: string
          cta_link: string | null
          cta_text: string | null
          description: string | null
          dismissible: boolean
          display_order: number | null
          end_date: string | null
          id: string
          is_active: boolean
          start_date: string | null
          title: string
          updated_at: string
          variant: string
        }
        Insert: {
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          description?: string | null
          dismissible?: boolean
          display_order?: number | null
          end_date?: string | null
          id?: string
          is_active?: boolean
          start_date?: string | null
          title: string
          updated_at?: string
          variant?: string
        }
        Update: {
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          description?: string | null
          dismissible?: boolean
          display_order?: number | null
          end_date?: string | null
          id?: string
          is_active?: boolean
          start_date?: string | null
          title?: string
          updated_at?: string
          variant?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          approved_at: string | null
          created_at: string
          display_order: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          product_id: string | null
          rating: number | null
          review_text: string
          status: string | null
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          product_id?: string | null
          rating?: number | null
          review_text: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          product_id?: string | null
          rating?: number | null
          review_text?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_coverage_snapshots: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          indexed_count: number
          not_indexed_count: number
          results: Json
          total: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          indexed_count?: number
          not_indexed_count?: number
          results?: Json
          total?: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          indexed_count?: number
          not_indexed_count?: number
          results?: Json
          total?: number
        }
        Relationships: []
      }
      seo_sitemap_submissions: {
        Row: {
          created_at: string
          http_status: number | null
          id: string
          message: string | null
          sitemap_url: string
          status: string
          submitted_by: string | null
          url_count: number | null
        }
        Insert: {
          created_at?: string
          http_status?: number | null
          id?: string
          message?: string | null
          sitemap_url: string
          status: string
          submitted_by?: string | null
          url_count?: number | null
        }
        Update: {
          created_at?: string
          http_status?: number | null
          id?: string
          message?: string | null
          sitemap_url?: string
          status?: string
          submitted_by?: string | null
          url_count?: number | null
        }
        Relationships: []
      }
      service_charges: {
        Row: {
          amount: number
          created_at: string
          id: string
          is_active: boolean
          service_name: string
          service_type: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          is_active?: boolean
          service_name: string
          service_type: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          is_active?: boolean
          service_name?: string
          service_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      service_pages: {
        Row: {
          created_at: string
          display_order: number
          faqs: Json | null
          h1: string | null
          hero_image_alt: string | null
          hero_image_url: string | null
          highlights: Json | null
          id: string
          images: Json | null
          intro: string | null
          is_active: boolean
          meta_description: string | null
          meta_keywords: string | null
          related_reads: Json | null
          related_services: Json | null
          sections: Json | null
          service_name: string | null
          slug: string
          testimonials: Json | null
          title: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          faqs?: Json | null
          h1?: string | null
          hero_image_alt?: string | null
          hero_image_url?: string | null
          highlights?: Json | null
          id?: string
          images?: Json | null
          intro?: string | null
          is_active?: boolean
          meta_description?: string | null
          meta_keywords?: string | null
          related_reads?: Json | null
          related_services?: Json | null
          sections?: Json | null
          service_name?: string | null
          slug: string
          testimonials?: Json | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          faqs?: Json | null
          h1?: string | null
          hero_image_alt?: string | null
          hero_image_url?: string | null
          highlights?: Json | null
          id?: string
          images?: Json | null
          intro?: string | null
          is_active?: boolean
          meta_description?: string | null
          meta_keywords?: string | null
          related_reads?: Json | null
          related_services?: Json | null
          sections?: Json | null
          service_name?: string | null
          slug?: string
          testimonials?: Json | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      stitched_dress: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          image_url: string
          is_active: boolean
          link: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url: string
          is_active?: boolean
          link?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string
          is_active?: boolean
          link?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      stitching_services: {
        Row: {
          category: string
          created_at: string
          id: string
          price: number
          service_name: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          price: number
          service_name: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          price?: number
          service_name?: string
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
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      videos: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          platform: string
          title: string | null
          updated_at: string
          video_url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          platform: string
          title?: string | null
          updated_at?: string
          video_url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          platform?: string
          title?: string | null
          updated_at?: string
          video_url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      discount_type_enum: "flat" | "percent" | "free_item"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["admin", "user"],
      discount_type_enum: ["flat", "percent", "free_item"],
    },
  },
} as const
