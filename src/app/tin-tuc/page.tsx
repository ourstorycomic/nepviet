'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  X,
  Share2,
  ShoppingBag,
  CheckCircle2,
  BookmarkCheck,
} from 'lucide-react';
import { GoldWavyLine, TraditionalFlourish } from '@/components/GoldWavyLine';

interface RelatedProduct {
  name: string;
  price: string;
  originalPrice: string;
  image: string;
  slug: string;
  craftVillage: string;
  badge?: string;
}

interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  summary: string;
  author: string;
  authorRole: string;
  relatedProduct?: RelatedProduct;
  sections: ArticleSection[];
}

const ARTICLES: Article[] = [
  {
    id: 'tham-dinh-gom-men-lam-bat-trang',
    title: 'Thẩm Định Gốm Men Lam Bát Tràng: 4 Dấu Hiệu Phân Biệt Hàng Vẽ Tay Với In Decal',
    category: 'Thẩm định & Chọn mua',
    date: '18/11/2026',
    readTime: '6 phút đọc',
    image: '/showcase/gom-su-bat-trang.png',
    summary: 'Cách nhìn nước men lam khử, độ bóng chìm, vết cọ loang màu chuyển độ và âm vang tiếng gõ đanh như chuông để nhận diện tuyệt phẩm Bát Tràng chính hiệu.',
    author: 'Nghệ nhân Phạm Văn Tuấn',
    authorRole: 'Chủ nhiệm Xưởng Gốm Dòng Tộc Bát Tràng',
    relatedProduct: {
      name: 'Bộ Ấm Chén Men Lam Bát Tràng Dáng Trống',
      price: '580.000đ',
      originalPrice: '680.000đ',
      image: '/products/bo-am-chen-men-lam-bat-trang.jpg',
      slug: 'bo-am-chen-men-lam-bat-trang',
      craftVillage: 'Làng gốm Bát Tràng, Gia Lâm, Hà Nội',
      badge: 'Thủ công vẽ tay',
    },
    sections: [
      {
        heading: '1. Nước Men Lam Khử: Màu Sắc Biến Ảo Chìm Dưới Lớp Men Kính',
        paragraphs: [
          'Gốm men lam Bát Tràng truyền thống sử dụng ô-xít cô-ban (cobalt) vẽ trực tiếp lên cốt đất mộc trước khi phủ lớp men tro tự nhiên và nung ở nhiệt độ cao 1.280°C – 1.300°C. Do nung khử oxy bằng củi hoặc khí gas tự nhiên, màu lam ngấu chìm sâu dưới lớp men kính trong suốt, tạo chiều sâu thị giác mê hoặc.',
          'Ngược lại, hàng in decal công nghiệp rẻ tiền có màu sắc đều tăm tắp, bề mặt dại và nổi gờ cộm trên bề mặt do nung lại ở nhiệt độ thấp chỉ 700°C – 800°C, dễ bị trầy xước và bay màu sau thời gian ngắn sử dụng.',
        ],
      },
      {
        heading: '2. Nét Bút Lông Loang Mềm Độc Bản: Không Có Hai Sản Phẩm Trùng Lặp',
        paragraphs: [
          'Từng cánh hoa sen, nhánh trúc hay hình chim Lạc trên gốm vẽ tay thủ công đều ghi lại nhịp thở và độ nhấn nhá của người thợ. Nơi bút chạm đầu tiên màu sẽ đậm, nét vuốt cuối cọ màu loang thanh thoát.',
          'Nếu bạn so sánh hai chiếc chén trong cùng một bộ ấm chén vẽ tay Bát Tràng, bạn sẽ thấy sự khác biệt vi diệu về nét bút. Đó chính là linh hồn của sản phẩm thủ công di sản.',
        ],
      },
      {
        heading: '3. Âm Vang Tiếng Chuông Khi Gõ Nhẹ',
        paragraphs: [
          'Dùng đầu ngón tay hoặc que gỗ gõ nhẹ vào vành miệng chén hoặc thân bình. Gốm nung đủ độ lửa cao (trên 1.250°C) sẽ phát ra tiếng keng keng trong trẻo, ngân vang kéo dài tương tự như kim loại hay tiếng chuông khánh. Nếu âm thanh đục và cụt ngủn, cốt đất chưa chín hoặc bên trong đã có vết nứt ngầm.',
        ],
      },
    ],
  },
  {
    id: 'binh-hut-loc-chu-dau-men-tro-trau',
    title: 'Bình Hút Lộc Chu Đậu: Tuyệt Kỹ Men Tro Trấu 600 Năm & Vị Trí Đặt Phong Thủy',
    category: 'Quy trình chế tác',
    date: '16/11/2026',
    readTime: '7 phút đọc',
    image: '/products/binh-hoa-gom-men-ran.jpg',
    summary: 'Hành trình phục dựng dòng men tro trấu xác lập kỷ lục thế giới từ thế kỷ 14 của đất Nam Sách Hải Dương, cùng dáng bình chuẩn phong thủy miệng loe, cổ thắt, bụng phình.',
    author: 'Tiến sĩ Khảo Cổ Nguyễn Văn Hảo',
    authorRole: 'Cố vấn Di sản Gốm Cổ',
    relatedProduct: {
      name: 'Bình Hút Lộc Gốm Chu Đậu Men Tro Trấu Cổ',
      price: '850.000đ',
      originalPrice: '980.000đ',
      image: '/products/binh-hoa-gom-men-ran.jpg',
      slug: 'binh-hut-loc-chu-dau',
      craftVillage: 'Làng gốm Chu Đậu, Nam Sách, Hải Dương',
      badge: 'Cổ vật phục dựng',
    },
    sections: [
      {
        heading: '1. Ý Nghĩa Dáng Bình Phong Thủy Thu Hút & Giữ Chặt Tài Lộc',
        paragraphs: [
          'Bình hút lộc Chu Đậu mang dáng vẻ biểu tượng đặc trưng của triết lý phong thủy Á Đông: Miệng bình loe rộng đón tài khí từ tứ phương; Cổ bình thắt hẹp lại để tài lộc đi vào không bị thất thoát; Bụng bình phình to tròn trịa để tích tụ vượng khí, may mắn và phúc lộc cho gia chủ.',
          'Sản phẩm thường được đặt tại phòng khách, phòng làm việc hoặc bàn thờ gia tiên ở các hướng Đông Nam (cung Tài Lộc) hoặc Tây Bắc (cung Quý Nhân).',
        ],
      },
      {
        heading: '2. Tro Trấu Thóc Nếp - Bí Quyết Tạo Nước Men Rạn Trầm Mặc',
        paragraphs: [
          'Điểm độc nhất vô nhị làm nên danh tiếng toàn cầu của gốm Chu Đậu từ các cuộc trục vớt tàu đắm Cù Lao Chàm chính là lớp men tro trấu lúa nước. Tro của vỏ trấu nếp cái hoa vàng được tinh lọc, hòa cùng đất sét trắng và khoáng đá thiên nhiên.',
          'Khi qua lò nung lửa củi nhiệt độ cao, men tro trấu tạo ra màu vàng ngà óng ả, phủ lên bề mặt những đường rạn lục giác tự nhiên như mạng nhện hay vân da rạn chân chim đầy cổ kính.',
        ],
      },
    ],
  },
  {
    id: 'cam-nang-chon-lua-to-tam-van-phuc',
    title: 'Cẩm Nang Chọn Lụa Tơ Tằm Vạn Phúc: Phân Biệt Sợi Tự Nhiên & Mẹo Giữ Óng Ả',
    category: 'Thẩm định & Chọn mua',
    date: '14/11/2026',
    readTime: '5 phút đọc',
    image: '/showcase/lua-to-tam-van-phuc.jpg',
    summary: 'Cách thử nghiệm kéo sợi tơ, kiểm tra độ bắt sáng lấp lánh tự nhiên, và bí quyết giặt giữ lụa bằng dầu gội dịu nhẹ để khăn lụa bền đẹp cả thập kỷ.',
    author: 'Nghệ nhân Đỗ Thị Mai',
    authorRole: 'Nghệ nhân Làng Dệt Lụa Vạn Phúc (Hà Đông)',
    relatedProduct: {
      name: 'Khăn Choàng Lụa Tơ Tằm Vạn Phúc Họa Tiết Vân Mây',
      price: '420.000đ',
      originalPrice: '490.000đ',
      image: '/products/khan-choang-lua-to-tam-van-phuc.jpg',
      slug: 'khan-choang-lua-to-tam-van-phuc',
      craftVillage: 'Làng lụa Vạn Phúc, Hà Đông, Hà Nội',
      badge: '100% Tơ tằm tự nhiên',
    },
    sections: [
      {
        heading: '1. Nhận Diện Lụa Tơ Tằm 100% Qua Thị Giác & Xúc Giác',
        paragraphs: [
          'Lụa tơ tằm nguyên chất Vạn Phúc khi sờ vào cho cảm giác mướt mát, mềm rủ tự nhiên ôm lấy làn da. Đặc biệt, sợi tơ có cấu trúc lăng kính tam giác khúc xạ ánh sáng, khi nghiêng qua các góc nhìn khác nhau dưới ánh nắng mặt trời, lụa sẽ phản chiếu ánh sáng óng ả đổi màu tinh tế.',
          'Lụa sợi pha poly/nylon sờ vào có cảm giác trơn tuột giả tạo, tích điện gây bết rít vào mùa hanh khô, và màu sắc bóng lóa đồng nhất.',
        ],
      },
      {
        heading: '2. Mẹo Thử Lửa Cổ Truyền Cực Kỳ Chuẩn Xác',
        paragraphs: [
          'Rút một sợi chỉ nhỏ ở mép khăn và đốt thử: Sợi tơ tằm thật (chất sừng tự nhiên từ con tằm) khi cháy có mùi khen khét tương tự tóc cháy, tàn tro vỡ vụn đen xốp có thể bóp nát dễ dàng bằng hai ngón tay.',
          'Nếu sợi lụa vón cục nhựa cứng đen và có mùi khét hắc nồng nặc của hóa chất, đó chắc chắn là sợi tổng hợp nhân tạo.',
        ],
      },
      {
        heading: '3. Cách Giặt & Bảo Quản Lụa Đúng Chuẩn',
        paragraphs: [
          'Không giặt bằng xà phòng giặt tẩy mạnh hay nước nóng. Nên dùng vài giọt dầu gội đầu trẻ em hoặc sữa tắm pha loãng với nước ấm mát, vò nhẹ bằng tay trong 3 phút, tráng nước sạch rồi thấm khô bằng khăn bông, phơi nơi râm mát thoáng gió tránh ánh nắng trực tiếp.',
        ],
      },
    ],
  },
  {
    id: 'tra-shan-tuyet-suoi-giang-300-nam',
    title: 'Trà Shan Tuyết Cổ Thụ Suối Giàng 300 Năm: Nghệ Thuật Thu Hái & Bí Quyết Pha Trà Búp Trắng',
    category: 'Văn hóa ẩm thực & Trà',
    date: '12/11/2026',
    readTime: '6 phút đọc',
    image: '/showcase/am-thuc-tra-co-truyen.jpg',
    summary: 'Những cây chè cổ thụ cao lớn sừng sững giữa biển mây Yên Bái ở độ cao 1.400m, nơi đồng bào H’Mông hái từng búp trà bọc lớp lông tơ tuyết trắng tinh khôi.',
    author: 'Trà Sư Vũ Hữu Toàn',
    authorRole: 'Viện Nghiên Cứu Trà Cổ Thụ Việt Nam',
    relatedProduct: {
      name: 'Trà Shan Tuyết Cổ Thụ Suối Giàng 300 Năm Hộp Gỗ',
      price: '380.000đ',
      originalPrice: '450.000đ',
      image: '/products/hop-tra-sen-tay-ho-thuong-hang.jpg',
      slug: 'tra-shan-tuyet-suoi-giang',
      craftVillage: 'Suối Giàng, Văn Chấn, Yên Bái',
      badge: 'Trà di sản cổ thụ',
    },
    sections: [
      {
        heading: '1. Búp Trà Tắm Mây Vùng Núi Cao 1.400m',
        paragraphs: [
          'Suối Giàng (Yên Bái) sở hữu quần thể chè Shan Tuyết cổ thụ hàng trăm năm tuổi, thân cây bám rêu phong mốc meo, rễ đâm sâu vào lòng núi đá hút dưỡng chất tinh túy của đất trời Tây Bắc. Mỗi sớm mai, người H’Mông phải trèo lên ngọn cây cao để hái 1 tôm 2 lá búp trà phủ lớp lông tơ tuyết trắng bạc.',
          'Do hấp thụ khí lạnh sương mù quanh năm, trà Shan Tuyết có hàm lượng chất chống oxy hóa cao, vị chát dịu thanh nhã và hậu vị ngọt sâu lưu lại nơi cuống họng đến hàng giờ sau khi thưởng thức.',
        ],
      },
      {
        heading: '2. Bí Quyết Đánh Thức Trà Shan Tuyết Đúng Cách',
        paragraphs: [
          'Không dùng nước sôi 100°C trực tiếp vì sẽ làm cháy lông tuyết non. Nhiệt độ lý tưởng nhất là 85°C – 90°C. Đánh thức trà nhanh trong 5 giây rồi rót bỏ nước đầu. Hãm nước thứ hai từ 25 – 35 giây trong ấm gốm hoặc ấm tử sa. Trà Shan Tuyết cổ thụ có thể pha tới 8 – 10 nước mà sắc nước vàng mật ong và hương cốm ngào ngạt vẫn vẹn nguyên.',
        ],
      },
    ],
  },
  {
    id: 'ky-thuat-dan-may-tre-phu-vinh',
    title: 'Kỹ Thuật Đan Mây Tre Phú Vinh: Vì Sao Dáng Nón Xoắn Ốc Bền Đẹp Không Sợ Mối Mọt?',
    category: 'Quy trình chế tác',
    date: '10/11/2026',
    readTime: '5 phút đọc',
    image: '/showcase/may-tre-dan-phu-vinh.webp',
    summary: 'Bí mật luộc nước vôi trong, hun khói rơm nếp cổ truyền và bàn tay tài hoa chẻ nan tre mỏng như sợi tóc của làng nghề Phú Vinh Chương Mỹ.',
    author: 'Nghệ nhân Nguyễn Văn Tĩnh',
    authorRole: 'Nghệ nhân Ưu tú Mây Tre Đan Phú Vinh',
    relatedProduct: {
      name: 'Đèn Thả Mây Tre Dáng Nón Xoắn Ốc Phú Vinh',
      price: '320.000đ',
      originalPrice: '380.000đ',
      image: '/products/khay-tra-may-tre-dan-phu-vinh.webp',
      slug: 'den-tha-may-tre-phu-vinh',
      craftVillage: 'Làng mây tre Phú Vinh, Chương Mỹ, Hà Nội',
      badge: 'Nan mây xử lý tự nhiên',
    },
    sections: [
      {
        heading: '1. Tuyển Chọn Tre Nứa Già & Quy Trình Chống Mối Mọt Hoàn Toàn Tự Nhiên',
        paragraphs: [
          'Không sử dụng hóa chất độc hại, các nghệ nhân Phú Vinh chỉ thu hoạch tre nứa vào mùa khô cuối năm khi cây ít tích nước và ít tinh bột nhất. Cây tre được ngâm bùn ao hoặc luộc sôi cùng nước vôi trong theo tỷ lệ gia truyền để triệt tiêu vị ngọt tự nhiên hấp dẫn mối mọt.',
          'Sau đó, nan mây tre được đưa vào lò hun khói bằng rơm rạ nếp trong 3 ngày 3 đêm. Khói rơm phủ lên nan lớp màng bồ hóng thơm mùi rạ nếp, lên màu cánh gián tự nhiên và chống ẩm mốc tuyệt hảo trong điều kiện khí hậu nhiệt đới ẩm Việt Nam.',
        ],
      },
      {
        heading: '2. Kỹ Thuật Đan Nan Chéo Tinh Xảo Tạo Ánh Sáng Ấm Áp',
        paragraphs: [
          'Dáng chao đèn nón xoắn ốc được đan tay hoàn toàn bằng hàng ngàn sợi nan tre chuốt tròn đều chằn chặn. Khoảng cách giữa các nan được tính toán chính xác để khi bật đèn, ánh sáng vàng ấm hắt qua tạo hiệu ứng bóng đổ hoa văn lung linh trên trần và tường nhà.',
        ],
      },
    ],
  },
  {
    id: 'bo-co-tuong-go-huong-nhi-khe',
    title: 'Bộ Cờ Tướng Gỗ Hương Nhị Khê: Quy Trình Tiện Thủ Công & Thẩm Định Vân Gỗ Hương Đá',
    category: 'Thẩm định & Chọn mua',
    date: '08/11/2026',
    readTime: '5 phút đọc',
    image: '/showcase/qua-tang-do-choi-dan-gian.webp',
    summary: 'Làng nghề tiện gỗ Nhị Khê 600 năm tuổi: Từ thanh gỗ hương đá nguyên khối nặng trịch đến từng quân cờ gọt tiện sắc sảo, khắc chữ Nôm chìm mạ nhũ vàng.',
    author: 'Thợ Cả Lương Thế Vinh',
    authorRole: 'Làng Tiện Gỗ Nhị Khê, Thường Tín',
    relatedProduct: {
      name: 'Bộ Cờ Tướng Gỗ Hương Khắc Tay Nhị Khê Kèm Hộp Bàn Cờ',
      price: '450.000đ',
      originalPrice: '520.000đ',
      image: '/products/mat-na-giay-boi-dan-gian-chu-teu.jpg',
      slug: 'bo-co-tuong-go-huong-nhi-khe',
      craftVillage: 'Làng tiện gỗ Nhị Khê, Thường Tín, Hà Nội',
      badge: 'Gỗ hương đá tự nhiên',
    },
    sections: [
      {
        heading: '1. Gỗ Hương Đá Tự Nhiên: Mùi Thơm Thảo Mộc & Tiếng Đập Quân Đanh Chắc',
        paragraphs: [
          'Quân cờ tướng thủ công Nếp Việt được tiện từ gỗ hương đá tuyển chọn có tuổi đời trên 30 năm, tôm gỗ mịn màng và vân gỗ uốn lượn tự nhiên như bức tranh thủy mặc. Gỗ hương có mùi thơm dịu nhẹ thoang thoảng giúp an thần khi người chơi đăm chiêu suy nghĩ thế trận.',
          'Khi hạ quân cờ xuống mặt bàn, âm thanh va chạm phát ra tiếng lách cách đanh chắc, nặng tay và đằm thắm đặc trưng của dòng gỗ quý nhóm 1.',
        ],
      },
      {
        heading: '2. Khắc Chữ Nôm Chìm & Quét Nhũ Vàng Bền Bỉ',
        paragraphs: [
          'Chữ Tướng, Sĩ, Tượng, Xe, Pháo, Mã, Tốt được nghệ nhân dùng dao khắc nạo chìm sâu 1mm vào thịt gỗ rồi quét sơn nhũ màu vàng hoặc đỏ cổ truyền. Cách làm thủ công này đảm bảo dù chơi hàng vạn ván cờ, chữ cũng không bao giờ bị mòn mất nét như các loại cờ in mực giá rẻ ngoài chợ.',
        ],
      },
    ],
  },
  {
    id: 'bi-quyet-che-lam-thach-that',
    title: 'Bánh Chè Lam Thạch Thất: Hương Vị Nếp Cái Hoa Vàng Cay Nồng Vị Gừng Bên Chén Trà Chiều',
    category: 'Văn hóa ẩm thực & Trà',
    date: '06/11/2026',
    readTime: '4 phút đọc',
    image: '/products/hop-banh-com-hang-than-truyen-thong.jpg',
    summary: 'Món quà quê tiến vua của vùng đất xứ Đoài: Nếp cái hoa vàng rang nổ bỏng hoa cải, mạch nha kéo tơ và gừng già cay nồng ấm bụng mùa đông.',
    author: 'Bà Cụ Đỗ Thị Thơm',
    authorRole: 'Nghệ nhân Chè Lam Thạch Xá (Hà Nội)',
    relatedProduct: {
      name: 'Bánh Chè Lam Thạch Thất Cay Nồng Vị Gừng (Hộp 500g)',
      price: '75.000đ',
      originalPrice: '90.000đ',
      image: '/products/hop-banh-com-hang-than-truyen-thong.jpg',
      slug: 'che-lam-thach-that',
      craftVillage: 'Làng chè lam Thạch Xá, Thạch Thất, Hà Nội',
      badge: 'Món quà tiến vua xứ Đoài',
    },
    sections: [
      {
        heading: '1. Nếp Cái Hoa Vàng Nổ Bỏng Bột Tơi Mịn',
        paragraphs: [
          'Chè lam ngon chuẩn vị xứ Đoài phải làm từ gạo nếp cái hoa vàng đều hạt. Gạo nếp được rang thủ công trên chảo gang lửa vừa cho đến khi bung nở trắng muốt như những bông hoa cải nhỏ xíu, sau đó đem nghiền cối đá thành thứ bột tơi mịn như bụi tuyết.',
          'Nước mạch nha vàng óng nấu từ mộng lúa mì kết hợp cùng mật mía nguyên chất và gừng già giã nhuyễn lọc bỏ xơ. Khi quấy đều tay, bánh dẻo quánh, dẻo nhưng không hề dính răng, phủ bên ngoài lớp bột nếp thơm mát ngào ngạt.',
        ],
      },
      {
        heading: '2. Thức Quà Nhâm Nhi Lý Tưởng Cùng Trà Xanh',
        paragraphs: [
          'Cắt miếng chè lam nhỏ dày chừng nửa đốt ngón tay, nhấp một ngụm trà xanh nóng: Vị ngọt thanh của mật mía quyện cùng vị cay the ấm nồng của gừng già và bùi bùi giòn rụm của lạc rang tạo nên dư vị đậm đà khó quên của mùa thu đông Bắc Bộ.',
        ],
      },
    ],
  },
  {
    id: 'tranh-hang-trong-to-nu-von-mau',
    title: 'Tranh Hàng Trống: Đỉnh Cao Kỹ Thuật Vờn Màu Nửa Bút Nửa Nước Trên Giấy Dó',
    category: 'Sự kiện & Làng nghề',
    date: '04/11/2026',
    readTime: '6 phút đọc',
    image: '/showcase/banner-tranh-dong-ho-do-choi.jpg',
    summary: 'Nét thanh mảnh tao nhã của bốn cô Tố Nữ thổi sáo, đánh đàn, kéo nhị: Sự kết hợp giữa đường nét khắc gỗ tinh vi và bàn tay tô vờn màu biến ảo của người phố cổ Hà Nội.',
    author: 'Nghệ nhân Lê Đình Nghiên',
    authorRole: 'Nghệ nhân Tranh Hàng Trống Cuối Cùng',
    relatedProduct: {
      name: 'Tranh Dân Gian Hàng Trống Tố Nữ Bản In Khắc Gỗ Phục Dựng',
      price: '380.000đ',
      originalPrice: '450.000đ',
      image: '/products/tranh-dan-gian-dong-ho-dam-cuoi-chuot.jpg',
      slug: 'tranh-hang-trong-to-nu',
      craftVillage: 'Phố tranh Hàng Trống, Hoàn Kiếm, Hà Nội',
      badge: 'Di sản Kinh kỳ',
    },
    sections: [
      {
        heading: '1. Kỹ Thuật Vờn Màu Nửa Bút Nước, Nửa Bút Phẩm',
        paragraphs: [
          'Nếu như tranh Đông Hồ in màu trực tiếp bằng bản khắc gỗ thì tranh Hàng Trống chỉ dùng bản khắc gỗ để in đường nét chỉ viền đen bằng mực tàu. Toàn bộ phần màu sắc được nghệ nhân tô tay bằng ngọn bút lông.',
          'Đặc biệt nhất là kỹ thuật vờn màu: Đầu ngọn bút chấm mực phẩm màu, nửa thân bút chấm nước lọc trong suốt. Khi đưa cọ quét lướt trên mặt giấy dó, màu sắc tự chuyển từ đậm sang nhạt êm mượt vô cùng, tạo nên nếp váy lụa bồng bềnh và gương mặt mỹ nữ mềm mại.',
        ],
      },
    ],
  },
  {
    id: 'khan-ran-nam-bo-det-long-khanh',
    title: 'Khăn Rằn Nam Bộ Dệt Thủ Công: Sợi Bông Mộc Thấm Hút & Biểu Tượng Hào Sảng Phương Nam',
    category: 'Thẩm định & Chọn mua',
    date: '02/11/2026',
    readTime: '4 phút đọc',
    image: '/showcase/lua-to-tam-van-phuc.jpg',
    summary: 'Chiếc khăn ô vuông đen trắng gắn liền với chiếc áo bà ba và tính cách bao dung, phóng khoáng của con người vùng sông nước Cửu Long.',
    author: 'Nhà Văn Hóa Trần Văn Bảy',
    authorRole: 'Chi Hội Di Sản Văn Hóa Miền Tây',
    relatedProduct: {
      name: 'Khăn Rằn Nam Bộ Dệt Thủ Công Sợi Cotton Tự Nhiên Long Khánh',
      price: '95.000đ',
      originalPrice: '120.000đ',
      image: '/products/khan-lua-van-phuc.webp',
      slug: 'khan-ran-nam-bo',
      craftVillage: 'Làng dệt khăn rằn Long Khánh, Đồng Tháp',
      badge: 'Dệt thủ công Nam Bộ',
    },
    sections: [
      {
        heading: '1. Sợi Bông Cotton Mộc Mạc & Thấm Hút Mồ Hôi Tuyệt Vời',
        paragraphs: [
          'Khăn rằn Long Khánh dệt từ 100% sợi bông mộc tự nhiên, càng giặt càng mềm và có độ xốp thoáng khí đặc trưng. Chiếc khăn vừa che nắng gay gắt ban trưa, vừa thấm hút mồ hôi cho người lao động, vừa có thể quàng cổ giữ ấm trong những buổi tối se lạnh.',
        ],
      },
    ],
  },
  {
    id: 'hoi-cho-gom-bat-trang-2026',
    title: 'Hội Chợ Triển Lãm Gốm Sứ Bát Tràng 2026: Đánh Thức Dòng Men Hoả Biến Đương Đại',
    category: 'Sự kiện & Làng nghề',
    date: '28/10/2026',
    readTime: '4 phút đọc',
    image: '/products/binh-hoa-gom-men-hoa-bien-ngoc-bich.jpg',
    summary: 'Không gian quy tụ hơn 50 nghệ nhân kỳ cựu và các nhà thiết kế trẻ nhằm hồi sinh những dáng gốm men lam, men rạn cổ trong đời sống kiến trúc nội thất đương đại.',
    author: 'Ban Tổ Chức Tuần Lễ Di Sản',
    authorRole: 'Hiệp hội Làng nghề Hà Nội',
    relatedProduct: {
      name: 'Bình Hoa Gốm Men Hỏa Biến Ngọc Bích Khắc Tay',
      price: '340.000đ',
      originalPrice: '420.000đ',
      image: '/products/binh-hoa-gom-men-hoa-bien-ngoc-bich.jpg',
      slug: 'binh-hoa-gom-men-hoa-bien-ngoc-bich',
      craftVillage: 'Làng gốm Bát Tràng, Gia Lâm, Hà Nội',
      badge: 'Men hỏa biến độc bản',
    },
    sections: [
      {
        heading: '1. Cuộc Giao Thoa Giữa Kỹ Thuật Lò Nung Cổ & Thẩm Mỹ Tối Giản',
        paragraphs: [
          'Triển lãm năm nay chứng kiến sự bùng nổ của các sản phẩm men hỏa biến ngọc bích. Dưới nhiệt độ 1.300°C, các khoáng chất tự nhiên tương tác với lửa để tạo nên những vết vân cẩm thạch ngẫu nhiên không thể sao chép, làm say lòng giới kiến trúc sư và người yêu gốm mộc mạc.',
        ],
      },
    ],
  },
  {
    id: 'goi-y-qua-tang-sinh-vien',
    title: 'Gợi Ý 5 Món Quà Thủ Công Độc Bản Vừa Túi Tiền Sinh Viên (100k - 250k)',
    category: 'Thẩm định & Chọn mua',
    date: '22/10/2026',
    readTime: '4 phút đọc',
    image: '/showcase/banner-moc-mac-may-tre.jpg',
    summary: 'Từ cốc sứ vẽ tay hoa sen thanh nhã, túi tote họa tiết chim Lạc trống đồng đến giỏ cơm mây tre: Món quà tinh tế mang trọn hồn cốt Việt với mức giá thân thiện.',
    author: 'Ban Biên Tập Nếp Việt',
    authorRole: 'Chuyên trang Tiêu dùng Di sản Trẻ',
    relatedProduct: {
      name: 'Túi Tote Vải Canvas Dày Họa Tiết Trống Đồng Đông Sơn',
      price: '160.000đ',
      originalPrice: '190.000đ',
      image: '/products/tui-tote-canvas-hoa-tiet-trong-dong.jpg',
      slug: 'tui-tote-canvas-hoa-tiet-trong-dong',
      craftVillage: 'Xưởng in thủ công Đông Sơn, Hà Nội',
      badge: 'Học sinh sinh viên',
    },
    sections: [
      {
        heading: '1. Tiêu Chí Chọn Quà: Ý Nghĩa, Bền Bỉ & Giá Trị Sử Dụng Cao',
        paragraphs: [
          'Tặng quà thủ công di sản không chỉ trao đi một món đồ mà còn là gửi gắm lời chúc may mắn, niềm tự hào cội nguồn. Với ngân sách từ 100.000đ đến 250.000đ, các bạn trẻ có thể dễ dàng lựa chọn những món đồ vừa mang tính ứng dụng thường nhật vừa đậm chất nghệ thuật.',
        ],
      },
    ],
  },
  {
    id: 'dam-cuoi-chuot-tranh-dong-ho',
    title: 'Đám Cưới Chuột & Khát Vọng Thổi Hồn Hiện Đại Vào Tranh Dân Gian Đông Hồ',
    category: 'Sự kiện & Làng nghề',
    date: '15/10/2026',
    readTime: '6 phút đọc',
    image: '/showcase/tranh-dan-gian-dong-ho.jpg',
    summary: 'Bản khắc gỗ thị trăm tuổi, giấy điệp lấp lánh vỏ sò điệp biển và màu sắc tự nhiên từ hoa dành dành, tro lá tre: Hành trình giữ gìn di sản bên bờ sông Đuống.',
    author: 'Nghệ nhân Nguyễn Đăng Chế',
    authorRole: 'Nghệ nhân Dân gian Đông Hồ (Bắc Ninh)',
    relatedProduct: {
      name: 'Tranh Dân Gian Đông Hồ Bản Khắc Gỗ - Đám Cưới Chuột',
      price: '210.000đ',
      originalPrice: '250.000đ',
      image: '/products/tranh-dan-gian-dong-ho-dam-cuoi-chuot.jpg',
      slug: 'tranh-dan-gian-dong-ho-dam-cuoi-chuot',
      craftVillage: 'Làng tranh Đông Hồ, Thuận Thành, Bắc Ninh',
      badge: 'Di sản quốc gia',
    },
    sections: [
      {
        heading: '1. Triết Lý Nhân Sinh Trào Phúng Hóm Hỉnh',
        paragraphs: [
          'Bức tranh Đám Cưới Chuột châm biếm sâu cay chế độ phong kiến hủ bại qua hình ảnh đàn chuột thổi kèn gõ trống rước dâu linh đình nhưng vẫn phải mang chim câu, cá chép cống nạp cho chú mèo béo mẫm. Triết lý ứng xử khôn khéo, dĩ hòa vi quý của người Việt cổ xưa được khắc họa bằng những nét vẽ mộc mạc mà thâm thúy.',
        ],
      },
    ],
  },
];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = [
    { id: 'all', name: 'Tất cả bài viết' },
    { id: 'Thẩm định & Chọn mua', name: 'Thẩm định & Chọn mua' },
    { id: 'Quy trình chế tác', name: 'Quy trình chế tác' },
    { id: 'Văn hóa ẩm thực & Trà', name: 'Văn hóa ẩm thực & Trà' },
    { id: 'Sự kiện & Làng nghề', name: 'Sự kiện & Làng nghề' },
  ];

  const filteredArticles = activeCategory === 'all'
    ? ARTICLES
    : ARTICLES.filter(a => a.category === activeCategory);

  const handleShare = (article: Article) => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/tin-tuc#${article.id}`;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="bg-[#14100E] text-[#EDE4D8] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Title with Red Lacquer Pattern */}
        <div className="relative w-full py-16 sm:py-24 px-6 sm:px-12 rounded-[32px] overflow-hidden bg-[#3D0A10] border border-[#52121A] shadow-2xl text-center">
          {/* Dong Son Lacquer Pattern Background - High Visibility */}
          <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-90"
            style={{ backgroundImage: `url('/patterns/background-hoa-van.webp')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14100E] via-transparent to-black/40 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A0608]/90 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/40 shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Tạp Chí & Cẩm Nang Di Sản Nếp Việt</span>
            </div>
            <h1 className="font-headline font-black text-3xl sm:text-5xl text-[#FAF6F0] tracking-[0.02em] leading-[1.65] text-gold-luminous">
              Tin Tức, Cẩm Nang Sản Phẩm & Làng Nghề
            </h1>
            <TraditionalFlourish />
            <p className="text-xs sm:text-sm text-[#EDE4D8]/85 leading-relaxed font-subtext max-w-2xl mx-auto">
              Kho tư liệu hướng dẫn thẩm định đồ thủ công mỹ nghệ thật - giả, bí quyết chế tác bí truyền của nghệ nhân, và những thông tin chi tiết giúp bạn chọn mua sản phẩm di sản chính gốc.
            </p>
            <GoldWavyLine className="pt-2" />
          </div>
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#A82B1D] text-white shadow-lg border border-[#D4AF37]/40'
                  : 'bg-[#1C1614] text-[#EDE4D8]/80 border border-[#362924] hover:bg-[#251D1A] hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Featured Big Card (Article 0) */}
        {filteredArticles.length > 0 && (
          <div className="bg-[#1C1614] rounded-3xl overflow-hidden border border-[#362924] hover:border-[#C5A880]/60 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0 items-center transition-all duration-300">
            <div className="lg:col-span-7 relative h-72 sm:h-96 w-full cursor-pointer group" onClick={() => setSelectedArticle(filteredArticles[0])}>
              <Image
                src={filteredArticles[0].image}
                alt={filteredArticles[0].title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-nepred-600 text-white text-xs font-bold shadow-md">
                  Cẩm nang nổi bật
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 space-y-4">
              <div className="flex items-center gap-3 text-xs text-[#8C7A70]">
                <span className="font-semibold text-[#C5A880]">{filteredArticles[0].category}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#EDE4D8]">
                  <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                  {filteredArticles[0].date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#EDE4D8]">
                  <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                  {filteredArticles[0].readTime}
                </span>
              </div>

              <h2
                onClick={() => setSelectedArticle(filteredArticles[0])}
                className="font-headline font-bold text-xl sm:text-2xl text-[#FAF6F0] leading-snug cursor-pointer hover:text-[#C5A880] transition-colors"
              >
                {filteredArticles[0].title}
              </h2>

              <p className="text-xs sm:text-sm text-[#EDE4D8]/80 leading-relaxed font-subtext">
                {filteredArticles[0].summary}
              </p>

              {filteredArticles[0].relatedProduct && (
                <div className="p-3 bg-[#231B19] rounded-2xl border border-[#382B26] flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#14100E] flex-shrink-0 border border-[#362924]">
                    <Image
                      src={filteredArticles[0].relatedProduct.image}
                      alt={filteredArticles[0].relatedProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-[#C5A880] uppercase tracking-wide">Sản phẩm liên quan</span>
                    <p className="text-xs font-semibold text-[#FAF6F0] truncate">{filteredArticles[0].relatedProduct.name}</p>
                    <span className="text-xs font-bold text-[#D4AF37]">{filteredArticles[0].relatedProduct.price}</span>
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[#FAF6F0]">{filteredArticles[0].author}</p>
                  <p className="text-[10px] text-[#8C7A70] italic">{filteredArticles[0].authorRole}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(filteredArticles[0])}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#251D1A] hover:bg-[#322621] text-xs font-bold text-[#C5A880] hover:text-white border border-[#3E2D26] hover:border-[#C5A880]/50 transition-colors"
                >
                  <span>Đọc cẩm nang</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3-Column Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.slice(1).map((article) => (
            <div
              key={article.id}
              className="bg-[#1C1614] rounded-3xl overflow-hidden border border-[#362924] hover:border-[#C5A880]/60 shadow-xl flex flex-col group hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className="relative aspect-[16/10] w-full overflow-hidden bg-[#14100E] cursor-pointer"
                onClick={() => setSelectedArticle(article)}
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.8]"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#14100E]/90 border border-[#362924] text-[#C5A880] text-[10px] font-bold">
                  {article.category}
                </span>
                {article.relatedProduct && (
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-[#24080B]/90 border border-[#4A1017] text-[#D4AF37] text-[10px] font-semibold flex items-center gap-1">
                    <ShoppingBag className="w-2.5 h-2.5" />
                    Có sản phẩm liên quan
                  </span>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-[#8C7A70]">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{article.date}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{article.readTime}</span>
                  </div>

                  <h3
                    onClick={() => setSelectedArticle(article)}
                    className="font-headline font-bold text-base text-[#FAF6F0] group-hover:text-[#C5A880] transition-colors leading-snug cursor-pointer line-clamp-2"
                  >
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#EDE4D8]/75 line-clamp-3 leading-relaxed font-subtext">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#362924] flex items-center justify-between">
                  <div className="truncate pr-2">
                    <p className="text-[11px] font-medium text-[#FAF6F0] truncate">{article.author}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(article)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#C5A880] hover:text-white flex-shrink-0 transition-colors"
                  >
                    <span>Xem bài</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Culture Workshop Invitation Card */}
        <div className="relative p-8 md:p-10 rounded-3xl bg-[#3D0A10] border border-[#52121A] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-90 bg-cover bg-center"
            style={{ backgroundImage: `url('/patterns/background-hoa-van.webp')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#24080B]/50 via-transparent to-[#14100E]/70 pointer-events-none" />
          <div className="relative z-10 space-y-2.5 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3D1016] border border-[#C5A880]/30 text-[#E8C59A] text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5 text-[#C5A880]" strokeWidth={1.5} />
              <span className="uppercase tracking-wider text-[11px]">Đăng Ký Tham Gia Workshop Cuối Tuần</span>
            </span>
            <h3 className="font-headline font-bold text-2xl md:text-3xl text-[#FAF6F0] text-gold-luminous">
              Cùng Nghệ Nhân Thổi Hồn Đất Sét & Nan Tre
            </h3>
            <p className="text-xs md:text-sm text-[#EDE4D8]/80 leading-relaxed font-subtext">
              Các lớp học làm đồ thủ công dân gian dành riêng cho sinh viên và bạn trẻ yêu văn hóa. Miễn phí nguyên vật liệu và được mang thành phẩm về nhà.
            </p>
          </div>

          <Link
            href="/lien-he"
            className="relative z-10 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#8B1E2B] to-[#A32434] hover:from-[#A32434] hover:to-[#B82B3E] text-[#FAF6F0] font-headline font-bold text-xs uppercase tracking-wider shadow-xl transition-all text-center flex-shrink-0 border border-[#C5A880]/30 hover:scale-[1.02]"
          >
            Đăng ký giữ chỗ ngay
          </Link>
        </div>

      </div>

      {/* Interactive In-Depth Article Reader Modal */}
      {selectedArticle && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-[#171210] w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-[#362924] max-h-[90vh] flex flex-col my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="relative p-4 sm:p-5 border-b border-[#362924] bg-[#24080B] flex items-center justify-between overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none opacity-20 mix-blend-luminosity bg-cover bg-center"
                style={{ backgroundImage: `url('/patterns/background-hoa-van.webp')` }}
              />
              <div className="relative z-10 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#3D1016] border border-[#C5A880]/40 text-[#E8C59A] text-xs font-bold font-headline uppercase tracking-wider">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-[#EDE4D8]/70">• {selectedArticle.readTime}</span>
              </div>
              <div className="relative z-10 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleShare(selectedArticle)}
                  className="p-2 rounded-xl text-[#EDE4D8]/70 hover:text-[#FAF6F0] hover:bg-white/10 transition-colors"
                  title="Sao chép liên kết bài viết"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 rounded-xl text-[#EDE4D8]/70 hover:text-[#FAF6F0] hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body Scrollable */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* Copy link toast */}
              {copiedLink && (
                <div className="p-3 bg-[#1C281F] text-[#86EFAC] rounded-xl text-xs font-semibold flex items-center gap-2 border border-[#22C55E]/30 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" />
                  <span>Đã sao chép liên kết bài viết vào clipboard!</span>
                </div>
              )}

              {/* Title & Metadata */}
              <div className="space-y-3">
                <h1 className="font-headline font-bold text-2xl sm:text-3xl text-[#FAF6F0] leading-snug text-gold-luminous">
                  {selectedArticle.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#EDE4D8]/70 pt-1">
                  <span className="font-semibold text-[#FAF6F0]">{selectedArticle.author}</span>
                  <span>({selectedArticle.authorRole})</span>
                  <span>•</span>
                  <span>{selectedArticle.date}</span>
                </div>
              </div>

              {/* Banner Image */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#241D1A] border border-[#362924] shadow-md">
                <Image
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Summary lead */}
              <div className="p-4 bg-[#24080B]/60 rounded-2xl border-l-4 border-[#C5A880] text-[#EDE4D8] text-sm leading-relaxed italic font-subtext">
                {selectedArticle.summary}
              </div>

              {/* Article Content Sections */}
              <div className="space-y-6 text-[#EDE4D8] text-sm sm:text-base leading-relaxed">
                {selectedArticle.sections.map((section, idx) => (
                  <div key={idx} className="space-y-3">
                    <h2 className="font-headline font-bold text-lg text-[#C5A880]">
                      {section.heading}
                    </h2>
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-[#EDE4D8]/85 text-xs sm:text-sm leading-relaxed font-subtext">
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </div>

              {/* Related Craft Product Card */}
              {selectedArticle.relatedProduct && (
                <div className="mt-8 p-5 rounded-2xl bg-[#1C1614] border border-[#362924] space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#E8C59A] uppercase tracking-wider">
                    <BookmarkCheck className="w-4 h-4 text-[#C5A880]" />
                    <span>Sản Phẩm Thủ Công Gợi Ý Cho Bạn</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#241D1A] flex-shrink-0 border border-[#362924]">
                      <Image
                        src={selectedArticle.relatedProduct.image}
                        alt={selectedArticle.relatedProduct.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 text-center sm:text-left space-y-1">
                      {selectedArticle.relatedProduct.badge && (
                        <span className="inline-block px-2 py-0.5 rounded-full bg-[#3D1016] border border-[#C5A880]/30 text-[#E8C59A] text-[10px] font-bold">
                          {selectedArticle.relatedProduct.badge}
                        </span>
                      )}
                      <h3 className="font-headline font-bold text-sm sm:text-base text-[#FAF6F0]">
                        {selectedArticle.relatedProduct.name}
                      </h3>
                      <p className="text-xs text-[#EDE4D8]/70">
                        Xuất xứ: {selectedArticle.relatedProduct.craftVillage}
                      </p>
                      <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                        <span className="font-bold text-base text-[#C5A880]">
                          {selectedArticle.relatedProduct.price}
                        </span>
                        <span className="text-xs text-[#EDE4D8]/40 line-through">
                          {selectedArticle.relatedProduct.originalPrice}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/san-pham/${selectedArticle.relatedProduct.slug}`}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B1E2B] to-[#A32434] hover:from-[#A32434] hover:to-[#B82B3E] text-[#FAF6F0] font-headline font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all flex-shrink-0 border border-[#C5A880]/30"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Xem sản phẩm</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#362924] bg-[#14100E] flex items-center justify-between">
              <span className="text-xs text-[#EDE4D8]/60">Tạp chí Nếp Việt • Bản quyền di sản thủ công</span>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 rounded-xl bg-[#241D1A] border border-[#362924] text-[#EDE4D8] hover:bg-[#322722] text-xs font-semibold transition-colors"
              >
                Đóng bài viết
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
