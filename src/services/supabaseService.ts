import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import { Product } from '@/types';
import { PRODUCTS } from '@/data/products';

// ========================================================
// 1. DATA TYPES CHO SUPABASE
// ========================================================
export interface DbAccount {
  id: string;
  email: string;
  password?: string;
  full_name: string;
  phone?: string;
  role: 'admin' | 'artisan' | 'staff' | 'customer';
  avatar?: string;
  address?: string;
  city?: string;
  loyalty_points?: number;
  created_at?: string;
}

export interface DbCraftVillage {
  id: string;
  name: string;
  location: string;
  history: string;
  highlight: string;
  image: string;
  created_at?: string;
}

export interface DbOrder {
  id: string;
  customer_name: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
  items: any[];
  total: number;
  payment_method: 'VIETQR' | 'COD' | string;
  status: 'pending' | 'shipping' | 'completed' | 'cancelled' | string;
  transaction_code?: string;
  created_at?: string;
}

export interface DbReview {
  id: string;
  product_id: string;
  user_name: string;
  rating: number;
  comment: string;
  images?: string[];
  created_at?: string;
}

// ========================================================
// 2. PRODUCT MAPPERS & CRUD
// ========================================================
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
    approvalStatus: row.approval_status || row.approvalStatus || (row.badge?.includes('Chờ') ? 'pending' : 'approved'),
    rejectionReason: row.rejection_reason || row.rejectionReason,
    artisanName: row.artisan_name || row.artisanName,
    submittedAt: row.submitted_at || row.submittedAt,
  };
}

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
    approval_status: p.approvalStatus || (p.badge?.includes('Chờ') ? 'pending' : 'approved'),
    rejection_reason: p.rejectionReason || null,
    artisan_name: p.artisanName || null,
    submitted_at: p.submittedAt || null,
  };
}

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

export async function seedProductsToSupabase(): Promise<{ success: boolean; count: number; message: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, count: 0, message: 'Chưa cấu hình Supabase Client.' };
  }

  try {
    const rows = PRODUCTS.map(mapProductToRow);
    const { error } = await client.from('products').upsert(rows, { onConflict: 'id' });

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

// ========================================================
// 3. ACCOUNTS (TÀI KHOẢN & PHÂN QUYỀN)
// ========================================================
export async function fetchAccountsFromDb(): Promise<DbAccount[]> {
  const client = getSupabaseClient();
  if (!client) return [];

  try {
    const { data, error } = await client
      .from('accounts')
      .select('id, email, full_name, phone, role, avatar, address, city, loyalty_points, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Lỗi fetch accounts:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error('Lỗi query accounts:', err);
    return [];
  }
}

export async function authenticateAccountInDb(email: string, pass: string): Promise<DbAccount | null> {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('accounts')
      .select('*')
      .eq('email', email.trim().toLowerCase())
      .single();

    if (error || !data) return null;
    if (data.password === pass.trim()) {
      return data as DbAccount;
    }
    return null;
  } catch {
    return null;
  }
}

export async function createAccountInDb(account: DbAccount): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from('accounts').upsert([account], { onConflict: 'id' });
    return !error;
  } catch {
    return false;
  }
}

// ========================================================
// 4. CRAFT VILLAGES (LÀNG NGHỀ)
// ========================================================
export async function fetchCraftVillagesFromDb(): Promise<DbCraftVillage[]> {
  const client = getSupabaseClient();
  if (!client) return [];

  try {
    const { data, error } = await client
      .from('craft_villages')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.warn('Lỗi fetch craft_villages:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error('Lỗi query craft_villages:', err);
    return [];
  }
}

// ========================================================
// 5. ORDERS (ĐƠN HÀNG)
// ========================================================
export async function fetchOrdersFromDb(): Promise<DbOrder[]> {
  const client = getSupabaseClient();
  if (!client) return [];

  try {
    const { data, error } = await client
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Lỗi fetch orders:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error('Lỗi query orders:', err);
    return [];
  }
}

export async function insertOrderToDb(order: DbOrder): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from('orders').insert([order]);
    if (error) {
      console.error('Lỗi insert order:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Lỗi ngoại lệ insert order:', err);
    return false;
  }
}

