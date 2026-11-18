-- ========================================================
-- NẾP VIỆT - SUPABASE DATABASE SCHEMA & SEED DATA (TOÀN DIỆN)
-- Chạy đoạn script này trong mục SQL Editor trên Supabase Dashboard
-- ========================================================

-- 0. XÓA SẠCH CÁC BẢNG CŨ CỦA DỰ ÁN TRƯỚC VÀ RESET SCHEMA
DROP TABLE IF EXISTS public.chatbot_consultations CASCADE;
DROP TABLE IF EXISTS public.pretest_results CASCADE;
DROP TABLE IF EXISTS public.scenarios CASCADE;
DROP TABLE IF EXISTS public.user_profiles CASCADE;
DROP TABLE IF EXISTS public.user_progress CASCADE;
DROP TABLE IF EXISTS public.reviews CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.accounts CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.craft_villages CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;

-- 1. BẢNG TÀI KHOẢN & PHÂN QUYỀN (accounts)
CREATE TABLE IF NOT EXISTS public.accounts (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'customer', -- 'admin', 'artisan', 'staff', 'customer'
    avatar TEXT,
    address TEXT,
    city TEXT,
    loyalty_points INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. BẢNG SẢN PHẨM (products)
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    category_name TEXT NOT NULL,
    village TEXT NOT NULL,
    price NUMERIC NOT NULL,
    original_price NUMERIC,
    rating NUMERIC DEFAULT 5.0,
    reviews_count INTEGER DEFAULT 1,
    in_stock BOOLEAN DEFAULT true,
    images JSONB NOT NULL DEFAULT '[]'::jsonb,
    summary TEXT,
    description TEXT,
    material TEXT,
    dimensions TEXT,
    artisan_story TEXT,
    preservation TEXT,
    badge TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. BẢNG LÀNG NGHỀ TRUYỀN THỐNG (craft_villages)
CREATE TABLE IF NOT EXISTS public.craft_villages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    history TEXT NOT NULL,
    highlight TEXT NOT NULL,
    image TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. BẢNG ĐƠN HÀNG (orders)
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT NOT NULL,
    address TEXT NOT NULL,
    notes TEXT,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    total NUMERIC NOT NULL,
    payment_method TEXT NOT NULL, -- 'VIETQR' | 'COD'
    status TEXT DEFAULT 'pending', -- 'pending' | 'shipping' | 'completed' | 'cancelled'
    transaction_code TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. BẢNG ĐÁNH GIÁ & PHẢN HỒI (reviews)
CREATE TABLE IF NOT EXISTS public.reviews (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    user_name TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5,
    comment TEXT NOT NULL,
    images JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- BẬT ROW LEVEL SECURITY (RLS)
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.craft_villages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- THIẾT LẬP CHÍNH SÁCH RLS (Public read/write cho MVP Demo)
DROP POLICY IF EXISTS "Public read accounts" ON public.accounts;
DROP POLICY IF EXISTS "Public insert accounts" ON public.accounts;
DROP POLICY IF EXISTS "Public update accounts" ON public.accounts;
DROP POLICY IF EXISTS "Public delete accounts" ON public.accounts;
CREATE POLICY "Public read accounts" ON public.accounts FOR SELECT USING (true);
CREATE POLICY "Public insert accounts" ON public.accounts FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update accounts" ON public.accounts FOR UPDATE USING (true);
CREATE POLICY "Public delete accounts" ON public.accounts FOR DELETE USING (true);

DROP POLICY IF EXISTS "Public read products" ON public.products;
DROP POLICY IF EXISTS "Public insert products" ON public.products;
DROP POLICY IF EXISTS "Public update products" ON public.products;
DROP POLICY IF EXISTS "Public delete products" ON public.products;
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public insert products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update products" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Public delete products" ON public.products FOR DELETE USING (true);

DROP POLICY IF EXISTS "Public read craft_villages" ON public.craft_villages;
DROP POLICY IF EXISTS "Public insert craft_villages" ON public.craft_villages;
DROP POLICY IF EXISTS "Public update craft_villages" ON public.craft_villages;
DROP POLICY IF EXISTS "Public delete craft_villages" ON public.craft_villages;
CREATE POLICY "Public read craft_villages" ON public.craft_villages FOR SELECT USING (true);
CREATE POLICY "Public insert craft_villages" ON public.craft_villages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update craft_villages" ON public.craft_villages FOR UPDATE USING (true);
CREATE POLICY "Public delete craft_villages" ON public.craft_villages FOR DELETE USING (true);

DROP POLICY IF EXISTS "Public read orders" ON public.orders;
DROP POLICY IF EXISTS "Public insert orders" ON public.orders;
DROP POLICY IF EXISTS "Public update orders" ON public.orders;
DROP POLICY IF EXISTS "Public delete orders" ON public.orders;
CREATE POLICY "Public read orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Public insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update orders" ON public.orders FOR UPDATE USING (true);
CREATE POLICY "Public delete orders" ON public.orders FOR DELETE USING (true);

DROP POLICY IF EXISTS "Public read reviews" ON public.reviews;
DROP POLICY IF EXISTS "Public insert reviews" ON public.reviews;
DROP POLICY IF EXISTS "Public update reviews" ON public.reviews;
CREATE POLICY "Public delete reviews" ON public.reviews FOR DELETE USING (true);
CREATE POLICY "Public read reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Public insert reviews" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update reviews" ON public.reviews FOR UPDATE USING (true);

-- ========================================================
-- SEED DATA 1: BẢNG TÀI KHOẢN (accounts)
-- ========================================================
INSERT INTO public.accounts (id, email, password, full_name, phone, role, avatar, address, city, loyalty_points)
VALUES
(
    'acc-01',
    'admin@nepviet.vn',
    'Admin@123',
    'Admin Master (Giám Đốc Quản Trị)',
    '0981234567',
    'admin',
    '/products/bo-am-chen-men-lam-bat-trang.jpg',
    '122 Hoàng Quốc Việt, Cầu Giấy',
    'Hà Nội',
    999
),
(
    'acc-02',
    'nghenhan@nepviet.vn',
    'Nghenhan@123',
    'Nghệ Nhân Làng Nghề Bát Tràng & Phú Vinh',
    '0912345678',
    'artisan',
    '/showcase/nghe-nhan-lang-nghe-viet.jpg',
    'Xưởng gốm Giang Cao, Bát Tràng',
    'Hà Nội',
    500
),
(
    'acc-03',
    'kho@nepviet.vn',
    'Kho@123',
    'Trần Văn Kho (Quản Lý Kho & Vận Hành)',
    '0978912345',
    'staff',
    '/showcase/may-tre-dan-phu-vinh.webp',
    'Kho tổng Văn Quán, Hà Đông',
    'Hà Nội',
    100
),
(
    'acc-04',
    'khachhang@nepviet.vn',
    'Khach@123',
    'Nguyễn Phương Linh',
    '0981234567',
    'customer',
    '/products/coc-su-hoa-tiet-hoa-sen-ve-tay.avif',
    'Số 45 Ngõ 165 Cầu Giấy',
    'Hà Nội',
    150
),
(
    'acc-05',
    'tranminhquan@gmail.com',
    'Quan@123',
    'Trần Minh Quân',
    '0912345678',
    'customer',
    '/products/hop-qua-dan-tre-tu-nhien.jpg',
    'Số 88 Nguyễn Văn Linh, Hải Châu',
    'Đà Nẵng',
    80
)
ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    password = EXCLUDED.password;

-- ========================================================
-- SEED DATA 2: BẢNG LÀNG NGHỀ (craft_villages)
-- ========================================================
INSERT INTO public.craft_villages (id, name, location, history, highlight, image)
VALUES
(
    'bat-trang',
    'Làng Gốm Bát Tràng',
    'Gia Lâm, Hà Nội',
    'Hơn 700 năm lịch sử',
    'Kỹ nghệ men lam, men rạn và men hoả biến độc bản lưu giữ từ thời Lý - Trần.',
    '/villages/lang-gom-bat-trang.webp'
),
(
    'phu-vinh',
    'Làng Mây Tre Đan Phú Vinh',
    'Chương Mỹ, Hà Nội',
    'Khoảng 400 năm phát triển',
    'Nổi tiếng với tài chuốt nan tre mỏng như tơ sợi và kỹ thuật đan tranh hoa văn tinh xảo.',
    '/showcase/may-tre-dan-phu-vinh.webp'
),
(
    'dong-ho',
    'Làng Tranh Dân Gian Đông Hồ',
    'Thuận Thành, Bắc Ninh',
    'Gần 500 năm hình thành',
    'Di sản văn hóa phi vật thể quốc gia với kỹ thuật khắc ván gỗ trên nền giấy điệp lấp lánh.',
    '/villages/lang-tranh-dong-ho.jpg'
),
(
    'van-phuc',
    'Làng Lụa Vạn Phúc',
    'Hà Đông, Hà Nội',
    'Hơn 1.000 năm lịch sử',
    'Cái nôi dệt lụa tơ tằm mềm mại, hoa văn vân mây từng được chọn may lễ phục triều đình.',
    '/villages/lang-lua-van-phuc.webp'
),
(
    'xuan-la',
    'Làng Tò He Xuân La',
    'Phú Xuyên, Hà Nội',
    'Hơn 300 năm lưu truyền',
    'Nghệ thuật nặn bột nếp hoa màu dân gian mộc mạc lưu giữ cả khoảng trời ký ức tuổi thơ.',
    '/products/bo-to-he-bot-nep-xuan-la.avif'
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    location = EXCLUDED.location,
    highlight = EXCLUDED.highlight,
    image = EXCLUDED.image;

-- ========================================================
-- SEED DATA 3: BẢNG ĐƠN HÀNG (orders)
-- ========================================================
INSERT INTO public.orders (id, customer_name, phone, city, address, notes, items, total, payment_method, status, transaction_code)
VALUES
(
    'NV-892145',
    'Nguyễn Phương Linh',
    '0981234567',
    'Hà Nội',
    'Số 45 Ngõ 165 Cầu Giấy, Hà Nội',
    'Xin bọc giấy kraft mộc và gửi kèm thiệp chúc mừng sinh nhật',
    '[{"id":"prod-01","name":"Bộ Ấm Chén Men Lam Gốm Bát Tràng Dáng Trúc","price":320000,"quantity":1},{"id":"prod-14","name":"Hộp Bánh Cốm Hà Nội Đậu Xanh Hương Bưởi Hàng Than","price":110000,"quantity":1}]'::jsonb,
    445000,
    'VIETQR',
    'completed',
    'FT241118884920'
),
(
    'NV-734190',
    'Trần Minh Quân',
    '0912345678',
    'Đà Nẵng',
    'Số 88 Nguyễn Văn Linh, Hải Châu, Đà Nẵng',
    'Giao giờ hành chính, gọi trước khi đến',
    '[{"id":"prod-02","name":"Bình Hoa Gốm Men Hoả Biến Ngọc Bích Cổ Điển","price":320000,"quantity":1}]'::jsonb,
    320000,
    'COD',
    'shipping',
    NULL
),
(
    'NV-612849',
    'Lê Thanh Thảo',
    '0978912345',
    'TP. Hồ Chí Minh',
    'Chung cư Botanica, Phổ Quang, Tân Bình, TP.HCM',
    'Đóng gói xốp khí chống sốc 4 lớp cẩn thận giúp mình nhé',
    '[{"id":"prod-06","name":"Khăn Choàng Lụa Tơ Tằm Vạn Phúc Họa Tiết Vân Mây","price":420000,"quantity":1},{"id":"prod-13","name":"Hộp Trà Sen Bách Diệp Tây Hồ Thượng Hạng","price":250000,"quantity":1}]'::jsonb,
    615000,
    'VIETQR',
    'pending',
    NULL
),
(
    'NV-549182',
    'Phạm Đức Huy',
    '0934567890',
    'Bắc Ninh',
    'Thị trấn Hồ, Thuận Thành, Bắc Ninh',
    'Giao trước thứ 6 để kịp làm quà tặng',
    '[{"id":"prod-08","name":"Tranh Dân Gian Đông Hồ Bản Khắc Gỗ - Đám Cưới Chuột","price":210000,"quantity":1}]'::jsonb,
    210000,
    'COD',
    'pending',
    NULL
),
(
    'NV-381920',
    'Hoàng Thùy Dung',
    '0968112233',
    'Hải Phòng',
    'Số 12 Lạch Tray, Ngô Quyền, Hải Phòng',
    'Đã chuyển khoản VietQR MB Bank',
    '[{"id":"prod-04","name":"Khay Trà Mây Tre Đan Nan Mịn Xứ Đoài Phú Vinh","price":280000,"quantity":2}]'::jsonb,
    560000,
    'VIETQR',
    'completed',
    'FT241117492102'
)
ON CONFLICT (id) DO UPDATE SET
    customer_name = EXCLUDED.customer_name,
    total = EXCLUDED.total,
    status = EXCLUDED.status;

-- ========================================================
-- SEED DATA 4: BẢNG ĐÁNH GIÁ (reviews)
-- ========================================================
INSERT INTO public.reviews (id, product_id, user_name, rating, comment, images)
VALUES
(
    'rev-01',
    'prod-01',
    'Phương Linh (SV PTIT)',
    5,
    'Bộ ấm chén men lam cực kỳ tinh xảo, đường nét trúc thanh nhã, đóng gói chống sốc rất kỹ không hề bị sứt mẻ gì khi giao đến Cầu Giấy.',
    '["/products/bo-am-chen-men-lam-bat-trang.jpg"]'::jsonb
),
(
    'rev-02',
    'prod-04',
    'Bảo Châu',
    5,
    'Khay tre Phú Vinh đan nan mịn màng không hề bị xơ dằm, màu vàng óng tự nhiên thơm mùi khói bếp truyền thống. Rất ưng ý!',
    '["/products/khay-tra-may-tre-dan-nan-min-phu-vinh.webp"]'::jsonb
),
(
    'rev-03',
    'prod-06',
    'Thu Trang',
    5,
    'Lụa Vạn Phúc mịn mát tay, hoa văn vân mây chìm sang trọng. Mình mua tặng mẹ nhân dịp sinh nhật mẹ thích lắm!',
    '["/products/khan-choang-lua-to-tam-van-phuc.jpg"]'::jsonb
),
(
    'rev-04',
    'prod-13',
    'Đức Hoàng',
    5,
    'Trà sen bách diệp đúng chuẩn hương Tây Hồ, nước xanh trong, thơm ngọt hậu. Hộp giấy bọc thiếc rất đẹp để làm quà biếu.',
    '["/products/hop-tra-sen-tay-ho-thuong-hang.jpg"]'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- ========================================================
-- SEED DATA 5: BẢNG SẢN PHẨM (products - 14 sản phẩm thủ công)
-- ========================================================
INSERT INTO public.products (
    id, slug, name, category, category_name, village,
    price, original_price, rating, reviews_count, in_stock,
    images, summary, description, material, dimensions,
    artisan_story, preservation, badge, is_featured
)
VALUES
(
    'prod-01',
    'bo-am-chen-men-lam-bat-trang',
    'Bộ Ấm Chén Men Lam Gốm Bát Tràng Dáng Trúc',
    'gom-su',
    'Gốm Sứ Bát Tràng',
    'Làng gốm Bát Tràng, Gia Lâm, Hà Nội',
    320000,
    380000,
    4.9,
    42,
    true,
    '["/products/bo-am-chen-men-lam-bat-trang.jpg"]'::jsonb,
    'Bộ ấm chén dáng trúc thanh nhã với họa tiết men lam cổ điển phục dựng kỹ thuật gốm cung đình thế kỷ 18.',
    'Chế tác từ nguồn đất sét trắng tuyển chọn ven dòng sông Hồng, nung ở nhiệt độ cao 1.280°C giúp xương gốm đanh chắc và an toàn tuyệt đối cho sức khỏe.',
    'Đất sét trắng cao lanh tuyển chọn, men lam tro trấu truyền thống',
    'Ấm dung tích 500ml, 6 chén 60ml, kèm đĩa lót gốm',
    'Được phục chế bởi bàn tay tài hoa của nghệ nhân Phạm Văn Tuấn – người có hơn 35 năm kinh nghiệm gìn giữ dòng men lam Bát Tràng cổ.',
    'Rửa bằng nước ấm, tránh dùng bùi nhùi kim loại gây xước men.',
    'Bán chạy',
    true
),
(
    'prod-02',
    'lo-hoa-men-hoa-bien-ngoc-bich',
    'Bình Hoa Gốm Men Hoả Biến Ngọc Bích Cổ Điển',
    'gom-su',
    'Gốm Sứ Bát Tràng',
    'Làng gốm Bát Tràng, Gia Lâm, Hà Nội',
    280000,
    340000,
    4.8,
    28,
    true,
    '["/products/binh-hoa-gom-men-hoa-bien-ngoc-bich.jpg"]'::jsonb,
    'Sắc xanh ngọc bích ảo diệu từ sự tương tác tự nhiên của ngọn lửa trong lò nung ở nhiệt độ 1.300°C.',
    'Mỗi chiếc bình hoả biến là một tác phẩm độc bản – không bao giờ có hai chiếc hoàn toàn giống nhau về sắc độ vân men.',
    'Đất sa mốt mịn, men hoả biến tự nhiên không chì',
    'Chiều cao 25cm, đường kính miệng 8cm, đáy 12cm',
    'Kỹ thuật hoả biến được xưởng gốm gìn giữ qua 3 thế hệ gia đình thợ gốm Bát Tràng.',
    'Lau bằng khăn ẩm mềm, để nơi khô ráo thoáng gió.',
    'Độc bản',
    true
),
(
    'prod-03',
    'coc-su-hoa-tiet-hoa-sen-ve-tay',
    'Cốc Sứ Men Rạn Họa Tiết Hoa Sen Vẽ Tay Kèm Nắp',
    'gom-su',
    'Gốm Sứ Bát Tràng',
    'Làng gốm Bát Tràng, Gia Lâm, Hà Nội',
    150000,
    180000,
    4.9,
    65,
    true,
    '["/products/coc-su-hoa-tiet-hoa-sen-ve-tay.avif"]'::jsonb,
    'Chiếc cốc gốm men rạn cổ điển vẽ tay đóa sen thanh tao, kèm nắp gốm giữ nhiệt tiện dụng cho bàn học và văn phòng.',
    'Mỗi nét vẽ hoa sen đều được nghệ nhân phác họa thủ công bằng bút lông chấm men chàm, tạo nét thanh mảnh sinh động.',
    'Gốm men rạn Bát Tràng thủ công, mực chàm thảo mộc',
    'Dung tích 380ml, chiều cao 11cm',
    'Lấy cảm hứng từ đóa sen hồ Tây tinh khiết buổi sớm mai.',
    'Sử dụng an toàn với nước sôi, trà nóng, lò vi sóng.',
    'Yêu thích',
    false
),
(
    'prod-04',
    'khay-tra-may-tre-dan-nan-min-phu-vinh',
    'Khay Trà Mây Tre Đan Nan Mịn Xứ Đoài Phú Vinh',
    'may-tre',
    'Mây Tre Đan Thủ Công',
    'Làng mây tre đan Phú Vinh, Chương Mỹ, Hà Nội',
    210000,
    260000,
    4.9,
    34,
    true,
    '["/products/khay-tra-may-tre-dan-nan-min-phu-vinh.webp"]'::jsonb,
    'Khay trà đan tay tỉ mỉ từ nan tre già chuốt mỏng như sợi tơ, hun khói tự nhiên chống mối mọt.',
    'Kỹ nghệ đan hoa văn nan chìm nổi truyền thống giúp khay vừa cứng cáp vừa dẻo dai qua nhiều năm sử dụng.',
    'Tre gai già trên 4 năm tuổi chuốt nan, đáy mây đan khít',
    'Đường kính 30cm, vành cao 4.5cm',
    'Được làm bởi nghệ nhân Nguyễn Văn Tĩnh – nghệ nhân ưu tú làng mây tre Phú Vinh.',
    'Tránh ngâm nước lâu, để nơi khô ráo sau khi lau sạch.',
    'Thủ công 100%',
    true
),
(
    'prod-05',
    'hop-qua-dan-tre-tu-nhien',
    'Hộp Đựng Quà Đan Tre Tự Nhiên Kèm Quai Xách Gỗ',
    'may-tre',
    'Mây Tre Đan Thủ Công',
    'Làng mây tre đan Phú Vinh, Chương Mỹ, Hà Nội',
    180000,
    220000,
    4.8,
    19,
    true,
    '["/products/hop-qua-dan-tre-tu-nhien.jpg"]'::jsonb,
    'Hộp quà phong cách mộc mạc tối giản, kết hợp tre đan nan khít và quai xách gỗ sồi tự nhiên.',
    'Lý tưởng để đựng set quà bánh mứt, trà sen, khăn lụa trong các dịp lễ Tết và tri ân đặc biệt.',
    'Nan tre rừng Tây Bắc xử lý nhiệt, tay cầm gỗ tự nhiên',
    'Kích thước 26cm x 18cm x 12cm',
    'Bao bì xanh thân thiện môi trường thay thế hộp nhựa công nghiệp.',
    'Bảo quản nơi khô ráo, tránh ẩm mốc.',
    'Quà tặng',
    false
),
(
    'prod-06',
    'khan-choang-lua-to-tam-van-phuc',
    'Khăn Choàng Lụa Tơ Tằm Vạn Phúc Họa Tiết Vân Mây',
    'phu-kien-thoi-trang',
    'Trang Phục & Phụ Kiện Việt',
    'Làng lụa Vạn Phúc, Hà Đông, Hà Nội',
    420000,
    490000,
    5.0,
    51,
    true,
    '["/products/khan-choang-lua-to-tam-van-phuc.jpg"]'::jsonb,
    'Khăn lụa tơ tằm dệt tay mềm mại óng ả, hoa văn mây bay chìm tinh tế mang dấu ấn lụa tiến vua.',
    'Được ươm tơ và dệt hoàn toàn trên khung cửi truyền thống làng Vạn Phúc ngàn năm tuổi.',
    '100% tơ tằm tự nhiên Bảo Lộc dệt tại Vạn Phúc',
    'Khổ dài 180cm x rộng 70cm',
    'Mỗi đường thoi dệt lách cách là tâm huyết của nghệ nhân gìn giữ dòng lụa quý đất kinh kỳ.',
    'Giặt nhẹ tay bằng dầu gội hoặc sữa tắm, là ủi ở nhiệt độ lụa.',
    'Cao cấp',
    true
),
(
    'prod-07',
    'long-den-nan-tre-boc-lua-hoi-an',
    'Lồng Đèn Nan Tre Bọc Lụa Hội An Họa Tiết Cổ',
    'may-tre',
    'Mây Tre Đan Thủ Công',
    'Làng nghề lồng đèn Hội An, Quảng Nam',
    160000,
    195000,
    4.7,
    27,
    true,
    '["/products/long-den-nan-tre-boc-lua-hoi-an.jpg"]'::jsonb,
    'Lồng đèn xếp nan tre bọc vải lụa tơ tằm vẽ họa tiết hoa sen cổ truyền thắp sáng không gian hoài niệm.',
    'Có thể gập gọn tiện dụng khi vận chuyển, tạo ánh sáng ấm áp lung linh cho phòng trà và góc học tập.',
    'Nan tre ngâm nước muối chống mọt, vải lụa Hà Đông dệt vân',
    'Đường kính bung 25cm, chiều cao 35cm',
    'Sản phẩm đặc trưng của phố cổ Hội An kết tinh giao thoa văn hóa truyền thống.',
    'Treo trong nhà hoặc hiên có mái che.',
    'Truyền thống',
    false
),
(
    'prod-08',
    'tranh-dong-ho-dam-cuoi-chuot',
    'Tranh Dân Gian Đông Hồ Bản Khắc Gỗ - Đám Cưới Chuột',
    'do-choi-qua-tang',
    'Đồ Chơi & Quà Tặng Dân Gian',
    'Làng tranh Đông Hồ, Thuận Thành, Bắc Ninh',
    210000,
    250000,
    4.9,
    38,
    true,
    '["/products/tranh-dan-gian-dong-ho-dam-cuoi-chuot.jpg"]'::jsonb,
    'Bức tranh kinh điển châm biếm hóm hỉnh in thủ công bằng bản khắc gỗ thị trên giấy điệp óng ánh vỏ sò.',
    'Màu sắc hoàn toàn tự nhiên: màu vàng hoa hòe, đỏ sỏi son, đen than lá tre, xanh lá chàm.',
    'Giấy điệp quét vỏ sò điệp biển, mực in thảo mộc tự nhiên',
    'Kích thước khổ tranh 35cm x 45cm (đã lồng khung gỗ bảo vệ)',
    'In dập tay trực tiếp từ các ván khắc gỗ cổ của gia đình nghệ nhân Nguyễn Đăng Chế.',
    'Tránh ánh nắng mặt trời gắt chiếu trực tiếp.',
    'Di sản quốc gia',
    true
),
(
    'prod-09',
    'bo-to-he-bot-nep-xuan-la',
    'Bộ Tò He Đất Nặn Bột Nếp Dân Gian Xuân La (5 Mẫu)',
    'do-choi-qua-tang',
    'Đồ Chơi & Quà Tặng Dân Gian',
    'Làng tò he Xuân La, Phú Xuyên, Hà Nội',
    95000,
    120000,
    4.8,
    62,
    true,
    '["/products/bo-to-he-bot-nep-xuan-la.avif"]'::jsonb,
    'Bộ 5 nhân vật dân gian quen thuộc nặn từ bột nếp phối màu tự nhiên từ gấc, dành dành, lá dứa.',
    'Đã được xử lý sấy nhiệt giúp bảo quản làm vật kỷ niệm để bàn lâu dài không bị mốc nứt.',
    'Bột gạo nếp cái hoa vàng, màu thực vật an toàn tự nhiên',
    'Bộ 5 que tò he cao 12cm - 15cm',
    'Tò he Xuân La là nét đẹp văn hóa đồ chơi dân gian duy nhất còn tồn tại ở Việt Nam.',
    'Bảo quản nơi khô ráo, tránh nước.',
    'Ký ức dân gian',
    false
),
(
    'prod-10',
    'mat-na-giay-boi-chu-teu',
    'Mặt Nạ Giấy Bồi Dân Gian Vẽ Tay Hình Chú Tễu',
    'do-choi-qua-tang',
    'Đồ Chơi & Quà Tặng Dân Gian',
    'Phố Hàng Lược & Xưởng thủ công Hà Nội',
    120000,
    145000,
    4.9,
    18,
    true,
    '["/products/mat-na-giay-boi-dan-gian-chu-teu.jpg"]'::jsonb,
    'Mặt nạ chú Tễu cười rạng rỡ bồi nhiều lớp giấy xi măng theo khuôn đất, vẽ tay màu sơn sắc sảo.',
    'Gợi nhớ không khí rộn rã trống hội Trung Thu truyền thống phố cổ Hà Nội xưa.',
    'Giấy bản bồi hồ gạo nếp, màu sơn gốc nước thân thiện',
    'Kích thước 20cm x 18cm vừa vặn khuôn mặt',
    'Chế tác thủ công bởi gia đình nghệ nhân giữ nghề bồi giấy Hàng Lược.',
    'Treo trang trí góc phòng học hoặc làm đạo cụ biểu diễn.',
    'Dân gian',
    false
),
(
    'prod-11',
    'tui-tote-vai-canvas-trong-dong',
    'Túi Tote Vải Canvas Dày Họa Tiết Trống Đồng Đông Sơn',
    'phu-kien-thoi-trang',
    'Trang Phục & Phụ Kiện Việt',
    'Xưởng thêu thủ công Hà Nội',
    160000,
    190000,
    4.8,
    74,
    true,
    '["/products/tui-tote-canvas-hoa-tiet-trong-dong.jpg"]'::jsonb,
    'Túi vải canvas mộc dày dặn in họa tiết chim Lạc và hoa văn kỷ hà trống đồng Đông Sơn cổ đại.',
    'Dung tích lớn đựng vừa laptop 14 inch, sách vở sinh viên, khóa kéo kim loại chắc chắn kèm ngăn con tiện lợi.',
    'Vải canvas cotton 100% sợi dệt thô mộc bền bỉ',
    'Kích thước 38cm x 35cm x đáy 8cm, quai đeo 28cm',
    'Sản phẩm giao thoa giữa lòng tự hào di sản ngàn năm và phong cách thời trang trẻ trung năng động.',
    'Giặt máy nhẹ hoặc giặt tay, không ngâm thuốc tẩy.',
    'Học sinh sinh viên',
    true
),
(
    'prod-12',
    'vi-cam-tay-tho-cam-sapa-hoa-sen',
    'Ví Cầm Tay Dệt Thổ Cẩm Hoa Sen Bản Tả Phìn Sa Pa',
    'phu-kien-thoi-trang',
    'Trang Phục & Phụ Kiện Việt',
    'Bản Tả Phìn, Thị xã Sa Pa, Lào Cai',
    140000,
    180000,
    4.9,
    23,
    true,
    '["/products/vi-cam-tay-tho-cam-sapa-hoa-sen.jpg"]'::jsonb,
    'Ví thổ cẩm thêu tay chỉ tơ rực rỡ từ đôi tay khéo léo của người phụ nữ Dao Đỏ vùng cao.',
    'Chất liệu vải lanh dệt thủ công được nhuộm chàm tự nhiên qua hàng chục ngày nắng.',
    'Vải lanh thổ cẩm dệt tay nhuộm chàm, khóa kéo đồng mạ cổ',
    '20cm x 12cm, 2 ngăn lớn đựng điện thoại và thẻ',
    'Mỗi chiếc ví đem lại nguồn thu nhập bền vững cho các chị em phụ nữ dân tộc Dao Đỏ tại bản Tả Phìn.',
    'Giặt nhẹ bằng tay với nước xả làm mềm vải.',
    'Thêu tay',
    false
),
(
    'prod-13',
    'hop-tra-sen-tay-ho-thuong-hang',
    'Hộp Trà Sen Bách Diệp Tây Hồ Thượng Hạng (100g)',
    'am-thuc',
    'Ẩm Thực & Trà Truyền Thống',
    'Làng Quảng Bá, Tây Hồ, Hà Nội',
    250000,
    290000,
    5.0,
    45,
    true,
    '["/products/hop-tra-sen-tay-ho-thuong-hang.jpg"]'::jsonb,
    'Trà Tân Cương ướp cùng gạo sen bách diệp hồ Tây thơm ngát đượm vị qua 7 lần sấy ủ.',
    'Nghệ thuật ướp trà sen Tây Hồ là di sản văn hóa phi vật thể quý báu của đất kinh kỳ. Nước trà vàng mật ong, tiền chát dịu hậu ngọt sâu.',
    'Trà búp Đinh Tân Cương thượng hạng, gạo sen bách diệp hồ Tây',
    'Hộp thiếc bọc giấy thủ công 100 gram hút chân không',
    'Ướp theo bí quyết gia truyền hơn 70 năm của gia đình nghệ nhân chè sen phường Quảng Bá.',
    'Đậy kín nắp sau khi mở hộp, để nơi khô mát.',
    'Tinh hoa ẩm thực',
    true
),
(
    'prod-14',
    'hop-banh-com-hang-than-truyen-thong',
    'Hộp Bánh Cốm Hà Nội Đậu Xanh Hương Bưởi Hàng Than',
    'am-thuc',
    'Ẩm Thực & Trà Truyền Thống',
    'Phố Hàng Than, Ba Đình, Hà Nội',
    110000,
    130000,
    4.8,
    39,
    true,
    '["/products/hop-banh-com-hang-than-truyen-thong.jpg"]'::jsonb,
    'Hộp 6 chiếc bánh cốm xanh mướt vỏ mỏng dẻo, nhân đậu xanh dừa ngào thơm ngát hoa bưởi.',
    'Bánh cốm là thức quà đặc trưng gói trọn hương vị mùa thu Hà Nội và là biểu tượng của sự son sắt, ngọt ngào trong đám hỏi truyền thống.',
    'Cốm nếp cái hoa vàng khô, đậu xanh cà vỏ, cùi dừa nạo, tinh dầu bưởi',
    'Hộp giấy truyền thống gồm 6 chiếc bọc nilon bảo quản (khối lượng tịnh 390g)',
    'Nấu mới mỗi ngày tại lò bánh cổ truyền phố Hàng Than, không dùng chất bảo quản độc hại.',
    'Dùng ngon nhất trong vòng 5 ngày kể từ ngày đóng hộp.',
    'Quà biếu truyền thống',
    false
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    images = EXCLUDED.images,
    summary = EXCLUDED.summary;
