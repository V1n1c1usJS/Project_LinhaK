# Escopo Comercial - Ecommerce Linha K

## 1. Visao Geral

Desenvolvimento de uma plataforma de ecommerce para a Linha K, com foco na venda online de perfumes, operacao centralizada para a empresa e experiencia de compra simples, elegante e objetiva para o cliente.

O projeto considera uma proposta visual minimalista, com identidade premium em branco e dourado, e busca substituir controles manuais atuais por uma estrutura digital mais organizada, rastreavel e escalavel.

## 2. Objetivos do Projeto

- Estruturar uma loja virtual propria para venda de perfumes.
- Centralizar a administracao de vendas, pagamentos, frete e estoque.
- Permitir acompanhamento completo do ciclo do pedido para empresa e cliente.
- Reduzir dependencia de planilhas por meio de um controle interno de estoque no sistema.
- Criar uma base tecnologica preparada para crescimento, manutencao e futuras integracoes.

## 3. Escopo Base do Projeto

### 3.1 Loja Virtual

Inclui o desenvolvimento da experiencia principal de compra, com:

- home e vitrine de produtos
- listagem de produtos
- pagina de produto com detalhes relevantes
- carrinho de compras
- checkout
- cadastro e identificacao do cliente
- acompanhamento do pedido

### 3.2 Catalogo e Busca

O catalogo sera estruturado para facilitar a navegacao e tornar a escolha do produto mais intuitiva.

Inclui:

- organizacao por categorias e subcategorias
- busca com apoio de autocomplete
- filtros por preco
- estrutura para filtros avancados dos perfumes

### 3.3 Jornada de Compra e Pedido

O sistema devera permitir o acompanhamento do pedido de ponta a ponta, com visibilidade tanto para o cliente quanto para a equipe interna.

Fluxo previsto:

- cliente encontra o produto
- visualiza detalhes
- adiciona ao carrinho
- realiza cadastro ou identificacao
- escolhe forma de pagamento
- conclui a compra
- pedido segue para faturamento e preparacao
- pedido e enviado
- entrega e confirmada

Status operacionais previstos:

- pagamento aprovado
- pedido em preparo
- pedido enviado
- pedido entregue

### 3.4 Administracao de Vendas

O painel administrativo devera permitir operacao completa da loja, incluindo:

- visualizacao e gerenciamento dos pedidos
- acompanhamento do status de cada venda
- administracao dos meios de pagamento
- atualizacao do andamento do pedido
- controle do envio e do rastreio

### 3.5 Frete e Logistica

Sera considerada a integracao com solucao de frete, com preferencia atual pelo Superfrete.

Escopo funcional:

- calculo de frete
- previsao de prazo de entrega
- geracao de etiqueta
- associacao do envio ao pedido
- envio de codigo ou etiqueta de acompanhamento ao cliente
- acompanhamento logistico pela empresa

### 3.6 Pagamentos

O projeto considera a estrutura de meios de pagamento com possibilidade de manter a operacao atual ou recomendar alternativa mais adequada.

Formas de pagamento desejadas:

- cartao de credito
- cartao de debito
- PIX
- link de pagamento

Observacao:

O uso atual da operacao e a Stone, mas a definicao final do provedor ainda depende de analise tecnica, comercial e operacional.

### 3.7 Controle de Estoque

O estoque atual e controlado em planilhas. O projeto preve a migracao desse controle para dentro do sistema.

Estrutura conceitual proposta:

- cadastro de produtos com identificacao interna
- controle de entrada de novos itens
- controle de saida com base nas vendas
- atualizacao de saldo disponivel
- historico de movimentacoes
- possibilidade de impressao de identificadores fisicos para colagem e rastreio interno

Essa estrutura permite melhor confiabilidade operacional, visibilidade do estoque real e rastreabilidade do produto ao longo do processo interno.

### 3.8 Comunicacoes ao Cliente

No escopo base, o sistema devera contemplar ao menos a comunicacao essencial relacionada ao pedido e ao envio.

Inclui:

- envio de email com informacoes do pedido
- envio de codigo de rastreio ou acompanhamento

## 4. Modulos Opcionais / Evolutivos

Os itens abaixo aparecem como oportunidades relevantes para ampliacao da plataforma, mas podem ser tratados como segunda fase ou como escopo opcional no orcamento.

### 4.1 Comunicacao por WhatsApp

- envio de mensagens transacionais sobre andamento do pedido

### 4.2 Painel Gerencial e BI

- tela de BI para acompanhamento da operacao
- KPIs por produto, categoria e subcategoria
- visoes gerenciais para apoio na tomada de decisao

### 4.3 Sistema de Recomendacao

- recomendacoes com base em perfil do cliente
- historico de compra
- preferencias
- produtos mais vendidos

### 4.4 Sistema de Avaliacoes