// ========================================================
// 6. THỐNG KÊ DATABASE TỔNG THỂ
// ========================================================
export async function getSupabaseTableStats(): Promise<{
  connected: boolean;
  accountsCount: number;
  productsCount: number;
  villagesCount: number;
  ordersCount: number;
  reviewsCount: number;
}> {
  const client = getSupabaseClient();
  if (!client) {
    return {
      connected: false,
      accountsCount: 0,
      productsCount: 0,
      villagesCount: 0,
      ordersCount: 0,
      reviewsCount: 0,
    };
  }

  try {
    const [acc, prod, vil, ord, rev] = await Promise.all([
      client.from('accounts').select('id', { count: 'exact', head: true }),
      client.from('products').select('id', { count: 'exact', head: true }),
      client.from('craft_villages').select('id', { count: 'exact', head: true }),
      client.from('orders').select('id', { count: 'exact', head: true }),
      client.from('reviews').select('id', { count: 'exact', head: true }),
    ]);

    return {
      connected: true,
      accountsCount: acc.count || 0,
      productsCount: prod.count || 0,
      villagesCount: vil.count || 0,
      ordersCount: ord.count || 0,
      reviewsCount: rev.count || 0,
    };
  } catch {
    return {
      connected: false,
      accountsCount: 0,
      productsCount: 0,
      villagesCount: 0,
      ordersCount: 0,
      reviewsCount: 0,
    };
  }
}

// ========================================================
// 7. SEED DATA TOÀN DIỆN CHO TẤT CẢ CÁC BẢNG (1 CLICK TỪ ADMIN)
// ========================================================
export const SEED_ACCOUNTS: DbAccount[] = [
  {
    id: 'acc-01',
    email: 'admin@nepviet.vn',
    password: 'Admin@123',
    full_name: 'Admin Master (Giám Đốc Quản Trị)',
    phone: '0981234567',
    role: 'admin',
    avatar: '/products/bo-am-chen-men-lam-bat-trang.jpg',
    address: '122 Hoàng Quốc Việt, Cầu Giấy',
    city: 'Hà Nội',
    loyalty_points: 999,
  },
  {
    id: 'acc-02',
    email: 'nghenhan@nepviet.vn',
    password: 'Nghenhan@123',
    full_name: 'Nghệ Nhân Làng Nghề Bát Tràng & Phú Vinh',
    phone: '0912345678',
    role: 'artisan',
    avatar: '/showcase/nghe-nhan-lang-nghe-viet.jpg',
    address: 'Xưởng gốm Giang Cao, Bát Tràng',
    city: 'Hà Nội',
    loyalty_points: 500,
  },
  {
    id: 'acc-03',
    email: 'kho@nepviet.vn',
    password: 'Kho@123',
    full_name: 'Trần Văn Kho (Quản Lý Kho & Vận Hành)',
    phone: '0978912345',
    role: 'staff',
    avatar: '/showcase/may-tre-dan-phu-vinh.webp',
    address: 'Kho tổng Văn Quán, Hà Đông',
    city: 'Hà Nội',
    loyalty_points: 100,
  },
  {
    id: 'acc-04',
    email: 'khachhang@nepviet.vn',
    password: 'Khach@123',
    full_name: 'Nguyễn Phương Linh',
    phone: '0981234567',
    role: 'customer',
    avatar: '/products/coc-su-hoa-tiet-hoa-sen-ve-tay.avif',
    address: 'Số 45 Ngõ 165 Cầu Giấy',
    city: 'Hà Nội',
    loyalty_points: 150,
  },
  {
    id: 'acc-05',
    email: 'tranminhquan@gmail.com',
    password: 'Quan@123',
    full_name: 'Trần Minh Quân',
    phone: '0912345678',
    role: 'customer',
    avatar: '/products/hop-qua-dan-tre-tu-nhien.jpg',
    address: 'Số 88 Nguyễn Văn Linh, Hải Châu',
    city: 'Đà Nẵng',
    loyalty_points: 80,
  },
];

