export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'gom-su' | 'may-tre' | 'do-choi-qua-tang' | 'phu-kien-thoi-trang' | 'am-thuc';
  categoryName: string;
  village: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  images: string[];
  summary: string;
  description: string;
  material: string;
  dimensions: string;
  artisanStory: string;
  preservation: string;
  badge?: string;
  isFeatured?: boolean;
  approvalStatus?: 'approved' | 'pending' | 'rejected';
  rejectionReason?: string;
  artisanName?: string;
  submittedAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: 'COD' | 'BANK_TRANSFER';
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered';
  createdAt: string;
}

export interface UserAccount {
  name: string;
  email: string;
  isLoggedIn: boolean;
}