- clientes avaliam os produtos diretamente no site
- exibicao publica de avaliacoes nas paginas dos produtos

### 4.5 Sistema de Promocoes

- criacao e ativacao de promocoes
- indicacao automatica de itens promocionais no site

### 4.6 Integracao com Instagram

- botao de loja no Instagram
- direcionamento do usuario para a pagina do produto ou compra

## 5. Estrutura Operacional Prevista

### 5.1 Visao do Cliente

O cliente navega pelo catalogo, encontra o produto, analisa os detalhes, adiciona ao carrinho, realiza o pagamento e acompanha o pedido ate a entrega.

### 5.2 Visao da Empresa

A empresa acompanha o pedido desde o faturamento, passando por separacao e despacho para o parceiro logistico, ate a confirmacao da entrega.

Essa estrutura ajuda a organizar a rotina operacional e melhora o atendimento ao cliente, pois cria visibilidade sobre cada etapa da compra.

## 6. Custos Envolvidos no Projeto - Conceito

Os custos ainda dependem de levantamento para definicao de valores, mas conceitualmente o projeto possui cinco grupos principais de custo.

### 6.1 Custo de Implantacao

Refere-se ao investimento inicial para planejar, desenhar, desenvolver, configurar e publicar a plataforma.

Normalmente envolve:

- descoberta e refinamento do escopo
- design e experiencia
- desenvolvimento frontend e backend
- configuracao de integracoes
- testes e validacao
- publicacao do sistema

### 6.2 Custos de Infraestrutura

Sao os custos recorrentes para manter o sistema online.

Podem incluir:

- hospedagem do site
- hospedagem da aplicacao
- hospedagem de arquivos
- hospedagem do banco de dados
- CDN ou Edge Network para performance e entrega de conteudo

Esses valores variam conforme trafego, volume de acessos, tamanho do catalogo, quantidade de arquivos e nivel de disponibilidade esperado.

### 6.3 Custos com Servicos de Terceiros

Sao os servicos necessarios para executar partes especificas da operacao.

Exemplos previstos:

- API de logistica e frete
- API de envio de emails
- API de pagamentos

Esses custos geralmente dependem de provedor escolhido, volume de uso, numero de transacoes e regras comerciais da plataforma contratada.

### 6.4 Custos Transacionais da Operacao

Sao os custos que crescem junto com a operacao do ecommerce.

Exemplos:

- taxas por transacao de pagamento
- custos por etiqueta ou operacao de frete
- custos por volume de emails enviados
- custos variaveis ligados ao uso das APIs

Ou seja, mesmo com a plataforma pronta, a operacao possui despesas variaveis conforme o numero de pedidos e o uso dos servicos.

### 6.5 Manutencao e Evolucao

Refere-se ao investimento continuo para manter o sistema saudavel e atualizado apos a entrega inicial.

Pode envolver:

- correcoes
- ajustes operacionais
- melhorias de experiencia
- adaptacoes em integracoes externas
- novas funcionalidades
- suporte tecnico

Esse item pode ser tratado como manutencao recorrente mensal ou como demanda evolutiva sob solicitacao.

## 7. Fornecedores e Referencias em Estudo

Com base no material atual, os fornecedores ou referencias a serem avaliados sao:

- frete: Superfrete
- pagamentos: Stone, com avaliacao complementar de alternativas como Mercado Pago
- envio de emails: SendGrid, Mailgun ou Waypoint
- hospedagem: alternativas como Hostinger e Hostgator, sujeitas a validacao tecnica

Observacao:

A escolha final de fornecedores deve considerar custo, capacidade tecnica, experiencia de integracao, estabilidade, suporte e aderencia ao modelo de operacao da Linha K.

## 8. Premissas Para Orcamento Final

Para fechar o orcamento com maior precisao, ainda sera importante validar:

- quantidade inicial de produtos e variacoes
- estrutura desejada para categorias e filtros
- nivel de automacao do estoque
- forma exata de uso do link de pagamento
- fluxo de atendimento ao cliente no pos-venda
- profundidade do painel administrativo
- necessidade de importacao de dados atuais das planilhas
- prioridade entre modulos obrigatorios e opcionais
- modelo de manutencao apos a entrega

## 9. Resumo Comercial

O projeto da Linha K se configura como um ecommerce proprio com foco em operacao organizada, experiencia premium e capacidade de crescimento.

O escopo base contempla a estrutura essencial para venda online, pagamento, frete, rastreio, gestao de pedidos e controle de estoque.

Os modulos opcionais ampliam a capacidade comercial e estrategica da plataforma, especialmente nas frentes de marketing, BI, recomendacao, promocoes e integracao com Instagram.

Os custos ainda exigem levantamento detalhado, mas ja estao claramente distribuidos entre implantacao, infraestrutura, servicos de terceiros, operacao transacional e manutencao.