export const SEED_VILLAGES: DbCraftVillage[] = [
  {
    id: 'bat-trang',
    name: 'Làng Gốm Bát Tràng',
    location: 'Gia Lâm, Hà Nội',
    history: 'Hơn 700 năm lịch sử',
    highlight: 'Kỹ nghệ men lam, men rạn và men hoả biến độc bản lưu giữ từ thời Lý - Trần.',
    image: '/villages/lang-gom-bat-trang.webp',
  },
  {
    id: 'phu-vinh',
    name: 'Làng Mây Tre Đan Phú Vinh',
    location: 'Chương Mỹ, Hà Nội',
    history: 'Khoảng 400 năm phát triển',
    highlight: 'Nổi tiếng với tài chuốt nan tre mỏng như tơ sợi và kỹ thuật đan tranh hoa văn tinh xảo.',
    image: '/showcase/may-tre-dan-phu-vinh.webp',
  },
  {
    id: 'dong-ho',
    name: 'Làng Tranh Dân Gian Đông Hồ',
    location: 'Thuận Thành, Bắc Ninh',
    history: 'Gần 500 năm hình thành',
    highlight: 'Di sản văn hóa phi vật thể quốc gia với kỹ thuật khắc ván gỗ trên nền giấy điệp lấp lánh.',
    image: '/villages/lang-tranh-dong-ho.jpg',
  },
  {
    id: 'van-phuc',
    name: 'Làng Lụa Vạn Phúc (Hà Đông)',
    location: 'Hà Đông, Hà Nội',
    history: 'Hơn 1.000 năm tuổi',
    highlight: 'Cái nôi dệt lụa tơ tằm thượng phẩm của kinh thành Thăng Long, nổi danh với lụa vân mỏng nhẹ.',
    image: '/villages/lang-lua-van-phuc.jpg',
  },
  {
    id: 'xuan-la',
    name: 'Làng Tò He Xuân La',
    location: 'Phú Xuyên, Hà Nội',
    history: 'Hơn 300 năm truyền thống',
    highlight: 'Nghệ thuật nặn con giống bột gạo độc nhất vô nhị gắn liền ký ức tuổi thơ đồng bằng Bắc Bộ.',
    image: '/villages/lang-to-he-xuan-la.jpg',
  },
];

export const SEED_ORDERS: DbOrder[] = [
  {
    id: 'NV-892145',
    customer_name: 'Nguyễn Phương Linh',
    phone: '0981234567',
    city: 'Hà Nội',
    address: 'Số 45 Ngõ 165 Cầu Giấy',
    notes: 'Giao giờ hành chính, bọc kỹ đồ gốm',
    items: [
      { id: '1', name: 'Bộ Ấm Chén Men Lam Cổ Bát Tràng', quantity: 1, price: 445000, image: '/products/bo-am-chen-men-lam-bat-trang.jpg' }
    ],
    total: 445000,
    payment_method: 'VIETQR',
    status: 'completed',
    transaction_code: 'VQR-892145',
  },
  {
    id: 'NV-734190',
    customer_name: 'Trần Minh Quân',
    phone: '0912345678',
    city: 'Đà Nẵng',
    address: 'Số 88 Nguyễn Văn Linh, Hải Châu',
    notes: 'Gọi trước khi giao 15 phút',
    items: [
      { id: '2', name: 'Hộp Trà Mây Tre Đan Phú Vinh Tự Nhiên', quantity: 1, price: 320000, image: '/products/hop-qua-dan-tre-tu-nhien.jpg' }
    ],
    total: 320000,
    payment_method: 'COD',
    status: 'shipping',
  },
  {
    id: 'NV-612849',
    customer_name: 'Lê Thanh Thảo',
    phone: '0978912345',
    city: 'TP. Hồ Chí Minh',
    address: 'Số 12 Tôn Đức Thắng, Quận 1',
    notes: 'Đóng gói làm quà tặng doanh nghiệp',
    items: [
      { id: '3', name: 'Khăn Lụa Tơ Tằm Vạn Phúc Dệt Hoa Văn Vân', quantity: 1, price: 615000, image: '/products/khan-lua-van-phuc.webp' }
    ],
    total: 615000,
    payment_method: 'VIETQR',
    status: 'pending',
    transaction_code: 'VQR-612849',
  },
  {
    id: 'NV-549182',
    customer_name: 'Phạm Đức Huy',
    phone: '0934567890',
    city: 'Bắc Ninh',
    address: 'Khu Đô Thị Nam Võ Cường',
    items: [
      { id: '4', name: 'Tranh Dân Gian Đông Hồ - Đám Cưới Chuột Khung Gỗ', quantity: 1, price: 210000, image: '/products/tranh-dong-ho-dam-cuoi-chuot.jpg' }
    ],
    total: 210000,
    payment_method: 'COD',
    status: 'pending',
  },
  {
    id: 'NV-381920',
    customer_name: 'Hoàng Mai Anh',
    phone: '0965432109',
    city: 'Hà Nội',
    address: 'Chung cư Golden Land, 275 Nguyễn Trãi, Thanh Xuân',
    notes: 'Giao trong ngày giúp mình',
    items: [
      { id: '5', name: 'Bình Hoa Gốm Men Rạn Cổ Điển Bát Tràng', quantity: 1, price: 780000, image: '/products/binh-hoa-gom-men-ran.jpg' }
    ],
    total: 780000,
    payment_method: 'VIETQR',
    status: 'shipping',
    transaction_code: 'VQR-381920',
  },
];

