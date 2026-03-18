export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  subcategory: string;
  description: string;
  notes: { topo: string; coracao: string; fundo: string };
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  stock: 'disponivel' | 'baixo' | 'esgotado';
  badges: ('bestseller' | 'lancamento' | 'promocao')[];
  ml: number;
  gender: 'masculino' | 'feminino';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  products: { name: string; qty: number; price: number }[];
  total: number;
  status: 'faturado' | 'separacao' | 'enviado' | 'entregue';
  date: string;
  trackingCode?: string;
  carrier?: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}
