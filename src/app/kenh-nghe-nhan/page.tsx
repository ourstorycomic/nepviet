'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useProducts } from '@/utils/productsCatalog';
import { formatCurrency } from '@/utils/format';
import {
  Store,
  Package,
  ShoppingBag,
  Wallet,
  Award,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  Truck,
  Flame,
  ArrowUpRight,
  TrendingUp,
  ExternalLink,
  ChevronRight,
  Search,
  Filter,
  LogOut,
  Sparkles,
  ShieldCheck,
  Check,
  Building2,
  FileText,
  DollarSign,
  ArrowDownLeft,
  Banknote,
  Send,
  X,
  MapPin,
} from 'lucide-react';

interface ArtisanProduct {
  id: string;
  slug?: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  inStock: boolean;
  stockCount: number;
  image: string;
  status: 'active' | 'pending' | 'rejected' | 'out_of_stock';
  material: string;
  badge?: string;
  totalSold: number;
  rejectionReason?: string;
}

interface ArtisanPayout {
  id: string;
  period: string;
  date: string;
  revenue: number;
  fee: number;
  amount: number;
  status: 'completed' | 'processing';
}

const DEFAULT_ARTISAN_PAYOUTS: ArtisanPayout[] = [
  {
    id: 'PAY-2026-11A',
    period: '01/11/2026 - 15/11/2026',
    date: '16/11/2026',
    revenue: 12500000,
    fee: 1000000,
    amount: 11500000,
    status: 'completed',
  },
  {
    id: 'PAY-2026-10B',
    period: '16/10/2026 - 31/10/2026',
    date: '01/11/2026',
    revenue: 8400000,
    fee: 672000,
    amount: 7728000,
    status: 'completed',
  },
];

interface ArtisanOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  city: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  total: number;
  status: 'received' | 'crafting' | 'packed' | 'shipped';
  orderDate: string;
  customNote?: string;
}

const INITIAL_ARTISAN_PRODUCTS: ArtisanProduct[] = [
  {
    id: 'art-prod-01',
    name: 'Bộ Ấm Chén Men Lam Bát Tràng Dáng Trống',
    category: 'Gốm Sứ Mỹ Nghệ',
    price: 580000,
    originalPrice: 680000,
    inStock: true,
    stockCount: 18,
    image: '/products/bo-am-chen-men-lam-bat-trang.jpg',
    status: 'active',
    material: 'Đất cao lanh, nung khử oxy 1.300°C',
    badge: 'Bán chạy',
    totalSold: 42,
  },
  {
    id: 'art-prod-02',
    name: 'Bình Hoa Gốm Men Hỏa Biến Ngọc Bích Khắc Tay',
    category: 'Gốm Sứ Mỹ Nghệ',
    price: 340000,
    originalPrice: 420000,
    inStock: true,
    stockCount: 9,
    image: '/products/lo-hoa-men-hoa-bien-ngoc-bich.jpg',
    status: 'active',
    material: 'Men khoáng đá tự nhiên, lò củi',
    badge: 'Độc bản',
    totalSold: 28,
  },
  {
    id: 'art-prod-03',
    name: 'Cốc Sứ Hoa Sen Vẽ Tay Men Lam Nung Củi',
    category: 'Gốm Sứ Mỹ Nghệ',
    price: 120000,
    originalPrice: 150000,
    inStock: true,
    stockCount: 35,
    image: '/products/coc-su-hoa-tiet-hoa-sen-ve-tay.avif',
    status: 'active',
    material: 'Cốt sứ trắng Bát Tràng, vẽ lam tay',
    badge: 'Học sinh sinh viên',
    totalSold: 85,
  },
  {
    id: 'art-prod-04',
    name: 'Đĩa Cảnh Gốm Bát Tràng Chim Lạc Họa Tiết Trống Đồng',
    category: 'Gốm Sứ Mỹ Nghệ',
    price: 480000,
    originalPrice: 560000,
    inStock: true,
    stockCount: 12,
    image: '/products/bo-am-chen-men-lam-bat-trang.jpg',
    status: 'active',
    material: 'Men lam cổ truyền, đế gỗ tiện',
    badge: 'Quà tặng ngoại giao',
    totalSold: 19,
  },
  {
    id: 'art-prod-05',
    name: 'Bình Tỳ Bà Men Rạn Hoàng Tộc Dáng Cổ',
    category: 'Gốm Sứ Mỹ Nghệ',
    price: 720000,
    originalPrice: 850000,
    inStock: false,
    stockCount: 0,
    image: '/products/binh-hoa-gom-men-ran.jpg',
    status: 'out_of_stock',
    material: 'Men rạn tam thái, bọc đồng miệng',
    badge: 'Đang nung lò mới',
    totalSold: 14,
  },
  {
    id: 'art-prod-06',
    name: 'Âm Chén Dáng Quả Lê Vẽ Cảnh Chùa Một Cột',
    category: 'Gốm Sứ Mỹ Nghệ',
    price: 520000,
    originalPrice: 600000,
    inStock: true,
    stockCount: 5,
    image: '/products/bo-am-chen-men-lam-bat-trang.jpg',
    status: 'pending',
    material: 'Đất gốm sa khoáng Bát Tràng',
    badge: 'Chờ Sàn Duyệt Tem OCOP',
    totalSold: 0,
  },
];

