import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingBag, Plus, Pencil, Trash2, ChevronDown, ChevronUp, X, Search } from 'lucide-react';
import { toast } from 'sonner';
import { orders, products as initialProducts } from '@/data/mockData';
import { Product } from '@/types';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
} from '@/components/ui/alert-dialog';

// ─── constants ────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  faturado: 'bg-primary/10 text-primary',
  separacao: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  enviado: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  entregue: 'bg-success/10 text-success',
};
const STATUS_LABELS: Record<string, string> = {
  faturado: 'Faturado', separacao: 'Em separação', enviado: 'Enviado', entregue: 'Entregue',
};
const CATEGORIES = [
  { id: 'amadeirado-intenso', label: 'Amadeirado Intenso' },
  { id: 'adocicado', label: 'Adocicado' },
  { id: 'fresco-quente', label: 'Fresco c/ Fundo Quente' },
  { id: 'suave', label: 'Suave' },
  { id: 'amadeirado-fresco', label: 'Amadeirado Fresco' },
  { id: 'pos-banho', label: 'Pós-Banho' },
  { id: 'homem-rico', label: 'Homem Rico' },
  { id: 'floral', label: 'Floral' },
  { id: 'oriental-feminino', label: 'Oriental Feminino' },
  { id: 'aquatico-feminino', label: 'Aquático & Fresco' },
  { id: 'amadeirado-feminino', label: 'Amadeirado Suave' },
];
const STOCK_LABELS: Record<string, string> = {
  disponivel: 'Disponível', baixo: 'Últimas unidades', esgotado: 'Esgotado',
};
const STOCK_COLORS: Record<string, string> = {
  disponivel: 'bg-success/10 text-success',
  baixo: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  esgotado: 'bg-destructive/10 text-destructive',
};

// ─── empty form ───────────────────────────────────────────────────────────────

type FormData = {
  name: string; subtitle: string; category: string; gender: 'masculino' | 'feminino';
  price: string; ml: string; quantity: string; description: string;
  isLancamento: boolean; isPromocao: boolean; promoDays: string;
};

function stockFromQty(qty: number): Product['stock'] {
  if (qty === 0) return 'esgotado';
  if (qty <= 5) return 'baixo';
  return 'disponivel';
}

const EMPTY_FORM: FormData = {
  name: '', subtitle: '', category: 'amadeirado-intenso', gender: 'masculino',
  price: '', ml: '100', quantity: '', description: '',
  isLancamento: false, isPromocao: false, promoDays: '',
};

function productToForm(p: Product): FormData {
  return {
    name: p.name, subtitle: p.subtitle, category: p.category,
    gender: p.gender, price: String(p.price), ml: String(p.ml),
    quantity: p.quantity != null ? String(p.quantity) : '',
    description: p.description,
    isLancamento: p.badges.includes('lancamento'),
    isPromocao: p.badges.includes('promocao'),
    promoDays: p.promoDays != null ? String(p.promoDays) : '',
  };
}

// ─── field helpers ────────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-body text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-secondary border border-border rounded-lg px-3 py-2 font-body text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

