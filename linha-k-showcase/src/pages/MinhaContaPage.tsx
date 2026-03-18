import { motion } from 'framer-motion';
import { Package, User, CheckCircle, Truck, MapPin, Home, Clock } from 'lucide-react';
import { orders } from '@/data/mockData';

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  faturado: { label: 'Faturado', color: 'bg-primary/10 text-primary', icon: Clock },
  separacao: { label: 'Em Separação', color: 'bg-primary/10 text-primary', icon: Package },
  enviado: { label: 'Enviado', color: 'bg-success/10 text-success', icon: Truck },
  entregue: { label: 'Entregue', color: 'bg-success/10 text-success', icon: CheckCircle },
};

export default function MinhaContaPage() {
  const myOrders = orders.slice(0, 4); // mock user orders

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
          {/* Profile */}
          <div className="bg-card rounded-xl p-6 border border-border flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-semibold">João Silva</h1>
              <p className="font-body text-sm text-muted-foreground">joao@email.com</p>
            </div>
          </div>

          {/* Orders */}
          <div>
            <h2 className="font-display text-xl font-semibold mb-4">Meus Pedidos</h2>
            <div className="space-y-4">
              {myOrders.map(order => {
                const sc = statusConfig[order.status];
                return (
                  <div key={order.id} className="bg-card rounded-xl p-5 border border-border">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div>
                        <span className="font-body font-semibold text-sm">{order.id}</span>
                        <span className="font-body text-xs text-muted-foreground ml-3">{new Date(order.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-medium ${sc.color}`}>
                        <sc.icon className="w-3.5 h-3.5" /> {sc.label}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {order.products.map((p, i) => (
                        <div key={i} className="flex justify-between text-sm font-body">
                          <span>{p.name} x{p.qty}</span>
                          <span>R$ {(p.price * p.qty).toFixed(2).replace('.', ',')}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border mt-3 pt-3 flex justify-between font-body font-semibold text-sm">
                      <span>Total</span>
                      <span>R$ {order.total.toFixed(2).replace('.', ',')}</span>
                    </div>
                    {order.trackingCode && (
                      <div className="mt-3 flex items-center gap-2 text-xs font-body text-muted-foreground">
                        <Truck className="w-3.5 h-3.5" />
                        <span>{order.carrier} - {order.trackingCode}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
