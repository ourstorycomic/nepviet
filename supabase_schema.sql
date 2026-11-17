-- ========================================================
-- NẾP VIỆT - SUPABASE DATABASE SCHEMA & SEED DATA
-- Chạy đoạn script này trong mục SQL Editor trên Supabase Dashboard
-- ========================================================

-- 0. XÓA SẠCH CÁC BẢNG CŨ NẾU ĐÃ TỒN TẠI (RESET SẠCH SẼ)
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.craft_villages CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;

-- 1. BẢNG SẢN PHẨM (products)
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

-- 2. BẢNG ĐƠN HÀNG (orders)
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT NOT NULL,
    address TEXT NOT NULL,
    notes TEXT,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    total NUMERIC NOT NULL,
    payment_method TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. BẢNG LÀNG NGHỀ (craft_villages)
CREATE TABLE IF NOT EXISTS public.craft_villages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    history TEXT NOT NULL,
    highlight TEXT NOT NULL,
    image TEXT NOT NULL
);

-- 4. BẬT ROW LEVEL SECURITY (RLS) & CHO PHÉP ĐỌC/GHI CÔNG KHAI (MVP)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.craft_villages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read products" ON public.products;
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public insert products" ON public.products;
CREATE POLICY "Public insert products" ON public.products FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public update products" ON public.products;
CREATE POLICY "Public update products" ON public.products FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public delete products" ON public.products;
CREATE POLICY "Public delete products" ON public.products FOR DELETE USING (true);

DROP POLICY IF EXISTS "Public read orders" ON public.orders;
CREATE POLICY "Public read orders" ON public.orders FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public insert orders" ON public.orders;
CREATE POLICY "Public insert orders" ON public.orders FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public update orders" ON public.orders;
CREATE POLICY "Public update orders" ON public.orders FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public read craft_villages" ON public.craft_villages;
CREATE POLICY "Public read craft_villages" ON public.craft_villages FOR SELECT USING (true);

