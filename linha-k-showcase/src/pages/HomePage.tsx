import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Instagram, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/mockData';
import heroImage from '@/assets/hero-perfumes.jpg';

export default function HomePage() {
  const newArrivals = products.filter(p => p.badges.includes('lancamento') && p.gender === 'masculino');
  const femininoDestaques = products.filter(p => p.gender === 'feminino').slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <span className="font-body text-xs uppercase tracking-[0.3em] text-primary">Perfumaria Masculina Premium</span>
              <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight">
                <span className="gold-text">Elegância</span> em cada frasco
              </h1>
              <p className="font-body text-muted-foreground text-lg leading-relaxed max-w-md">
                Fragrâncias inspiradas nos maiores perfumes do mundo, com qualidade premium e preço justo. Descubra sua assinatura olfativa.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/catalogo" className="btn-gold inline-flex items-center gap-2">
                  Explorar Coleção <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/catalogo?cat=homem-rico" className="btn-outline-gold inline-flex items-center gap-2">
                  Linha Premium
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src={heroImage}
                alt="Coleção Linha K"
                className="w-full rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-4 -left-4 bg-card p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                    ))}
                  </div>
                  <span className="font-body text-sm font-semibold">4.8</span>
                </div>
                <p className="font-body text-xs text-muted-foreground mt-1">+1.200 avaliações</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-secondary py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, text: 'Frete grátis acima de R$ 249' },
              { icon: Shield, text: 'Pagamento 100% seguro' },
              { icon: RefreshCw, text: 'Troca em até 30 dias' },
              { icon: Star, text: 'Nota 4.8 de satisfação' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 justify-center">
                <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-body text-xs text-muted-foreground">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-title">Nossas Coleções</h2>
            <p className="font-body text-muted-foreground mt-3 max-w-lg mx-auto">Cada coleção conta uma história olfativa única, criada para diferentes momentos e personalidades.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(0, 4).map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/catalogo?cat=${cat.id}`}
                  className="block bg-card rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-primary/20"
                >
                  <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">{cat.name}</h3>
                  <p className="font-body text-xs text-muted-foreground mt-2">{cat.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {categories.slice(4).map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/catalogo?cat=${cat.id}`}
                  className="block bg-card rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-primary/20"
                >
                  <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">{cat.name}</h3>
                  <p className="font-body text-xs text-muted-foreground mt-2">{cat.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coleção Feminina */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <span className="font-body text-xs uppercase tracking-[0.3em] text-primary">Nova coleção</span>
            <div className="flex items-center justify-between mt-2">
              <h2 className="section-title">Perfumaria Feminina</h2>
              <Link to="/catalogo?genero=feminino" className="btn-outline-gold text-xs">Ver Coleção</Link>
            </div>
            <p className="font-body text-muted-foreground mt-3 max-w-lg">
              Fragrâncias criadas para a mulher que sabe o que quer — da leveza floral à intensidade oriental.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {femininoDestaques.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 md:p-12 text-center border border-border"
          >
            <Instagram className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="font-display text-3xl font-semibold mb-3">Compre pelo Instagram</h2>
            <p className="font-body text-muted-foreground max-w-md mx-auto mb-6">
              Siga @linhak.perfumes para novidades exclusivas, promoções relâmpago e dicas de perfumaria. Compra fácil via DM!
            </p>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="btn-gold inline-flex items-center gap-2">
              <Instagram className="w-4 h-4" /> Seguir no Instagram
            </a>
          </motion.div>
        </div>
      </section>

      {/* Lançamentos */}
      {newArrivals.length > 0 && (
        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <h2 className="section-title">Lançamentos</h2>
              <Link to="/catalogo" className="btn-outline-gold text-xs">Ver Todos</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {newArrivals.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
