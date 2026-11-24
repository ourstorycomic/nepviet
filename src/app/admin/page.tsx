'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CRAFT_VILLAGES, CATEGORIES } from '@/data/products';
import { useProducts } from '@/utils/productsCatalog';
import { formatCurrency } from '@/utils/format';
import { Product } from '@/types';
import {
  getSupabaseConfig,
  saveSupabaseConfig,
  clearSupabaseConfig,
  isSupabaseConfigured,
  testSupabaseConnection,
} from '@/lib/supabase';
import {
  seedAllToSupabase,
  seedProductsToSupabase,
  DbAccount,
  SEED_ACCOUNTS,
  getSupabaseTableStats,
  fetchAccountsFromDb,
  createAccountInDb,
} from '@/services/supabaseService';
import { useAuth } from '@/context/AuthContext';
import { AdminLoginGate } from '@/components/AdminLoginGate';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  TrendingUp,
  Settings,
  ArrowUpRight,
  Star,
  Search,
  Plus,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle,
  AlertTriangle,
  Info,
  FileText,
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
  Database,
  Terminal,
  Copy,
  Check,
  Globe,
  Sparkles as SparklesIcon,
  UploadCloud,
  LogOut,
  Lock,
  User as UserIcon,
  QrCode,
  Store,
  ArrowRight,
  Award,
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
  transactionCode?: string;
  isPaid?: boolean;
}