-- 5. NẠP DỮ LIỆU BAN ĐẦU 14 SẢN PHẨM NẾP VIỆT (SEED DATA)
INSERT INTO public.products (
    id, slug, name, category, category_name, village, price, original_price, rating, reviews_count, in_stock, images, summary, description, material, dimensions, artisan_story, preservation, badge, is_featured
) VALUES
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
    'Bộ ấm chén men lam cổ điển dáng đốt trúc, chế tác thủ công hoàn toàn từ đất cao lanh tinh tuyển.',
    'Bộ ấm chén men lam mang đậm dấu ấn làng nghề Bát Tràng thế kỷ 16-17. Thân ấm và chén được các nghệ nhân vuốt tay tỉ mỉ, họa tiết nhành trúc thanh tao vẽ bằng mực lam tự nhiên trước khi phủ men bóng và nung ở nhiệt độ 1.300°C.',
    'Đất sét cao lanh tự nhiên, men lam cổ truyền khử độc',
    'Ấm dung tích 450ml, 6 chén 65ml, 1 đĩa lót ấm',
    'Được chế tác bởi xưởng gốm gia truyền họ Nguyễn tại Bát Tràng với hơn 3 đời gìn giữ kỹ thuật vẽ men lam hoa văn tứ quý thanh nhã.',
    'Tráng nước sôi trước khi dùng trà lần đầu. Rửa nhẹ tay bằng nước ấm.',
    'Bán chạy nhất',
    true
),
(
    'prod-02',
    'lo-hoa-men-hoa-bien-ngoc-bich',
    'Bình Hoa Gốm Men Hoả Biến Ngọc Bích Cổ Điển',
    'gom-su',
    'Gốm Sứ Bát Tràng',
    'Làng gốm Bát Tràng, Gia Lâm, Hà Nội',
    245000,
    290000,
    4.8,
    28,
    true,
    '["/products/lo-hoa-men-hoa-bien-ngoc-bich.jpg"]'::jsonb,
    'Bình hoa dáng giọt ngọc với lớp men hoả biến chuyển màu diệu kỳ tự nhiên từ lò nung củi.',
    'Men hỏa biến là tinh hoa độc bản của nghề gốm: màu men hình thành ngẫu nhiên do sự biến thiên nhiệt độ trong lò nung mà không có chất tạo màu nhân tạo nào sánh được.',
    'Gốm nung củi nhiệt độ cao, men hoả biến tự nhiên',
    'Cao 22cm x Đường kính bụng 14cm x Miệng 8cm',
    'Mỗi mẻ men hỏa biến là sự phối hợp của đất sét, lửa ngọn và kinh nghiệm điều chỉnh gió lò nung của các nghệ nhân cao niên Bát Tràng.',
    'Lau chùi bằng khăn mềm ẩm, cắm hoa tươi và thay nước định kỳ.',
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
    125000,
    150000,
    4.9,
    35,
    true,
    '["/products/coc-su-hoa-tiet-hoa-sen-ve-tay.avif"]'::jsonb,
    'Cốc gốm men rạn vẽ hoa sen thanh tao, thiết kế gọn gàng phù hợp góc học tập và bàn làm việc.',
    'Chiếc cốc được tạo tác từ đất phù sa sông Hồng, bề mặt phủ lớp men rạn ngà cổ kính. Họa tiết đóa sen búp vươn lên mộc mạc được vẽ tay từng nét bằng cọ lông mềm.',
    'Gốm men rạn Bát Tràng, men bóng trong lòng cốc',
    'Dung tích 380ml, Cao 11.5cm, Đường kính 8.5cm',
    'Từng cánh sen được nét vẽ của người thợ trẻ thế hệ thứ tư tại làng gốm thổi hồn tươi mới, trẻ trung.',
    'Dùng được trong lò vi sóng và máy rửa chén gia đình.',
    'Yêu thích',
    false
),
(
    'prod-04',
    'khay-tra-may-tre-dan-phu-vinh',
    'Khay Trà Mây Tre Đan Nan Mịn Xứ Đoài Phú Vinh',
    'may-tre',
    'Mây Tre Đan Thủ Công',
    'Làng mây tre đan Phú Vinh, Chương Mỹ, Hà Nội',
    185000,
    220000,
    4.9,
    56,
    true,
    '["/products/khay-tra-may-tre-dan-phu-vinh.webp"]'::jsonb,
    'Khay mây chữ nhật nan đan khít, xử lý sấy hun khói tự nhiên chống mối mọt không dùng hóa chất.',
    'Được đan từ những sợi mây tuyển chọn kỹ lưỡng, trải qua công đoạn chuốt nan mỏng như sợi miến.',
    'Mây rừng tự nhiên, nan tre già luộc sấy tự nhiên',
    '35cm x 24cm x Cao 4.5cm',
    'Nghệ nhân Phú Vinh cần từ 14 đến 18 tiếng đan thủ công để hoàn tất từng chiếc khay với đường nan đều tăm tắp.',
    'Để nơi khô ráo thoáng khí.',
    'Thủ công tinh xảo',
    true
),
(
    'prod-05',
    'hop-dung-qua-dan-tre-kem-nap',
    'Hộp Đựng Quà Đan Tre Tự Nhiên Kèm Quai Xách Gỗ',
    'may-tre',
    'Mây Tre Đan Thủ Công',
    'Làng mây tre đan Phú Vinh, Chương Mỹ, Hà Nội',
    95000,
    120000,
    4.7,
    19,
    true,
    '["/products/hop-dung-qua-dan-tre-kem-nap.jpg"]'::jsonb,
    'Hộp quà thân thiện môi trường, tôn vinh nét đẹp quà tặng văn hóa thủ công Việt Nam.',
    'Mẫu hộp đan tre xinh xắn được các bạn trẻ đặc biệt ưa chuộng dùng để gói bánh trung thu, mứt tết, trà sen hay quà sinh nhật.',
    'Cật tre nứa non chuốt dẻo, quai buộc sợi đay',
    'Vuông 18cm x 18cm x Cao 10cm',
    'Sản phẩm nằm trong dự án hỗ trợ phụ nữ và người lao động nông nhàn tại vùng quê Chương Mỹ.',
    'Bảo quản nơi khô ráo, tránh ngâm nước lâu ngày.',
    'Sống Xanh',
    false
),
(
    'prod-06',
    'long-den-nan-tre-lua-hoi-an',
    'Lồng Đèn Nan Tre Bọc Lụa Hội An Họa Tiết Cổ',
    'may-tre',
    'Mây Tre Đan Thủ Công',
    'Phố cổ Hội An, Quảng Nam',
    165000,
    195000,
    5.0,
    38,
    true,
    '["/products/long-den-nan-tre-lua-hoi-an.jpg"]'::jsonb,
    'Đèn lồng nan tre bọc lụa tơ tằm dệt họa tiết hoa cúc chìm, có thể xếp gọn dễ dàng mang đi xa.',
    'Khung đèn làm bằng tre già ngâm nước muối 10 ngày để chống mối mọt, sau đó uốn cong tỉ mỉ.',
    'Nan tre già uốn nhiệt, vải lụa tơ tằm dệt nổi, chuỗi tua rua ngũ sắc',
    'Đường kính bung tròn 30cm, thả dài cả tua rua 55cm',
    'Chế tác bởi các nghệ nhân làng lồng đèn truyền thống Hội An.',
    'Treo trong nhà hoặc hiên mát có mái che.',
    'Nổi bật',
    true
),
(
    'prod-07',
    'mat-na-giay-boi-trung-thu',
    'Mặt Nạ Giấy Bồi Dân Gian Vẽ Tay Hình Chú Tễu',
    'do-choi-qua-tang',
    'Đồ Chơi & Quà Tặng Dân Gian',
    'Làng Ông Hảo, Liêu Xá, Hưng Yên',
    85000,
    100000,
    4.8,
    47,
    true,
    '["/products/mat-na-giay-boi-trung-thu.jpg"]'::jsonb,
    'Mặt nạ giấy bồi vẽ tay Chú Tễu mặt tròn phúc hậu, nét đồ chơi Trung Thu cổ truyền xứ Bắc.',
    'Mặt nạ giấy bồi Ông Hảo được bồi từ 5-6 lớp giấy tái chế phết hồ nếp trên khuôn xi măng đúc sẵn, phơi nắng tự nhiên rồi vẽ từng nét son, nét mực đen sống động.',
    'Giấy báo tái chế bồi hồ nếp tinh bột, màu vẽ an toàn gốc nước',
    'Rộng 20cm x Cao 22cm (vừa vặn khuôn mặt)',
    'Gia đình nghệ nhân Vũ Huy Đông tại làng Ông Hảo đã hơn 40 năm bền bỉ giữ lửa nghề giấy bồi.',
    'Tránh tiếp xúc nước trực tiếp.',
    'Ký ức dân gian',
    false
),
(
    'prod-08',
    'bo-to-he-dan-gian-5-con-giap',
    'Bộ Tò He Đất Nặn Bột Nếp Dân Gian Xuân La (5 Mẫu)',
    'do-choi-qua-tang',
    'Đồ Chơi & Quà Tặng Dân Gian',
    'Làng nghề Tò He Xuân La, Phú Xuyên, Hà Nội',
    90000,
    110000,
    4.9,
    31,
    true,
    '["/products/bo-to-he-dan-gian-5-con-giap.avif"]'::jsonb,
    'Bộ 5 nhân vật tò he nặn từ bột nếp pha màu tự nhiên (gấc, nghệ, lá chàm), phủ bóng bảo quản.',
    'Tò he là món đồ chơi dân gian độc nhất vô nhị chỉ có ở Việt Nam. Từng thỏi bột dẻo quánh dưới bàn tay thoăn thoắt của nghệ nhân biến hóa thành các con giống ngộ nghĩnh.',
    'Bột gạo nếp dẻo, phẩm màu thực vật tự nhiên, que tre vót nhẵn',
    'Chiều cao mỗi mẫu 14cm - 16cm cả que cắm',
    'Xuân La là làng nghề nặn tò he duy nhất tại Việt Nam với bề dày lịch sử hơn 300 năm.',
    'Cắm lọ trang trí góc học tập khô ráo.',
    'Di sản độc đáo',
    true
),
(
    'prod-09',
    'tranh-dong-ho-dam-cuoi-chuot',
    'Tranh Dân Gian Đông Hồ Bản Khắc Gỗ - Đám Cưới Chuột',
    'do-choi-qua-tang',
    'Đồ Chơi & Quà Tặng Dân Gian',
    'Làng tranh Đông Hồ, Thuận Thành, Bắc Ninh',
    210000,
    250000,
    5.0,
    64,
    true,
    '["/products/tranh-dong-ho-dam-cuoi-chuot.jpg"]'::jsonb,
    'Bức tranh dân gian nổi tiếng in bằng bản khắc gỗ trên giấy điệp óng ánh vỏ sò điệp tự nhiên.',
    'Bức tranh trào lộng hóm hỉnh khắc họa đoàn chuột rộn ràng kèn trống đi cống phẩm cho mèo để xin đón dâu yên ổn.',
    'Giấy dó quét bột điệp biển, mực in từ khoáng thạch và thảo mộc',
    'Khổ tranh 38cm x 28cm (đã đóng nẹp tre mộc hai đầu)',
    'Được in thủ công tại xưởng nghệ nhân ưu tú dòng họ Nguyễn Đăng tại Đông Hồ, Bắc Ninh.',
    'Treo nơi khô thoáng, tránh ẩm mốc.',
    'Di sản quốc gia',
    true
),
(
    'prod-10',
    'khan-lua-to-tam-van-phuc-may-cuon',
    'Khăn Choàng Lụa Tơ Tằm Vạn Phúc Họa Tiết Vân Mây',
    'phu-kien-thoi-trang',
    'Trang Phục & Phụ Kiện Việt',
    'Làng lụa Vạn Phúc, Hà Đông, Hà Nội',
    280000,
    350000,
    4.9,
    52,
    true,
    '["/products/khan-lua-to-tam-van-phuc-may-cuon.jpg"]'::jsonb,
    'Khăn lụa tơ tằm tự nhiên 100%, dệt hoa văn mây cuộn chìm mềm mại, nhẹ nhàng và giữ ấm thanh lịch.',
    'Chiếc khăn dệt từ sợi tơ tằm thiên nhiên mềm mịn, mát vào mùa hè và ấm áp vào mùa thu đông. Họa tiết vân mây thời Lý ẩn hiện tinh tế.',
    '100% tơ tằm tự nhiên dệt hoa văn chìm jacquard',
    'Dài 180cm x Rộng 70cm',
    'Từng mét lụa được dệt từ khung cửi truyền thống của hợp tác xã dệt lụa cổ truyền Vạn Phúc.',
    'Giặt tay bằng dầu gội dịu nhẹ. Không vắt mạnh.',
    'Cao cấp',
    true
),
(
    'prod-11',
    'tui-tote-canvas-hoa-van-dong-son',
    'Túi Tote Vải Canvas Dày Họa Tiết Trống Đồng Đông Sơn',
    'phu-kien-thoi-trang',
    'Trang Phục & Phụ Kiện Việt',
    'Nếp Việt Creative Lab, Hà Nội',
    135000,
    160000,
    4.8,
    78,
    true,
    '["/products/tui-tote-canvas-hoa-van-dong-son.jpg"]'::jsonb,
    'Túi canvas phong cách năng động cho sinh viên, in lụa họa tiết chim Lạc và mặt trời Đông Sơn.',
    'Chiếc túi tote tối giản kết hợp hoàn hảo giữa nhịp sống hiện đại của học sinh, sinh viên và di sản nghìn năm văn hiến.',
    'Vải bố canvas mộc 100% cotton tự nhiên định lượng 320gsm',
    'Cao 38cm x Rộng 34cm x Đáy 8cm, Quai đeo vai 28cm',
    'Thiết kế độc quyền từ nhóm bạn trẻ đam mê văn hóa đồ họa cổ truyền tại Nếp Việt.',
    'Giặt tay với nước lạnh, lộn trái túi khi phơi.',
    'Sinh viên ưa chuộng',
    true
),
(
    'prod-12',
    'vi-cam-tay-tho-cam-sapa-hoa-sen',
    'Ví Cầm Tay Dệt Thổ Cẩm Hoa Sen Bản Tả Phìn Sa Pa',
    'phu-kien-thoi-trang',
    'Trang Phục & Phụ Kiện Việt',
    'Làng dệt thổ cẩm Tả Phìn, Sa Pa, Lào Cai',
    150000,
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
