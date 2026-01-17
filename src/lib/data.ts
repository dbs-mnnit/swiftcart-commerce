import { Product, CartItem, Customer, Address, Order } from './types';

// Mock Products Data
export const mockProducts: Product[] = [
  {
    id: '1',
    sku: 'LUX-CHAIR-001',
    name: 'Milano Lounge Chair',
    description: 'Elegantly crafted lounge chair with premium Italian leather upholstery. Features ergonomic design for ultimate comfort and solid walnut wood legs.',
    price: 45999,
    discountedPrice: 38999,
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    category: 'Furniture',
    tags: ['leather', 'lounge', 'premium'],
    attributes: {
      color: 'Cognac Brown',
      material: 'Italian Leather',
      dimensions: '75cm x 80cm x 85cm',
    },
    stockQty: 15,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    sku: 'LUX-LAMP-002',
    name: 'Aurora Floor Lamp',
    description: 'Contemporary floor lamp with brushed brass finish and linen shade. Dimmable LED technology for perfect ambient lighting.',
    price: 12999,
    images: ['/placeholder.svg', '/placeholder.svg'],
    category: 'Lighting',
    tags: ['lamp', 'brass', 'modern'],
    attributes: {
      color: 'Brushed Brass',
      material: 'Metal & Linen',
      height: '165cm',
    },
    stockQty: 28,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    sku: 'LUX-TABLE-003',
    name: 'Nordic Coffee Table',
    description: 'Minimalist coffee table crafted from solid oak with a natural oil finish. Features clean lines and timeless Scandinavian design.',
    price: 24999,
    discountedPrice: 21999,
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    category: 'Furniture',
    tags: ['table', 'oak', 'scandinavian'],
    attributes: {
      color: 'Natural Oak',
      material: 'Solid Oak Wood',
      dimensions: '120cm x 60cm x 45cm',
    },
    stockQty: 8,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    sku: 'LUX-VASE-004',
    name: 'Ceramic Art Vase',
    description: 'Handcrafted ceramic vase with organic irregular shape. Each piece is unique with subtle variations in glaze.',
    price: 4999,
    images: ['/placeholder.svg'],
    category: 'Decor',
    tags: ['vase', 'ceramic', 'handmade'],
    attributes: {
      color: 'Cream White',
      material: 'Ceramic',
      height: '30cm',
    },
    stockQty: 45,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    sku: 'LUX-RUG-005',
    name: 'Moroccan Berber Rug',
    description: 'Authentic handwoven Berber rug from Morocco. Features traditional geometric patterns and plush wool texture.',
    price: 35999,
    discountedPrice: 29999,
    images: ['/placeholder.svg', '/placeholder.svg'],
    category: 'Textiles',
    tags: ['rug', 'wool', 'moroccan'],
    attributes: {
      color: 'Ivory & Black',
      material: '100% Wool',
      dimensions: '200cm x 300cm',
    },
    stockQty: 5,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    sku: 'LUX-MIRROR-006',
    name: 'Arch Wall Mirror',
    description: 'Statement arch mirror with slim metal frame. Creates an illusion of space while adding architectural interest.',
    price: 18999,
    images: ['/placeholder.svg'],
    category: 'Decor',
    tags: ['mirror', 'arch', 'wall'],
    attributes: {
      color: 'Matte Black',
      material: 'Metal & Glass',
      dimensions: '60cm x 120cm',
    },
    stockQty: 12,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '7',
    sku: 'LUX-SOFA-007',
    name: 'Cloud Modular Sofa',
    description: 'Ultra-comfortable modular sofa with memory foam cushions and premium bouclé fabric. Configure to fit any space.',
    price: 89999,
    discountedPrice: 79999,
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    category: 'Furniture',
    tags: ['sofa', 'modular', 'boucle'],
    attributes: {
      color: 'Warm Taupe',
      material: 'Bouclé Fabric',
      dimensions: '280cm x 100cm x 85cm',
    },
    stockQty: 3,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '8',
    sku: 'LUX-PLANT-008',
    name: 'Olive Tree in Planter',
    description: 'Preserved olive tree in artisan terracotta planter. Maintenance-free greenery that lasts for years.',
    price: 8999,
    images: ['/placeholder.svg'],
    category: 'Plants',
    tags: ['plant', 'olive', 'preserved'],
    attributes: {
      height: '150cm',
      planter: 'Terracotta',
    },
    stockQty: 20,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

export const categories = ['All', 'Furniture', 'Lighting', 'Decor', 'Textiles', 'Plants'];

export const attributeFilters = {
  color: ['Cognac Brown', 'Brushed Brass', 'Natural Oak', 'Cream White', 'Ivory & Black', 'Matte Black', 'Warm Taupe'],
  material: ['Italian Leather', 'Metal & Linen', 'Solid Oak Wood', 'Ceramic', '100% Wool', 'Metal & Glass', 'Bouclé Fabric', 'Terracotta'],
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export const calculateDiscount = (price: number, discountedPrice?: number): number => {
  if (!discountedPrice) return 0;
  return Math.round(((price - discountedPrice) / price) * 100);
};
