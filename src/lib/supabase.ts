import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export const SUPABASE_CONFIG_STORAGE_KEY = 'nepviet_supabase_config_v1';

/**
 * Lấy cấu hình Supabase từ biến môi trường (ưu tiên) hoặc từ LocalStorage đã lưu qua giao diện Admin.
 */
export function getSupabaseConfig(): SupabaseConfig | null {
  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (envUrl && envKey && !envUrl.includes('your-project-id')) {
    return { url: envUrl.trim(), anonKey: envKey.trim() };
  }

  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(SUPABASE_CONFIG_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.url && parsed?.anonKey) {
          return { url: parsed.url.trim(), anonKey: parsed.anonKey.trim() };
        }
      }
    } catch (e) {
      console.warn('Lỗi đọc cấu hình Supabase từ localStorage:', e);
    }
  }

  return null;
}

export function saveSupabaseConfig(url: string, anonKey: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(
      SUPABASE_CONFIG_STORAGE_KEY,
      JSON.stringify({ url: url.trim(), anonKey: anonKey.trim() })
    );
    window.dispatchEvent(new Event('nepviet_supabase_config_changed'));
  }
}

export function clearSupabaseConfig(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SUPABASE_CONFIG_STORAGE_KEY);
    window.dispatchEvent(new Event('nepviet_supabase_config_changed'));
  }
}

let cachedClient: SupabaseClient | null = null;
let lastUsedUrl = '';

/**
 * Trả về Supabase client nếu đã được cấu hình hợp lệ.
 */
export function getSupabaseClient(): SupabaseClient | null {
  const config = getSupabaseConfig();
  if (!config) return null;

  if (cachedClient && lastUsedUrl === config.url) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(config.url, config.anonKey);
    lastUsedUrl = config.url;
    return cachedClient;
  } catch (err) {
    console.error('Không thể khởi tạo Supabase Client:', err);
    return null;
  }
}

/**
 * Kiểm tra xem Supabase đã được cấu hình hay chưa.
 */
export function isSupabaseConfigured(): boolean {
  return getSupabaseConfig() !== null;
}

/**
 * Test kết nối thử tới Supabase (SELECT thử 1 dòng bảng products).
 */
export async function testSupabaseConnection(): Promise<{ success: boolean; message: string; count?: number }> {
  const client = getSupabaseClient();
  if (!client) {
    return {
      success: false,
      message: 'Chưa cấu hình Supabase URL và Anon Key. Vui lòng nhập thông tin trong Cài Đặt hoặc file .env.local.',
    };
  }

  try {
    const { data, error, count } = await client
      .from('products')
      .select('id', { count: 'exact', head: true });

    if (error) {
      // Bảng chưa tạo
      if (error.code === '42P01') {
        return {
          success: false,
          message: 'Đã kết nối được tới Supabase nhưng bảng "products" chưa tồn tại! Hãy copy file supabase_schema.sql chạy trong mục SQL Editor.',
        };
      }
      return {
        success: false,
        message: `Lỗi kết nối Supabase: ${error.message} (Mã lỗi: ${error.code})`,
      };
    }

    return {
      success: true,
      message: `Kết nối thành công! Đã tìm thấy cơ sở dữ liệu Supabase (${count ?? 0} sản phẩm).`,
      count: count ?? 0,
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Không thể kết nối tới Supabase: ${err.message || 'Lỗi mạng hoặc sai URL'}`,
    };
  }
}
