import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/mockData';

type Gender = 'todos' | 'masculino' | 'feminino';

const sortOptions = [
  { value: 'relevancia', label: 'Relevância' },
  { value: 'menor-preco', label: 'Menor Preço' },
  { value: 'maior-preco', label: 'Maior Preço' },
];

export default function CatalogoPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') || '';
  const initialGender = (searchParams.get('genero') as Gender) || 'todos';
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [gender, setGender] = useState<Gender>(initialGender);
  const [sortBy, setSortBy] = useState('relevancia');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 400]);
  const [showFilters, setShowFilters] = useState(false);

  const visibleCategories = useMemo(() =>
    categories.filter(c => gender === 'todos' || c.gender === gender),
    [gender]
  );

  const filtered = useMemo(() => {
    let result = [...products];
    if (gender !== 'todos') result = result.filter(p => p.gender === gender);
    if (selectedCategory) result = result.filter(p => p.category === selectedCategory);
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sortBy) {
      case 'menor-preco': result.sort((a, b) => a.price - b.price); break;
      case 'maior-preco': result.sort((a, b) => b.price - a.price); break;
    }
    return result;
  }, [selectedCategory, gender, sortBy, priceRange]);

  const handleGenderChange = (g: Gender) => {
    setGender(g);
    setSelectedCategory('');
    const params: Record<string, string> = {};
    if (g !== 'todos') params.genero = g;
    setSearchParams(params);
  };

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    const params: Record<string, string> = {};
    if (gender !== 'todos') params.genero = gender;
    if (catId) params.cat = catId;
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <h1 className="section-title">Catálogo</h1>
          <p className="font-body text-muted-foreground mt-2">
            {filtered.length} {filtered.length === 1 ? 'perfume encontrado' : 'perfumes encontrados'}
          </p>
        </motion.div>

        {/* Gender tabs */}
        <div className="flex gap-2 mb-8 border-b border-border">
          {(['todos', 'masculino', 'feminino'] as Gender[]).map(g => (
            <button
              key={g}
              onClick={() => handleGenderChange(g)}
              className={`font-body text-sm font-medium px-5 py-2.5 border-b-2 transition-colors capitalize ${
                gender === g
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {g === 'todos' ? 'Todos' : g === 'masculino' ? 'Masculino' : 'Feminino'}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden btn-outline-gold flex items-center gap-2 self-start"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filtros
          </button>

          {/* Sidebar filters */}
          <aside className={`lg:w-64 flex-shrink-0 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-card rounded-xl p-5 border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-body font-semibold text-sm uppercase tracking-wider">Categorias</h3>
                {selectedCategory && (
                  <button onClick={() => handleCategoryChange('')} className="text-xs text-primary hover:underline font-body">
                    Limpar
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {visibleCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id === selectedCategory ? '' : cat.id)}
                    className={`block w-full text-left text-sm font-body px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === cat.id ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl p-5 border border-border">
              <h3 className="font-body font-semibold text-sm uppercase tracking-wider mb-4">Faixa de Preço</h3>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-full bg-secondary rounded-md px-2 py-1.5 text-sm font-body outline-none"
                  placeholder="Min"
                />
                <span className="text-muted-foreground">-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full bg-secondary rounded-md px-2 py-1.5 text-sm font-body outline-none"
                  placeholder="Max"
                />
              </div>
            </div>
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              {selectedCategory && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-body text-muted-foreground">Filtro:</span>
                  <span className="text-xs font-body bg-primary text-primary-foreground px-3 py-1 rounded-full flex items-center gap-1">
                    {categories.find(c => c.id === selectedCategory)?.name}
                    <button onClick={() => handleCategoryChange('')}><X className="w-3 h-3" /></button>
                  </span>
                </div>
              )}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="ml-auto bg-card border border-border rounded-lg px-3 py-2 text-sm font-body outline-none focus:ring-1 focus:ring-primary"
              >
                {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="font-display text-xl text-muted-foreground">Nenhum perfume encontrado</p>
                <p className="font-body text-sm text-muted-foreground mt-2">Tente ajustar os filtros</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
