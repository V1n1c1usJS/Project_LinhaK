import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, MapPin, Home } from 'lucide-react';

const trackingSteps = [
  { icon: CheckCircle, label: 'Pedido Confirmado', desc: 'Pagamento aprovado', done: true },
  { icon: Package, label: 'Em Separação', desc: 'Preparando seu pedido', done: true },
  { icon: Truck, label: 'Enviado', desc: 'Código: BR123456789', done: false },
  { icon: MapPin, label: 'Em Trânsito', desc: 'Previsão: 3-5 dias úteis', done: false },
  { icon: Home, label: 'Entregue', desc: '', done: false },
];

export default function PedidoConfirmadoPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h1 className="font-display text-3xl font-semibold">Pedido Confirmado!</h1>
          <p className="font-body text-muted-foreground">
            Obrigado pela sua compra! Seu pedido <span className="font-semibold text-foreground">#PED-2026-009</span> foi recebido com sucesso.
          </p>

          {/* Tracking */}
          <div className="bg-card rounded-xl p-6 border border-border text-left mt-8">
            <h3 className="font-display text-lg font-semibold mb-6">Acompanhe seu Pedido</h3>
            <div className="space-y-0">
              {trackingSteps.map((s, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${s.done ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                      <s.icon className="w-5 h-5" />
                    </div>
                    {i < trackingSteps.length - 1 && (
                      <div className={`w-0.5 h-8 ${s.done ? 'bg-primary' : 'bg-border'}`} />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className={`font-body text-sm font-semibold ${s.done ? 'text-foreground' : 'text-muted-foreground'}`}>{s.label}</p>
                    {s.desc && <p className="font-body text-xs text-muted-foreground">{s.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/" className="btn-outline-gold">Voltar ao Início</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
