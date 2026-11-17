import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import { Product } from '@/types';
import { PRODUCTS } from '@/data/products';

// Chuyển đổi dữ liệu từ Supabase Row sang TypeScript Product interface
export function mapRowToProduct(row: any): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    categoryName: row.category_name || row.categoryName,
    village: row.village,
    price: Number(row.price),
    originalPrice: row.original_price ? Number(row.original_price) : undefined,
    rating: Number(row.rating) || 5.0,
    reviewsCount: Number(row.reviews_count) || 1,
    inStock: Boolean(row.in_stock),
    images: Array.isArray(row.images) ? row.images : (typeof row.images === 'string' ? JSON.parse(row.images) : []),
    summary: row.summary || '',
    description: row.description || '',
    material: row.material || '',
    dimensions: row.dimensions || '',
    artisanStory: row.artisan_story || row.artisanStory || '',
    preservation: row.preservation || '',
    badge: row.badge || undefined,
    isFeatured: Boolean(row.is_featured),
  };
}

// Chuyển đổi dữ liệu từ Product interface sang Supabase Row
export function mapProductToRow(p: Product): any {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    category_name: p.categoryName,
    village: p.village,
    price: p.price,
    original_price: p.originalPrice || null,
    rating: p.rating,
    reviews_count: p.reviewsCount,
    in_stock: p.inStock,
    images: p.images,
    summary: p.summary,
    description: p.description,
    material: p.material,
    dimensions: p.dimensions,
    artisan_story: p.artisanStory,
    preservation: p.preservation,
    badge: p.badge || null,
    is_featured: Boolean(p.isFeatured),
  };
}

/**
 * Lấy danh sách sản phẩm từ Supabase (nếu kết nối được)
 */
export async function fetchProductsFromDb(): Promise<Product[] | null> {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Lỗi query sản phẩm từ Supabase:', error.message);
      return null;
    }

    if (data && data.length > 0) {
      return data.map(mapRowToProduct);
    }
    return [];
  } catch (err) {
    console.error('Lỗi ngoại lệ khi fetch products từ Supabase:', err);
    return null;
  }
}

/**
 * Thêm sản phẩm mới vào Supabase
 */
export async function insertProductToDb(product: Product): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const row = mapProductToRow(product);
    const { error } = await client.from('products').insert([row]);
    if (error) {
      console.error('Lỗi insert product vào Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Lỗi ngoại lệ khi insert product:', err);
    return false;
  }
}

/**
 * Cập nhật sản phẩm trong Supabase
 */
export async function updateProductInDb(id: string, updates: Partial<Product>): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const rowUpdates: any = {};
    if (updates.name !== undefined) rowUpdates.name = updates.name;
    if (updates.category !== undefined) rowUpdates.category = updates.category;
    if (updates.categoryName !== undefined) rowUpdates.category_name = updates.categoryName;
    if (updates.village !== undefined) rowUpdates.village = updates.village;
    if (updates.price !== undefined) rowUpdates.price = updates.price;
    if (updates.originalPrice !== undefined) rowUpdates.original_price = updates.originalPrice;
    if (updates.inStock !== undefined) rowUpdates.in_stock = updates.inStock;
    if (updates.images !== undefined) rowUpdates.images = updates.images;
    if (updates.summary !== undefined) rowUpdates.summary = updates.summary;
    if (updates.description !== undefined) rowUpdates.description = updates.description;
    if (updates.material !== undefined) rowUpdates.material = updates.material;
    if (updates.dimensions !== undefined) rowUpdates.dimensions = updates.dimensions;
    if (updates.artisanStory !== undefined) rowUpdates.artisan_story = updates.artisanStory;
    if (updates.preservation !== undefined) rowUpdates.preservation = updates.preservation;
    if (updates.badge !== undefined) rowUpdates.badge = updates.badge;
    if (updates.isFeatured !== undefined) rowUpdates.is_featured = updates.isFeatured;

    const { error } = await client.from('products').update(rowUpdates).eq('id', id);
    if (error) {
      console.error('Lỗi update product trong Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Lỗi ngoại lệ khi update product:', err);
    return false;
  }
}

/**
 * Xóa sản phẩm khỏi Supabase
 */
export async function deleteProductFromDb(id: string): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from('products').delete().eq('id', id);
    if (error) {
      console.error('Lỗi delete product từ Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Lỗi ngoại lệ khi delete product:', err);
    return false;
  }
}

/**
 * Đẩy toàn bộ 14 sản phẩm chuẩn lên Supabase (Seed Data)
 */
export async function seedProductsToSupabase(): Promise<{ success: boolean; count: number; message: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, count: 0, message: 'Chưa cấu hình Supabase Client.' };
  }

  try {
    const rows = PRODUCTS.map(mapProductToRow);
    const { data, error } = await client.from('products').upsert(rows, { onConflict: 'id' });

    if (error) {
      return { success: false, count: 0, message: `Lỗi Seed: ${error.message}` };
    }

    return {
      success: true,
      count: rows.length,
      message: `Đã đồng bộ thành công ${rows.length} sản phẩm mẫu lên cơ sở dữ liệu Supabase!`,
    };
  } catch (err: any) {
    return { success: false, count: 0, message: `Lỗi: ${err.message}` };
  }
}
