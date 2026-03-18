import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Barcode, Smartphone, Check } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const steps = ['Identificação', 'Pagamento', 'Confirmação'];

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const formatPrice = (price: number) => `R$ ${price.toFixed(2).replace('.', ',')}`;
  const frete = total >= 249.90 ? 0 : 18.90;

  const handleFinish = () => {
    clearCart();
    navigate('/pedido-confirmado');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-body text-sm font-semibold transition-colors ${
                i <= step ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
              }`}>
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`font-body text-sm hidden sm:inline ${i <= step ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{s}</span>
              {i < steps.length - 1 && <div className={`w-12 h-0.5 ${i < step ? 'bg-primary' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          {step === 0 && (
            <div className="bg-card rounded-xl p-6 border border-border space-y-4">
              <h2 className="font-display text-xl font-semibold">Dados de Entrega</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input placeholder="Nome completo" className="w-full bg-secondary rounded-lg px-4 py-3 text-sm font-body outline-none focus:ring-1 focus:ring-primary" />
                <input placeholder="E-mail" type="email" className="w-full bg-secondary rounded-lg px-4 py-3 text-sm font-body outline-none focus:ring-1 focus:ring-primary" />
                <input placeholder="CPF" className="w-full bg-secondary rounded-lg px-4 py-3 text-sm font-body outline-none focus:ring-1 focus:ring-primary" />
                <input placeholder="Telefone" className="w-full bg-secondary rounded-lg px-4 py-3 text-sm font-body outline-none focus:ring-1 focus:ring-primary" />
                <input placeholder="CEP" className="w-full bg-secondary rounded-lg px-4 py-3 text-sm font-body outline-none focus:ring-1 focus:ring-primary" />
                <input placeholder="Endereço" className="w-full bg-secondary rounded-lg px-4 py-3 text-sm font-body outline-none focus:ring-1 focus:ring-primary md:col-span-2" />
                <input placeholder="Número" className="w-full bg-secondary rounded-lg px-4 py-3 text-sm font-body outline-none focus:ring-1 focus:ring-primary" />
                <input placeholder="Complemento" className="w-full bg-secondary rounded-lg px-4 py-3 text-sm font-body outline-none focus:ring-1 focus:ring-primary" />
                <input placeholder="Cidade" className="w-full bg-secondary rounded-lg px-4 py-3 text-sm font-body outline-none focus:ring-1 focus:ring-primary" />
                <input placeholder="Estado" className="w-full bg-secondary rounded-lg px-4 py-3 text-sm font-body outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <button onClick={() => setStep(1)} className="btn-gold w-full mt-4">Continuar para Pagamento</button>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-card rounded-xl p-6 border border-border space-y-4">
                <h2 className="font-display text-xl font-semibold">Método de Pagamento</h2>
                {[
                  { id: 'cartao', icon: CreditCard, label: 'Cartão de Crédito', desc: 'Até 3x sem juros' },
                  { id: 'pix', icon: Smartphone, label: 'PIX', desc: '5% de desconto' },
                  { id: 'boleto', icon: Barcode, label: 'Boleto Bancário', desc: 'Vencimento em 3 dias úteis' },
                ].map(pm => (
                  <button
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                      paymentMethod === pm.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'
                    }`}
                  >
                    <pm.icon className={`w-6 h-6 ${paymentMethod === pm.id ? 'text-primary' : 'text-muted-foreground'}`} />
                    <div className="text-left">
                      <p className="font-body font-semibold text-sm">{pm.label}</p>
                      <p className="font-body text-xs text-muted-foreground">{pm.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Order summary */}
              <div className="bg-card rounded-xl p-6 border border-border space-y-3">
                <h3 className="font-display text-lg font-semibold">Resumo</h3>
                {items.map(i => (
                  <div key={i.product.id} className="flex justify-between text-sm font-body">
                    <span>{i.product.name} x{i.quantity}</span>
                    <span>{formatPrice(i.product.price * i.quantity)}</span>
                  </div>
                ))}
                <div className="border-t border-border pt-2 flex justify-between text-sm font-body">
                  <span className="text-muted-foreground">Frete</span>
                  <span>{frete === 0 ? 'Grátis' : formatPrice(frete)}</span>
                </div>
                <div className="flex justify-between font-semibold font-body text-base">
                  <span>Total</span>
                  <span>{formatPrice(total + frete)}</span>
                </div>
              </div>

              <button onClick={() => setStep(2)} disabled={!paymentMethod} className="btn-gold w-full disabled:opacity-50">
                Revisar Pedido
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-card rounded-xl p-6 border border-border space-y-6 text-center">
              <Check className="w-12 h-12 text-primary mx-auto" />
              <h2 className="font-display text-2xl font-semibold">Confirmar Pedido</h2>
              <p className="font-body text-muted-foreground">
                Total: <span className="font-semibold text-foreground">{formatPrice(total + frete)}</span> via {paymentMethod === 'cartao' ? 'Cartão' : paymentMethod === 'pix' ? 'PIX' : 'Boleto'}
              </p>
              <button onClick={handleFinish} className="btn-gold w-full">Confirmar e Pagar</button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
