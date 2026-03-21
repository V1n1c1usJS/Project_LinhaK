import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, Instagram } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useState, useRef, useEffect } from 'react';
import { products } from '@/data/mockData';
import logoK from '@/assets/logo-k.png';

const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/admin', label: 'Admin' },
];

export default function Header() {
  const { itemCount } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  const suggestions = searchQuery.length > 1
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-1 text-xs text-muted-foreground border-b border-border">
          <span className="font-body">Frete grátis para compras acima de R$ 249,90</span>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Instagram className="w-3 h-3" /> @linhak.perfumes
          </a>
        </div>
        {/* Main nav */}
        <div className="flex items-center justify-between h-16">
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2">
            <img src={logoK} alt="Linha K" className="h-10 w-10 object-contain" />
            <span className="font-display text-xl font-semibold tracking-wide">Linha K</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`font-body text-sm tracking-wide uppercase transition-colors hover:text-primary ${
                  location.pathname === l.to ? 'text-primary font-semibold' : 'text-foreground'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div ref={searchRef} className="relative">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:text-primary transition-colors">
                <Search className="w-5 h-5" />
              </button>
              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-background border border-border rounded-lg shadow-lg p-3 z-50">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Buscar perfumes..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-secondary rounded-md px-3 py-2 text-sm font-body outline-none focus:ring-1 focus:ring-primary"
                  />
                  {suggestions.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {suggestions.map(p => (
                        <Link
                          key={p.id}
                          to={`/produto/${p.id}`}
                          onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                          className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary transition-colors"
                        >
                          <div className="w-10 h-10 bg-secondary rounded-md flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">{p.name}</p>
                            <p className="text-xs text-muted-foreground">R$ {p.price.toFixed(2).replace('.', ',')}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <Link to="/carrinho" className="p-2 hover:text-primary transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-body font-semibold">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="md:hidden py-4 border-t border-border space-y-3">
            {navLinks.map(l => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className="block font-body text-sm tracking-wide uppercase py-2 hover:text-primary transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
