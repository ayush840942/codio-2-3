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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      assets: {
        Row: {
          created_at: string
          id: string
          name: string
          size: number | null
          type: string | null
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          size?: number | null
          type?: string | null
          url: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          size?: number | null
          type?: string | null
          url?: string
          user_id?: string
        }
        Relationships: []
      }
      avatar_customization: {
        Row: {
          avatar_id: string
          badge_ids: string[] | null
          created_at: string
          frame_id: string | null
          id: string
          theme_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_id?: string
          badge_ids?: string[] | null
          created_at?: string
          frame_id?: string | null
          id?: string
          theme_id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_id?: string
          badge_ids?: string[] | null
          created_at?: string
          frame_id?: string | null
          id?: string
          theme_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      challenges: {
        Row: {
          challenged_id: string
          challenged_time: number | null
          challenger_id: string
          challenger_time: number | null
          completed_at: string | null
          created_at: string
          id: string
          level_id: number
          status: string
          winner_id: string | null
        }
        Insert: {
          challenged_id: string
          challenged_time?: number | null
          challenger_id: string
          challenger_time?: number | null
          completed_at?: string | null
          created_at?: string
          id?: string
          level_id: number
          status?: string
          winner_id?: string | null
        }
        Update: {
          challenged_id?: string
          challenged_time?: number | null
          challenger_id?: string
          challenger_time?: number | null
          completed_at?: string | null
          created_at?: string
          id?: string
          level_id?: number
          status?: string
          winner_id?: string | null
        }
        Relationships: []
      }
      chat_participants: {
        Row: {
          chat_id: string | null
          created_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          chat_id?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          chat_id?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_participants_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
        ]
      }
      chats: {
        Row: {
          created_at: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      code_templates: {
        Row: {
          created_at: string
          description: string | null
          id: string
          language: string
          name: string
          template_code: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          language: string
          name: string
          template_code: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          language?: string
          name?: string
          template_code?: string
        }
        Relationships: []
      }
      Codezen: {
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
      colors: {
        Row: {
          blue: number | null
          green: number | null
          hex: string
          hue: number | null
          id: number
          light_hsl: number | null
          name: string | null
          red: number | null
          sat_hsl: number | null
          sat_hsv: number | null
          source: Database["public"]["Enums"]["color_source"] | null
          val_hsv: number | null
        }
        Insert: {
          blue?: number | null
          green?: number | null
          hex: string
          hue?: number | null
          id?: number
          light_hsl?: number | null
          name?: string | null
          red?: number | null
          sat_hsl?: number | null
          sat_hsv?: number | null
          source?: Database["public"]["Enums"]["color_source"] | null
          val_hsv?: number | null
        }
        Update: {
          blue?: number | null
          green?: number | null
          hex?: string
          hue?: number | null
          id?: number
          light_hsl?: number | null
          name?: string | null
          red?: number | null
          sat_hsl?: number | null
          sat_hsv?: number | null
          source?: Database["public"]["Enums"]["color_source"] | null
          val_hsv?: number | null
        }
        Relationships: []
      }
      contract_analyses: {
        Row: {
          analysis_type: string
          confidence_score: number | null
          contract_id: string
          created_at: string | null
          id: string
          result: Json
        }
        Insert: {
          analysis_type: string
          confidence_score?: number | null
          contract_id: string
          created_at?: string | null
          id?: string
          result: Json
        }
        Update: {
          analysis_type?: string
          confidence_score?: number | null
          contract_id?: string
          created_at?: string | null
          id?: string
          result?: Json
        }
        Relationships: [
          {
            foreignKeyName: "contract_analyses_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          analysis_summary: Json | null
          compliance_score: number | null
          content_hash: string | null
          created_at: string | null
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          key_terms: Json | null
          recommendations: Json | null
          risk_level: string | null
          risks_detected: Json | null
          status: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          analysis_summary?: Json | null
          compliance_score?: number | null
          content_hash?: string | null
          created_at?: string | null
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          key_terms?: Json | null
          recommendations?: Json | null
          risk_level?: string | null
          risks_detected?: Json | null
          status?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          analysis_summary?: Json | null
          compliance_score?: number | null
          content_hash?: string | null
          created_at?: string | null
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          key_terms?: Json | null
          recommendations?: Json | null
          risk_level?: string | null
          risks_detected?: Json | null
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          created_at: string | null
          description: string
          duration: string
          eligibility: string | null
          id: string
          name: string
          stream_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          duration: string
          eligibility?: string | null
          id?: string
          name: string
          stream_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          duration?: string
          eligibility?: string | null
          id?: string
          name?: string
          stream_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "streams"
            referencedColumns: ["id"]
          },
        ]
      }
      entrance_exams: {
        Row: {
          created_at: string | null
          description: string
          eligibility: string
          id: string
          important_dates: Json | null
          name: string
          stream_id: string | null
          syllabus: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          eligibility: string
          id?: string
          important_dates?: Json | null
          name: string
          stream_id?: string | null
          syllabus?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          eligibility?: string
          id?: string
          important_dates?: Json | null
          name?: string
          stream_id?: string | null
          syllabus?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entrance_exams_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "streams"
            referencedColumns: ["id"]
          },
        ]
      }
      friends: {
        Row: {
          created_at: string
          friend_id: string
          id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          friend_id: string
          id?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          friend_id?: string
          id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      game_assets: {
        Row: {
          asset_type: string
          asset_url: string
          created_at: string | null
          game_job_id: string | null
          id: string
          metadata: Json | null
        }
        Insert: {
          asset_type: string
          asset_url: string
          created_at?: string | null
          game_job_id?: string | null
          id?: string
          metadata?: Json | null
        }
        Update: {
          asset_type?: string
          asset_url?: string
          created_at?: string | null
          game_job_id?: string | null
          id?: string
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "game_assets_game_job_id_fkey"
            columns: ["game_job_id"]
            isOneToOne: false
            referencedRelation: "game_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      game_jobs: {
        Row: {
          created_at: string
          error_message: string | null
          genre: string
          id: string
          metadata: Json | null
          platform: string
          progress: number
          prompt: string
          s3_zip_url: string | null
          status: string
          style: string
          updated_at: string
          user_id: string
          webgl_preview_url: string | null
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          genre: string
          id?: string
          metadata?: Json | null
          platform: string
          progress?: number
          prompt: string
          s3_zip_url?: string | null
          status?: string
          style: string
          updated_at?: string
          user_id: string
          webgl_preview_url?: string | null
        }
        Update: {
          created_at?: string
          error_message?: string | null
          genre?: string
          id?: string
          metadata?: Json | null
          platform?: string
          progress?: number
          prompt?: string
          s3_zip_url?: string | null
          status?: string
          style?: string
          updated_at?: string
          user_id?: string
          webgl_preview_url?: string | null
        }
        Relationships: []
      }
      game_participants: {
        Row: {
          game_room_id: string | null
          id: string
          is_host: boolean | null
          joined_at: string | null
          score: number | null
          user_id: string | null
        }
        Insert: {
          game_room_id?: string | null
          id?: string
          is_host?: boolean | null
          joined_at?: string | null
          score?: number | null
          user_id?: string | null
        }
        Update: {
          game_room_id?: string | null
          id?: string
          is_host?: boolean | null
          joined_at?: string | null
          score?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_participants_game_room_id_fkey"
            columns: ["game_room_id"]
            isOneToOne: false
            referencedRelation: "game_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      game_rooms: {
        Row: {
          created_at: string | null
          created_by: string | null
          current_turn_user_id: string | null
          difficulty: string
          ended_at: string | null
          id: string
          name: string
          started_at: string | null
          turn_start_time: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          current_turn_user_id?: string | null
          difficulty?: string
          ended_at?: string | null
          id?: string
          name: string
          started_at?: string | null
          turn_start_time?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          current_turn_user_id?: string | null
          difficulty?: string
          ended_at?: string | null
          id?: string
          name?: string
          started_at?: string | null
          turn_start_time?: string | null
        }
        Relationships: []
      }
      game_words: {
        Row: {
          created_at: string | null
          game_room_id: string | null
          id: string
          score: number
          user_id: string | null
          word: string
        }
        Insert: {
          created_at?: string | null
          game_room_id?: string | null
          id?: string
          score?: number
          user_id?: string | null
          word: string
        }
        Update: {
          created_at?: string | null
          game_room_id?: string | null
          id?: string
          score?: number
          user_id?: string | null
          word?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_words_game_room_id_fkey"
            columns: ["game_room_id"]
            isOneToOne: false
            referencedRelation: "game_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      generated_apps: {
        Row: {
          app_code: string | null
          created_at: string
          description: string | null
          download_url: string | null
          error_message: string | null
          id: string
          name: string | null
          prompt: string
          status: string
          template: string
        }
        Insert: {
          app_code?: string | null
          created_at?: string
          description?: string | null
          download_url?: string | null
          error_message?: string | null
          id?: string
          name?: string | null
          prompt: string
          status?: string
          template: string
        }
        Update: {
          app_code?: string | null
          created_at?: string
          description?: string | null
          download_url?: string | null
          error_message?: string | null
          id?: string
          name?: string | null
          prompt?: string
          status?: string
          template?: string
        }
        Relationships: []
      }
      generated_content: {
        Row: {
          created_at: string
          id: string
          prompt: string
          type: string
          updated_at: string
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          prompt: string
          type: string
          updated_at?: string
          url: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          prompt?: string
          type?: string
          updated_at?: string
          url?: string
          user_id?: string
        }
        Relationships: []
      }
      generated_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          prompt: string
          size: string
          style: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          prompt: string
          size?: string
          style?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          prompt?: string
          size?: string
          style?: string
          user_id?: string
        }
        Relationships: []
      }
      generations: {
        Row: {
          code: string | null
          created_at: string
          id: string
          language: string
          prompt: string
          status: string
          user_id: string
        }
        Insert: {
          code?: string | null
          created_at?: string
          id?: string
          language: string
          prompt: string
          status?: string
          user_id: string
        }
        Update: {
          code?: string | null
          created_at?: string
          id?: string
          language?: string
          prompt?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      institutes: {
        Row: {
          created_at: string | null
          description: string
          id: string
          location: string | null
          name: string
          ranking: number | null
          stream_id: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          location?: string | null
          name: string
          ranking?: number | null
          stream_id?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          location?: string | null
          name?: string
          ranking?: number | null
          stream_id?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "institutes_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "streams"
            referencedColumns: ["id"]
          },
        ]
      }
      invitations: {
        Row: {
          created_at: string
          game_room_id: string
          id: string
          recipient_email: string | null
          recipient_id: string | null
          sender_id: string
          status: string
        }
        Insert: {
          created_at?: string
          game_room_id: string
          id?: string
          recipient_email?: string | null
          recipient_id?: string | null
          sender_id: string
          status?: string
        }
        Update: {
          created_at?: string
          game_room_id?: string
          id?: string
          recipient_email?: string | null
          recipient_id?: string | null
          sender_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitations_game_room_id_fkey"
            columns: ["game_room_id"]
            isOneToOne: false
            referencedRelation: "game_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          career_path: string | null
          created_at: string | null
          description: string
          id: string
          location: string | null
          max_salary: number | null
          min_salary: number | null
          qualifications: string
          recruiters: string[] | null
          sector: string
          skills: string[]
          stream_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          career_path?: string | null
          created_at?: string | null
          description: string
          id?: string
          location?: string | null
          max_salary?: number | null
          min_salary?: number | null
          qualifications: string
          recruiters?: string[] | null
          sector: string
          skills: string[]
          stream_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          career_path?: string | null
          created_at?: string | null
          description?: string
          id?: string
          location?: string | null
          max_salary?: number | null
          min_salary?: number | null
          qualifications?: string
          recruiters?: string[] | null
          sector?: string
          skills?: string[]
          stream_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "streams"
            referencedColumns: ["id"]
          },
        ]
      }
      leaderboard: {
        Row: {
          avg_word_length: number
          games_played: number
          id: string
          last_played_at: string | null
          longest_word: string | null
          longest_word_length: number
          total_score: number
          user_id: string
          words_submitted: number
        }
        Insert: {
          avg_word_length?: number
          games_played?: number
          id?: string
          last_played_at?: string | null
          longest_word?: string | null
          longest_word_length?: number
          total_score?: number
          user_id: string
          words_submitted?: number
        }
        Update: {
          avg_word_length?: number
          games_played?: number
          id?: string
          last_played_at?: string | null
          longest_word?: string | null
          longest_word_length?: number
          total_score?: number
          user_id?: string
          words_submitted?: number
        }
        Relationships: []
      }
      messages: {
        Row: {
          chat_id: string | null
          content: string
          created_at: string | null
          id: string
          is_read: boolean | null
          sender_id: string | null
        }
        Insert: {
          chat_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          sender_id?: string | null
        }
        Update: {
          chat_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
        ]
      }
      monthly_chat_usage: {
        Row: {
          chat_count: number
          created_at: string
          id: string
          month: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          chat_count?: number
          created_at?: string
          id?: string
          month: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          chat_count?: number
          created_at?: string
          id?: string
          month?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      news_feed: {
        Row: {
          content: string
          created_at: string | null
          id: number
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: number
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: number
          user_id?: string
        }
        Relationships: []
      }
      notification_logs: {
        Row: {
          body: string
          created_at: string
          id: string
          success: boolean | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          success?: boolean | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          success?: boolean | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          amount: number
          completed_at: string | null
          created_at: string
          currency: string
          id: string
          metadata: Json | null
          payment_id: string | null
          plan_id: string
          status: string
          user_id: string
        }
        Insert: {
          amount: number
          completed_at?: string | null
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json | null
          payment_id?: string | null
          plan_id: string
          status?: string
          user_id: string
        }
        Update: {
          amount?: number
          completed_at?: string | null
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json | null
          payment_id?: string | null
          plan_id?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          metadata: Json | null
          payment_id: string | null
          payment_provider: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json | null
          payment_id?: string | null
          payment_provider: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json | null
          payment_id?: string | null
          payment_provider?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      processed_videos: {
        Row: {
          created_at: string
          description: string | null
          editing_style: string
          id: string
          original_video_url: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          editing_style?: string
          id?: string
          original_video_url: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          editing_style?: string
          id?: string
          original_video_url?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bonus_credits: number | null
          business_name: string | null
          company: string | null
          created_at: string
          full_name: string | null
          generations_used: number | null
          github_url: string | null
          id: string
          linkedin_url: string | null
          plan: string | null
          referral_code: string | null
          referrals_count: number | null
          referred_by: string | null
          role: string | null
          subscription_expires_at: string | null
          subscription_id: string | null
          subscription_status: string | null
          subscription_tier: string | null
          trial_start_date: string | null
          twitter_url: string | null
          updated_at: string
          user_id: string | null
          user_name: string | null
          username: string | null
          bio: string | null
        }
        Insert: {
          avatar_url?: string | null
          bonus_credits?: number | null
          business_name?: string | null
          company?: string | null
          created_at?: string
          full_name?: string | null
          generations_used?: number | null
          github_url?: string | null
          id: string
          linkedin_url?: string | null
          plan?: string | null
          referral_code?: string | null
          referrals_count?: number | null
          referred_by?: string | null
          role?: string | null
          subscription_expires_at?: string | null
          subscription_id?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          trial_start_date?: string | null
          twitter_url?: string | null
          updated_at?: string
          user_id?: string | null
          user_name?: string | null
          username?: string | null
          bio?: string | null
        }
        Update: {
          avatar_url?: string | null
          bonus_credits?: number | null
          business_name?: string | null
          company?: string | null
          created_at?: string
          full_name?: string | null
          generations_used?: number | null
          github_url?: string | null
          id?: string
          linkedin_url?: string | null
          plan?: string | null
          referral_code?: string | null
          referrals_count?: number | null
          referred_by?: string | null
          role?: string | null
          subscription_expires_at?: string | null
          subscription_id?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          trial_start_date?: string | null
          twitter_url?: string | null
          updated_at?: string
          user_id?: string | null
          user_name?: string | null
          username?: string | null
          bio?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          code: string | null
          created_at: string
          description: string | null
          framework: string | null
          id: string
          name: string
          published: boolean | null
          template: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          code?: string | null
          created_at?: string
          description?: string | null
          framework?: string | null
          id?: string
          name: string
          published?: boolean | null
          template?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          code?: string | null
          created_at?: string
          description?: string | null
          framework?: string | null
          id?: string
          name?: string
          published?: boolean | null
          template?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      push_tokens: {
        Row: {
          created_at: string
          id: string
          platform: string
          token: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          platform?: string
          token: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          platform?: string
          token?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      puzzle_hints: {
        Row: {
          content: string
          cost: number
          created_at: string
          hint_type: string
          id: string
          level_id: number
          order_index: number
          updated_at: string
        }
        Insert: {
          content: string
          cost?: number
          created_at?: string
          hint_type: string
          id?: string
          level_id: number
          order_index?: number
          updated_at?: string
        }
        Update: {
          content?: string
          cost?: number
          created_at?: string
          hint_type?: string
          id?: string
          level_id?: number
          order_index?: number
          updated_at?: string
        }
        Relationships: []
      }
      puzzle_levels: {
        Row: {
          available_blocks: Json | null
          coins_reward: number | null
          concepts: Json | null
          created_at: string | null
          description: string
          difficulty: string
          expected_output: string | null
          hints: Json | null
          id: number
          learning_objectives: Json | null
          practice_hints: Json | null
          puzzle_type: string
          solution_blocks: Json | null
          theory: string | null
          title: string
          topic: string
          updated_at: string | null
          xp_reward: number
        }
        Insert: {
          available_blocks?: Json | null
          coins_reward?: number | null
          concepts?: Json | null
          created_at?: string | null
          description: string
          difficulty: string
          expected_output?: string | null
          hints?: Json | null
          id: number
          learning_objectives?: Json | null
          practice_hints?: Json | null
          puzzle_type: string
          solution_blocks?: Json | null
          theory?: string | null
          title: string
          topic: string
          updated_at?: string | null
          xp_reward?: number
        }
        Update: {
          available_blocks?: Json | null
          coins_reward?: number | null
          concepts?: Json | null
          created_at?: string | null
          description?: string
          difficulty?: string
          expected_output?: string | null
          hints?: Json | null
          id?: number
          learning_objectives?: Json | null
          practice_hints?: Json | null
          puzzle_type?: string
          solution_blocks?: Json | null
          theory?: string | null
          title?: string
          topic?: string
          updated_at?: string | null
          xp_reward?: number
        }
        Relationships: []
      }
      quest_progress: {
        Row: {
          claimed: boolean
          completed: boolean
          created_at: string
          id: string
          progress: number
          quest_id: string
          quest_type: string
          reset_date: string
          total: number
          updated_at: string
          user_id: string
        }
        Insert: {
          claimed?: boolean
          completed?: boolean
          created_at?: string
          id?: string
          progress?: number
          quest_id: string
          quest_type: string
          reset_date?: string
          total: number
          updated_at?: string
          user_id: string
        }
        Update: {
          claimed?: boolean
          completed?: boolean
          created_at?: string
          id?: string
          progress?: number
          quest_id?: string
          quest_type?: string
          reset_date?: string
          total?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      question_papers: {
        Row: {
          class_level: string
          created_at: string
          difficulty: string
          id: string
          questions: Json | null
          subject: string
          time_duration: number
          title: string
          total_marks: number
          updated_at: string
          user_id: string
        }
        Insert: {
          class_level: string
          created_at?: string
          difficulty: string
          id?: string
          questions?: Json | null
          subject: string
          time_duration?: number
          title: string
          total_marks?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          class_level?: string
          created_at?: string
          difficulty?: string
          id?: string
          questions?: Json | null
          subject?: string
          time_duration?: number
          title?: string
          total_marks?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          bonus_coins: number | null
          bonus_xp: number | null
          completed_at: string | null
          created_at: string | null
          id: string
          referral_code: string
          referred_user_id: string | null
          referrer_user_id: string | null
          rewards_claimed: boolean | null
          status: string | null
        }
        Insert: {
          bonus_coins?: number | null
          bonus_xp?: number | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          referral_code: string
          referred_user_id?: string | null
          referrer_user_id?: string | null
          rewards_claimed?: boolean | null
          status?: string | null
        }
        Update: {
          bonus_coins?: number | null
          bonus_xp?: number | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          referral_code?: string
          referred_user_id?: string | null
          referrer_user_id?: string | null
          rewards_claimed?: boolean | null
          status?: string | null
        }
        Relationships: []
      }
      saree_products: {
        Row: {
          category: Database["public"]["Enums"]["product_category"]
          created_at: string | null
          description: string | null
          id: string
          images: string[] | null
          price: number
          shop_id: string
          status: Database["public"]["Enums"]["product_status"] | null
          title: string
        }
        Insert: {
          category: Database["public"]["Enums"]["product_category"]
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          price: number
          shop_id: string
          status?: Database["public"]["Enums"]["product_status"] | null
          title: string
        }
        Update: {
          category?: Database["public"]["Enums"]["product_category"]
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          price?: number
          shop_id?: string
          status?: Database["public"]["Enums"]["product_status"] | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "saree_products_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "saree_shops"
            referencedColumns: ["id"]
          },
        ]
      }
      saree_shops: {
        Row: {
          address: string
          created_at: string | null
          id: string
          name: string
          owner_user_id: string | null
          status: Database["public"]["Enums"]["shop_status"] | null
        }
        Insert: {
          address: string
          created_at?: string | null
          id?: string
          name: string
          owner_user_id?: string | null
          status?: Database["public"]["Enums"]["shop_status"] | null
        }
        Update: {
          address?: string
          created_at?: string | null
          id?: string
          name?: string
          owner_user_id?: string | null
          status?: Database["public"]["Enums"]["shop_status"] | null
        }
        Relationships: []
      }
      scans: {
        Row: {
          analysis_result: Json | null
          created_at: string
          id: string
          image_url: string | null
          is_premium: boolean | null
          scan_type: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          analysis_result?: Json | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_premium?: boolean | null
          scan_type?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          analysis_result?: Json | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_premium?: boolean | null
          scan_type?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      script_generations: {
        Row: {
          created_at: string
          id: string
          prompt: string
          script_content: string
          script_type: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          prompt: string
          script_content: string
          script_type?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          prompt?: string
          script_content?: string
          script_type?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      songs: {
        Row: {
          artist: string | null
          created_at: string
          id: string
          lyrics: string
          name: string
          starting_letter: string
        }
        Insert: {
          artist?: string | null
          created_at?: string
          id?: string
          lyrics: string
          name: string
          starting_letter: string
        }
        Update: {
          artist?: string | null
          created_at?: string
          id?: string
          lyrics?: string
          name?: string
          starting_letter?: string
        }
        Relationships: []
      }
      streams: {
        Row: {
          created_at: string | null
          description: string
          id: string
          key_abilities: string[]
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          key_abilities: string[]
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          key_abilities?: string[]
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      study_sessions: {
        Row: {
          completed: boolean
          duration: number
          id: string
          notes: string | null
          started_at: string
          subject: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          duration: number
          id?: string
          notes?: string | null
          started_at?: string
          subject: string
          user_id: string
        }
        Update: {
          completed?: boolean
          duration?: number
          id?: string
          notes?: string | null
          started_at?: string
          subject?: string
          user_id?: string
        }
        Relationships: []
      }
      subscription_orders: {
        Row: {
          amount: number
          created_at: string
          currency: string
          email: string
          id: string
          plan_type: string
          razorpay_order_id: string
          razorpay_payment_id: string | null
          razorpay_signature: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          email: string
          id?: string
          plan_type: string
          razorpay_order_id: string
          razorpay_payment_id?: string | null
          razorpay_signature?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          email?: string
          id?: string
          plan_type?: string
          razorpay_order_id?: string
          razorpay_payment_id?: string | null
          razorpay_signature?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          created_at: string
          description: string
          features: Json
          id: string
          name: string
          period: string
          popular: boolean | null
          price: number
          razorpay_plan_id: string | null
          stripe_price_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          features: Json
          id: string
          name: string
          period: string
          popular?: boolean | null
          price: number
          razorpay_plan_id?: string | null
          stripe_price_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          features?: Json
          id?: string
          name?: string
          period?: string
          popular?: boolean | null
          price?: number
          razorpay_plan_id?: string | null
          stripe_price_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_name: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_name: string
          status: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_name?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          id: string
          invited_at: string | null
          joined_at: string | null
          member_id: string
          role: string | null
          status: string | null
          team_lead_id: string
        }
        Insert: {
          id?: string
          invited_at?: string | null
          joined_at?: string | null
          member_id: string
          role?: string | null
          status?: string | null
          team_lead_id: string
        }
        Update: {
          id?: string
          invited_at?: string | null
          joined_at?: string | null
          member_id?: string
          role?: string | null
          status?: string | null
          team_lead_id?: string
        }
        Relationships: []
      }
      trial_cart_items: {
        Row: {
          added_at: string
          cart_id: string
          id: string
          product_id: string
        }
        Insert: {
          added_at?: string
          cart_id: string
          id?: string
          product_id: string
        }
        Update: {
          added_at?: string
          cart_id?: string
          id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trial_cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "trial_carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trial_cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "saree_products"
            referencedColumns: ["id"]
          },
        ]
      }
      trial_carts: {
        Row: {
          created_at: string
          id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      trial_requests: {
        Row: {
          address: string
          created_at: string
          id: string
          name: string
          phone: string
          preferred_date: string | null
          product_ids: string[]
          status: string
        }
        Insert: {
          address: string
          created_at?: string
          id?: string
          name: string
          phone: string
          preferred_date?: string | null
          product_ids: string[]
          status?: string
        }
        Update: {
          address?: string
          created_at?: string
          id?: string
          name?: string
          phone?: string
          preferred_date?: string | null
          product_ids?: string[]
          status?: string
        }
        Relationships: []
      }
      user_bookmarks: {
        Row: {
          created_at: string | null
          id: string
          job_id: string | null
          stream_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          job_id?: string | null
          stream_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          job_id?: string | null
          stream_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_bookmarks_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_bookmarks_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "streams"
            referencedColumns: ["id"]
          },
        ]
      }
      user_credits: {
        Row: {
          created_at: string
          credits: number
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          credits?: number
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          credits?: number
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_levels: {
        Row: {
          attempts: number
          created_at: string
          hints_used: number
          id: string
          is_completed: boolean
          is_unlocked: boolean
          level_id: number
          updated_at: string
          user_id: string
        }
        Insert: {
          attempts?: number
          created_at?: string
          hints_used?: number
          id?: string
          is_completed?: boolean
          is_unlocked?: boolean
          level_id: number
          updated_at?: string
          user_id: string
        }
        Update: {
          attempts?: number
          created_at?: string
          hints_used?: number
          id?: string
          is_completed?: boolean
          is_unlocked?: boolean
          level_id?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_notes: {
        Row: {
          category: string | null
          content: string | null
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          content?: string | null
          created_at?: string
          id?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          content?: string | null
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          attempts: number
          completed: boolean
          created_at: string
          id: string
          last_attempted_at: string | null
          level_id: number
          solution: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          attempts?: number
          completed?: boolean
          created_at?: string
          id?: string
          last_attempted_at?: string | null
          level_id: number
          solution?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          attempts?: number
          completed?: boolean
          created_at?: string
          id?: string
          last_attempted_at?: string | null
          level_id?: number
          solution?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_projects: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: string
          is_favorite: boolean | null
          language: string
          prompt: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: string
          is_favorite?: boolean | null
          language: string
          prompt: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          is_favorite?: boolean | null
          language?: string
          prompt?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_purchases: {
        Row: {
          amount: number
          created_at: string
          hint_amount: number
          id: string
          order_id: string | null
          payment_id: string | null
          plan_id: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          hint_amount: number
          id?: string
          order_id?: string | null
          payment_id?: string | null
          plan_id: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          hint_amount?: number
          id?: string
          order_id?: string | null
          payment_id?: string | null
          plan_id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_referrals: {
        Row: {
          completed_referrals: number | null
          created_at: string | null
          id: string
          referral_code: string
          total_coins_earned: number | null
          total_referrals: number | null
          total_xp_earned: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          completed_referrals?: number | null
          created_at?: string | null
          id?: string
          referral_code: string
          total_coins_earned?: number | null
          total_referrals?: number | null
          total_xp_earned?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          completed_referrals?: number | null
          created_at?: string | null
          id?: string
          referral_code?: string
          total_coins_earned?: number | null
          total_referrals?: number | null
          total_xp_earned?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_rewards: {
        Row: {
          created_at: string
          hint_points: number
          id: string
          last_claim_date: string | null
          login_streak: number
          trial_start_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          hint_points?: number
          id?: string
          last_claim_date?: string | null
          login_streak?: number
          trial_start_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          hint_points?: number
          id?: string
          last_claim_date?: string | null
          login_streak?: number
          trial_start_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          created_at: string
          current_streak: number
          hints_used: number
          id: string
          last_active: string
          levels_completed: number
          longest_streak: number
          perfect_solutions: number
          total_time_spent: number
          total_xp: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_streak?: number
          hints_used?: number
          id?: string
          last_active?: string
          levels_completed?: number
          longest_streak?: number
          perfect_solutions?: number
          total_time_spent?: number
          total_xp?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_streak?: number
          hints_used?: number
          id?: string
          last_active?: string
          levels_completed?: number
          longest_streak?: number
          perfect_solutions?: number
          total_time_spent?: number
          total_xp?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          amount: number
          created_at: string
          end_date: string | null
          id: string
          order_id: string | null
          payment_id: string | null
          plan_id: string
          start_date: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          end_date?: string | null
          id?: string
          order_id?: string | null
          payment_id?: string | null
          plan_id: string
          start_date?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          end_date?: string | null
          id?: string
          order_id?: string | null
          payment_id?: string | null
          plan_id?: string
          start_date?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      users_metadata: {
        Row: {
          plan: string
          plan_updated_at: string | null
          user_id: string
        }
        Insert: {
          plan?: string
          plan_updated_at?: string | null
          user_id: string
        }
        Update: {
          plan?: string
          plan_updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      video_clips: {
        Row: {
          created_at: string
          description: string | null
          effects: string[] | null
          end_time: number
          id: string
          processed_video_id: string
          start_time: number
          thumbnail: string | null
          title: string
          url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          effects?: string[] | null
          end_time: number
          id?: string
          processed_video_id: string
          start_time: number
          thumbnail?: string | null
          title: string
          url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          effects?: string[] | null
          end_time?: number
          id?: string
          processed_video_id?: string
          start_time?: number
          thumbnail?: string | null
          title?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_clips_processed_video_id_fkey"
            columns: ["processed_video_id"]
            isOneToOne: false
            referencedRelation: "processed_videos"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      public_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      deduct_credits: {
        Args: { amount: number; user_uuid: string }
        Returns: undefined
      }
      get_user_progress_summary: {
        Args: never
        Returns: {
          completed_levels: number
          current_streak: number
          last_completion: string
          total_levels: number
          total_xp: number
        }[]
      }
      get_user_roles: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"][]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_generations_used: {
        Args: { user_id_param: string }
        Returns: undefined
      }
      is_own_profile: { Args: { profile_id: string }; Returns: boolean }
      make_user_admin: { Args: { user_email: string }; Returns: string }
      update_user_progress: {
        Args: {
          p_completed?: boolean
          p_level_id: number
          p_score?: number
          p_solution?: Json
          p_time_spent?: number
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      color_source:
      | "99COLORS_NET"
      | "ART_PAINTS_YG07S"
      | "BYRNE"
      | "CRAYOLA"
      | "CMYK_COLOR_MODEL"
      | "COLORCODE_IS"
      | "COLORHEXA"
      | "COLORXS"
      | "CORNELL_UNIVERSITY"
      | "COLUMBIA_UNIVERSITY"
      | "DUKE_UNIVERSITY"
      | "ENCYCOLORPEDIA_COM"
      | "ETON_COLLEGE"
      | "FANTETTI_AND_PETRACCHI"
      | "FINDTHEDATA_COM"
      | "FERRARIO_1919"
      | "FEDERAL_STANDARD_595"
      | "FLAG_OF_INDIA"
      | "FLAG_OF_SOUTH_AFRICA"
      | "GLAZEBROOK_AND_BALDRY"
      | "GOOGLE"
      | "HEXCOLOR_CO"
      | "ISCC_NBS"
      | "KELLY_MOORE"
      | "MATTEL"
      | "MAERZ_AND_PAUL"
      | "MILK_PAINT"
      | "MUNSELL_COLOR_WHEEL"
      | "NATURAL_COLOR_SYSTEM"
      | "PANTONE"
      | "PLOCHERE"
      | "POURPRE_COM"
      | "RAL"
      | "RESENE"
      | "RGB_COLOR_MODEL"
      | "THOM_POOLE"
      | "UNIVERSITY_OF_ALABAMA"
      | "UNIVERSITY_OF_CALIFORNIA_DAVIS"
      | "UNIVERSITY_OF_CAMBRIDGE"
      | "UNIVERSITY_OF_NORTH_CAROLINA"
      | "UNIVERSITY_OF_TEXAS_AT_AUSTIN"
      | "X11_WEB"
      | "XONA_COM"
      product_category: "saree" | "suit" | "girls_dress"
      product_status: "active" | "archived"
      shop_status: "pending" | "approved" | "suspended"
      trial_status:
      | "requested"
      | "scheduled"
      | "assigned"
      | "picked_up"
      | "arrived"
      | "trying"
      | "purchased"
      | "no_purchase_fee_due"
      | "fee_paid"
      | "returned"
      | "completed"
      | "canceled"
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
      app_role: ["admin", "moderator", "user"],
      color_source: [
        "99COLORS_NET",
        "ART_PAINTS_YG07S",
        "BYRNE",
        "CRAYOLA",
        "CMYK_COLOR_MODEL",
        "COLORCODE_IS",
        "COLORHEXA",
        "COLORXS",
        "CORNELL_UNIVERSITY",
        "COLUMBIA_UNIVERSITY",
        "DUKE_UNIVERSITY",
        "ENCYCOLORPEDIA_COM",
        "ETON_COLLEGE",
        "FANTETTI_AND_PETRACCHI",
        "FINDTHEDATA_COM",
        "FERRARIO_1919",
        "FEDERAL_STANDARD_595",
        "FLAG_OF_INDIA",
        "FLAG_OF_SOUTH_AFRICA",
        "GLAZEBROOK_AND_BALDRY",
        "GOOGLE",
        "HEXCOLOR_CO",
        "ISCC_NBS",
        "KELLY_MOORE",
        "MATTEL",
        "MAERZ_AND_PAUL",
        "MILK_PAINT",
        "MUNSELL_COLOR_WHEEL",
        "NATURAL_COLOR_SYSTEM",
        "PANTONE",
        "PLOCHERE",
        "POURPRE_COM",
        "RAL",
        "RESENE",
        "RGB_COLOR_MODEL",
        "THOM_POOLE",
        "UNIVERSITY_OF_ALABAMA",
        "UNIVERSITY_OF_CALIFORNIA_DAVIS",
        "UNIVERSITY_OF_CAMBRIDGE",
        "UNIVERSITY_OF_NORTH_CAROLINA",
        "UNIVERSITY_OF_TEXAS_AT_AUSTIN",
        "X11_WEB",
        "XONA_COM",
      ],
      product_category: ["saree", "suit", "girls_dress"],
      product_status: ["active", "archived"],
      shop_status: ["pending", "approved", "suspended"],
      trial_status: [
        "requested",
        "scheduled",
        "assigned",
        "picked_up",
        "arrived",
        "trying",
        "purchased",
        "no_purchase_fee_due",
        "fee_paid",
        "returned",
        "completed",
        "canceled",
      ],
    },
  },
} as const
