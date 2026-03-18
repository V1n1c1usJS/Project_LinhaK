import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { getProductImage } from '@/components/ProductCard';

export default function CarrinhoPage() {
  const { items, updateQuantity, removeItem, total, itemCount } = useCart();
  const formatPrice = (price: number) => `R$ ${price.toFixed(2).replace('.', ',')}`;
  const frete = total >= 249.90 ? 0 : 18.90;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="font-display text-2xl font-semibold mb-2">Seu carrinho está vazio</h1>
          <p className="font-body text-muted-foreground mb-6">Explore nossa coleção e encontre a fragrância perfeita.</p>
          <Link to="/catalogo" className="btn-gold inline-flex items-center gap-2">
            Explorar Catálogo <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="section-title mb-8">Carrinho ({itemCount} {itemCount === 1 ? 'item' : 'itens'})</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-card rounded-xl p-4 border border-border flex gap-4"
              >
                <Link to={`/produto/${item.product.id}`} className="w-24 h-24 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                  <img src={getProductImage(item.product)} alt={item.product.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display font-semibold">{item.product.name}</h3>
                      <p className="font-body text-xs text-muted-foreground">{item.product.ml}ml</p>
                    </div>
                    <button onClick={() => removeItem(item.product.id)} className="p-1 hover:text-destructive transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-border rounded-lg">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-2"><Minus className="w-3 h-3" /></button>
                      <span className="px-3 font-body text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-2"><Plus className="w-3 h-3" /></button>
                    </div>
                    <span className="font-body font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-card rounded-xl p-6 border border-border h-fit sticky top-24 space-y-4">
            <h3 className="font-display text-lg font-semibold">Resumo do Pedido</h3>
            <div className="space-y-2 text-sm font-body">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(total)}</span></div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frete</span>
                <span className={frete === 0 ? 'text-success font-semibold' : ''}>{frete === 0 ? 'Grátis' : formatPrice(frete)}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>{formatPrice(total + frete)}</span>
              </div>
              <p className="text-xs text-muted-foreground">ou 3x de {formatPrice((total + frete) / 3)} sem juros</p>
            </div>
            <Link to="/checkout" className="btn-gold w-full block text-center mt-4">
              Finalizar Compra
            </Link>
            <Link to="/catalogo" className="btn-outline-gold w-full block text-center">
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