const PRESET_IMAGES = [
  { label: 'Làng Gốm Bát Tràng', path: '/villages/lang-gom-bat-trang.webp' },
  { label: 'Làng Tranh Đông Hồ', path: '/villages/lang-tranh-dong-ho.jpg' },
  { label: 'Làng Lụa Vạn Phúc', path: '/villages/lang-lua-van-phuc.webp' },
  { label: 'Gốm Sứ Bát Tràng', path: '/showcase/gom-su-bat-trang.png' },
  { label: 'Mây Tre Đan Phú Vinh', path: '/showcase/may-tre-dan-phu-vinh.webp' },
  { label: 'Tranh Dân Gian Đông Hồ', path: '/showcase/tranh-dan-gian-dong-ho.jpg' },
  { label: 'Lụa Tơ Tằm Vạn Phúc', path: '/showcase/lua-to-tam-van-phuc.jpg' },
  { label: 'Ẩm Thực & Trà Cổ Truyền', path: '/showcase/am-thuc-tra-co-truyen.jpg' },
  { label: 'Quà Tặng & Đồ Chơi Dân Gian', path: '/showcase/qua-tang-do-choi-dan-gian.webp' },
  { label: 'Nghệ nhân làng nghề Việt', path: '/showcase/nghe-nhan-lang-nghe-viet.jpg' },
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
  const router = useRouter();
  const { adminUser, isAdminLoggedIn, logoutAdmin } = useAuth();

  const isStaff = adminUser?.role === 'staff';
  const isArtisan = adminUser?.role === 'artisan';
  const isMaster = adminUser?.role === 'admin';

  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'inspections' | 'artisans' | 'accounts' | 'settings'>('dashboard');

  // Điều hướng nghệ nhân trực tiếp sang Kênh Nghệ Nhân Studio
  useEffect(() => {
    if (isArtisan) {
      router.replace('/kenh-nghe-nhan');
    }
  }, [isArtisan, router]);

  // Tự động chuyển về orders nếu staff chọn tab không có quyền
  useEffect(() => {
    if (isStaff && (activeTab === 'accounts' || activeTab === 'settings')) {
      setActiveTab('orders');
    }
  }, [isStaff, activeTab]);
  const [orderSearchTerm, setOrderSearchTerm] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Accounts & RBAC State
  const [accountsList, setAccountsList] = useState<DbAccount[]>(SEED_ACCOUNTS);
  const [accountRoleFilter, setAccountRoleFilter] = useState<string>('all');
  const [accountSearch, setAccountSearch] = useState<string>('');
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [newAccountData, setNewAccountData] = useState<DbAccount>({
    id: `acc-${Date.now().toString().slice(-4)}`,
    email: '',
    password: '',
    full_name: '',
    phone: '',
    role: 'customer',
    address: '',
    city: 'Hà Nội',
    loyalty_points: 0,
  });

  // Table Statistics State
  const [tableStats, setTableStats] = useState<{
    connected: boolean;
    accountsCount: number;
    productsCount: number;
    villagesCount: number;
    ordersCount: number;
    reviewsCount: number;
  }>({
    connected: false,
    accountsCount: 5,
    productsCount: 14,
    villagesCount: 5,
    ordersCount: 5,
    reviewsCount: 4,
  });

  // Image Upload & Picker Mode State
  const [imagePickMode, setImagePickMode] = useState<'upload' | 'preset' | 'url'>('upload');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadSuccessName, setUploadSuccessName] = useState<string | null>(null);

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

  // Custom Toast State
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

  // Custom Confirmation / Prompt Modal Dialog State
  interface ConfirmDialogState {
    isOpen: boolean;
    type: 'danger' | 'warning' | 'info' | 'prompt';
    title: string;
    message: string;
    itemPreview?: {
      name: string;
      id?: string;
      image?: string;
      price?: number;
      badge?: string;
    };
    confirmText?: string;
    cancelText?: string;
    promptPlaceholder?: string;
    onConfirm: (val?: string) => void | Promise<void>;
  }
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState | null>(null);
  const [promptInput, setPromptInput] = useState('');

  // VietQR Order Modal state
  const [selectedVietQrOrder, setSelectedVietQrOrder] = useState<MockOrder | null>(null);

  // Beneficiary Bank Settings State
  const [bankSettings, setBankSettings] = useState({
    bankCode: 'MB' as 'MB' | 'VCB' | 'TCB' | 'TPB',
    accountNo: '0968999888',
    accountName: 'CONG TY TNHH NEP VIET',
    branch: 'Hội sở chính / PGD Cầu Giấy, Hà Nội',
    testAmount: 250000,
  });

  // Supabase Database State
  const [isCloudConnected, setIsCloudConnected] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [showSchemaModal, setShowSchemaModal] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  useEffect(() => {
    try {
      // 1. Khôi phục đơn hàng đã lưu trong nepviet_orders_db (kèm trạng thái xử lý kho)
      const savedAdminOrders = localStorage.getItem('nepviet_orders_db');
      let baseOrders: MockOrder[] = [];
      if (savedAdminOrders) {
        const parsed = JSON.parse(savedAdminOrders);
        if (Array.isArray(parsed) && parsed.length > 0) {
          baseOrders = parsed;
          setOrders(parsed);
        }
      }

      // 2. Đồng bộ các đơn đặt hàng mới từ cổng Checkout khách hàng
      const raw = localStorage.getItem('nepviet_custom_orders');
      if (raw) {
        const customOrders = JSON.parse(raw);
        if (Array.isArray(customOrders) && customOrders.length > 0) {
          const formatted: MockOrder[] = customOrders.map((co: any) => ({
            id: co.id,
            customerName: co.customer || co.customerName || 'Khách vãng lai',
            phone: co.phone || '0981234567',
            city: co.city || 'Hà Nội',
            itemsCount: co.items?.length || 1,
            total: co.total,
            paymentMethod: (co.paymentMethod === 'BANK' || co.method === 'VIETQR' ? 'VIETQR' : 'COD') as any,
            status: co.status === 'Đã thanh toán' ? 'completed' : co.status === 'shipping' ? 'shipping' : 'pending',
            date: co.date || co.paidAt || new Date().toISOString().split('T')[0],
            transactionCode: co.transactionCode,
            isPaid: co.method === 'VIETQR' || co.paymentMethod === 'VIETQR' || co.status === 'Đã thanh toán',
          }));
          setOrders((prev) => {
            const currentList = baseOrders.length > 0 ? baseOrders : prev;
            const existingIds = new Set(currentList.map(p => p.id));
            const newOnes = formatted.filter(f => !existingIds.has(f.id));
            const merged = [...newOnes, ...currentList];
            try {
              localStorage.setItem('nepviet_orders_db', JSON.stringify(merged));
            } catch (err) {
              console.error(err);
            }
            return merged;
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const refreshSupabaseData = async () => {
    try {
      const stats = await getSupabaseTableStats();
      if (stats.connected) {
        setTableStats(stats);
      }
      const accs = await fetchAccountsFromDb();
      if (accs && accs.length > 0) {
        setAccountsList(accs);
      }
    } catch (e) {
      console.warn('Lỗi refresh Supabase data:', e);
    }
  };

  useEffect(() => {
    if (isSupabaseConfigured()) {
      setIsCloudConnected(true);
      refreshSupabaseData();
    }
  }, []);

  const handleSeedSupabase = async () => {
    setIsSeeding(true);
    const res = await seedAllToSupabase();
    setIsSeeding(false);
    showToast(res.message);
    await refreshSupabaseData();
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccountData.email.trim() || !newAccountData.full_name.trim() || !newAccountData.password?.trim()) {
      showToast('Vui lòng điền đầy đủ Email, Mật khẩu và Họ tên.', 'warning');
      return;
    }

    const accountToSave: DbAccount = {
      ...newAccountData,
      id: newAccountData.id || `acc-${Date.now().toString().slice(-4)}`,
      email: newAccountData.email.trim().toLowerCase(),
      created_at: new Date().toISOString(),
    };

    setAccountsList((prev) => [accountToSave, ...prev]);

    if (isCloudConnected || isSupabaseConfigured()) {
      const ok = await createAccountInDb(accountToSave);
      if (ok) {
        showToast(`Đã lưu tài khoản ${accountToSave.email} lên Supabase!`);
      } else {
        showToast(`Đã lưu tài khoản ${accountToSave.email} vào bộ nhớ máy.`);
      }
    } else {
      showToast(`Đã lưu tài khoản ${accountToSave.email} thành công!`);
    }

    setIsNewAccountModalOpen(false);
    setNewAccountData({
      id: `acc-${Date.now().toString().slice(-4)}`,
      email: '',
      password: '',
      full_name: '',
      phone: '',
      role: 'customer',
      address: '',
      city: 'Hà Nội',
      loyalty_points: 0,
    });
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
    setOrders((prev) => {
      const updated = prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
      try {
        localStorage.setItem('nepviet_orders_db', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    showToast(`Đã cập nhật trạng thái đơn ${orderId} thành "${newStatus === 'completed' ? 'Hoàn tất' : newStatus === 'shipping' ? 'Đang giao' : newStatus === 'cancelled' ? 'Đã hủy' : 'Chờ xử lý'}"`);
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
    if (adminUser?.role !== 'admin') {
      showToast('Tài khoản của bạn là Nghệ Nhân / Nhân Viên Vận Hành. Chỉ Admin Master mới có quyền xóa sản phẩm khỏi cơ sở dữ liệu!', 'error');
      return;
    }

    setConfirmDialog({
      isOpen: true,
      type: 'danger',
      title: 'Xác Nhận Xóa Tác Phẩm',
      message: 'Bạn có chắc chắn muốn xóa vĩnh viễn tác phẩm này khỏi danh mục sàn Nếp Việt? Thao tác này sẽ đồng bộ trên toàn hệ thống và không thể hoàn tác.',
      itemPreview: {
        name: prod.name,
        id: prod.id,
        image: prod.images[0] || '/products/bo-am-chen-men-lam-bat-trang.jpg',
        price: prod.price,
      },
      confirmText: 'Xóa Vĩnh Viễn',
      cancelText: 'Giữ Lại Tác Phẩm',
      onConfirm: async () => {
        await deleteProduct(prod.id);
        showToast(`Đã xóa vĩnh viễn sản phẩm "${prod.name}" thành công!`, 'success');
      },
    });
  };

  const handleResetCatalog = () => {
    if (adminUser?.role === 'staff') {
      showToast('Tài khoản Staff không có quyền khôi phục danh mục!', 'error');
      return;
    }

    setConfirmDialog({
      isOpen: true,
      type: 'warning',
      title: 'Khôi Phục Danh Mục Gốc',
      message: 'Hệ thống sẽ đặt lại toàn bộ danh mục sản phẩm về các tuyệt tác di sản nguyên bản của Nếp Việt với đầy đủ hình ảnh chuẩn OCOP chất lượng cao.',
      confirmText: 'Khôi Phục Ngay',
      cancelText: 'Hủy Bỏ',
      onConfirm: () => {
        resetToDefault();
        showToast('Đã khôi phục danh mục di sản nguyên bản của Nếp Việt thành công!', 'success');
      },
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Vui lòng chọn tệp hình ảnh (.jpg, .png, .webp, .avif)!', 'warning');
      return;
    }

    setIsUploadingImage(true);
    setUploadSuccessName(null);

    try {
      const data = new FormData();
      data.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      const json = await res.json();
      if (json.success && json.url) {
        setFormData((prev) => ({ ...prev, image: json.url }));
        setUploadSuccessName(file.name);
        showToast(`Đã tải lên ảnh thành công: ${file.name}`);
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64 = event.target?.result as string;
          setFormData((prev) => ({ ...prev, image: base64 }));
          setUploadSuccessName(file.name);
          showToast(`Đã tải lên ảnh (Base64): ${file.name}`);
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setFormData((prev) => ({ ...prev, image: base64 }));
        setUploadSuccessName(file.name);
        showToast(`Đã tải lên ảnh: ${file.name}`);
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Vui lòng nhập tên sản phẩm.', 'warning');
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

  const totalRevenue = orders.reduce((sum, o) => sum + (o.status === 'completed' || o.isPaid ? o.total : 0), 0);
  const totalGmv = orders.reduce((sum, o) => sum + o.total, 0);
  const completedOrders = orders.filter((o) => o.status === 'completed').length;
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

  const pendingProducts = products.filter(
    (p) => p.approvalStatus === 'pending' || (p.badge && p.badge.includes('Chờ'))
  );
  const approvedProducts = products.filter(
    (p) => p.approvalStatus === 'approved' || (!p.approvalStatus && (!p.badge || !p.badge.includes('Chờ')))
  );

  const handleApproveInspection = async (prodId: string, badgeName = 'Tem OCOP 4 Sao') => {
    await updateProduct(prodId, {
      approvalStatus: 'approved',
      badge: badgeName,
      inStock: true,
    });
    showToast(`Đã phê duyệt tác phẩm đạt chuẩn ${badgeName} và mở bán trực tiếp lên sàn!`);
  };

  const handleRejectInspection = async (prodId: string, prodName: string) => {
    const defaultReason = 'Ảnh chụp thiếu mộc triện xưởng ở đáy sản phẩm. Vui lòng bổ sung giấy kiểm định nung củi khử oxy.';
    setPromptInput(defaultReason);
    setConfirmDialog({
      isOpen: true,
      type: 'prompt',
      title: 'Yêu Cầu Bổ Sung Hồ Sơ',
      message: `Gửi phản hồi hướng dẫn nghệ nhân hoàn thiện hồ sơ kiểm định cho tác phẩm "${prodName}":`,
      promptPlaceholder: 'Nhập nội dung yêu cầu gửi xưởng nghệ nhân...',
      confirmText: 'Gửi Nghệ Nhân',
      cancelText: 'Đóng',
      onConfirm: async (reason) => {
        const finalReason = (reason && reason.trim()) || defaultReason;
        await updateProduct(prodId, {
          approvalStatus: 'rejected',
          rejectionReason: finalReason,
          badge: 'Yêu cầu hoàn thiện hồ sơ',
        });
        showToast(`Đã gửi yêu cầu bổ sung hồ sơ tới xưởng nghệ nhân!`, 'info');
      },
    });
  };

  // Kiểm tra phân quyền đăng nhập Admin Portal
  if (!isAdminLoggedIn) {
    return <AdminLoginGate />;
  }

  return (
    <div className="min-h-screen bg-stone-100/90 text-stone-900 flex flex-col font-sans">

      {/* Custom Stacked Toasts */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-2xl border flex items-start gap-3 transition-all transform translate-y-0 animate-slideInRight ${toast.type === 'error'
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

      {/* Top Admin Navigation Header */}
      <header className="bg-stone-900 text-white border-b border-stone-800 sticky top-0 z-40">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-nepred-700 via-nepred-600 to-nepbrown-800 text-white flex items-center justify-center shadow-lg shadow-nepred-950/40 border border-nepgold-500/40 group-hover:scale-105 transition-all duration-300 flex-shrink-0">
              <div className="absolute inset-0.5 rounded-xl border border-dashed border-nepgold-400/40 pointer-events-none" />
              <span className="font-han text-2xl font-bold tracking-normal text-cream-50 drop-shadow-sm select-none">
                越
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-black tracking-wide text-cream-50 group-hover:text-amber-300 transition-colors">
                  {adminUser?.role === 'artisan' ? 'NẾP VIỆT ARTISAN' : 'NẾP VIỆT ADMIN'}
                </span>
                <span className="font-han text-xs font-bold text-nepgold-400 select-none tracking-wider opacity-90" title="惗越 (Nếp Việt - Hán Nôm)">
                  惗越
                </span>
                <span className="px-2 py-0.5 rounded-full bg-nepgold-500/20 text-nepgold-400 text-[10px] font-bold uppercase tracking-wider border border-nepgold-500/30">
                  {adminUser?.role === 'artisan' ? 'Cổng Đối Tác Xưởng' : adminUser?.role === 'staff' ? 'Phân Hệ Vận Hành Kho' : 'Trung Tâm Quản Trị'}
                </span>
              </div>
              <p className="text-[10px] text-stone-400 -mt-0.5">
                {adminUser?.role === 'artisan'
                  ? 'Luồng Nghệ nhân / Đối tác cung cấp (Artisan Studio Flow)'
                  : adminUser?.role === 'staff'
                  ? 'Hệ thống vận hành xử lý đơn hàng & xuất nhập kho (Operations Flow)'
                  : 'Hệ thống điều hành thương mại điện tử di sản toàn sàn (Master Administrator Flow)'}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-cream-100 text-xs font-semibold transition-colors"
            >
              <span>Xem Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
            </Link>

            <div className="flex items-center gap-2.5 pl-3 border-l border-stone-800">
              <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-bold shadow ${adminUser?.role === 'admin'
                ? 'bg-nepred-600'
                : adminUser?.role === 'artisan'
                  ? 'bg-blue-600'
                  : 'bg-amber-600'
                }`}>
                {adminUser?.role === 'admin' ? 'AD' : adminUser?.role === 'artisan' ? 'NN' : 'KH'}
              </div>
              <div className="hidden sm:block text-left">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-cream-50">{adminUser?.name || 'Admin Master'}</p>
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${adminUser?.role === 'admin'
                    ? 'bg-nepred-500/20 text-nepred-400 border border-nepred-500/30'
                    : adminUser?.role === 'artisan'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                    {adminUser?.role === 'admin' ? 'Master' : adminUser?.role === 'artisan' ? 'Nghệ Nhân' : 'Kho'}
                  </span>
                </div>
                <p className="text-[10px] text-stone-400">{adminUser?.email || 'admin@nepviet.vn'}</p>
              </div>

              <button
                type="button"
                onClick={logoutAdmin}
                className="p-1.5 ml-1 rounded-lg bg-stone-800 hover:bg-red-950/80 text-stone-400 hover:text-red-300 transition-colors"
                title="Đăng xuất khỏi hệ thống quản trị"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Dashboard Container */}
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-6">

        {/* Banner điều hướng dành cho Nghệ Nhân khi vào Cổng Admin Toàn Sàn */}
        {adminUser?.role === 'artisan' && (
          <div className="p-4 sm:p-5 rounded-3xl bg-amber-50 border border-amber-300 text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm animate-fadeIn">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm">Bạn đang đăng nhập bằng tài khoản Nghệ Nhân ({adminUser?.email})</p>
                  <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold">Đối Tác Xưởng</span>
                </div>
                <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                  Trang này là <strong>Cổng Điều Hành Toàn Sàn</strong> của Nếp Việt. Vui lòng chuyển sang <strong>Kênh Nghệ Nhân (Studio)</strong> để quản lý riêng xưởng thủ công, tác phẩm chế tác và ví doanh thu của bạn.
                </p>
              </div>
            </div>
            <Link
              href="/kenh-nghe-nhan"
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-all whitespace-nowrap flex items-center gap-1.5 flex-shrink-0"
            >
              <span>Vào Kênh Nghệ Nhân Của Bạn</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Staff Role Notice */}
        {adminUser?.role === 'staff' && (
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-xs animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span>
                Quyền hạn tài khoản: <strong>Nhân Viên Vận Hành & Kho ({adminUser?.email})</strong>. Bạn đang quản lý luồng tiếp nhận đơn hàng, cập nhật vận đơn và kiểm kê số lượng sản phẩm làng nghề.
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold flex-shrink-0 border border-blue-200">
              Phân Hệ Vận Hành Kho
            </span>
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <div className="bg-white rounded-2xl p-2 border border-stone-200/90 shadow-sm flex items-center gap-1 overflow-x-auto">
          {[
            {
              id: 'dashboard',
              label: 'Tổng Quan & Thống Kê',
              icon: LayoutDashboard,
            },
            {
              id: 'orders',
              label: `Quản Lý Đơn Hàng (${orders.length})`,
              icon: ShoppingBag,
            },
            {
              id: 'products',
              label: `Quản Lý Sản Phẩm & Kho (${products.length})`,
              icon: Package,
            },
            {
              id: 'inspections',
              label: pendingProducts.length > 0 ? `Kiểm Định & Duyệt (${pendingProducts.length})` : 'Kiểm Định & Duyệt',
              icon: Award,
            },
            {
              id: 'artisans',
              label: `Nghệ Nhân & Làng Nghề (${CRAFT_VILLAGES.length})`,
              icon: Users,
            },
            ...(!isStaff
              ? [
                {
                  id: 'accounts',
                  label: `Tài Khoản & Phân Quyền (${accountsList.length})`,
                  icon: ShieldCheck,
                },
                {
                  id: 'settings',
                  label: 'Cài Đặt Hệ Thống',
                  icon: Settings,
                },
              ]
              : []),
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${isActive
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

            {/* Banner Thông Báo Có Tác Phẩm Chờ Duyệt Kiểm Định */}
            {pendingProducts.length > 0 && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-700 to-stone-900 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-amber-100 flex-shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm">Hội Đồng Kiểm Định: Có {pendingProducts.length} tác phẩm mới gửi lên chờ cấp tem OCOP</p>
                      <span className="px-2 py-0.5 rounded-full bg-white/25 text-[10px] font-bold">Chờ Thẩm Định</span>
                    </div>
                    <p className="text-xs text-cream-100 mt-0.5">
                      Nghệ nhân từ Xưởng Bát Tràng vừa nộp hồ sơ tác phẩm mới. Vui lòng thẩm định chất lượng đất sét, lò nung và cấp tem trước khi niêm yết lên sàn.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('inspections')}
                  className="px-4 py-2 rounded-xl bg-white text-stone-900 font-bold text-xs shadow-sm hover:bg-cream-100 transition-colors whitespace-nowrap flex-shrink-0"
                >
                  Thẩm Định Ngay →
                </button>
              </div>
            )}

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
                  {orders.length}
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
                  {CRAFT_VILLAGES.length}
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
                <table className="w-full text-left text-xs table-auto">
                  <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-2 sm:px-3 rounded-l-xl">Mã Đơn</th>
                      <th className="py-3 px-2 sm:px-3">Khách Hàng</th>
                      <th className="py-3 px-2 sm:px-3">Số Điện Thoại</th>
                      <th className="py-3 px-2 sm:px-3">Khu Vực</th>
                      <th className="py-3 px-2 sm:px-3">Tổng Tiền</th>
                      <th className="py-3 px-2 sm:px-3">Phương Thức</th>
                      <th className="py-3 px-2 sm:px-3">Trạng Thái</th>
                      <th className="py-3 px-3 text-right whitespace-nowrap sticky right-0 bg-stone-50 shadow-[-6px_0_10px_-4px_rgba(0,0,0,0.08)] z-10 rounded-r-xl">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-medium">
                    {orders.slice(0, 4).map((order) => (
                      <tr key={order.id} className="group hover:bg-stone-50/70 transition-colors">
                        <td className="py-2.5 px-2 sm:px-3 font-mono font-bold text-nepred-600">{order.id}</td>
                        <td className="py-2.5 px-2 sm:px-3 text-stone-900">{order.customerName}</td>
                        <td className="py-2.5 px-2 sm:px-3 text-stone-600 font-mono">{order.phone}</td>
                        <td className="py-2.5 px-2 sm:px-3 text-stone-600">{order.city}</td>
                        <td className="py-2.5 px-2 sm:px-3 font-bold text-stone-900 price-tag">{formatCurrency(order.total)}</td>
                        <td className="py-2.5 px-2 sm:px-3">
                          {order.paymentMethod === 'VIETQR' ? (
                            <button
                              type="button"
                              onClick={() => setSelectedVietQrOrder(order)}
                              className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 hover:bg-blue-200 text-blue-700 inline-flex items-center gap-1 transition-colors cursor-pointer"
                              title="Bấm để xem biên lai & mã VietQR"
                            >
                              <QrCode className="w-3 h-3 text-blue-600" />
                              <span>VIETQR</span>
                            </button>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
                              COD
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-2 sm:px-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${order.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : order.status === 'shipping'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-amber-50 text-amber-700'
                            }`}>
                            {order.status === 'completed' ? 'Đã giao' : order.status === 'shipping' ? 'Đang giao' : 'Chờ xác nhận'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right whitespace-nowrap sticky right-0 bg-white group-hover:bg-stone-50/90 transition-colors shadow-[-6px_0_10px_-4px_rgba(0,0,0,0.08)] z-10">
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
            <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-xs">
              <table className="w-full text-left text-xs table-auto">
                <thead className="bg-stone-50 text-stone-600 uppercase tracking-wider text-[10px] border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-2 sm:px-3">Mã Đơn</th>
                    <th className="py-3 px-2 sm:px-3">Thời Gian</th>
                    <th className="py-3 px-2 sm:px-3">Khách Hàng</th>
                    <th className="py-3 px-2 sm:px-3">Số Điện Thoại</th>
                    <th className="py-3 px-2 sm:px-3 max-w-[150px]">Địa Chỉ</th>
                    <th className="py-3 px-2 sm:px-3">Tổng Tiền</th>
                    <th className="py-3 px-2 sm:px-3">Thanh Toán</th>
                    <th className="py-3 px-2 sm:px-3">Trạng Thái</th>
                    <th className="py-3 px-3 text-right whitespace-nowrap sticky right-0 bg-stone-50 shadow-[-6px_0_10px_-4px_rgba(0,0,0,0.08)] z-10">Hành Động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-medium">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="group hover:bg-stone-50/80 transition-colors">
                      <td className="py-2.5 px-2 sm:px-3 font-mono font-bold text-nepred-600">{order.id}</td>
                      <td className="py-2.5 px-2 sm:px-3 text-stone-500 whitespace-nowrap">{order.date}</td>
                      <td className="py-2.5 px-2 sm:px-3 text-stone-900 font-semibold">{order.customerName}</td>
                      <td className="py-2.5 px-2 sm:px-3 text-stone-600 font-mono whitespace-nowrap">{order.phone}</td>
                      <td className="py-2.5 px-2 sm:px-3 text-stone-600 max-w-[150px] truncate" title={order.city}>{order.city}</td>
                      <td className="py-2.5 px-2 sm:px-3 font-bold text-stone-900 price-tag whitespace-nowrap">{formatCurrency(order.total)}</td>
                      <td className="py-2.5 px-2 sm:px-3">
                        {order.paymentMethod === 'VIETQR' ? (
                          <button
                            type="button"
                            onClick={() => setSelectedVietQrOrder(order)}
                            className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 hover:bg-blue-200 text-blue-800 inline-flex items-center gap-1 transition-colors cursor-pointer"
                            title="Bấm để xem biên lai & mã VietQR"
                          >
                            <QrCode className="w-3 h-3 text-blue-600" />
                            <span>VIETQR</span>
                          </button>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            COD
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${order.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-700'
                          : order.status === 'shipping'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-amber-50 text-amber-700'
                          }`}>
                          {order.status === 'completed' ? 'Đã hoàn tất' : order.status === 'shipping' ? 'Đang giao hàng' : 'Chờ xác nhận'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right whitespace-nowrap sticky right-0 bg-white group-hover:bg-stone-50/90 transition-colors shadow-[-6px_0_10px_-4px_rgba(0,0,0,0.08)] z-10">
                        <div className="flex items-center justify-end gap-1.5">
                          {order.status === 'pending' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'shipping')}
                              className="px-2.5 py-1 rounded-lg bg-nepred-600 text-white hover:bg-nepred-700 text-[10px] font-bold shadow-xs"
                            >
                              Giao hàng
                            </button>
                          )}
                          {order.status === 'shipping' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'completed')}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-[10px] font-bold shadow-xs"
                            >
                              Hoàn tất
                            </button>
                          )}
                          {order.status === 'completed' && (
                            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
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
                  title="Khôi phục lại danh mục sản phẩm di sản chuẩn ban đầu của sàn"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Khôi Phục Danh Mục Gốc</span>
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
            <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-xs">
              <table className="w-full text-left text-xs table-auto">
                <thead className="bg-stone-50 text-stone-600 uppercase tracking-wider text-[10px] border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-2 sm:px-3 w-14">Ảnh</th>
                    <th className="py-3 px-2 sm:px-3 min-w-[150px] max-w-[220px]">Tên Sản Phẩm</th>
                    <th className="py-3 px-2 sm:px-3 whitespace-nowrap">Danh Mục</th>
                    <th className="py-3 px-2 sm:px-3 max-w-[150px]">Làng Nghề Xuất Xứ</th>
                    <th className="py-3 px-2 sm:px-3 whitespace-nowrap">Giá Bán</th>
                    <th className="py-3 px-2 sm:px-3 whitespace-nowrap">Đánh Giá</th>
                    <th className="py-3 px-2 sm:px-3 whitespace-nowrap text-center">Tình Trạng</th>
                    <th className="py-3 px-3 text-right whitespace-nowrap sticky right-0 bg-stone-50 shadow-[-6px_0_10px_-4px_rgba(0,0,0,0.08)] z-10">Thao Tác</th>
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
                      <tr key={prod.id} className="group hover:bg-stone-50/80 transition-colors">
                        <td className="py-2.5 px-2 sm:px-3">
                          <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 flex-shrink-0">
                            <Image
                              src={prod.images[0] || '/products/bo-am-chen-men-lam-bat-trang.jpg'}
                              alt={prod.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </td>
                        <td className="py-2.5 px-2 sm:px-3 font-serif font-bold text-stone-900 min-w-[150px] max-w-[220px]">
                          <div className="truncate" title={prod.name}>
                            <Link
                              href={`/san-pham/${prod.slug}`}
                              target="_blank"
                              className="hover:text-nepred-600 transition-colors"
                            >
                              {prod.name}
                            </Link>
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-mono text-[10px] text-stone-400">{prod.id}</span>
                            {prod.badge && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[9px] font-bold truncate max-w-[120px]" title={prod.badge}>
                                {prod.badge}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-2.5 px-2 sm:px-3 text-stone-600 whitespace-nowrap text-[11px]">{prod.categoryName}</td>
                        <td className="py-2.5 px-2 sm:px-3 text-stone-500 text-[11px] max-w-[150px] truncate" title={prod.village}>{prod.village}</td>
                        <td className="py-2.5 px-2 sm:px-3 font-bold text-nepred-600 price-tag whitespace-nowrap">
                          {formatCurrency(prod.price)}
                          {prod.originalPrice && (
                            <span className="block text-[10px] text-stone-400 line-through font-normal price-tag">
                              {formatCurrency(prod.originalPrice)}
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-2 sm:px-3 text-amber-500 font-bold whitespace-nowrap">
                          <span className="inline-flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span>{prod.rating}</span>
                          </span> <span className="text-[10px] text-stone-400">({prod.reviewsCount})</span>
                        </td>
                        <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap text-center">
                          <button
                            type="button"
                            onClick={() => handleToggleStock(prod)}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${prod.inStock
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                              }`}
                            title="Nhấn để đổi trạng thái kho"
                          >
                            {prod.inStock ? 'Còn hàng' : 'Tạm hết'}
                          </button>
                        </td>
                        <td className="py-2.5 px-3 text-right whitespace-nowrap sticky right-0 bg-white group-hover:bg-stone-50/90 transition-colors shadow-[-6px_0_10px_-4px_rgba(0,0,0,0.08)] z-10">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEditModal(prod)}
                              className="p-1.5 rounded-lg bg-stone-100 hover:bg-nepred-100 hover:text-nepred-700 text-stone-700 transition-colors"
                              title="Sửa sản phẩm"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(prod)}
                              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors border border-red-200/60"
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

        {/* TAB: INSPECTIONS & OCOP APPROVAL */}
        {activeTab === 'inspections' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-600" />
                  <span>Hội Đồng Kiểm Định & Phê Duyệt Di Sản Nếp Việt</span>
                </h2>
                <p className="text-xs text-stone-500">
                  Quy trình thẩm định 3 bước: Thẩm định nguyên liệu thổ nhưỡng bản địa → Kiểm định lò nung & chứng thư kim loại chì/cadimi → Cấp tem OCOP chuẩn quốc gia trước khi xuất bản lên sàn bán lẻ.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                  Chờ Thẩm Định: {pendingProducts.length}
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                  Đã Lên Sàn: {approvedProducts.length}
                </span>
              </div>
            </div>

            {/* Pending Inspection Queue */}
            {pendingProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 text-center space-y-3 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-base text-stone-900">
                  Hồ Sơ Kiểm Định Đang Trống
                </h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  Hiện tại toàn bộ tác phẩm gửi lên đều đã được Hội Đồng Giám Định Nếp Việt thẩm định và cấp phép mở bán thành công.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                  Danh Sách Tác Phẩm Chờ Thẩm Định ({pendingProducts.length})
                </h3>
                <div className="grid grid-cols-1 gap-5">
                  {pendingProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-amber-300 shadow-sm space-y-5"
                    >
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Product Image */}
                        <div className="relative w-full sm:w-48 h-48 rounded-2xl overflow-hidden bg-stone-100 border border-cream-200 flex-shrink-0">
                          <Image
                            src={prod.images[0] || '/products/bo-am-chen-men-lam-bat-trang.jpg'}
                            alt={prod.name}
                            fill
                            className="object-cover"
                          />
                          <span className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider">
                            Chờ Kiểm Định
                          </span>
                        </div>

                        {/* Details */}
                        <div className="flex-1 space-y-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-full bg-cream-100 text-amber-900 text-[10px] font-bold">
                                {prod.categoryName || 'Gốm Sứ Bát Tràng'}
                              </span>
                              <span className="text-xs text-stone-400 font-mono">#{prod.id}</span>
                            </div>
                            <h4 className="font-serif font-bold text-lg text-stone-900 mt-1">
                              {prod.name}
                            </h4>
                            <p className="text-xs text-stone-600">
                              Nghệ nhân gửi hồ sơ: <strong className="text-stone-900">{prod.artisanName || 'Nghệ nhân Phạm Văn Tuấn (Xưởng Gốm Bát Tràng)'}</strong>
                            </p>
                            <p className="text-[11px] text-stone-500">
                              Làng nghề: {prod.village}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-stone-50 rounded-2xl border border-stone-200 text-xs">
                            <div>
                              <span className="text-[11px] text-stone-500">Chất liệu chế tác:</span>
                              <p className="font-semibold text-stone-800">{prod.material}</p>
                            </div>
                            <div>
                              <span className="text-[11px] text-stone-500">Giá xuất xưởng đề xuất:</span>
                              <p className="font-serif font-bold text-nepred-600 text-sm price-tag">
                                {formatCurrency(prod.price)}
                              </p>
                            </div>
                          </div>

                          <p className="text-xs text-stone-600 leading-relaxed">
                            <strong>Thuyết minh tác phẩm:</strong> {prod.summary || prod.description}
                          </p>

                          {/* Quality Check Badges */}
                          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-emerald-800">
                            <span className="flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Đất sét cao lanh đạt chuẩn
                            </span>
                            <span className="flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Nung khử oxy 1.300°C
                            </span>
                            <span className="flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Hàm lượng chì/cadimi: 0%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Approval Actions Bar */}
                      <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-semibold text-stone-600">Cấp tem chuẩn:</span>
                          <span className="px-2.5 py-1 rounded-lg bg-nepgold-500/10 text-nepgold-700 font-bold border border-nepgold-500/30 text-[11px]">
                            Tem OCOP 4 Sao Quốc Gia
                          </span>
                        </div>

                        <div className="flex items-center gap-2.5 justify-end">
                          <button
                            type="button"
                            onClick={() => handleRejectInspection(prod.id, prod.name)}
                            className="px-4 py-2 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors"
                          >
                            ✕ Yêu Cầu Hoàn Thiện
                          </button>
                          <button
                            type="button"
                            onClick={() => handleApproveInspection(prod.id, 'Tem OCOP 4 Sao')}
                            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>✓ Phê Duyệt & Xuất Bản Lên Sàn</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Approved Heritage Archive Table */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-base text-stone-900">
                Lịch Sử Tác Phẩm Đã Được Cấp Phép & Đang Mở Bán ({approvedProducts.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3 rounded-l-xl">Tác Phẩm</th>
                      <th className="p-3">Làng Nghề</th>
                      <th className="p-3">Giá Niêm Yết</th>
                      <th className="p-3">Tem Chứng Nhận</th>
                      <th className="p-3">Trạng Thái Sàn</th>
                      <th className="p-3 text-right rounded-r-xl">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {approvedProducts.slice(0, 8).map((prod) => (
                      <tr key={prod.id} className="hover:bg-stone-50/60">
                        <td className="p-3 font-semibold text-stone-900 flex items-center gap-2.5">
                          <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                            <Image src={prod.images[0] || '/products/bo-am-chen-men-lam-bat-trang.jpg'} alt={prod.name} fill className="object-cover" />
                          </div>
                          <span className="line-clamp-1">{prod.name}</span>
                        </td>
                        <td className="p-3 text-stone-600">{prod.village}</td>
                        <td className="p-3 font-bold text-nepred-600">{formatCurrency(prod.price)}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                            {prod.badge || 'Tem OCOP 4 Sao'}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Đang mở bán live
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <Link
                            href={`/san-pham/${prod.slug}`}
                            target="_blank"
                            className="text-nepred-600 hover:underline font-bold text-xs inline-flex items-center gap-1"
                          >
                            <span>Xem trang bán</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

        {/* TAB 5: ACCOUNTS & RBAC MANAGEMENT */}
        {!isStaff && activeTab === 'accounts' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-nepred-600" />
                  <span>Quản Lý Tài Khoản & Phân Quyền Vai Trò (RBAC)</span>
                </h2>
                <p className="text-xs text-stone-500">
                  Dữ liệu lưu trữ tại bảng <code className="font-mono text-nepred-700 font-bold">public.accounts</code> trên Supabase với 4 vai trò: Admin Master, Nghệ Nhân, Nhân Viên Kho, Khách Hàng
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    await refreshSupabaseData();
                    showToast('Đã làm mới danh sách tài khoản từ cơ sở dữ liệu!');
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold shadow-sm transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Làm mới ({accountsList.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsNewAccountModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-nepred-600 hover:bg-nepred-700 text-white text-xs font-bold shadow-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm Tài Khoản</span>
                </button>
              </div>
            </div>

            {/* Role KPI Overview Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm space-y-1">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold">Admin Master</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-nepred-600" />
                </div>
                <p className="font-serif text-2xl font-bold text-nepred-700">
                  {accountsList.filter(a => a.role === 'admin').length}
                </p>
                <p className="text-[10px] text-stone-400">Toàn quyền hệ thống & DB</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm space-y-1">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold">Nghệ Nhân Đối Tác</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                </div>
                <p className="font-serif text-2xl font-bold text-blue-700">
                  {accountsList.filter(a => a.role === 'artisan').length}
                </p>
                <p className="text-[10px] text-stone-400">Quản lý xưởng & đơn hàng làng nghề</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm space-y-1">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold">Vận Hành & Kho</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                </div>
                <p className="font-serif text-2xl font-bold text-amber-700">
                  {accountsList.filter(a => a.role === 'staff').length}
                </p>
                <p className="text-[10px] text-stone-400">Xử lý đóng gói & giao vận</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm space-y-1">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold">Khách Hàng</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                </div>
                <p className="font-serif text-2xl font-bold text-emerald-700">
                  {accountsList.filter(a => a.role === 'customer').length}
                </p>
                <p className="text-[10px] text-stone-400">Mua sắm & tích lũy điểm thưởng</p>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm theo tên, email, số điện thoại, ID tài khoản..."
                  value={accountSearch}
                  onChange={(e) => setAccountSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-nepred-600 bg-stone-50"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-stone-400" />
                <select
                  value={accountRoleFilter}
                  onChange={(e) => setAccountRoleFilter(e.target.value)}
                  className="p-2 rounded-xl border border-stone-200 text-xs font-semibold bg-stone-50 focus:outline-none"
                >
                  <option value="all">Tất cả vai trò ({accountsList.length})</option>
                  <option value="admin">Admin Master</option>
                  <option value="artisan">Nghệ Nhân Làng Nghề</option>
                  <option value="staff">Vận Hành / Kho</option>
                  <option value="customer">Khách Hàng</option>
                </select>
              </div>
            </div>

            {/* Accounts Table */}
            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-stone-50 text-stone-500 font-bold border-b border-stone-200">
                      <th className="py-3 px-4">Tài Khoản / Họ Tên</th>
                      <th className="py-3 px-4">Email & Mật Khẩu Mẫu</th>
                      <th className="py-3 px-4">Phân Quyền Vai Trò</th>
                      <th className="py-3 px-4">Số Điện Thoại</th>
                      <th className="py-3 px-4">Địa Chỉ / Tỉnh Thành</th>
                      <th className="py-3 px-4 text-center">Điểm Tích Lũy</th>
                      <th className="py-3 px-4 text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {accountsList
                      .filter((acc) => {
                        if (accountRoleFilter !== 'all' && acc.role !== accountRoleFilter) return false;
                        if (accountSearch.trim()) {
                          const q = accountSearch.toLowerCase();
                          return (
                            acc.full_name.toLowerCase().includes(q) ||
                            acc.email.toLowerCase().includes(q) ||
                            (acc.phone && acc.phone.includes(q))
                          );
                        }
                        return true;
                      })
                      .map((acc) => (
                        <tr key={acc.id} className="hover:bg-stone-50/70 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-xs shadow-sm ${acc.role === 'admin'
                                ? 'bg-nepred-600'
                                : acc.role === 'artisan'
                                  ? 'bg-blue-600'
                                  : acc.role === 'staff'
                                    ? 'bg-amber-600'
                                    : 'bg-emerald-600'
                                }`}>
                                {acc.full_name.slice(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-bold text-stone-900">{acc.full_name}</p>
                                <p className="text-[10px] text-stone-400 font-mono">ID: {acc.id}</p>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-4">
                            <p className="font-mono text-stone-700 font-semibold">{acc.email}</p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-[10px] text-stone-400">Pass:</span>
                              <code className="text-[10px] font-mono px-1 py-0.5 rounded bg-stone-100 border text-stone-600">
                                {acc.password || '******'}
                              </code>
                              {acc.password && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(`${acc.email} | ${acc.password}`);
                                    showToast(`Đã sao chép tài khoản ${acc.email}`);
                                  }}
                                  className="text-[10px] text-nepred-600 hover:underline font-semibold"
                                >
                                  Copy
                                </button>
                              )}
                            </div>
                          </td>

                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${acc.role === 'admin'
                              ? 'bg-nepred-100 text-nepred-800 border border-nepred-200'
                              : acc.role === 'artisan'
                                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                : acc.role === 'staff'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${acc.role === 'admin'
                                ? 'bg-nepred-600'
                                : acc.role === 'artisan'
                                  ? 'bg-blue-600'
                                  : acc.role === 'staff'
                                    ? 'bg-amber-600'
                                    : 'bg-emerald-600'
                                }`} />
                              {acc.role === 'admin'
                                ? 'Admin Master'
                                : acc.role === 'artisan'
                                  ? 'Nghệ Nhân Làng Nghề'
                                  : acc.role === 'staff'
                                    ? 'Kho & Vận Hành'
                                    : 'Khách Hàng'}
                            </span>
                          </td>

                          <td className="py-3 px-4 font-mono text-stone-600">
                            {acc.phone || 'Chưa cập nhật'}
                          </td>

                          <td className="py-3 px-4 text-stone-600 max-w-[200px] truncate">
                            {acc.address ? `${acc.address}, ${acc.city || ''}` : (acc.city || 'Việt Nam')}
                          </td>

                          <td className="py-3 px-4 text-center">
                            <span className="font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-mono text-[11px]">
                              {acc.loyalty_points || 0} pts
                            </span>
                          </td>

                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(`Email: ${acc.email}\nMật khẩu: ${acc.password || 'Admin@123'}\nVai trò: ${acc.role}`);
                                showToast(`Đã sao chép thông tin đăng nhập ${acc.email}!`);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-[11px] transition-colors"
                            >
                              Sao Chép Login
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

        {/* TAB 6: SYSTEM SETTINGS & SUPABASE DATABASE */}
        {!isStaff && activeTab === 'settings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-8 max-w-4xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
              <div>
                <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2.5">
                  <Settings className="w-5 h-5 text-nepred-600" />
                  <span>Cài Đặt Hệ Thống & Thanh Toán VietQR</span>
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Cấu hình tài khoản ngân hàng thụ hưởng Napas 24/7 và thông số vận hành Nếp Việt
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSeedSupabase}
                  disabled={isSeeding}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-nepgreen-700 hover:bg-nepgreen-800 text-white font-bold text-xs shadow-sm transition-colors disabled:opacity-50"
                  title="Nạp toàn bộ dữ liệu mẫu (Tài khoản, Sản phẩm, Làng nghề, Đơn hàng) lên Supabase"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>{isSeeding ? 'Đang đồng bộ...' : 'Đồng Bộ Dữ Liệu Supabase'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowSchemaModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold shadow-sm transition-colors"
                >
                  <Terminal className="w-3.5 h-3.5 text-nepred-600" />
                  <span>Xem SQL Schema</span>
                </button>
              </div>
            </div>

            {/* Read-Only Database Environment Info */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm flex-shrink-0">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-emerald-900">Cơ Sở Dữ Liệu Supabase PostgreSQL Cloud</p>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold">
                      Đã kết nối qua file .env
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-700/90 mt-0.5">
                    Hệ thống tự động nạp cấu hình bảo mật từ biến môi trường NEXT_PUBLIC_SUPABASE_URL
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-900 bg-white/70 px-3 py-1.5 rounded-xl border border-emerald-200">
                <span>{tableStats.accountsCount || accountsList.length} tài khoản</span> •
                <span>{tableStats.productsCount || products.length} sản phẩm</span> •
                <span>{tableStats.ordersCount || orders.length} đơn hàng</span>
              </div>
            </div>

            {/* Beneficiary Bank & VietQR Configuration */}
            <div className="space-y-5 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shadow-sm">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                      <span>Cấu Hình Ngân Hàng Thụ Hưởng & Thanh Toán VietQR Mẫu</span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                        Napas 247
                      </span>
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      Tài khoản nhận tiền tự động khi khách hàng thanh toán chuyển khoản trên website
                    </p>
                  </div>
                </div>
              </div>

              {/* Form config & Live Preview */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-7 space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-stone-700">Ngân hàng thụ hưởng</label>
                      <select
                        value={bankSettings.bankCode}
                        onChange={(e) => setBankSettings({ ...bankSettings, bankCode: e.target.value as any })}
                        className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-medium"
                      >
                        <option value="MB">MB Bank (Ngân hàng Quân Đội)</option>
                        <option value="VCB">Vietcombank (Ngoại Thương Việt Nam)</option>
                        <option value="TCB">Techcombank (Kỹ Thương Việt Nam)</option>
                        <option value="TPB">TPBank (Ngân hàng Tiên Phong)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-stone-700">Số tài khoản nhận tiền</label>
                      <input
                        type="text"
                        value={bankSettings.accountNo}
                        onChange={(e) => setBankSettings({ ...bankSettings, accountNo: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone-700">Tên chủ tài khoản (In hoa không dấu)</label>
                    <input
                      type="text"
                      value={bankSettings.accountName}
                      onChange={(e) => setBankSettings({ ...bankSettings, accountName: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone-700">Chi nhánh ngân hàng</label>
                    <input
                      type="text"
                      value={bankSettings.branch}
                      onChange={(e) => setBankSettings({ ...bankSettings, branch: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-stone-300 bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone-700">Số tiền thử nghiệm quét mã (VNĐ)</label>
                    <div className="flex gap-2">
                      {[100000, 250000, 500000, 1000000].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setBankSettings({ ...bankSettings, testAmount: amt })}
                          className={`py-1.5 px-2 rounded-lg border text-[11px] font-mono font-bold transition-all ${bankSettings.testAmount === amt
                            ? 'border-nepred-600 bg-nepred-50 text-nepred-700'
                            : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-600'
                            }`}
                        >
                          {amt.toLocaleString('vi-VN')}đ
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => showToast('Đã lưu cấu hình tài khoản ngân hàng thụ hưởng thành công!')}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-nepred-600 hover:bg-nepred-700 text-white font-bold shadow-md transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Lưu Cấu Hình Ngân Hàng</span>
                    </button>
                    <span className="text-[11px] text-stone-400">Tự động đồng bộ với trang Thanh toán</span>
                  </div>
                </div>

                {/* QR Live Test Card */}
                <div className="md:col-span-5 p-5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col items-center text-center space-y-3">
                  <div className="flex items-center justify-between w-full text-[11px] font-bold text-stone-600 pb-2 border-b border-stone-200">
                    <span>Mã VietQR Demo Trực Tiếp</span>
                    <span className="text-emerald-700">EMVCo 24/7</span>
                  </div>

                  <div className="w-48 h-48 bg-white rounded-2xl p-2.5 border-2 border-stone-200 shadow-md flex items-center justify-center">
                    <img
                      src={`https://img.vietqr.io/image/${bankSettings.bankCode}-${bankSettings.accountNo}-compact2.png?amount=${bankSettings.testAmount}&addInfo=TEST%20NEPVIET&accountName=${encodeURIComponent(bankSettings.accountName)}`}
                      alt="VietQR Demo"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="text-[11px] text-stone-500 space-y-0.5">
                    <p>Mở ứng dụng ngân hàng bất kỳ để quét thử</p>
                    <p className="font-bold text-nepred-600 price-tag text-sm">
                      {bankSettings.testAmount.toLocaleString('vi-VN')}đ
                    </p>
                  </div>

                  <div className="flex gap-2 w-full pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(bankSettings.accountNo);
                        showToast(`Đã sao chép STK: ${bankSettings.accountNo}`);
                      }}
                      className="flex-1 py-2 px-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-[11px] font-semibold text-stone-700 transition-colors"
                    >
                      Sao chép STK
                    </button>
                    <button
                      type="button"
                      onClick={() => showToast('Mô phỏng khớp lệnh: Cổng Napas 247 đã nhận được thanh toán thành công!')}
                      className="flex-1 py-2 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-[11px] font-bold text-white transition-colors"
                    >
                      Test Khớp Lệnh
                    </button>
                  </div>
                </div>
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

              {/* Image Picker with 3 Modes: Upload File / Preset Images / External URL */}
              <div className="space-y-3 p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-200/80">
                  <label className="font-bold text-stone-800 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-nepred-600" />
                    <span>Hình ảnh sản phẩm (*)</span>
                  </label>

                  {/* Mode switch pills */}
                  <div className="flex items-center gap-1 bg-stone-200/70 p-1 rounded-xl text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => setImagePickMode('upload')}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${imagePickMode === 'upload'
                        ? 'bg-white text-stone-900 shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                        }`}
                    >
                      <UploadCloud className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span>Tải ảnh lên</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setImagePickMode('preset')}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${imagePickMode === 'preset'
                        ? 'bg-white text-stone-900 shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                        }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span>26 Ảnh mẫu</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setImagePickMode('url')}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${imagePickMode === 'url'
                        ? 'bg-white text-stone-900 shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                        }`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span>Link URL</span>
                    </button>
                  </div>
                </div>

                {/* MODE 1: FILE UPLOAD (DRAG & DROP OR FILE BROWSER) */}
                {imagePickMode === 'upload' && (
                  <div className="space-y-3">
                    <label className="border-2 border-dashed border-stone-300 hover:border-nepred-500 bg-white hover:bg-stone-50/50 rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={isUploadingImage}
                        className="hidden"
                      />
                      <div className="w-10 h-10 rounded-full bg-stone-100 group-hover:bg-nepred-50 text-stone-500 group-hover:text-nepred-600 flex items-center justify-center mb-2 transition-colors">
                        <UploadCloud className={`w-5 h-5 ${isUploadingImage ? 'animate-bounce text-nepred-600' : ''}`} />
                      </div>
                      <p className="text-xs font-bold text-stone-800">
                        {isUploadingImage ? 'Đang xử lý tải tệp ảnh...' : 'Nhấp để chọn ảnh từ máy tính hoặc kéo thả vào đây'}
                      </p>
                      <p className="text-[10px] text-stone-400 mt-1">
                        Hỗ trợ định dạng: JPG, PNG, WEBP, AVIF (Tự động nén và tạo link)
                      </p>
                    </label>

                    {uploadSuccessName && (
                      <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Đã tải lên tệp ảnh: <strong>{uploadSuccessName}</strong></span>
                      </div>
                    )}
                  </div>
                )}

                {/* MODE 2: PRESET IMAGES PICKER (26 AUTHENTIC PHOTOS) */}
                {imagePickMode === 'preset' && (
                  <div className="space-y-2">
                    <p className="text-[10px] text-stone-500">
                      Chọn nhanh từ 26 bức ảnh thủ công Bát Tràng, Đông Hồ, Vạn Phúc, Phú Vinh...
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-40 overflow-y-auto p-1 bg-white rounded-xl border border-stone-200">
                      {PRESET_IMAGES.map((img) => (
                        <button
                          key={img.path}
                          type="button"
                          onClick={() => setFormData({ ...formData, image: img.path })}
                          className={`flex items-center gap-2 p-1.5 rounded-xl border text-left transition-all ${formData.image === img.path
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
                  </div>
                )}

                {/* MODE 3: DIRECT URL INPUT */}
                {imagePickMode === 'url' && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-stone-600">Đường dẫn hình ảnh (URL):</label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://... hoặc /products/..."
                      className="w-full p-2 text-xs rounded-xl border border-stone-300 bg-white font-mono focus:outline-none focus:border-nepred-600"
                    />
                  </div>
                )}

                {/* Live Image Preview Banner */}
                {formData.image && (
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-stone-200">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 flex-shrink-0">
                      <Image
                        src={formData.image}
                        alt="Xem trước ảnh"
                        fill
                        className="object-cover"
                        unoptimized={formData.image.startsWith('data:')}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Ảnh đang chọn:</p>
                      <p className="text-xs font-mono text-stone-700 truncate">{formData.image}</p>
                    </div>
                  </div>
                )}
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

      {/* SCHEMA MODAL */}
      {showSchemaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-stone-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-nepred-600" />
                  <span>SQL Schema Tạo Đầy Đủ 5 Bảng Supabase</span>
                </h3>
                <p className="text-xs text-stone-500">
                  Bao gồm: <code className="font-mono text-nepred-700">accounts</code>, <code className="font-mono text-nepred-700">products</code>, <code className="font-mono text-nepred-700">craft_villages</code>, <code className="font-mono text-nepred-700">orders</code>, <code className="font-mono text-nepred-700">reviews</code> và RLS Policies
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSchemaModal(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative">
              <pre className="bg-stone-900 text-amber-200 p-4 rounded-2xl text-[11px] font-mono h-80 overflow-y-auto whitespace-pre leading-relaxed">
                {`-- 0. XÓA BẢNG CŨ (CYBERSAFE & NẾP VIỆT)
DROP TABLE IF EXISTS public.chatbot_consultations CASCADE;
DROP TABLE IF EXISTS public.pretest_results CASCADE;
DROP TABLE IF EXISTS public.scenarios CASCADE;
DROP TABLE IF EXISTS public.user_profiles CASCADE;
DROP TABLE IF EXISTS public.user_progress CASCADE;
DROP TABLE IF EXISTS public.reviews CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.accounts CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.craft_villages CASCADE;

-- 1. BẢNG TÀI KHOẢN & PHÂN QUYỀN (accounts)
CREATE TABLE IF NOT EXISTS public.accounts (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'customer',
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

-- 3. BẢNG LÀNG NGHỀ (craft_villages)
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
    payment_method TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    transaction_code TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. BẢNG ĐÁNH GIÁ (reviews)
CREATE TABLE IF NOT EXISTS public.reviews (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    user_name TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5,
    comment TEXT NOT NULL,
    images JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. BẬT RLS POLICIES (PUBLIC READ / WRITE)
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.craft_villages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read accounts" ON public.accounts FOR SELECT USING (true);
CREATE POLICY "Public insert accounts" ON public.accounts FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update accounts" ON public.accounts FOR UPDATE USING (true);
CREATE POLICY "Public delete accounts" ON public.accounts FOR DELETE USING (true);

CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public insert products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update products" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Public delete products" ON public.products FOR DELETE USING (true);

CREATE POLICY "Public read craft_villages" ON public.craft_villages FOR SELECT USING (true);
CREATE POLICY "Public insert craft_villages" ON public.craft_villages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update craft_villages" ON public.craft_villages FOR UPDATE USING (true);
CREATE POLICY "Public delete craft_villages" ON public.craft_villages FOR DELETE USING (true);

CREATE POLICY "Public read orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Public insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update orders" ON public.orders FOR UPDATE USING (true);
CREATE POLICY "Public delete orders" ON public.orders FOR DELETE USING (true);

CREATE POLICY "Public read reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Public insert reviews" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update reviews" ON public.reviews FOR UPDATE USING (true);
CREATE POLICY "Public delete reviews" ON public.reviews FOR DELETE USING (true);`}
              </pre>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(`-- 0. XÓA BẢNG CŨ (CYBERSAFE & NẾP VIỆT)
DROP TABLE IF EXISTS public.chatbot_consultations CASCADE;
DROP TABLE IF EXISTS public.pretest_results CASCADE;
DROP TABLE IF EXISTS public.scenarios CASCADE;
DROP TABLE IF EXISTS public.user_profiles CASCADE;
DROP TABLE IF EXISTS public.user_progress CASCADE;
DROP TABLE IF EXISTS public.reviews CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.accounts CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.craft_villages CASCADE;

-- 1. BẢNG TÀI KHOẢN & PHÂN QUYỀN (accounts)
CREATE TABLE IF NOT EXISTS public.accounts (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'customer',
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

-- 3. BẢNG LÀNG NGHỀ (craft_villages)
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
    payment_method TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    transaction_code TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. BẢNG ĐÁNH GIÁ (reviews)
CREATE TABLE IF NOT EXISTS public.reviews (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    user_name TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5,
    comment TEXT NOT NULL,
    images JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. BẬT RLS POLICIES
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.craft_villages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read accounts" ON public.accounts FOR SELECT USING (true);
CREATE POLICY "Public insert accounts" ON public.accounts FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update accounts" ON public.accounts FOR UPDATE USING (true);
CREATE POLICY "Public delete accounts" ON public.accounts FOR DELETE USING (true);

CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public insert products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update products" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Public delete products" ON public.products FOR DELETE USING (true);

CREATE POLICY "Public read craft_villages" ON public.craft_villages FOR SELECT USING (true);
CREATE POLICY "Public insert craft_villages" ON public.craft_villages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update craft_villages" ON public.craft_villages FOR UPDATE USING (true);
CREATE POLICY "Public delete craft_villages" ON public.craft_villages FOR DELETE USING (true);

CREATE POLICY "Public read orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Public insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update orders" ON public.orders FOR UPDATE USING (true);
CREATE POLICY "Public delete orders" ON public.orders FOR DELETE USING (true);

CREATE POLICY "Public read reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Public insert reviews" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update reviews" ON public.reviews FOR UPDATE USING (true);
CREATE POLICY "Public delete reviews" ON public.reviews FOR DELETE USING (true);`);
                  setCopiedSchema(true);
                  setTimeout(() => setCopiedSchema(false), 2500);
                  showToast('Đã sao chép toàn bộ SQL Schema 5 bảng vào bộ nhớ tạm!');
                }}
                className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-nepred-600 hover:bg-nepred-700 text-white text-xs font-bold shadow-md transition-colors"
              >
                {copiedSchema ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSchema ? 'Đã sao chép!' : 'Sao chép SQL 5 Bảng'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-stone-500">
                File đầy đủ kèm dữ liệu mẫu nằm tại: <code className="font-mono text-nepred-700 font-bold">supabase_schema.sql</code>
              </span>
              <button
                type="button"
                onClick={() => setShowSchemaModal(false)}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL THÊM TÀI KHOẢN MỚI */}
      {isNewAccountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-stone-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-nepred-600" />
                  <span>Thêm Tài Khoản Phân Quyền Mới</span>
                </h3>
                <p className="text-xs text-stone-500">
                  Tạo tài khoản và đồng bộ trực tiếp lên bảng <code className="font-mono text-nepred-600">accounts</code>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsNewAccountModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAccount} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-stone-700">Họ và tên (*)</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A..."
                  value={newAccountData.full_name}
                  onChange={(e) => setNewAccountData({ ...newAccountData, full_name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-nepred-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Email đăng nhập (*)</label>
                  <input
                    type="email"
                    required
                    placeholder="ten@nepviet.vn"
                    value={newAccountData.email}
                    onChange={(e) => setNewAccountData({ ...newAccountData, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-nepred-600 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Mật khẩu (*)</label>
                  <input
                    type="text"
                    required
                    placeholder="Mật khẩu bí mật"
                    value={newAccountData.password}
                    onChange={(e) => setNewAccountData({ ...newAccountData, password: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-nepred-600 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Phân quyền vai trò (*)</label>
                  <select
                    value={newAccountData.role}
                    onChange={(e) => setNewAccountData({ ...newAccountData, role: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-semibold"
                  >
                    <option value="admin">Admin Master (Toàn quyền)</option>
                    <option value="artisan">Nghệ Nhân Đối Tác Làng Nghề</option>
                    <option value="staff">Vận Hành &amp; Kho Hàng</option>
                    <option value="customer">Khách Hàng Thân Thiết</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Số điện thoại</label>
                  <input
                    type="text"
                    placeholder="0981234567"
                    value={newAccountData.phone}
                    onChange={(e) => setNewAccountData({ ...newAccountData, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-nepred-600 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Địa chỉ / Xưởng</label>
                  <input
                    type="text"
                    placeholder="Số 10 Nguyễn Trãi..."
                    value={newAccountData.address}
                    onChange={(e) => setNewAccountData({ ...newAccountData, address: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-nepred-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Tỉnh / Thành phố</label>
                  <input
                    type="text"
                    placeholder="Hà Nội, TP.HCM..."
                    value={newAccountData.city}
                    onChange={(e) => setNewAccountData({ ...newAccountData, city: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-nepred-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsNewAccountModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 font-bold hover:bg-stone-50"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-nepred-600 hover:bg-nepred-700 text-white font-bold shadow-md transition-colors"
                >
                  Tạo Tài Khoản Ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIETQR ORDER DETAILS MODAL */}
      {selectedVietQrOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-stone-200 shadow-2xl relative space-y-5">
            <button
              type="button"
              onClick={() => setSelectedVietQrOrder(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-stone-900">
                  Giao Dịch VietQR {selectedVietQrOrder.id}
                </h3>
                <p className="text-[11px] text-stone-500">
                  Khách: {selectedVietQrOrder.customerName} • {selectedVietQrOrder.phone}
                </p>
              </div>
            </div>

            {/* QR Image Frame */}
            <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 flex flex-col items-center">
              <div className="w-48 h-48 bg-white rounded-xl p-2 shadow-sm border border-stone-200 flex items-center justify-center">
                <img
                  src={`https://img.vietqr.io/image/MB-0968999888-compact2.png?amount=${selectedVietQrOrder.total}&addInfo=${encodeURIComponent(selectedVietQrOrder.id.replace('-', '') + ' ' + selectedVietQrOrder.phone.slice(-4))}&accountName=CONG%20TY%20TNHH%20NEP%20VIET`}
                  alt="VietQR Chi tiết đơn hàng"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-[11px] text-stone-500 mt-2 text-center">
                Cú pháp Napas 24/7: <strong>{selectedVietQrOrder.id.replace('-', '')} {selectedVietQrOrder.phone.slice(-4)}</strong>
              </p>
            </div>

            {/* Transaction info */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 rounded-xl bg-stone-50">
                <span className="text-stone-500">Số tiền đơn hàng:</span>
                <span className="font-bold text-nepred-600 price-tag text-sm">{formatCurrency(selectedVietQrOrder.total)}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-stone-50">
                <span className="text-stone-500">Trạng thái thanh toán:</span>
                <span className={`font-bold ${selectedVietQrOrder.status === 'completed' ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {selectedVietQrOrder.status === 'completed' ? 'Đã khớp lệnh (Thành công)' : 'Chờ thanh toán'}
                </span>
              </div>
              {selectedVietQrOrder.transactionCode && (
                <div className="flex justify-between p-2.5 rounded-xl bg-emerald-50 text-emerald-900">
                  <span className="text-stone-600">Mã chuẩn chi ngân hàng:</span>
                  <span className="font-mono font-bold">{selectedVietQrOrder.transactionCode}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              {selectedVietQrOrder.status !== 'completed' && (
                <button
                  type="button"
                  onClick={() => {
                    setOrders(prev => prev.map(o => o.id === selectedVietQrOrder.id ? { ...o, status: 'completed' } : o));
                    setSelectedVietQrOrder(null);
                    showToast(`Đã duyệt xác nhận thanh toán cho đơn hàng ${selectedVietQrOrder.id}!`);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Xác Nhận Đã Nhận Tiền
                </button>
              )}
              <button
                type="button"
                onClick={() => setSelectedVietQrOrder(null)}
                className="flex-1 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-colors"
              >
                Đóng Cửa Sổ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Confirmation / Action Modal Dialog */}
      {confirmDialog && confirmDialog.isOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-stone-200/90 space-y-5 animate-scaleUp overflow-hidden relative">
            {/* Header with Type Icon */}
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${confirmDialog.type === 'danger'
                  ? 'bg-red-100 text-red-600 border border-red-200'
                  : confirmDialog.type === 'warning'
                    ? 'bg-amber-100 text-amber-700 border border-amber-200'
                    : confirmDialog.type === 'prompt'
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-stone-100 text-stone-700 border border-stone-200'
                  }`}
              >
                {confirmDialog.type === 'danger' ? (
                  <Trash2 className="w-6 h-6" />
                ) : confirmDialog.type === 'warning' ? (
                  <AlertTriangle className="w-6 h-6" />
                ) : confirmDialog.type === 'prompt' ? (
                  <FileText className="w-6 h-6" />
                ) : (
                  <CheckCircle2 className="w-6 h-6" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-serif font-bold text-lg text-stone-900 leading-snug">
                  {confirmDialog.title}
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  {confirmDialog.message}
                </p>
              </div>
            </div>

            {/* Item Preview Card (For Product Deletion) */}
            {confirmDialog.itemPreview && (
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center gap-3.5">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-stone-200 border border-stone-300 flex-shrink-0">
                  <Image
                    src={confirmDialog.itemPreview.image || '/products/bo-am-chen-men-lam-bat-trang.jpg'}
                    alt={confirmDialog.itemPreview.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-serif font-bold text-stone-900 text-xs sm:text-sm truncate">
                    {confirmDialog.itemPreview.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {confirmDialog.itemPreview.id && (
                      <span className="font-mono text-stone-400 text-[10px]">
                        {confirmDialog.itemPreview.id}
                      </span>
                    )}
                    {confirmDialog.itemPreview.price && (
                      <span className="font-bold text-nepred-600 text-xs price-tag">
                        {formatCurrency(confirmDialog.itemPreview.price)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Prompt Text Input / Area (For Inspection Rejection Reason) */}
            {confirmDialog.type === 'prompt' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">Nội dung phản hồi gửi nghệ nhân:</label>
                <textarea
                  rows={3}
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder={confirmDialog.promptPlaceholder || 'Nhập lý do...'}
                  className="w-full p-3 text-xs rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:border-nepred-600 transition-colors"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => {
                  setConfirmDialog(null);
                }}
                className="px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 text-xs font-bold transition-colors"
              >
                {confirmDialog.cancelText || 'Hủy bỏ'}
              </button>
              <button
                type="button"
                onClick={async () => {
                  const val = promptInput;
                  const onConf = confirmDialog.onConfirm;
                  setConfirmDialog(null);
                  await onConf(val);
                }}
                className={`px-5 py-2.5 rounded-xl text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 ${confirmDialog.type === 'danger'
                  ? 'bg-red-600 hover:bg-red-700 shadow-red-600/30'
                  : confirmDialog.type === 'warning'
                    ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/30'
                    : 'bg-nepred-600 hover:bg-nepred-700 shadow-nepred-600/30'
                  }`}
              >
                {confirmDialog.type === 'danger' && <Trash2 className="w-3.5 h-3.5" />}
                <span>{confirmDialog.confirmText || 'Xác nhận'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
