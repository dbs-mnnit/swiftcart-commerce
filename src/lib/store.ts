import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, Customer, Address, CheckoutState } from './types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getSubtotal: () => number;
  getTax: () => number;
  getShipping: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.product.id === product.id);
          
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: Math.min(item.quantity + quantity, product.stockQty) }
                  : item
              ),
            };
          }
          
          return {
            items: [...state.items, { product, quantity: Math.min(quantity, product.stockQty) }],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: Math.max(1, Math.min(quantity, item.product.stockQty)) }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => {
          const price = item.product.discountedPrice || item.product.price;
          return sum + price * item.quantity;
        }, 0);
      },

      getTax: () => {
        const subtotal = get().getSubtotal();
        return Math.round(subtotal * 0.18); // 18% GST
      },

      getShipping: () => {
        const subtotal = get().getSubtotal();
        return subtotal >= 5000 ? 0 : 499; // Free shipping over ₹5000
      },

      getTotal: () => {
        return get().getSubtotal() + get().getTax() + get().getShipping();
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

interface CheckoutStore {
  state: CheckoutState;
  setStep: (step: CheckoutState['step']) => void;
  setCustomer: (customer: Partial<Customer>) => void;
  setShippingAddress: (address: Partial<Address>) => void;
  setBillingAddress: (address: Partial<Address>) => void;
  setSameAsShipping: (same: boolean) => void;
  reset: () => void;
}

const initialCheckoutState: CheckoutState = {
  step: 'details',
  customer: {},
  shippingAddress: {},
  billingAddress: {},
  sameAsShipping: true,
};

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  state: initialCheckoutState,
  
  setStep: (step) => set((state) => ({ state: { ...state.state, step } })),
  
  setCustomer: (customer) =>
    set((state) => ({
      state: { ...state.state, customer: { ...state.state.customer, ...customer } },
    })),
  
  setShippingAddress: (address) =>
    set((state) => ({
      state: { ...state.state, shippingAddress: { ...state.state.shippingAddress, ...address } },
    })),
  
  setBillingAddress: (address) =>
    set((state) => ({
      state: { ...state.state, billingAddress: { ...state.state.billingAddress, ...address } },
    })),
  
  setSameAsShipping: (same) =>
    set((state) => ({ state: { ...state.state, sameAsShipping: same } })),
  
  reset: () => set({ state: initialCheckoutState }),
}));

interface ProductFilterStore {
  search: string;
  category: string;
  priceRange: [number, number];
  attributes: Record<string, string[]>;
  inStockOnly: boolean;
  sortBy: 'price-asc' | 'price-desc' | 'newest' | 'popular';
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setAttributes: (key: string, values: string[]) => void;
  setInStockOnly: (inStock: boolean) => void;
  setSortBy: (sort: ProductFilterStore['sortBy']) => void;
  clearFilters: () => void;
}

export const useProductFilterStore = create<ProductFilterStore>((set) => ({
  search: '',
  category: 'All',
  priceRange: [0, 100000],
  attributes: {},
  inStockOnly: false,
  sortBy: 'newest',

  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setAttributes: (key, values) =>
    set((state) => ({
      attributes: { ...state.attributes, [key]: values },
    })),
  setInStockOnly: (inStockOnly) => set({ inStockOnly }),
  setSortBy: (sortBy) => set({ sortBy }),
  clearFilters: () =>
    set({
      search: '',
      category: 'All',
      priceRange: [0, 100000],
      attributes: {},
      inStockOnly: false,
      sortBy: 'newest',
    }),
}));