// ─── main component ───────────────────────────────────────────────────────────

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'produtos' | 'pedidos'>('produtos');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);

  // delete confirm state
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  // ── handlers ────────────────────────────────────────────────────────────────

  function openAdd() {
    setEditingProduct(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  }

  function openEdit(p: Product) {
    setEditingProduct(p);
    setForm(productToForm(p));
    setDialogOpen(true);
  }

  function handleSave() {
    if (!form.name.trim()) { toast.error('Nome é obrigatório'); return; }
    if (!form.price || isNaN(Number(form.price))) { toast.error('Preço inválido'); return; }

    const base: Product = {
      id: editingProduct?.id ?? `lk-new-${Date.now()}`,
      name: form.name.trim(),
      subtitle: form.subtitle.trim(),
      category: form.category,
      subcategory: '',
      description: form.description.trim(),
      notes: editingProduct?.notes ?? { topo: '', coracao: '', fundo: '' },
      price: parseFloat(form.price),
      image: '/placeholder.svg',
      rating: editingProduct?.rating ?? 0,
      reviewCount: editingProduct?.reviewCount ?? 0,
      quantity: form.quantity !== '' ? parseInt(form.quantity) : undefined,
      stock: form.quantity !== '' ? stockFromQty(parseInt(form.quantity)) : (editingProduct?.stock ?? 'disponivel'),
      badges: [
        ...(form.isLancamento ? ['lancamento' as const] : []),
        ...(form.isPromocao ? ['promocao' as const] : []),
      ],
      promoDays: form.isPromocao && form.promoDays !== '' ? parseInt(form.promoDays) : undefined,
      ml: parseInt(form.ml) || 100,
      gender: form.gender,
    };

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? base : p));
      toast.success(`"${base.name}" atualizado`);
    } else {
      setProducts(prev => [base, ...prev]);
      toast.success(`"${base.name}" adicionado`);
    }
    setDialogOpen(false);
  }

  function handleDelete() {
    if (!deleteTarget) return;
    setProducts(prev => prev.filter(p => p.id !== deleteTarget.id));
    toast.success(`"${deleteTarget.name}" excluído`);
    setDeleteTarget(null);
  }

  // ── render ───────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-semibold">Painel Administrativo</h1>
              <p className="font-body text-sm text-muted-foreground mt-1">Linha K Perfumaria</p>
            </div>
            <span className="font-body text-xs text-muted-foreground bg-card px-3 py-1.5 rounded-full border border-border">
              Março 2026
            </span>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-border">
            {(['produtos', 'pedidos'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 py-2.5 font-body text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab === 'produtos' ? <Package className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                {tab === 'produtos' ? 'Produtos' : 'Pedidos'}
                <span className="bg-secondary text-muted-foreground text-xs px-1.5 py-0.5 rounded-full">
                  {tab === 'produtos' ? products.length : orders.length}
                </span>
              </button>
            ))}
          </div>

          {/* ── PRODUTOS ── */}
          {activeTab === 'produtos' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between gap-3 mb-4">
                <p className="font-body text-sm text-muted-foreground shrink-0">{products.length} produtos cadastrados</p>
                <div className="flex items-center gap-2 ml-auto">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <input
                      className="pl-8 pr-3 py-2 bg-secondary border border-border rounded-lg font-body text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors w-48"
                      placeholder="Buscar produto..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={openAdd}
                    className="flex items-center gap-1.5 bg-primary text-primary-foreground font-body text-sm px-3 py-2 rounded-lg hover:bg-primary/90 transition-colors shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Novo Produto
                  </button>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      <th className="text-left font-body text-xs font-medium text-muted-foreground px-4 py-3">Produto</th>
                      <th className="text-left font-body text-xs font-medium text-muted-foreground px-4 py-3 hidden md:table-cell">Categoria</th>
                      <th className="text-left font-body text-xs font-medium text-muted-foreground px-4 py-3">Preço</th>
                      <th className="text-left font-body text-xs font-medium text-muted-foreground px-4 py-3 hidden sm:table-cell">Estoque</th>
                      <th className="text-left font-body text-xs font-medium text-muted-foreground px-4 py-3 hidden lg:table-cell">Qtd.</th>
                      <th className="px-4 py-3 w-20" />
                    </tr>
                  </thead>
                  <tbody>
                    {products.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase())).map((p, i) => (
                      <tr key={p.id} className={`border-b border-border last:border-0 hover:bg-secondary/30 transition-colors ${i % 2 !== 0 ? 'bg-secondary/10' : ''}`}>
                        <td className="px-4 py-3">
                          <p className="font-body text-sm font-medium">{p.name}</p>
                          <p className="font-body text-xs text-muted-foreground">{p.ml}ml · {p.gender === 'masculino' ? 'Masc.' : 'Fem.'}</p>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className="font-body text-xs text-muted-foreground">
                            {CATEGORIES.find(c => c.id === p.category)?.label ?? p.category}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-body text-sm font-medium">R$ {p.price.toFixed(2).replace('.', ',')}</span>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className={`font-body text-xs px-2 py-0.5 rounded-full ${STOCK_COLORS[p.stock]}`}>
                            {STOCK_LABELS[p.stock]}
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span className="font-body text-sm">
                            {p.quantity != null ? p.quantity : <span className="text-muted-foreground">—</span>}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 justify-end">
                            <button
                              onClick={() => openEdit(p)}
                              className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                              title="Editar"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(p)}
                              className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                              title="Excluir"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ── PEDIDOS ── */}
          {activeTab === 'pedidos' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <p className="font-body text-sm text-muted-foreground mb-4">{orders.length} pedidos</p>
              <div className="bg-card border border-border rounded-xl overflow-hidden divide-y divide-border">
                {orders.map(order => (
                  <div key={order.id}>
                    <button
                      className="w-full flex items-center gap-4 px-4 py-3 hover:bg-secondary/30 transition-colors text-left"
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-body text-sm font-medium">{order.id}</span>
                          <span className={`font-body text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[order.status]}`}>
                            {STATUS_LABELS[order.status]}
                          </span>
                        </div>
                        <p className="font-body text-xs text-muted-foreground mt-0.5">{order.customer} · {order.date}</p>
                      </div>
                      <span className="font-body text-sm font-semibold shrink-0">R$ {order.total.toFixed(2).replace('.', ',')}</span>
                      {expandedOrder === order.id
                        ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
                        : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
                    </button>
                    {expandedOrder === order.id && (
                      <div className="px-4 pb-4 bg-secondary/20">
                        <div className="pt-3 space-y-1.5">
                          {order.products.map((item, i) => (
                            <div key={i} className="flex justify-between font-body text-sm">
                              <span className="text-muted-foreground">{item.qty}× {item.name}</span>
                              <span>R$ {(item.qty * item.price).toFixed(2).replace('.', ',')}</span>
                            </div>
                          ))}
                          <div className="pt-2 border-t border-border flex justify-between font-body text-sm font-semibold">
                            <span>Total</span>
                            <span>R$ {order.total.toFixed(2).replace('.', ',')}</span>
                          </div>
                          {order.trackingCode && (
                            <p className="font-body text-xs text-muted-foreground pt-1">
                              Rastreio: <span className="font-medium">{order.trackingCode}</span> · {order.carrier}
                            </p>
                          )}
                          <p className="font-body text-xs text-muted-foreground">E-mail: {order.email}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </motion.div>
      </div>

      {/* ── ADD / EDIT DIALOG ── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-lg">
              {editingProduct ? 'Editar Produto' : 'Novo Produto'}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="col-span-2">
              <Field label="Nome *">
                <input
                  className={inputCls}
                  placeholder="Ex: K Noir Absolu"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </Field>
            </div>
            <div className="col-span-2">
              <Field label="Subtítulo">
                <input
                  className={inputCls}
                  placeholder="Ex: Inspirado em fragrâncias amadeiradas"
                  value={form.subtitle}
                  onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))}
                />
              </Field>
            </div>
            <Field label="Categoria">
              <select
                className={inputCls}
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              >
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </Field>
            <Field label="Gênero">
              <select
                className={inputCls}
                value={form.gender}
                onChange={e => setForm(f => ({ ...f, gender: e.target.value as 'masculino' | 'feminino' }))}
              >
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
            </Field>
            <Field label="Preço (R$) *">
              <input
                className={inputCls}
                type="number"
                min="0"
                step="0.01"
                placeholder="159.90"
                value={form.price}
                onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
              />
            </Field>
            <Field label="Volume (ml)">
              <input
                className={inputCls}
                type="number"
                min="1"
                placeholder="100"
                value={form.ml}
                onChange={e => setForm(f => ({ ...f, ml: e.target.value }))}
              />
            </Field>
            <Field label="Quantidade">
              <input
                className={inputCls}
                type="number"
                min="0"
                placeholder="Ex: 50"
                value={form.quantity}
                onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))}
              />
            </Field>
            <div className="col-span-2">
              <Field label="Descrição">
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={3}
                  placeholder="Descreva o perfume..."
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                />
              </Field>
            </div>
            <div className="col-span-2">
              <label className="font-body text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-2">Flags</label>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-primary"
                    checked={form.isLancamento}
                    onChange={e => setForm(f => ({ ...f, isLancamento: e.target.checked }))}
                  />
                  <span className="font-body text-sm">Lançamento</span>
                </label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-primary"
                      checked={form.isPromocao}
                      onChange={e => setForm(f => ({ ...f, isPromocao: e.target.checked, promoDays: e.target.checked ? f.promoDays : '' }))}
                    />
                    <span className="font-body text-sm">Promoção</span>
                  </label>
                  {form.isPromocao && (
                    <div className="ml-6">
                      <Field label="Validade (dias)">
                        <input
                          className={inputCls}
                          type="number"
                          min="1"
                          placeholder="Ex: 7"
                          value={form.promoDays}
                          onChange={e => setForm(f => ({ ...f, promoDays: e.target.value }))}
                        />
                      </Field>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <button
              onClick={() => setDialogOpen(false)}
              className="flex items-center gap-1.5 px-4 py-2 font-body text-sm border border-border rounded-lg hover:bg-secondary transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary text-primary-foreground font-body text-sm rounded-lg hover:bg-primary/90 transition-colors"
            >
              {editingProduct ? 'Salvar alterações' : 'Adicionar produto'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── DELETE CONFIRM ── */}
      <AlertDialog open={!!deleteTarget} onOpenChange={open => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir produto?</AlertDialogTitle>
            <AlertDialogDescription>
              <strong>"{deleteTarget?.name}"</strong> será removido da listagem. Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