const INITIAL_ARTISAN_ORDERS: ArtisanOrder[] = [
  {
    id: 'ORD-XUONG-881',
    customerName: 'Trần Thu Trang',
    customerPhone: '0984 123 456',
    city: 'Hà Nội',
    productName: 'Bộ Ấm Chén Men Lam Bát Tràng Dáng Trống',
    productImage: '/products/bo-am-chen-men-lam-bat-trang.jpg',
    quantity: 1,
    price: 580000,
    total: 580000,
    status: 'received',
    orderDate: '23/11/2026 14:15',
    customNote: 'Khách yêu cầu bọc giấy rơm lót lụa vàng làm quà mừng tân gia.',
  },
  {
    id: 'ORD-XUONG-879',
    customerName: 'Hoàng Minh Quân',
    customerPhone: '0912 654 987',
    city: 'TP. Hồ Chí Minh',
    productName: 'Bình Hoa Gốm Men Hỏa Biến Ngọc Bích Khắc Tay',
    productImage: '/products/lo-hoa-men-hoa-bien-ngoc-bich.jpg',
    quantity: 2,
    price: 340000,
    total: 680000,
    status: 'crafting',
    orderDate: '22/11/2026 09:30',
    customNote: 'Chọn 2 chiếc vân ngọc bích đối xứng nhau.',
  },
  {
    id: 'ORD-XUONG-875',
    customerName: 'Lê Thanh Thảo',
    customerPhone: '0978 332 114',
    city: 'Đà Nẵng',
    productName: 'Cốc Sứ Hoa Sen Vẽ Tay Men Lam Nung Củi',
    productImage: '/products/coc-su-hoa-tiet-hoa-sen-ve-tay.avif',
    quantity: 4,
    price: 120000,
    total: 480000,
    status: 'packed',
    orderDate: '21/11/2026 16:40',
    customNote: 'Gửi kèm thiệp viết tay Nếp Việt.',
  },
  {
    id: 'ORD-XUONG-864',
    customerName: 'Phạm Hồng Phong',
    customerPhone: '0905 778 991',
    city: 'Hải Phòng',
    productName: 'Đĩa Cảnh Gốm Bát Tràng Chim Lạc Họa Tiết Trống Đồng',
    productImage: '/products/bo-am-chen-men-lam-bat-trang.jpg',
    quantity: 1,
    price: 480000,
    total: 480000,
    status: 'shipped',
    orderDate: '20/11/2026 10:10',
    customNote: 'Đã bàn giao bưu tá Viettel Post.',
  },
];

