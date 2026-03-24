import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Minus, Plus, Truck, Shield, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { products } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import BottleIllustration from '@/components/BottleIllustration';
import type { ProductSize } from '@/types';

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const defaultSize = product?.sizes.find(s => s.ml === 50) ?? product?.sizes[product.sizes.length - 1];
  const [selectedSize, setSelectedSize] = useState<ProductSize | undefined>(defaultSize);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl">Produto não encontrado</h1>
          <Link to="/catalogo" className="btn-gold mt-4 inline-block">Voltar ao Catálogo</Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => `R$ ${price.toFixed(2).replace('.', ',')}`;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Link to="/catalogo" className="inline-flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Voltar ao catálogo
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
            <div className="aspect-square bg-secondary rounded-2xl flex items-center justify-center">
              <motion.div
                key={selectedSize?.ml}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="h-[80%] w-full flex items-center justify-center"
              >
                <BottleIllustration
                  ml={selectedSize?.ml ?? 50}
                  gender={product.gender}
                  className="h-full w-auto max-w-[60%]"
                />
              </motion.div>
            </div>
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.badges.includes('lancamento') && <span className="badge-new">Lançamento</span>}
              {product.badges.includes('promocao') && <span className="badge-bestseller">Promoção</span>}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
            <div>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-primary mb-2">{product.subcategory}</p>
              <h1 className="font-display text-3xl md:text-4xl font-semibold">{product.name}</h1>
              <p className="font-body text-sm text-muted-foreground italic mt-2">{product.subtitle}</p>
            </div>

            <div>
              <div className="flex items-baseline gap-3">
                {selectedSize?.originalPrice && (
                  <span className="font-body text-lg text-muted-foreground line-through">{formatPrice(selectedSize.originalPrice)}</span>
                )}
                <span className="font-display text-3xl font-semibold">{formatPrice(selectedSize?.price ?? product.price)}</span>
              </div>
            </div>

            {/* Size selector */}
            <div className="space-y-2">
              <p className="font-body text-xs uppercase tracking-wider text-muted-foreground">Tamanho</p>
              <div className="flex gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size.ml}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border text-sm font-body font-medium transition-all duration-200 ${
                      selectedSize?.ml === size.ml
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {size.ml}ml
                    {size.ml === 5 && <span className="block text-[10px] opacity-70">Amostra</span>}
                  </button>
                ))}
              </div>
            </div>

            <p className="font-body text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Notas olfativas */}
            <div className="bg-card rounded-xl p-5 border border-border space-y-3">
              <h3 className="font-body font-semibold text-sm uppercase tracking-wider">Pirâmide Olfativa</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="font-body text-xs text-primary uppercase tracking-wider mb-1">Topo</p>
                  <p className="font-body text-sm">{product.notes.topo}</p>
                </div>
                <div>
                  <p className="font-body text-xs text-primary uppercase tracking-wider mb-1">Coração</p>
                  <p className="font-body text-sm">{product.notes.coracao}</p>
                </div>
                <div>
                  <p className="font-body text-xs text-primary uppercase tracking-wider mb-1">Fundo</p>
                  <p className="font-body text-sm">{product.notes.fundo}</p>
                </div>
              </div>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${product.stock === 'disponivel' ? 'bg-success' : product.stock === 'baixo' ? 'bg-warning' : 'bg-muted-foreground'}`} />
              <span className="font-body text-sm">
                {product.stock === 'disponivel' ? 'Em estoque' : product.stock === 'baixo' ? 'Últimas unidades' : 'Esgotado'}
              </span>
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-secondary transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-body font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-secondary transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => addItem(product, qty)}
                disabled={product.stock === 'esgotado'}
                className="btn-gold flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShoppingBag className="w-4 h-4" />
                Adicionar ao Carrinho
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                <Truck className="w-4 h-4 text-primary" /> Frete grátis acima de R$ 249
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                <Shield className="w-4 h-4 text-primary" /> Garantia de 30 dias
              </div>
            </div>

            {/* Estimativa frete */}
            <div className="bg-card rounded-xl p-5 border border-border">
              <h3 className="font-body font-semibold text-sm uppercase tracking-wider mb-3">Calcular Frete</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="CEP"
                  maxLength={9}
                  className="flex-1 bg-secondary rounded-md px-3 py-2 text-sm font-body outline-none focus:ring-1 focus:ring-primary"
                />
                <button className="btn-outline-gold text-xs">Calcular</button>
              </div>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-sm font-body">
                  <span className="text-muted-foreground">PAC - Correios</span>
                  <span>R$ 18,90 <span className="text-xs text-muted-foreground">(5-8 dias)</span></span>
                </div>
                <div className="flex justify-between text-sm font-body">
                  <span className="text-muted-foreground">SEDEX</span>
                  <span>R$ 32,50 <span className="text-xs text-muted-foreground">(2-3 dias)</span></span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
