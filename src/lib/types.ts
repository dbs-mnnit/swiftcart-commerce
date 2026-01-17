export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  images: string[];
  category: string;
  tags: string[];
  attributes: Record<string, string>;
  stockQty: number;
  isActive: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Customer {
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  gstin?: string;
}

export interface Address {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  addressType?: 'home' | 'office';
}

export interface OrderItem {
  productId: string;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export type OrderStatus = 
  | 'CREATED'
  | 'PAYMENT_PENDING'
  | 'PAID'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export interface StatusHistoryEntry {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: Customer;
  shippingAddress: Address;
  billingAddress?: Address;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  taxBreakdown?: {
    cgst: number;
    sgst: number;
    igst: number;
  };
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  statusHistory: StatusHistoryEntry[];
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  courierName?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  shippedAt?: string;
  deliveredAt?: string;
  invoiceNumber?: string;
  invoiceUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoreConfig {
  storeName: string;
  logo?: string;
  heroHeadline: string;
  heroSubtitle: string;
  trustBadges: string[];
  shippingPromise: string;
  returnPolicy: string;
  contactEmail: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export interface CheckoutState {
  step: 'details' | 'address' | 'review';
  customer: Partial<Customer>;
  shippingAddress: Partial<Address>;
  billingAddress?: Partial<Address>;
  sameAsShipping: boolean;
}
