import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Linha K</h3>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              Fragrâncias masculinas inspiradas nos maiores perfumes do mundo. Qualidade premium, preço justo.
            </p>
          </div>
          <div>
            <h4 className="font-body text-sm font-semibold uppercase tracking-wider mb-4">Navegação</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors font-body">Início</Link>
              <Link to="/catalogo" className="block text-sm text-muted-foreground hover:text-primary transition-colors font-body">Catálogo</Link>
              <Link to="/minha-conta" className="block text-sm text-muted-foreground hover:text-primary transition-colors font-body">Minha Conta</Link>
            </div>
          </div>
          <div>
            <h4 className="font-body text-sm font-semibold uppercase tracking-wider mb-4">Categorias</h4>
            <div className="space-y-2">
              <Link to="/catalogo?cat=amadeirado-intenso" className="block text-sm text-muted-foreground hover:text-primary transition-colors font-body">Amadeirado Intenso</Link>
              <Link to="/catalogo?cat=adocicado" className="block text-sm text-muted-foreground hover:text-primary transition-colors font-body">Adocicado</Link>
              <Link to="/catalogo?cat=fresco-quente" className="block text-sm text-muted-foreground hover:text-primary transition-colors font-body">Fresco com Fundo Quente</Link>
              <Link to="/catalogo?cat=homem-rico" className="block text-sm text-muted-foreground hover:text-primary transition-colors font-body">Perfume de Homem Rico</Link>
            </div>
          </div>
          <div>
            <h4 className="font-body text-sm font-semibold uppercase tracking-wider mb-4">Contato</h4>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body">
                <Instagram className="w-4 h-4" /> @linhak.perfumes
              </a>
              <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body">
                <Mail className="w-4 h-4" /> contato@linhak.com.br
              </a>
              <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body">
                <Phone className="w-4 h-4" /> (11) 99999-9999
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-xs text-muted-foreground font-body">© 2026 Linha K Perfumaria. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
