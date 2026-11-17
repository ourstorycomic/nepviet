'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CRAFT_VILLAGES, CATEGORIES } from '@/data/products';
import { useProducts } from '@/utils/productsCatalog';
import { formatCurrency } from '@/utils/format';
import { Product } from '@/types';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  TrendingUp,
  Settings,
  ArrowUpRight,
  Search,
  Plus,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  Edit,
  Trash2,
  Filter,
  X,
  Image as ImageIcon,
  Save,
  RotateCcw,
} from 'lucide-react';

interface MockOrder {
  id: string;
  customerName: string;
  phone: string;
  city: string;
  itemsCount: number;
  total: number;
  paymentMethod: 'COD' | 'VIETQR';
  status: 'pending' | 'shipping' | 'completed' | 'cancelled';
  date: string;
}

const PRESET_IMAGES = [
  { label: 'Bộ Ấm Chén Men Lam Bát Tràng', path: '/products/bo-am-chen-men-lam-bat-trang.jpg' },
  { label: 'Bình Hoa Men Hoả Biến Ngọc Bích', path: '/products/lo-hoa-men-hoa-bien-ngoc-bich.jpg' },
  { label: 'Cốc Sứ Men Rạn Hoa Sen Vẽ Tay', path: '/products/coc-su-hoa-tiet-hoa-sen-ve-tay.avif' },
  { label: 'Khay Trà Mây Tre Đan Phú Vinh', path: '/products/khay-tra-may-tre-dan-phu-vinh.webp' },
  { label: 'Hộp Quà Đan Tre Tự Nhiên', path: '/products/hop-dung-qua-dan-tre-kem-nap.jpg' },
  { label: 'Lồng Đèn Nan Tre Lụa Hội An', path: '/products/long-den-nan-tre-lua-hoi-an.jpg' },
  { label: 'Mặt Nạ Giấy Bồi Chú Tễu', path: '/products/mat-na-giay-boi-trung-thu.jpg' },
  { label: 'Bộ Tò He Đất Nặn Bột Nếp', path: '/products/bo-to-he-dan-gian-5-con-giap.avif' },
  { label: 'Tranh Đông Hồ Đám Cưới Chuột', path: '/products/tranh-dong-ho-dam-cuoi-chuot.jpg' },
  { label: 'Khăn Choàng Lụa Tơ Tằm Vạn Phúc', path: '/products/khan-lua-to-tam-van-phuc-may-cuon.jpg' },
  { label: 'Túi Tote Canvas Trống Đồng', path: '/products/tui-tote-canvas-hoa-van-dong-son.jpg' },
  { label: 'Ví Cầm Tay Dệt Thổ Cẩm Sa Pa', path: '/products/vi-cam-tay-tho-cam-sapa-hoa-sen.jpg' },
  { label: 'Hộp Trà Sen Bách Diệp Tây Hồ', path: '/products/hop-tra-sen-tay-ho-thuong-hang.jpg' },
  { label: 'Hộp Bánh Cốm Hàng Than', path: '/products/hop-banh-com-hang-than-truyen-thong.jpg' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'artisans' | 'settings'>('dashboard');
  const [orderSearchTerm, setOrderSearchTerm] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Product Catalog via Hook
  const { products, addProduct, updateProduct, deleteProduct, resetToDefault } = useProducts();
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');

  // CRUD Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [currentEditingId, setCurrentEditingId] = useState<string | null>(null);

  // Form inputs state
  const [formData, setFormData] = useState({
    name: '',
    category: 'gom-su' as Product['category'],
    village: 'Làng gốm Bát Tràng, Gia Lâm, Hà Nội',
    price: 150000,
    originalPrice: 180000,
    image: '/products/bo-am-chen-men-lam-bat-trang.jpg',
    material: 'Gốm đất nung men truyền thống',
    dimensions: 'Quy cách chuẩn thủ công',
    summary: 'Sản phẩm thủ công truyền thống tinh xảo của làng nghề Việt.',
    description: 'Chế tác hoàn toàn thủ công bởi bàn tay tài hoa của nghệ nhân lâu năm, nguyên liệu thân thiện môi trường.',
    artisanStory: 'Được gìn giữ và kế thừa qua nhiều thế hệ thợ thủ công lành nghề.',
    preservation: 'Bảo quản nơi khô ráo thoáng mát, tránh va đập mạnh.',
    badge: 'Mới về',
    inStock: true,
    isFeatured: false,
  });

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const [orders, setOrders] = useState<MockOrder[]>([
    {
      id: 'NV-892145',
      customerName: 'Nguyễn Phương Linh',
      phone: '0981234567',
      city: 'Hà Nội',
      itemsCount: 2,
      total: 445000,
      paymentMethod: 'VIETQR',
      status: 'completed',
      date: '17/11/2026 14:30',
    },
    {
      id: 'NV-734190',
      customerName: 'Trần Minh Quân',
      phone: '0912345678',
      city: 'Đà Nẵng',
      itemsCount: 1,
      total: 320000,
      paymentMethod: 'COD',
      status: 'shipping',
      date: '17/11/2026 16:45',
    },
    {
      id: 'NV-612849',
      customerName: 'Lê Thanh Thảo',
      phone: '0978912345',
      city: 'TP. Hồ Chí Minh',
      itemsCount: 3,
      total: 615000,
      paymentMethod: 'VIETQR',
      status: 'pending',
      date: '18/11/2026 08:15',
    },
    {
      id: 'NV-549182',
      customerName: 'Phạm Đức Huy',
      phone: '0934567890',
      city: 'Bắc Ninh',
      itemsCount: 1,
      total: 210000,
      paymentMethod: 'COD',
      status: 'pending',
      date: '18/11/2026 09:20',
    },
    {
      id: 'NV-431092',
      customerName: 'Hoàng Mai Chi',
      phone: '0905123987',
      city: 'Hà Nội',
      itemsCount: 2,
      total: 275000,
      paymentMethod: 'COD',
      status: 'completed',
      date: '16/11/2026 11:10',
    },
  ]);

  const updateOrderStatus = (orderId: string, newStatus: MockOrder['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Đã cập nhật trạng thái đơn ${orderId}`);
  };

  const handleToggleStock = (prod: Product) => {
    updateProduct(prod.id, { inStock: !prod.inStock });
    showToast(`Đã đổi trạng thái "${prod.name}" thành ${!prod.inStock ? 'Còn hàng' : 'Tạm hết'}`);
  };

  const handleOpenCreateModal = () => {
    setModalMode('create');
    setCurrentEditingId(null);
    setFormData({
      name: '',
      category: 'gom-su',
      village: 'Làng gốm Bát Tràng, Gia Lâm, Hà Nội',
      price: 150000,
      originalPrice: 180000,
      image: '/products/bo-am-chen-men-lam-bat-trang.jpg',
      material: 'Đất sét cao lanh tự nhiên nung nhiệt độ cao',
      dimensions: 'Quy cách chuẩn thủ công',
      summary: 'Sản phẩm thủ công truyền thống tinh xảo của làng nghề Việt.',
      description: 'Chế tác hoàn toàn thủ công bởi bàn tay tài hoa của nghệ nhân lâu năm, nguyên liệu thân thiện môi trường.',
      artisanStory: 'Được gìn giữ và kế thừa qua nhiều thế hệ thợ thủ công lành nghề.',
      preservation: 'Bảo quản nơi khô ráo thoáng mát, tránh va đập mạnh.',
      badge: 'Mới về',
      inStock: true,
      isFeatured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prod: Product) => {
    setModalMode('edit');
    setCurrentEditingId(prod.id);
    setFormData({
      name: prod.name,
      category: prod.category,
      village: prod.village,
      price: prod.price,
      originalPrice: prod.originalPrice || Math.round(prod.price * 1.2),
      image: prod.images[0] || '/products/bo-am-chen-men-lam-bat-trang.jpg',
      material: prod.material,
      dimensions: prod.dimensions,
      summary: prod.summary,
      description: prod.description,
      artisanStory: prod.artisanStory,
      preservation: prod.preservation,
      badge: prod.badge || '',
      inStock: prod.inStock,
      isFeatured: !!prod.isFeatured,
    });
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (prod: Product) => {
    if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${prod.name}" khỏi danh mục không?`)) {
      deleteProduct(prod.id);
      showToast(`Đã xóa vĩnh viễn sản phẩm "${prod.name}"`);
    }
  };

  const handleResetCatalog = () => {
    if (confirm('Khôi phục danh mục về 14 sản phẩm gốc ban đầu với đầy đủ ảnh chuẩn?')) {
      resetToDefault();
      showToast('Đã khôi phục 14 sản phẩm nguyên bản của Nếp Việt!');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Vui lòng nhập tên sản phẩm.');
      return;
    }

    const categoryObj = CATEGORIES.find((c) => c.id === formData.category);
    const categoryName = categoryObj ? categoryObj.name : 'Thủ công mỹ nghệ';

    if (modalMode === 'create') {
      const slug = formData.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || `san-pham-${Date.now().toString(36)}`;

      addProduct({
        slug,
        name: formData.name.trim(),
        category: formData.category,
        categoryName,
        village: formData.village.trim(),
        price: Number(formData.price) || 100000,
        originalPrice: Number(formData.originalPrice) || Number(formData.price) * 1.2,
        rating: 5.0,
        reviewsCount: 1,
        inStock: formData.inStock,
        images: [formData.image],
        summary: formData.summary.trim(),
        description: formData.description.trim(),
        material: formData.material.trim(),
        dimensions: formData.dimensions.trim(),
        artisanStory: formData.artisanStory.trim(),
        preservation: formData.preservation.trim(),
        badge: formData.badge.trim() || undefined,
        isFeatured: formData.isFeatured,
      });

      showToast(`Đã thêm thành công sản phẩm mới: "${formData.name}"`);
    } else if (modalMode === 'edit' && currentEditingId) {
      updateProduct(currentEditingId, {
        name: formData.name.trim(),
        category: formData.category,
        categoryName,
        village: formData.village.trim(),
        price: Number(formData.price) || 100000,
        originalPrice: Number(formData.originalPrice) || undefined,
        images: [formData.image],
        summary: formData.summary.trim(),
        description: formData.description.trim(),
        material: formData.material.trim(),
        dimensions: formData.dimensions.trim(),
        artisanStory: formData.artisanStory.trim(),
        preservation: formData.preservation.trim(),
        badge: formData.badge.trim() || undefined,
        inStock: formData.inStock,
        isFeatured: formData.isFeatured,
      });

      showToast(`Đã lưu thay đổi cho sản phẩm: "${formData.name}"`);
    }

    setIsModalOpen(false);
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 14850000;
  const completedOrders = orders.filter((o) => o.status === 'completed').length + 84;
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;

  const filteredOrders = orders.filter((order) => {
    if (orderStatusFilter !== 'all' && order.status !== orderStatusFilter) {
      return false;
    }
    if (orderSearchTerm.trim()) {
      const q = orderSearchTerm.toLowerCase();
      return (
        order.id.toLowerCase().includes(q) ||
        order.customerName.toLowerCase().includes(q) ||
        order.phone.includes(q)
      );
    }
    return true;
  });

  const filteredProducts = products.filter((prod) => {
    if (productCategoryFilter !== 'all' && prod.category !== productCategoryFilter) {
      return false;
    }
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      return (
        prod.name.toLowerCase().includes(q) ||
        prod.village.toLowerCase().includes(q) ||
        prod.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-stone-100/90 text-stone-900 flex flex-col font-sans">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-nepgold-500/30 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Navigation Header */}
      <header className="bg-stone-900 text-white border-b border-stone-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-nepred-600 text-white flex items-center justify-center font-serif text-lg font-bold shadow-md">
              NV
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold tracking-wide text-cream-50">
                  NẾP VIỆT ADMIN
                </span>
                <span className="px-2 py-0.5 rounded bg-nepgold-500/20 text-nepgold-400 text-[10px] font-bold uppercase tracking-wider border border-nepgold-500/30">
                  Hệ Thống Quản Trị
                </span>
              </div>
              <p className="text-[10px] text-stone-400 -mt-0.5">
                Bảng điều khiển theo sơ đồ phân cấp (Administrator Flow)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-cream-100 text-xs font-semibold transition-colors"
            >
              <span>Xem Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
            </Link>

            <div className="flex items-center gap-2 pl-3 border-l border-stone-800">
              <div className="w-8 h-8 rounded-full bg-nepred-700 text-white flex items-center justify-center text-xs font-bold">
                AD
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-cream-50">Admin Master</p>
                <p className="text-[10px] text-stone-400">admin@nepviet.vn</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Dashboard Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-6">
        
        {/* Navigation Tabs Bar */}
        <div className="bg-white rounded-2xl p-2 border border-stone-200/90 shadow-sm flex items-center gap-1 overflow-x-auto">
          {[
            { id: 'dashboard', label: 'Tổng Quan & Thống Kê', icon: LayoutDashboard },
            { id: 'orders', label: `Quản Lý Đơn Hàng (${orders.length})`, icon: ShoppingBag },
            { id: 'products', label: `Quản Lý Sản Phẩm (${products.length})`, icon: Package },
            { id: 'artisans', label: `Nghệ Nhân & Làng Nghề (${CRAFT_VILLAGES.length})`, icon: Users },
            { id: 'settings', label: 'Cài Đặt Hệ Thống', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-nepred-600 text-white shadow-md shadow-nepred-600/20'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold">Doanh thu tháng 11</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <p className="font-serif text-2xl font-bold text-stone-900 price-tag">
                  {formatCurrency(totalRevenue)}
                </p>
                <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% so với tháng trước
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold">Tổng đơn hàng</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <p className="font-serif text-2xl font-bold text-stone-900 price-tag">
                  {completedOrders + pendingOrders}
                </p>
                <p className="text-[11px] text-amber-600 font-medium">
                  {pendingOrders} đơn đang chờ xác nhận
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold">Sản phẩm hiện có</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
                <p className="font-serif text-2xl font-bold text-stone-900 price-tag">
                  {products.length}
                </p>
                <p className="text-[11px] text-stone-500">
                  {products.filter((p) => p.inStock).length} sản phẩm sẵn sàng giao
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold">Làng nghề đối tác</span>
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <p className="font-serif text-2xl font-bold text-stone-900 price-tag">
                  15+
                </p>
                <p className="text-[11px] text-stone-500">
                  Hà Nội, Bắc Ninh, Quảng Nam...
                </p>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    Đơn Hàng Gần Đây Cần Xử Lý
                  </h3>
                  <p className="text-xs text-stone-500">Cập nhật theo thời gian thực từ luồng khách hàng</p>
                </div>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-bold text-nepred-600 hover:underline flex items-center gap-1"
                >
                  <span>Xem tất cả đơn hàng</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3 rounded-l-xl">Mã Đơn</th>
                      <th className="p-3">Khách Hàng</th>
                      <th className="p-3">Số Điện Thoại</th>
                      <th className="p-3">Khu Vực</th>
                      <th className="p-3">Tổng Tiền</th>
                      <th className="p-3">Phương Thức</th>
                      <th className="p-3">Trạng Thái</th>
                      <th className="p-3 rounded-r-xl">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-medium">
                    {orders.slice(0, 4).map((order) => (
                      <tr key={order.id} className="hover:bg-stone-50/70 transition-colors">
                        <td className="p-3 font-mono font-bold text-nepred-600">{order.id}</td>
                        <td className="p-3 text-stone-900">{order.customerName}</td>
                        <td className="p-3 text-stone-600 font-mono">{order.phone}</td>
                        <td className="p-3 text-stone-600">{order.city}</td>
                        <td className="p-3 font-bold text-stone-900 price-tag">{formatCurrency(order.total)}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            order.paymentMethod === 'VIETQR' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {order.paymentMethod}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            order.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-700'
                              : order.status === 'shipping'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}>
                            {order.status === 'completed' ? 'Đã giao' : order.status === 'shipping' ? 'Đang giao' : 'Chờ xác nhận'}
                          </span>
                        </td>
                        <td className="p-3">
                          {order.status === 'pending' ? (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'shipping')}
                              className="px-2.5 py-1 bg-nepred-600 hover:bg-nepred-700 text-white rounded-lg text-[10px] font-bold transition-colors"
                            >
                              Duyệt đơn
                            </button>
                          ) : (
                            <span className="text-[11px] text-stone-400">Đã xử lý</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Craft Villages Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-base text-stone-900">
                  Làng Nghề Truyền Thống Kết Nối
                </h3>
                <div className="space-y-3">
                  {CRAFT_VILLAGES.slice(0, 4).map((v) => (
                    <div key={v.id} className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200/70 text-xs">
                      <div>
                        <p className="font-bold text-stone-900">{v.name}</p>
                        <p className="text-[11px] text-stone-500">{v.location}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Đang hoạt động
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-base text-stone-900">
                  Cam Kết Quy Chuẩn Đóng Gói
                </h3>
                <div className="p-4 bg-nepgreen-50 rounded-2xl border border-nepgreen-100 text-xs text-nepgreen-900 leading-relaxed space-y-2">
                  <div className="flex items-center gap-2 font-bold text-nepgreen-800">
                    <ShieldCheck className="w-5 h-5 text-nepgreen-700" />
                    <span>Hệ thống kiểm duyệt chất lượng 100%</span>
                  </div>
                  <p className="text-stone-600">
                    Mỗi sản phẩm gốm sứ Bát Tràng và mây tre Phú Vinh trước khi xuất kho đều được dán tem niêm phong và đóng gói 3 lớp mút chống va đập tiêu chuẩn bảo an.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
              <div>
                <h2 className="font-serif font-bold text-lg text-stone-900">
                  Quản Lý Đơn Hàng Toàn Hệ Thống
                </h2>
                <p className="text-xs text-stone-500">Xem, duyệt và cập nhật tình trạng giao vận cho khách hàng</p>
              </div>

              {/* Filter controls */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm theo mã NV hoặc SĐT..."
                    value={orderSearchTerm}
                    onChange={(e) => setOrderSearchTerm(e.target.value)}
                    className="pl-8 pr-4 py-2 text-xs rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:border-nepred-600"
                  />
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
                </div>

                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="p-2 text-xs rounded-xl border border-stone-300 bg-stone-50 font-medium"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="pending">Chờ xác nhận</option>
                  <option value="shipping">Đang giao hàng</option>
                  <option value="completed">Đã hoàn tất</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3.5">Mã Đơn</th>
                    <th className="p-3.5">Thời Gian</th>
                    <th className="p-3.5">Khách Hàng</th>
                    <th className="p-3.5">Số Điện Thoại</th>
                    <th className="p-3.5">Địa Chỉ</th>
                    <th className="p-3.5">Tổng Tiền</th>
                    <th className="p-3.5">Thanh Toán</th>
                    <th className="p-3.5">Trạng Thái</th>
                    <th className="p-3.5">Hành Động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-medium">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-nepred-600">{order.id}</td>
                      <td className="p-3.5 text-stone-500">{order.date}</td>
                      <td className="p-3.5 text-stone-900 font-semibold">{order.customerName}</td>
                      <td className="p-3.5 text-stone-600 font-mono">{order.phone}</td>
                      <td className="p-3.5 text-stone-600">{order.city}</td>
                      <td className="p-3.5 font-bold text-stone-900 price-tag">{formatCurrency(order.total)}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          order.paymentMethod === 'VIETQR' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {order.paymentMethod}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          order.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : order.status === 'shipping'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}>
                          {order.status === 'completed' ? 'Đã hoàn tất' : order.status === 'shipping' ? 'Đang giao hàng' : 'Chờ xác nhận'}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5">
                          {order.status === 'pending' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'shipping')}
                              className="px-2.5 py-1 rounded-lg bg-nepred-600 text-white hover:bg-nepred-700 text-[10px] font-bold"
                            >
                              Giao hàng
                            </button>
                          )}
                          {order.status === 'shipping' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'completed')}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-[10px] font-bold"
                            >
                              Hoàn tất
                            </button>
                          )}
                          {order.status === 'completed' && (
                            <span className="text-[11px] text-emerald-600 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Xong
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCTS MANAGEMENT (CRUD) */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
              <div>
                <h2 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                  <span>Quản Lý Kho & Danh Mục Sản Phẩm ({filteredProducts.length}/{products.length})</span>
                </h2>
                <p className="text-xs text-stone-500">
                  Hỗ trợ đầy đủ chức năng Thêm mới, Sửa thông tin, Xóa sản phẩm và lưu trữ tự động
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleResetCatalog}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors border border-stone-300"
                  title="Khôi phục lại 14 sản phẩm ban đầu với ảnh gốc"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Khôi phục 14 ảnh gốc</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenCreateModal}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-nepred-600 hover:bg-nepred-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm Sản Phẩm Mới</span>
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-50 p-3 rounded-2xl border border-stone-200">
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Tìm theo tên sản phẩm, mã hoặc làng nghề..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full pl-8 pr-4 py-1.5 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-nepred-600"
                  />
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-stone-500">Danh mục:</span>
                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className="p-1.5 text-xs rounded-xl border border-stone-300 bg-white font-medium"
                >
                  <option value="all">Tất cả danh mục ({products.length})</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">Ảnh</th>
                    <th className="p-3">Tên Sản Phẩm</th>
                    <th className="p-3">Danh Mục</th>
                    <th className="p-3">Làng Nghề Xuất Xứ</th>
                    <th className="p-3">Giá Bán</th>
                    <th className="p-3">Đánh Giá</th>
                    <th className="p-3">Tình Trạng</th>
                    <th className="p-3 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-medium">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-stone-400 text-xs">
                        Không tìm thấy sản phẩm nào khớp với tìm kiếm.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-stone-50/70 transition-colors">
                        <td className="p-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 flex-shrink-0">
                            <Image
                              src={prod.images[0] || '/products/bo-am-chen-men-lam-bat-trang.jpg'}
                              alt={prod.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </td>
                        <td className="p-3 font-serif font-bold text-stone-900 max-w-xs">
                          <div className="truncate">
                            <Link
                              href={`/san-pham/${prod.slug}`}
                              target="_blank"
                              className="hover:text-nepred-600 transition-colors"
                              title={prod.name}
                            >
                              {prod.name}
                            </Link>
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-mono text-[10px] text-stone-400">{prod.id}</span>
                            {prod.badge && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[9px] font-bold">
                                {prod.badge}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-stone-600 whitespace-nowrap">{prod.categoryName}</td>
                        <td className="p-3 text-stone-500 text-[11px] max-w-xs truncate">{prod.village}</td>
                        <td className="p-3 font-bold text-nepred-600 price-tag whitespace-nowrap">
                          {formatCurrency(prod.price)}
                          {prod.originalPrice && (
                            <span className="block text-[10px] text-stone-400 line-through font-normal price-tag">
                              {formatCurrency(prod.originalPrice)}
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-amber-500 font-bold whitespace-nowrap">
                          ★ {prod.rating} <span className="text-[10px] text-stone-400">({prod.reviewsCount})</span>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleToggleStock(prod)}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                              prod.inStock
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                            title="Nhấn để đổi trạng thái kho"
                          >
                            {prod.inStock ? 'Còn hàng' : 'Tạm hết'}
                          </button>
                        </td>
                        <td className="p-3 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEditModal(prod)}
                              className="p-1.5 rounded-lg bg-stone-100 hover:bg-nepred-50 hover:text-nepred-600 text-stone-600 transition-colors"
                              title="Sửa sản phẩm"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(prod)}
                              className="p-1.5 rounded-lg bg-stone-100 hover:bg-red-50 hover:text-red-600 text-stone-600 transition-colors"
                              title="Xóa sản phẩm"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: ARTISANS & VILLAGES */}
        {activeTab === 'artisans' && (
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6">
            <div>
              <h2 className="font-serif font-bold text-lg text-stone-900">
                Mạng Lưới Đối Tác Nghệ Nhân & Làng Nghề Di Sản
              </h2>
              <p className="text-xs text-stone-500">Quản lý hồ sơ các xưởng thủ công truyền thống hợp tác cùng Nếp Việt</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CRAFT_VILLAGES.map((v) => (
                <div key={v.id} className="p-5 rounded-2xl border border-stone-200 space-y-3 bg-stone-50/50">
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-stone-200">
                    <Image src={v.image} alt={v.name} fill className="object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-nepred-600">{v.history}</span>
                    <h3 className="font-serif font-bold text-base text-stone-900 mt-0.5">{v.name}</h3>
                    <p className="text-xs text-stone-500">{v.location}</p>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed border-t border-stone-200/60 pt-2">
                    {v.highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SYSTEM SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6 max-w-3xl">
            <h2 className="font-serif font-bold text-lg text-stone-900 pb-3 border-b border-stone-100">
              Cài Đặt Hệ Thống & Cấu Hình Cửa Hàng
            </h2>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-stone-700">Tên thương hiệu doanh nghiệp</label>
                <input
                  type="text"
                  defaultValue="NẾP VIỆT – Tiệm Thủ Công Di Sản"
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-stone-50"
                  readOnly
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700">Tài khoản thụ hưởng VietQR (MB Bank)</label>
                <input
                  type="text"
                  defaultValue="0968999888 - CONG TY TNHH NEP VIET"
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-stone-50 font-mono"
                  readOnly
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700">Mức miễn phí vận chuyển (Freeship Threshold)</label>
                <input
                  type="text"
                  defaultValue="300.000 VNĐ"
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-stone-50 font-mono"
                  readOnly
                />
              </div>

              <div className="p-4 bg-nepgold-50 rounded-2xl border border-nepgold-200 text-stone-700 space-y-1">
                <p className="font-bold text-stone-900">Bảo mật phân quyền quản trị:</p>
                <p>Phiên bản MVP hiện đang ở chế độ Demo Master Access dành cho ban giảng viên và hội đồng nghiệm thu học phần.</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* CRUD MODAL: THÊM / SỬA SẢN PHẨM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="font-serif font-bold text-xl text-stone-900">
                  {modalMode === 'create' ? 'Thêm Sản Phẩm Mới' : 'Chỉnh Sửa Thông Tin Sản Phẩm'}
                </h3>
                <p className="text-xs text-stone-500">
                  {modalMode === 'create'
                    ? 'Nhập các trường thông tin bên dưới để niêm yết sản phẩm lên trang bán hàng.'
                    : 'Cập nhật giá, ảnh, mô tả hoặc xuất xứ làng nghề.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-stone-700">Tên sản phẩm (*)</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ví dụ: Bình Gốm Chu Đậu Vẽ Vàng..."
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:border-nepred-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Danh mục (*)</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:border-nepred-600 focus:outline-none bg-white font-medium"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Làng nghề / Xuất xứ</label>
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    placeholder="Ví dụ: Làng gốm Bát Tràng, Hà Nội"
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:border-nepred-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Giá bán (VNĐ) (*)</label>
                  <input
                    type="number"
                    min="1000"
                    step="1000"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:border-nepred-600 focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Giá gốc niêm yết (VNĐ - Tùy chọn)</label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:border-nepred-600 focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Image Picker */}
              <div className="space-y-2 p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <label className="font-bold text-stone-700 flex items-center justify-between">
                  <span>Hình ảnh sản phẩm (*)</span>
                  <span className="text-[10px] text-stone-500 font-normal">Chọn từ 14 ảnh mẫu chuẩn hoặc dán link</span>
                </label>

                {/* Preset image select buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-36 overflow-y-auto p-1">
                  {PRESET_IMAGES.map((img) => (
                    <button
                      key={img.path}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: img.path })}
                      className={`flex items-center gap-2 p-1.5 rounded-xl border text-left transition-all ${
                        formData.image === img.path
                          ? 'border-nepred-600 bg-nepred-50 text-nepred-900 ring-2 ring-nepred-600/30'
                          : 'border-stone-200 bg-white hover:border-stone-400'
                      }`}
                    >
                      <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-stone-100">
                        <Image src={img.path} alt={img.label} fill className="object-cover" />
                      </div>
                      <span className="text-[10px] font-medium truncate">{img.label}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] font-bold text-stone-500 whitespace-nowrap">Đường dẫn ảnh:</span>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/products/... hoặc https://..."
                    className="w-full p-1.5 text-xs rounded-lg border border-stone-300 bg-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Chất liệu</label>
                  <input
                    type="text"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    placeholder="Ví dụ: Đất cao lanh men hoả biến"
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Kích thước / Quy cách</label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    placeholder="Ví dụ: Cao 22cm x Bụng 14cm"
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700">Tóm tắt ngắn (Summary)</label>
                <textarea
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Mô tả 1-2 câu ngắn gọn làm nổi bật nét độc đáo..."
                  className="w-full p-2.5 rounded-xl border border-stone-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Huy hiệu (Badge)</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="Bán chạy, Mới, Độc bản..."
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="modalInStock"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="w-4 h-4 rounded text-nepred-600 focus:ring-nepred-600"
                  />
                  <label htmlFor="modalInStock" className="font-bold text-stone-700 cursor-pointer">
                    Còn hàng trong kho
                  </label>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="modalIsFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-nepred-600 focus:ring-nepred-600"
                  />
                  <label htmlFor="modalIsFeatured" className="font-bold text-stone-700 cursor-pointer">
                    Đưa lên Trang Chủ
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-50 font-bold transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-nepred-600 hover:bg-nepred-700 text-white font-bold shadow-md transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>{modalMode === 'create' ? 'Thêm Sản Phẩm Ngay' : 'Lưu Thay Đổi'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
