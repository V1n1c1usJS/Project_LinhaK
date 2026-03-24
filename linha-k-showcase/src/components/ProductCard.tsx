import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { Product } from '@/types';
import { motion } from 'framer-motion';
import bottleMasc from '@/assets/product-bottle-3.jpg';
import bottleFem  from '@/assets/product-bottle-4.jpg';

export function getProductImage(product: Product): string {
  return product.gender === 'feminino' ? bottleFem : bottleMasc;
}

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const formatPrice = (price: number) => `R$ ${price.toFixed(2).replace('.', ',')}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="product-card group"
    >
      <Link to={`/produto/${product.id}`} className="block">
        <div className="relative aspect-square bg-secondary overflow-hidden">
          <img
            src={getProductImage(product)}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.badges.includes('lancamento') && <span className="badge-new">Lançamento</span>}
            {product.badges.includes('promocao') && <span className="badge-bestseller">Promoção</span>}
          </div>
        </div>
      </Link>
      <div className="p-4 space-y-2">
        <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">{product.subcategory}</p>
        <Link to={`/produto/${product.id}`}>
          <h3 className="font-display text-lg font-semibold leading-tight hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <p className="text-xs text-muted-foreground font-body italic">{product.subtitle}</p>
        <div className="flex items-center gap-2">
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through font-body">{formatPrice(product.originalPrice)}</span>
          )}
          <span className="text-lg font-semibold font-body text-foreground">{formatPrice(product.price)}</span>
        </div>
        <Link
          to={`/produto/${product.id}`}
          className="btn-gold w-full mt-3 flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Ver Produto
        </Link>
      </div>
    </motion.div>
  );
}
