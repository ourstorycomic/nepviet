'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS, CRAFT_VILLAGES, CATEGORIES } from '@/data/products';
import { formatCurrency } from '@/utils/format';
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

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'artisans' | 'settings'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [productsList, setProductsList] = useState(PRODUCTS);

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
  };

  const toggleProductStock = (productId: string) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 14850000;
  const completedOrders = orders.filter((o) => o.status === 'completed').length + 84;
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;

  const filteredOrders = orders.filter((order) => {
    if (orderStatusFilter !== 'all' && order.status !== orderStatusFilter) {
      return false;
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        order.id.toLowerCase().includes(q) ||
        order.customerName.toLowerCase().includes(q) ||
        order.phone.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-stone-100/90 text-stone-900 flex flex-col">
      
      {/* Top Admin Navigation Header */}
      <header className="bg-stone-900 text-white border-b border-stone-800 sticky top-0 z-50">
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
            { id: 'products', label: `Quản Lý Sản Phẩm (${productsList.length})`, icon: Package },
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
                  <span className="font-semibold">Sản phẩm thủ công</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
                <p className="font-serif text-2xl font-bold text-stone-900 price-tag">
                  {productsList.length}
                </p>
                <p className="text-[11px] text-stone-500">
                  5 dòng sản phẩm cốt lõi
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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

        {/* TAB 3: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
              <div>
                <h2 className="font-serif font-bold text-lg text-stone-900">
                  Quản Lý Kho & Sản Phẩm Thủ Công ({productsList.length})
                </h2>
                <p className="text-xs text-stone-500">Kiểm soát tình trạng còn hàng, giá niêm yết và thông tin xuất xứ</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => alert('Chức năng thêm sản phẩm: Dành cho phiên bản tiếp theo khi kết nối API.')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-nepred-600 hover:bg-nepred-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm Sản Phẩm Mới</span>
                </button>
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
                    <th className="p-3">Giá Niêm Yết</th>
                    <th className="p-3">Đánh Giá</th>
                    <th className="p-3">Tình Trạng</th>
                    <th className="p-3">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-medium">
                  {productsList.map((prod) => (
                    <tr key={prod.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="p-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                          <Image src={prod.images[0]} alt={prod.name} fill className="object-cover" />
                        </div>
                      </td>
                      <td className="p-3 font-serif font-bold text-stone-900 max-w-xs truncate">
                        <Link href={`/san-pham/${prod.slug}`} target="_blank" className="hover:text-nepred-600 transition-colors">
                          {prod.name}
                        </Link>
                      </td>
                      <td className="p-3 text-stone-600">{prod.categoryName}</td>
                      <td className="p-3 text-stone-500 text-[11px] max-w-xs truncate">{prod.village}</td>
                      <td className="p-3 font-bold text-nepred-600 price-tag">{formatCurrency(prod.price)}</td>
                      <td className="p-3 text-amber-500 font-bold">★ {prod.rating}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          prod.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {prod.inStock ? 'Còn hàng' : 'Tạm hết'}
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => toggleProductStock(prod.id)}
                          className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[10px] font-bold transition-colors"
                        >
                          {prod.inStock ? 'Đổi hết hàng' : 'Bật còn hàng'}
                        </button>
                      </td>
                    </tr>
                  ))}
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
    </div>
  );
}