function ArtisanStudioContent() {
  const router = useRouter();
  const { adminUser, logoutAdmin } = useAuth();
  const { products: catalogProducts, addProduct, updateProduct } = useProducts();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'wallet' | 'profile'>('overview');

  // Load artisan-specific craft pieces from persistent LocalStorage
  const [customArtisanProducts, setCustomArtisanProducts] = useState<ArtisanProduct[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('nepviet_custom_artisan_products');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch (e) { }
    }
    return [];
  });

  // Orders state persisted in LocalStorage
  const [orders, setOrders] = useState<ArtisanOrder[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nepviet_artisan_orders');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) { }
    }
    return INITIAL_ARTISAN_ORDERS;
  });

  // Payout history state persisted in LocalStorage
  const [payouts, setPayouts] = useState<ArtisanPayout[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('nepviet_artisan_payouts');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) { }
    }
    return DEFAULT_ARTISAN_PAYOUTS;
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Stacked Toasts State
  interface ToastItem {
    id: number;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Price Edit Custom Modal State
  const [editingPriceItem, setEditingPriceItem] = useState<{ id: string; name: string; price: number } | null>(null);
  const [inputNewPrice, setInputNewPrice] = useState<number>(350000);

  // New Product Submission Modal State
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductMaterial, setNewProductMaterial] = useState('');
  const [newProductPrice, setNewProductPrice] = useState(350000);
  const [newProductStock, setNewProductStock] = useState(10);
  const [newProductStory, setNewProductStory] = useState('');

  // Payout request modal
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('2000000');

  // Synchronize new incoming customer orders from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('nepviet_custom_orders');
      if (raw) {
        const customOrders = JSON.parse(raw);
        if (Array.isArray(customOrders) && customOrders.length > 0) {
          const mappedOrders: ArtisanOrder[] = [];
          customOrders.forEach((co: any) => {
            if (co.items && Array.isArray(co.items)) {
              co.items.forEach((item: any, idx: number) => {
                mappedOrders.push({
                  id: `${co.id}-${idx + 1}`,
                  customerName: co.customer || 'Khách Hàng Nếp Việt',
                  customerPhone: co.phone || '0988 888 888',
                  city: co.city || 'Hà Nội',
                  productName: item.name || 'Bộ Tác Phẩm Men Lam Bát Tràng',
                  productImage: item.image || '/products/bo-am-chen-men-lam-bat-trang.jpg',
                  quantity: item.quantity || 1,
                  price: item.price || co.total,
                  total: (item.price || co.total) * (item.quantity || 1),
                  status: co.status === 'Đã thanh toán' ? 'crafting' : 'received',
                  orderDate: co.date || 'Hôm nay',
                  customNote: co.address ? `Địa chỉ giao: ${co.address}` : 'Đơn đặt hàng trực tuyến từ Nếp Việt',
                });
              });
            } else {
              mappedOrders.push({
                id: co.id,
                customerName: co.customer || 'Khách Hàng Nếp Việt',
                customerPhone: co.phone || '0988 888 888',
                city: co.city || 'Hà Nội',
                productName: 'Tác Phẩm Gốm Chế Tác Theo Yêu Cầu',
                productImage: '/products/bo-am-chen-men-lam-bat-trang.jpg',
                quantity: 1,
                price: co.total,
                total: co.total,
                status: co.status === 'Đã thanh toán' ? 'crafting' : 'received',
                orderDate: co.date || 'Hôm nay',
                customNote: co.address || 'Đơn hàng mới từ website',
              });
            }
          });

          setOrders((prev) => {
            const existingIds = new Set(prev.map((p) => p.id));
            const newOnes = mappedOrders.filter((m) => !existingIds.has(m.id));
            if (newOnes.length === 0) return prev;
            const updated = [...newOnes, ...prev];
            try {
              localStorage.setItem('nepviet_artisan_orders', JSON.stringify(updated));
            } catch (e) { }
            return updated;
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Đồng bộ trạng thái kiểm định & xuất bản từ catalog sang customArtisanProducts
  useEffect(() => {
    if (customArtisanProducts.length > 0 && catalogProducts.length > 0) {
      let changed = false;
      const updated = customArtisanProducts.map((cap) => {
        const catItem = catalogProducts.find((p) => p.id === cap.id);
        if (catItem) {
          const newStatus: ArtisanProduct['status'] = !catItem.inStock
            ? 'out_of_stock'
            : catItem.approvalStatus === 'pending' || (catItem.badge && catItem.badge.includes('Chờ'))
              ? 'pending'
              : catItem.approvalStatus === 'rejected'
                ? 'rejected'
                : 'active';
          if (newStatus !== cap.status || catItem.badge !== cap.badge || catItem.rejectionReason !== cap.rejectionReason) {
            changed = true;
            return {
              ...cap,
              status: newStatus,
              badge: catItem.badge,
              rejectionReason: catItem.rejectionReason,
            };
          }
        }
        return cap;
      });
      if (changed) {
        setCustomArtisanProducts(updated);
        try {
          localStorage.setItem('nepviet_custom_artisan_products', JSON.stringify(updated));
        } catch (e) { }
      }
    }
  }, [catalogProducts]);

  // Compute products list belonging to this workshop
  const products: ArtisanProduct[] = useMemo(() => {
    // 1. Get pottery / Bat Trang items or items created by this artisan from catalog
    const fromCatalog: ArtisanProduct[] = catalogProducts
      .filter(
        (p) =>
          p.category === 'gom-su' ||
          (p.village && p.village.toLowerCase().includes('bát tràng')) ||
          (p.artisanName && p.artisanName.toLowerCase().includes('tuấn')) ||
          p.id.startsWith('art-')
      )
      .map((p) => ({
        id: p.id,
        name: p.name,
        category: 'Gốm Sứ Mỹ Nghệ',
        price: p.price,
        originalPrice: p.originalPrice || Math.round(p.price * 1.2),
        inStock: p.inStock,
        stockCount: p.inStock ? 14 : 0,
        image: (p.images && p.images[0]) || '/products/bo-am-chen-men-lam-bat-trang.jpg',
        status: !p.inStock
          ? 'out_of_stock'
          : p.approvalStatus === 'pending' || (p.badge && p.badge.includes('Chờ'))
            ? 'pending'
            : p.approvalStatus === 'rejected'
              ? 'rejected'
              : 'active',
        material: p.material || 'Gốm sa khoáng nung khử 1.300°C',
        badge: p.badge || (p.isFeatured ? 'Di sản tiêu biểu' : undefined),
        totalSold: p.reviewsCount ? p.reviewsCount * 3 + 8 : 16,
        rejectionReason: p.rejectionReason,
        slug: p.slug,
      }));

    // Merge with any custom artisan additions
    const catalogIds = new Set(fromCatalog.map((p) => p.id));
    const nonDuplicated = customArtisanProducts.filter((p) => !catalogIds.has(p.id));
    return [...nonDuplicated, ...fromCatalog];
  }, [catalogProducts, customArtisanProducts]);

  // Workshop financial calculations - 100% dynamic without static fake additions
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const platformFee = Math.round(totalRevenue * 0.08); // 8% phí sàn Nếp Việt
  const netEarnings = totalRevenue - platformFee;
  const totalWithdrawn = payouts.filter((p) => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const availableBalance = Math.max(0, netEarnings - totalWithdrawn);
  const pendingReviewRevenue = orders.filter((o) => o.status !== 'shipped').reduce((sum, o) => sum + o.total, 0);

  // Handle advancing order status in artisan workshop
  const handleAdvanceOrderStatus = (orderId: string) => {
    setOrders((prev) => {
      const next = prev.map((ord) => {
        if (ord.id === orderId) {
          if (ord.status === 'received') return { ...ord, status: 'crafting' as const };
          if (ord.status === 'crafting') return { ...ord, status: 'packed' as const };
          if (ord.status === 'packed') return { ...ord, status: 'shipped' as const };
        }
        return ord;
      });
      try {
        localStorage.setItem('nepviet_artisan_orders', JSON.stringify(next));
      } catch (e) { }
      return next;
    });
    showToast(`Đã cập nhật tiến độ đơn xưởng #${orderId}!`);
  };

  // Handle submitting new craft piece for platform approval & saving to shared catalog
  const handleFormSubmitNewPiece = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) {
      showToast('Vui lòng nhập tên tác phẩm!', 'warning');
      return;
    }

    const price = Number(newProductPrice) || 350000;
    const stock = Number(newProductStock) || 5;

    const uniqueSuffix = Date.now().toString(36);
    const added = await addProduct({
      id: `art-${uniqueSuffix}`,
      name: newProductName.trim(),
      slug: `${newProductName.trim().toLowerCase().replace(/[^a-z0-9]/g, '-')}-${uniqueSuffix}`,
      category: 'gom-su',
      categoryName: 'Gốm Sứ Bát Tràng',
      village: 'Làng gốm Bát Tràng, Gia Lâm, Hà Nội',
      price,
      originalPrice: Math.round(price * 1.2),
      rating: 5,
      reviewsCount: 0,
      inStock: stock > 0,
      images: ['/products/bo-am-chen-men-lam-bat-trang.jpg'],
      summary: newProductStory.trim() || 'Tác phẩm thủ công gốm Bát Tràng vuốt tay bởi nghệ nhân Phạm Văn Tuấn.',
      description: newProductStory.trim() || 'Chế tác hoàn toàn thủ công bằng kỹ thuật vuốt tay truyền thống kết hợp nung khử oxy lò củi 1.300°C.',
      material: newProductMaterial.trim() || 'Cốt gốm Bát Tràng thủ công',
      dimensions: 'Quy cách chuẩn thủ công mỹ nghệ',
      artisanStory: 'Tác phẩm được chế tác độc bản tại xưởng gốm dòng tộc Bát Tràng.',
      preservation: 'Tránh va chạm mạnh, rửa bằng nước ấm.',
      badge: 'Chờ Sàn Kiểm Định & Duyệt',
      approvalStatus: 'pending',
      artisanName: 'Nghệ nhân Phạm Văn Tuấn (Xưởng Gốm Bát Tràng)',
      isFeatured: false,
    });

    const newPiece: ArtisanProduct = {
      id: added.id,
      name: added.name,
      category: 'Gốm Sứ Mỹ Nghệ',
      price: added.price,
      originalPrice: added.originalPrice || Math.round(added.price * 1.2),
      inStock: added.inStock,
      stockCount: stock,
      image: (added.images && added.images[0]) || '/products/bo-am-chen-men-lam-bat-trang.jpg',
      status: 'pending',
      material: added.material || 'Cốt gốm Bát Tràng thủ công',
      badge: 'Chờ Sàn Kiểm Định & Duyệt',
      totalSold: 0,
    };

    setCustomArtisanProducts((prev) => {
      const updated = [newPiece, ...prev.filter((p) => p.id !== newPiece.id)];
      try {
        localStorage.setItem('nepviet_custom_artisan_products', JSON.stringify(updated));
      } catch (e) { }
      return updated;
    });
    setIsSubmitModalOpen(false);
    setNewProductName('');
    setNewProductMaterial('');
    setNewProductStory('');
    showToast('Tác phẩm đã gửi Ban Kiểm Định Di Sản Nếp Việt và đồng bộ vào danh mục sàn!');
  };

  // Handle artisan withdraw request - completely dynamic
  const handleWithdrawRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(withdrawAmount);
    if (!amt || amt <= 0) {
      showToast('Vui lòng nhập số tiền rút hợp lệ!', 'warning');
      return;
    }
    if (amt > availableBalance) {
      showToast(`Số dư khả dụng hiện tại chỉ có ${formatCurrency(availableBalance)}. Vui lòng rút số tiền không vượt quá số dư khả dụng!`, 'warning');
      return;
    }

    const fee = Math.round(amt * 0.08);
    const netAmt = amt - fee;
    const newPayout: ArtisanPayout = {
      id: `PAY-${Date.now().toString().slice(-6)}`,
      period: `${new Date().toLocaleDateString('vi-VN')} - Rút tiền nhanh VietQR`,
      date: new Date().toLocaleDateString('vi-VN'),
      revenue: amt,
      fee,
      amount: netAmt,
      status: 'completed',
    };

    const nextPayouts = [newPayout, ...payouts];
    setPayouts(nextPayouts);
    try {
      localStorage.setItem('nepviet_artisan_payouts', JSON.stringify(nextPayouts));
    } catch (err) { }

    setIsWithdrawModalOpen(false);
    showToast(`Đã giải ngân thành công ${formatCurrency(netAmt)} về tài khoản MB Bank 0912 345 678 của nghệ nhân!`);
  };

  const handleOpenPriceModal = (prodId: string, currentPrice: number, prodName: string) => {
    setEditingPriceItem({ id: prodId, name: prodName, price: currentPrice });
    setInputNewPrice(currentPrice);
  };

  const handleSavePrice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPriceItem) return;
    const priceNum = Number(inputNewPrice);
    if (!priceNum || priceNum <= 0) {
      showToast('Vui lòng nhập mức giá hợp lệ lớn hơn 0đ!', 'warning');
      return;
    }
    await updateProduct(editingPriceItem.id, { price: priceNum });
    setCustomArtisanProducts((prev) =>
      prev.map((p) => (p.id === editingPriceItem.id ? { ...p, price: priceNum } : p))
    );
    const savedName = editingPriceItem.name;
    setEditingPriceItem(null);
    showToast(`Đã cập nhật giá "${savedName}" thành ${formatCurrency(priceNum)}!`, 'success');
  };

  const handleUpdateStock = async (prodId: string, newStock: number) => {
    await updateProduct(prodId, { inStock: newStock > 0 });
    setCustomArtisanProducts((prev) =>
      prev.map((p) => (p.id === prodId ? { ...p, stockCount: newStock, inStock: newStock > 0 } : p))
    );
    showToast(`Đã lưu tồn kho xưởng: ${newStock} chiếc`);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.material.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-stone-900 font-sans flex flex-col">

      {/* Top Header - Artisan Studio Identity */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-cream-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">

            {/* Workshop Badge & Brand */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-700 via-amber-600 to-stone-900 text-white flex items-center justify-center font-han text-2xl font-bold shadow-md border border-amber-500/40">
                  越
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif font-bold text-base text-stone-900 tracking-tight">KÊNH NGHỆ NHÂN</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-300">
                      Studio Làng Nghề
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Hệ thống quản lý gian hàng & xưởng thủ công Nếp Việt
                  </p>
                </div>
              </Link>
            </div>

            {/* Current Artisan Workshop Info */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-cream-50 border border-cream-200 text-xs">
                <div className="relative w-8 h-8 rounded-xl overflow-hidden bg-stone-100 border border-amber-300 flex-shrink-0">
                  <Image src="/villages/lang-gom-bat-trang.webp" alt="Xưởng Bát Tràng" fill className="object-cover" />
                </div>
                <div>
                  <p className="font-bold text-stone-900 leading-tight">Xưởng Gốm Dòng Tộc Bát Tràng</p>
                  <p className="text-[10px] text-stone-500 leading-tight">Nghệ nhân Phạm Văn Tuấn • Tem OCOP 4 Sao (#ART-BTI-01)</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-1" title="Xưởng đang mở nhận đơn" />
              </div>

              {/* View store as customer */}
              <Link
                href="/san-pham"
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-cream-100 border border-cream-200 transition-colors"
                title="Xem trang bán lẻ ngoài sàn"
              >
                <span>Xem gian hàng live</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              {/* Logout button */}
              <button
                type="button"
                onClick={() => {
                  logoutAdmin();
                  router.push('/dang-nhap?role=artisan');
                }}
                className="p-2.5 rounded-xl text-stone-500 hover:text-red-600 hover:bg-red-50 border border-cream-200 transition-colors"
                title="Đăng xuất Kênh Nghệ Nhân"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Studio Body Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-6">

        {/* Studio Navigation Tabs */}
        <div className="bg-white rounded-2xl p-2 border border-cream-200 shadow-xs flex items-center gap-1 overflow-x-auto">
          {[
            { id: 'overview', label: 'Tổng Quan Xưởng', icon: Store },
            { id: 'products', label: `Tác Phẩm Của Xưởng (${products.length})`, icon: Package },
            { id: 'orders', label: `Đơn Hàng Đặt Xưởng (${orders.length})`, icon: ShoppingBag },
            { id: 'wallet', label: 'Ví Doanh Thu & Đối Soát', icon: Wallet },
            { id: 'profile', label: 'Hồ Sơ Xưởng & Tem OCOP', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${isActive
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-cream-100/70'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Top Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-xs space-y-1">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold">Doanh Thu Xưởng Tháng Này</span>
                  <DollarSign className="w-4 h-4 text-amber-600" />
                </div>
                <p className="font-serif text-2xl font-bold text-stone-900">
                  {formatCurrency(totalRevenue)}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 pt-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+18.4% so với tháng trước</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-xs space-y-1">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold">Số Dư Khả Dụng Có Thể Rút</span>
                  <Wallet className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="font-serif text-2xl font-bold text-emerald-700">
                  {formatCurrency(availableBalance)}
                </p>
                <p className="text-[11px] text-stone-400">Đã đối soát xong sau trừ phí sàn 8%</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-xs space-y-1">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold">Đơn Hàng Cần Chế Tác</span>
                  <Flame className="w-4 h-4 text-nepred-600" />
                </div>
                <p className="font-serif text-2xl font-bold text-nepred-600">
                  {orders.filter(o => o.status === 'received' || o.status === 'crafting').length} đơn
                </p>
                <p className="text-[11px] text-stone-400">Đang chuẩn bị đất & nung lò</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-xs space-y-1">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold">Đánh Giá Xưởng Nghệ Nhân</span>
                  <Award className="w-4 h-4 text-amber-500" />
                </div>
                <p className="font-serif text-2xl font-bold text-stone-900">
                  4.9 / 5.0 ⭐
                </p>
                <p className="text-[11px] text-stone-400">Từ 168 đánh giá khách hàng xác thực</p>
              </div>
            </div>

            {/* Quick Action & Workshop Notice */}
            <div className="bg-gradient-to-r from-amber-900 via-stone-900 to-amber-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg">
              <div className="space-y-2 max-w-2xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-800/80 text-amber-200 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Quyền Lợi Nghệ Nhân Làng Nghề Chính Thức
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Tác Phẩm Của Xưởng Được Bảo Hộ Tem Mộc & Quảng Bá Toàn Quốc
                </h2>
                <p className="text-xs text-cream-200/90 leading-relaxed">
                  Tất cả tác phẩm đăng từ Kênh Nghệ Nhân sẽ được Ban Giám Định Di Sản Nếp Việt kiểm chứng nguyên liệu, quy trình nung và gắn tem OCOP chuẩn quốc gia trước khi mở bán chính thức.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Đăng Tác Phẩm Mới</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setWithdrawAmount(Math.min(availableBalance, 1000000).toString());
                    setIsWithdrawModalOpen(true);
                  }}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-2"
                >
                  <Banknote className="w-4 h-4" />
                  <span>Rút Tiền Về Ngân Hàng</span>
                </button>
              </div>
            </div>

            {/* Recent Orders Needs Workshop Action */}
            <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    Đơn Hàng Gần Nhất Chờ Xưởng Xử Lý
                  </h3>
                  <p className="text-xs text-stone-500">Các đơn khách hàng đặt sản phẩm chế tác từ xưởng Bát Tràng của bạn</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
                >
                  <span>Xem tất cả đơn xưởng</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="divide-y divide-cream-100">
                {orders.slice(0, 3).map((ord) => (
                  <div key={ord.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-stone-100 border border-cream-200 flex-shrink-0">
                        <Image src={ord.productImage} alt={ord.productName} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-stone-900">{ord.id}</span>
                          <span className="text-xs text-stone-400">• {ord.orderDate}</span>
                        </div>
                        <p className="text-xs font-semibold text-stone-800 line-clamp-1">{ord.productName}</p>
                        <p className="text-[11px] text-stone-500">
                          Khách: <strong>{ord.customerName}</strong> ({ord.city}) • SL: {ord.quantity} chiếc
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:justify-end">
                      <span className="font-bold text-sm text-stone-900">
                        {formatCurrency(ord.total)}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleAdvanceOrderStatus(ord.id)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${ord.status === 'received'
                          ? 'bg-nepred-600 text-white hover:bg-nepred-700 shadow-xs'
                          : ord.status === 'crafting'
                            ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-xs'
                            : ord.status === 'packed'
                              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-xs'
                              : 'bg-emerald-100 text-emerald-800 cursor-default'
                          }`}
                      >
                        {ord.status === 'received' && 'Tiếp nhận chế tác →'}
                        {ord.status === 'crafting' && 'Đã nung xong, đóng gói →'}
                        {ord.status === 'packed' && 'Bàn giao bưu tá →'}
                        {ord.status === 'shipped' && '✓ Đang vận chuyển'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS CATALOG OF ARTISAN */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif font-bold text-xl text-stone-900">
                  Tác Phẩm Thủ Công Thuộc Xưởng Bát Tràng
                </h2>
                <p className="text-xs text-stone-500">
                  Chỉ quản lý các tác phẩm do xưởng nghệ nhân Phạm Văn Tuấn chế tác và niêm yết trên sàn Nếp Việt.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Tìm tác phẩm xưởng..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-xl bg-white border border-cream-300 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-500 w-52 sm:w-64"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-all flex-shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Đăng Tác Phẩm Mới</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-cream-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-cream-50/80 text-[11px] font-bold text-stone-500 uppercase tracking-wider border-b border-cream-200">
                    <tr>
                      <th className="py-3.5 px-4">Tác Phẩm & Chất Liệu</th>
                      <th className="py-3.5 px-4">Giá Xuất Xưởng</th>
                      <th className="py-3.5 px-4">Tồn Kho Xưởng</th>
                      <th className="py-3.5 px-4">Trạng Thái Sàn</th>
                      <th className="py-3.5 px-4">Đã Bán</th>
                      <th className="py-3.5 px-4 text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-100">
                    {filteredProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-cream-50/50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 border border-cream-200 flex-shrink-0">
                              <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                            </div>
                            <div>
                              <p className="font-semibold text-stone-900">{prod.name}</p>
                              <p className="text-[11px] text-stone-500">{prod.material}</p>
                              {prod.badge && (
                                <span className="inline-block px-2 py-0.5 mt-0.5 rounded-md bg-cream-100 text-[10px] font-bold text-amber-800">
                                  {prod.badge}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <p className="font-bold text-stone-900">{formatCurrency(prod.price)}</p>
                          <p className="text-[10px] text-stone-400 line-through">{formatCurrency(prod.originalPrice)}</p>
                        </td>

                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="0"
                              defaultValue={prod.stockCount}
                              className="w-16 px-2 py-1 bg-stone-50 border border-cream-300 rounded-lg text-xs font-semibold text-center focus:outline-none focus:border-amber-500"
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                handleUpdateStock(prod.id, val);
                              }}
                            />
                            <span className="text-[11px] text-stone-500">chiếc</span>
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          {prod.status === 'active' && (
                            <div className="space-y-1">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Đã Duyệt • Đang Mở Bán
                              </span>
                              {prod.slug && (
                                <Link
                                  href={`/san-pham/${prod.slug}`}
                                  target="_blank"
                                  className="block text-[10px] text-nepred-600 hover:underline font-semibold"
                                >
                                  Xem live trên sàn →
                                </Link>
                              )}
                            </div>
                          )}
                          {prod.status === 'pending' && (
                            <div className="space-y-0.5 max-w-xs">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold border border-amber-200">
                                <Clock className="w-3 h-3 text-amber-500" />
                                Chờ Sàn Kiểm Định OCOP
                              </span>
                              <p className="text-[10px] text-stone-500">
                                Hồ sơ đang được Hội Đồng Thẩm Định Nếp Việt xét duyệt
                              </p>
                            </div>
                          )}
                          {prod.status === 'rejected' && (
                            <div className="space-y-1 max-w-xs">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-[11px] font-bold border border-red-200">
                                Yêu Cầu Bổ Sung Hồ Sơ
                              </span>
                              {prod.rejectionReason && (
                                <p className="text-[10px] text-red-600 italic">
                                  "{prod.rejectionReason}"
                                </p>
                              )}
                              <button
                                type="button"
                                onClick={async () => {
                                  await updateProduct(prod.id, {
                                    approvalStatus: 'pending',
                                    badge: 'Chờ Sàn Kiểm Định & Duyệt',
                                  });
                                  showToast('Đã gửi lại hồ sơ cho Hội Đồng Kiểm Định!');
                                }}
                                className="px-2 py-0.5 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-[10px]"
                              >
                                Gửi Lại Kiểm Định →
                              </button>
                            </div>
                          )}
                          {prod.status === 'out_of_stock' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 text-[11px] font-bold">
                              Hết Hàng Lò
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-4 font-semibold text-stone-800">
                          {prod.totalSold} đã giao
                        </td>

                        <td className="py-4 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleOpenPriceModal(prod.id, prod.price, prod.name)}
                            className="px-3 py-1.5 rounded-lg bg-cream-100 hover:bg-cream-200 text-stone-700 text-xs font-semibold transition-colors mr-2"
                          >
                            Đổi Giá
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: WORKSHOP ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="font-serif font-bold text-xl text-stone-900">
                Đơn Hàng Chế Tác Theo Yêu Cầu
              </h2>
              <p className="text-xs text-stone-500">
                Quy trình sản xuất 4 bước: Tiếp nhận đơn xưởng → Đang vuốt gốm / nung sấy → Đóng gói hộp quà di sản → Bàn giao bưu tá Nếp Việt.
              </p>
            </div>

            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="bg-white rounded-3xl p-6 border border-cream-200 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-cream-100 gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-stone-900 bg-cream-100 px-2.5 py-1 rounded-lg">
                        #{ord.id}
                      </span>
                      <span className="text-xs text-stone-500">Đặt lúc: {ord.orderDate}</span>
                    </div>

                    {/* Order Workflow Progress Badge */}
                    <div>
                      {ord.status === 'received' && (
                        <span className="px-3 py-1 rounded-full bg-nepred-50 text-nepred-700 text-xs font-bold border border-nepred-200 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          Bước 1: Chờ Xưởng Tiếp Nhận
                        </span>
                      )}
                      {ord.status === 'crafting' && (
                        <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-300 flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5 text-amber-600" />
                          Bước 2: Đang Chế Tác & Nung Lò
                        </span>
                      )}
                      {ord.status === 'packed' && (
                        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 flex items-center gap-1.5">
                          <Package className="w-3.5 h-3.5 text-blue-600" />
                          Bước 3: Đã Đóng Gói Hộp Quà Xong
                        </span>
                      )}
                      {ord.status === 'shipped' && (
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-emerald-600" />
                          Bước 4: Đã Bàn Giao Bưu Tá Vận Chuyển
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-6 flex items-center gap-3">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-stone-100 border border-cream-200 flex-shrink-0">
                        <Image src={ord.productImage} alt={ord.productName} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-stone-900">{ord.productName}</h4>
                        <p className="text-xs text-stone-500">Đơn giá: {formatCurrency(ord.price)} x {ord.quantity} chiếc</p>
                        {ord.customNote && (
                          <p className="text-xs text-amber-800 bg-amber-50/80 p-1.5 rounded-lg border border-amber-200/60 mt-1 italic">
                            Yêu cầu: {ord.customNote}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-3 text-xs text-stone-600 space-y-0.5">
                      <p className="font-semibold text-stone-900">Khách: {ord.customerName}</p>
                      <p>SĐT: {ord.customerPhone}</p>
                      <p>Địa bàn: {ord.city}</p>
                    </div>

                    <div className="md:col-span-3 flex flex-col sm:items-end justify-between gap-2">
                      <div className="text-right">
                        <span className="text-[10px] text-stone-400 block uppercase font-bold">Tổng thanh toán xưởng</span>
                        <span className="font-serif font-bold text-lg text-nepred-600">
                          {formatCurrency(ord.total)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAdvanceOrderStatus(ord.id)}
                        className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 ${ord.status === 'received'
                          ? 'bg-nepred-600 hover:bg-nepred-700 text-white'
                          : ord.status === 'crafting'
                            ? 'bg-amber-600 hover:bg-amber-700 text-white'
                            : ord.status === 'packed'
                              ? 'bg-blue-600 hover:bg-blue-700 text-white'
                              : 'bg-emerald-600 text-white opacity-80 cursor-default'
                          }`}
                      >
                        {ord.status === 'received' && <><span>Nhận Đơn Làm Ngay</span> →</>}
                        {ord.status === 'crafting' && <><span>Hoàn Thiện & Đóng Gói</span> →</>}
                        {ord.status === 'packed' && <><Truck className="w-3.5 h-3.5" /> <span>Giao Cho Bưu Tá</span></>}
                        {ord.status === 'shipped' && <><CheckCircle2 className="w-3.5 h-3.5" /> <span>Đang Giao Cho Khách</span></>}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: WALLET & PAYOUT */}
        {activeTab === 'wallet' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif font-bold text-xl text-stone-900">
                  Ví Doanh Thu & Đối Soát Tài Chính Xưởng
                </h2>
                <p className="text-xs text-stone-500">
                  Minh bạch tài chính: Khấu trừ 8% phí duy trì hạ tầng di sản & bảo hiểm vỡ mẻ vận chuyển. Số tiền còn lại về trực tiếp tài khoản ngân hàng của nghệ nhân.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setWithdrawAmount(Math.min(availableBalance, 1000000).toString());
                  setIsWithdrawModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex-shrink-0"
              >
                <Banknote className="w-4 h-4" />
                <span>Yêu Cầu Rút Tiền Về Ngân Hàng</span>
              </button>
            </div>

            {/* Wallet Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-xs space-y-2">
                <span className="text-xs text-stone-500 font-semibold">Số Dư Khả Dụng Có Thể Rút</span>
                <p className="font-serif text-3xl font-bold text-emerald-600">
                  {formatCurrency(availableBalance)}
                </p>
                <p className="text-[11px] text-stone-400">Tiền từ các đơn hàng khách đã ký nhận hoàn tất</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-xs space-y-2">
                <span className="text-xs text-stone-500 font-semibold">Doanh Thu Chờ Đối Soát (Kỳ Này)</span>
                <p className="font-serif text-3xl font-bold text-amber-600">
                  {formatCurrency(pendingReviewRevenue)}
                </p>
                <p className="text-[11px] text-stone-400">Đơn hàng đang bưu tá vận chuyển trên đường</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-xs space-y-2">
                <span className="text-xs text-stone-500 font-semibold">Tài Khoản Thụ Hưởng Của Nghệ Nhân</span>
                <div className="pt-1">
                  <p className="font-bold text-stone-900 text-sm">MB BANK (Ngân Hàng Quân Đội)</p>
                  <p className="font-mono text-base font-bold text-nepred-700">0912 345 678</p>
                  <p className="text-[11px] text-stone-500">Chủ tài khoản: PHAM VAN TUAN</p>
                </div>
              </div>
            </div>

            {/* Payout History Table */}
            <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-stone-900">
                Lịch Sử Đối Soát & Chuyển Tiền Về Ngân Hàng
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-cream-50 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Mã Đợt Đối Soát</th>
                      <th className="py-3 px-4">Kỳ Đối Soát</th>
                      <th className="py-3 px-4">Doanh Số Xưởng</th>
                      <th className="py-3 px-4">Phí Sàn Nếp Việt (8%)</th>
                      <th className="py-3 px-4">Thực Nhận Về MB</th>
                      <th className="py-3 px-4">Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-100">
                    {payouts.map((pay) => (
                      <tr key={pay.id}>
                        <td className="py-3.5 px-4 font-mono font-bold text-stone-900">{pay.id}</td>
                        <td className="py-3.5 px-4">{pay.period}</td>
                        <td className="py-3.5 px-4 font-semibold">{formatCurrency(pay.revenue)}</td>
                        <td className="py-3.5 px-4 text-stone-500">-{formatCurrency(pay.fee)}</td>
                        <td className="py-3.5 px-4 font-bold text-emerald-700">{formatCurrency(pay.amount)}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                            ✓ {pay.status === 'completed' ? 'Đã chuyển VietQR' : 'Đang xử lý'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: WORKSHOP PROFILE & OCOP CERTS */}
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="font-serif font-bold text-xl text-stone-900">
                Hồ Sơ Xưởng Di Sản & Giấy Phép Xác Thực
              </h2>
              <p className="text-xs text-stone-500">
                Thông tin được hiển thị công khai trên tem mộc QR Code gắn liền với từng sản phẩm xuất xưởng.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Workshop identity */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-cream-200 shadow-xs space-y-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-sm flex-shrink-0 bg-stone-100">
                    <Image
                      src="/villages/lang-gom-bat-trang.webp"
                      alt="Làng Gốm Bát Tràng"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                    <span className="absolute bottom-1 left-0 right-0 text-center text-[9px] font-bold text-amber-200 uppercase tracking-widest drop-shadow-sm select-none">
                      Bát Tràng
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-900 leading-snug">
                        Xưởng Gốm Dòng Tộc Bát Tràng
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                        Làng Nghề Cổ Truyền
                      </span>
                    </div>
                    <p className="text-xs text-stone-600">
                      Đại diện: <strong className="text-stone-900 font-semibold">Nghệ nhân Phạm Văn Tuấn</strong> (Kế thừa đời thứ 5 • Xưởng nung củi & gas)
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5 pt-1 text-xs text-stone-700">
                  <div className="p-4 sm:p-5 bg-cream-50/80 rounded-2xl border border-cream-200 space-y-2">
                    <div className="flex items-center gap-2 text-stone-900 font-bold text-xs">
                      <MapPin className="w-4 h-4 text-nepred-600 flex-shrink-0" />
                      <span>Địa Chỉ Lò Nung Thực Tế</span>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed pl-6">
                      Số 48 Xóm 2, Thôn Giang Cao, Xã Bát Tràng, Huyện Gia Lâm, TP. Hà Nội.
                    </p>
                    <div className="flex items-center gap-2 pl-6 pt-0.5 text-[11px] text-stone-500">
                      <Flame className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span>Quy mô: 2 lò nung củi truyền thống, 1 lò gas nung khử oxy công suất 1.300°C.</span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 bg-cream-50/80 rounded-2xl border border-cream-200 space-y-2">
                    <div className="flex items-center gap-2 text-stone-900 font-bold text-xs">
                      <Award className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span>Chứng Nhận Chất Lượng OCOP Quốc Gia</span>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed pl-6">
                      Hồ sơ chứng nhận sản phẩm OCOP 4 sao do UBND TP. Hà Nội cấp, số QĐ: <strong>418/QĐ-UBND</strong>.
                    </p>
                    <div className="flex items-center gap-2 pl-6 pt-0.5 text-[11px] text-stone-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>Đạt chuẩn xuất khẩu, hàm lượng khoáng tự nhiên an toàn tuyệt đối 100%.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Badges & Guidelines */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-gradient-to-br from-amber-50 to-cream-100 rounded-3xl p-6 border border-amber-200 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                    <Award className="w-4 h-4" />
                    <span>Quy Chuẩn Tem Mộc Nếp Việt</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-stone-900">
                    Quy Trình Kiểm Tra Sản Phẩm Trước Khi Đóng Hộp
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-700 list-disc list-inside leading-relaxed">
                    <li>Kiểm tra âm thanh gõ đanh như chuông, không có vết nứt chân chim ngầm.</li>
                    <li>Đáy sản phẩm được dập chìm mộc lò nung "Bát Tràng - Nếp Việt".</li>
                    <li>Sử dụng hộp giấy bồi mộc mạc kèm rơm lúa nếp khô khử ẩm tự nhiên.</li>
                    <li>Gắn kèm thẻ bảo hành di sản 1:1 trong 7 ngày nếu nứt vỡ do vận chuyển.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* MODAL: ĐĂNG TÁC PHẨM MỚI GỬI THẨM ĐỊNH */}
      {isSubmitModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsSubmitModalOpen(false)}
        >
          <div
            className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-cream-200 p-6 sm:p-8 space-y-5 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Gửi Tác Phẩm Thủ Công Mới Lên Sàn
                </h3>
                <p className="text-xs text-stone-500">
                  Ban Kiểm Định Nếp Việt sẽ đối soát tem mộc và duyệt mở bán trong 24h
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-cream-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmitNewPiece} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-stone-700">Tên Tác Phẩm Thủ Công (*)</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Bình Hút Lộc Men Rạn Bát Tràng Dáng Cổ"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-white text-stone-900 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-stone-700">Giá Xuất Xưởng (VNĐ) (*)</label>
                  <input
                    type="number"
                    required
                    min="10000"
                    step="10000"
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-white text-stone-900 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-stone-700">Số Lượng Tồn Sẵn Lò (*)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newProductStock}
                    onChange={(e) => setNewProductStock(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-white text-stone-900 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-stone-700">Chất Liệu & Men Gốm (*)</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Đất sét sa khoáng, men tro nếp nung 1.300°C"
                  value={newProductMaterial}
                  onChange={(e) => setNewProductMaterial(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-white text-stone-900 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-stone-700">Câu Chuyện & Kỹ Nghệ Chế Tác</label>
                <textarea
                  rows={3}
                  placeholder="Mô tả kỹ thuật vuốt tay trên bàn xoay hoặc bí quyết nung củi của xưởng..."
                  value={newProductStory}
                  onChange={(e) => setNewProductStory(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300 bg-white text-stone-900 text-xs focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-stone-700 text-[11px] leading-relaxed">
                Tác phẩm gửi lên sẽ chuyển sang trạng thái <strong>"Chờ Sàn Kiểm Định"</strong>. Ban kiểm định Nếp Việt sẽ kiểm tra tem mộc OCOP và duyệt mở bán trên danh mục chính thức.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-cream-300 text-stone-700 hover:bg-cream-100 font-semibold text-xs"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Gửi Ban Thẩm Định Duyệt</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: RÚT TIỀN VỀ NGÂN HÀNG NGHỆ NHÂN */}
      {isWithdrawModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsWithdrawModalOpen(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-cream-200 p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                <Banknote className="w-5 h-5 text-emerald-600" />
                <span>Rút Tiền Về Ngân Hàng Nghệ Nhân</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsWithdrawModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleWithdrawRequest} className="space-y-4 text-xs">
              <div className="p-3 bg-cream-50 rounded-2xl border border-cream-200 space-y-1">
                <p className="text-[11px] text-stone-500">Tài khoản nhận tiền:</p>
                <p className="font-bold text-stone-900">MB BANK - 0912 345 678 (PHAM VAN TUAN)</p>
                <p className="text-[11px] text-emerald-700 font-semibold">Số dư khả dụng: {formatCurrency(availableBalance)}</p>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-stone-700">Số Tiền Muốn Rút (VNĐ)</label>
                <input
                  type="number"
                  min="50000"
                  max={Math.max(50000, availableBalance)}
                  step="50000"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 font-serif font-bold text-base text-stone-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <p className="text-[11px] text-stone-500">
                Tiền sẽ được kế toán sàn Nếp Việt duyệt và chuyển khoản nhanh 24/7 qua cổng VietQR trong vòng 1-2 giờ làm việc.
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWithdrawModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-cream-300 text-stone-700 text-xs font-semibold"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
                >
                  Xác Nhận Rút Tiền
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Price Update Modal for Artisan */}
      {editingPriceItem && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-stone-200/90 space-y-5 animate-scaleUp">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    Cập Nhật Giá Xuất Xưởng
                  </h3>
                  <p className="text-xs text-stone-500 truncate max-w-xs">{editingPriceItem.name}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingPriceItem(null)}
                className="text-stone-400 hover:text-stone-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePrice} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">Giá bán niêm yết mới (VNĐ):</label>
                <input
                  type="number"
                  min="10000"
                  step="10000"
                  value={inputNewPrice}
                  onChange={(e) => setInputNewPrice(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-serif font-bold text-lg text-stone-900 focus:outline-none focus:border-amber-600 price-tag"
                />
              </div>

              {/* Fee Breakdown Calculation */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/70 space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Giá bán khách trả:</span>
                  <span className="font-bold text-stone-900 price-tag">{formatCurrency(inputNewPrice || 0)}</span>
                </div>
                <div className="flex justify-between text-stone-500 text-[11px]">
                  <span>Phí sàn Nếp Việt (8%):</span>
                  <span>- {formatCurrency(Math.round((inputNewPrice || 0) * 0.08))}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-amber-200 font-bold text-amber-900">
                  <span>Thực nhận xưởng:</span>
                  <span className="text-emerald-700 price-tag">{formatCurrency((inputNewPrice || 0) - Math.round((inputNewPrice || 0) * 0.08))}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingPriceItem(null)}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 text-xs font-bold transition-colors"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md shadow-amber-600/30 transition-all"
                >
                  Lưu Giá Mới
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Stacked Toasts */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-2xl border flex items-start gap-3 transition-all transform translate-y-0 animate-slideInRight ${
              toast.type === 'error'
                ? 'bg-stone-900 text-white border-red-500/50 shadow-red-950/30'
                : toast.type === 'warning'
                ? 'bg-stone-900 text-white border-amber-500/50 shadow-amber-950/30'
                : toast.type === 'info'
                ? 'bg-stone-900 text-white border-blue-500/50 shadow-blue-950/30'
                : 'bg-stone-900 text-white border-emerald-500/50 shadow-emerald-950/30'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {toast.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-red-400" />
              ) : toast.type === 'warning' ? (
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              ) : toast.type === 'info' ? (
                <Info className="w-5 h-5 text-blue-400" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              )}
            </div>
            <div className="flex-1 text-xs font-semibold leading-relaxed">
              {toast.message}
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-white transition-colors p-0.5 -mr-1 -mt-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ArtisanStudioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs text-stone-500">Đang tải Kênh Nghệ Nhân Nếp Việt...</p>
          </div>
        </div>
      }
    >
      <ArtisanStudioContent />
    </Suspense>
  );
}
