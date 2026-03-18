import { motion } from 'framer-motion';
import { Package, ShoppingBag, TrendingUp, Truck, DollarSign, ArrowUp, ArrowDown, CheckCircle, Box } from 'lucide-react';
import { orders, products } from '@/data/mockData';

const statusColors: Record<string, string> = {
  faturado: 'bg-primary/10 text-primary',
  separacao: 'bg-primary/20 text-primary',
  enviado: 'bg-success/10 text-success',
  entregue: 'bg-success/20 text-success',
};

const statusLabels: Record<string, string> = {
  faturado: 'Faturado',
  separacao: 'Separação',
  enviado: 'Enviado',
  entregue: 'Entregue',
};

const pipelineSteps = [
  { key: 'faturado', label: 'Faturamento', icon: DollarSign },
  { key: 'separacao', label: 'Separação', icon: Box },
  { key: 'enviado', label: 'Enviado', icon: Truck },
  { key: 'entregue', label: 'Entregue', icon: CheckCircle },
];

export default function AdminPage() {
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const avgTicket = totalRevenue / orders.length;
  const ordersByStatus = pipelineSteps.map(s => ({
    ...s,
    count: orders.filter(o => o.status === s.key).length,
  }));

  const metrics = [
    { label: 'Receita Total', value: `R$ ${totalRevenue.toFixed(2).replace('.', ',')}`, icon: DollarSign, trend: '+12%', up: true },
    { label: 'Pedidos', value: orders.length.toString(), icon: ShoppingBag, trend: '+8%', up: true },
    { label: 'Ticket Médio', value: `R$ ${avgTicket.toFixed(2).replace('.', ',')}`, icon: TrendingUp, trend: '+5%', up: true },
    { label: 'Produtos', value: products.length.toString(), icon: Package, trend: '', up: true },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-semibold">Painel de Gestão</h1>
              <p className="font-body text-sm text-muted-foreground mt-1">Visão geral do negócio — Linha K Perfumaria</p>
            </div>
            <span className="font-body text-xs text-muted-foreground bg-card px-3 py-1.5 rounded-full border border-border">
              Março 2026
            </span>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-5 border border-border"
              >
                <div className="flex items-center justify-between mb-3">
                  <m.icon className="w-5 h-5 text-primary" />
                  {m.trend && (
                    <span className={`flex items-center gap-0.5 text-xs font-body font-medium ${m.up ? 'text-success' : 'text-destructive'}`}>
                      {m.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      {m.trend}
                    </span>
                  )}
                </div>
                <p className="font-display text-2xl font-semibold">{m.value}</p>
                <p className="font-body text-xs text-muted-foreground mt-1">{m.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Pipeline */}
          <div className="bg-card rounded-xl p-6 border border-border mb-8">
            <h2 className="font-display text-lg font-semibold mb-6">Pipeline de Pedidos</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {ordersByStatus.map((s, i) => (
                <div key={s.key} className="text-center">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2 ${statusColors[s.key]}`}>
                    <s.icon className="w-6 h-6" />
                  </div>
                  <p className="font-display text-2xl font-semibold">{s.count}</p>
                  <p className="font-body text-xs text-muted-foreground">{s.label}</p>
                  {i < ordersByStatus.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 right-0 w-8 h-0.5 bg-border" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-body text-muted-foreground">
              <span>Faturamento</span> → <span>Separação</span> → <span>Parceiro (Jadlog / Correios / Superfrete)</span> → <span>Entrega ao cliente</span>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-card rounded-xl p-6 border border-border mt-8">
            <h2 className="font-display text-lg font-semibold mb-4">Categorias & Subcategorias</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Amadeirado Intenso', 'Adocicado', 'Fresco c/ Fundo Quente', 'Suave', 'Amadeirado Fresco', 'Pós-Banho', 'Homem Rico'].map(cat => {
                const count = products.filter(p => {
                  const catMap: Record<string, string> = {
                    'Amadeirado Intenso': 'amadeirado-intenso',
                    'Adocicado': 'adocicado',
                    'Fresco c/ Fundo Quente': 'fresco-quente',
                    'Suave': 'suave',
                    'Amadeirado Fresco': 'amadeirado-fresco',
                    'Pós-Banho': 'pos-banho',
                    'Homem Rico': 'homem-rico',
                  };
                  return p.category === catMap[cat];
                }).length;
                return (
                  <div key={cat} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <span className="font-body text-sm">{cat}</span>
                    <span className="font-body text-xs font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">{count}</span>
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