export const SEED_REVIEWS: DbReview[] = [
  {
    id: 'rev-01',
    product_id: '1',
    user_name: 'Phạm Gia Khiêm',
    rating: 5,
    comment: 'Men lam Bát Tràng bóng mịn chuẩn hoài cổ, đóng gói xốp rất chu đáo, chén sứ cầm đầm tay.',
    images: ['/products/bo-am-chen-men-lam-bat-trang.jpg'],
  },
  {
    id: 'rev-02',
    product_id: '2',
    user_name: 'Nguyễn Thị Thu',
    rating: 5,
    comment: 'Mây tre Phú Vinh đan khít tăm tắp, mùi tre tự nhiên thoang thoảng mộc mạc.',
    images: ['/products/hop-qua-dan-tre-tu-nhien.jpg'],
  },
  {
    id: 'rev-03',
    product_id: '3',
    user_name: 'Lê Hoàng Yến',
    rating: 5,
    comment: 'Lụa Vạn Phúc mượt nhẹ, óng ánh tự nhiên dưới nắng, mua tặng đối tác ai cũng khen.',
    images: ['/products/khan-lua-van-phuc.webp'],
  },
  {
    id: 'rev-04',
    product_id: '4',
    user_name: 'Đặng Tuấn Tú',
    rating: 5,
    comment: 'Tranh Đông Hồ in giấy điệp lóng lánh vỏ sò điệp biển, khung gỗ mộc rất trang trọng.',
    images: ['/products/tranh-dong-ho-dam-cuoi-chuot.jpg'],
  },
];

/**
 * Đồng bộ toàn bộ dữ liệu mẫu (Tài khoản, Sản phẩm, Làng nghề, Đơn hàng, Đánh giá) lên Supabase
 */
export async function seedAllToSupabase(): Promise<{
  success: boolean;
  message: string;
  details: {
    accounts: number;
    products: number;
    villages: number;
    orders: number;
    reviews: number;
  };
}> {
  const client = getSupabaseClient();
  if (!client) {
    return {
      success: false,
      message: 'Chưa cấu hình Supabase Client trong file .env.local',
      details: { accounts: 0, products: 0, villages: 0, orders: 0, reviews: 0 },
    };
  }

  try {
    // 1. Seed Accounts
    const accRes = await client.from('accounts').upsert(SEED_ACCOUNTS, { onConflict: 'id' });
    if (accRes.error) console.warn('Lỗi seed accounts:', accRes.error.message);

    // 2. Seed Products
    const prodRows = PRODUCTS.map(mapProductToRow);
    const prodRes = await client.from('products').upsert(prodRows, { onConflict: 'id' });
    if (prodRes.error) console.warn('Lỗi seed products:', prodRes.error.message);

    // 3. Seed Craft Villages
    const vilRes = await client.from('craft_villages').upsert(SEED_VILLAGES, { onConflict: 'id' });
    if (vilRes.error) console.warn('Lỗi seed villages:', vilRes.error.message);

    // 4. Seed Orders
    const ordRes = await client.from('orders').upsert(SEED_ORDERS, { onConflict: 'id' });
    if (ordRes.error) console.warn('Lỗi seed orders:', ordRes.error.message);

    // 5. Seed Reviews
    const revRes = await client.from('reviews').upsert(SEED_REVIEWS, { onConflict: 'id' });
    if (revRes.error) console.warn('Lỗi seed reviews:', revRes.error.message);

    const hasAnyError = accRes.error || prodRes.error || vilRes.error || ordRes.error || revRes.error;

    return {
      success: !hasAnyError,
      message: hasAnyError
        ? `Đã đồng bộ một phần (Lỗi bảng: ${[
            accRes.error ? 'accounts' : '',
            prodRes.error ? 'products' : '',
            vilRes.error ? 'craft_villages' : '',
            ordRes.error ? 'orders' : '',
            revRes.error ? 'reviews' : '',
          ].filter(Boolean).join(', ')}. Hãy chạy file supabase_schema.sql trong SQL Editor trước!)`
        : 'Đồng bộ hoàn tất 100% dữ liệu mẫu lên Supabase (Tài khoản, Sản phẩm, Làng nghề, Đơn hàng, Đánh giá)!',
      details: {
        accounts: accRes.error ? 0 : SEED_ACCOUNTS.length,
        products: prodRes.error ? 0 : prodRows.length,
        villages: vilRes.error ? 0 : SEED_VILLAGES.length,
        orders: ordRes.error ? 0 : SEED_ORDERS.length,
        reviews: revRes.error ? 0 : SEED_REVIEWS.length,
      },
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Ngoại lệ khi seed: ${err.message}`,
      details: { accounts: 0, products: 0, villages: 0, orders: 0, reviews: 0 },
    };
  }
}
