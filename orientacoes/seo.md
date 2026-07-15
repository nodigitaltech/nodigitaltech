# Diretrizes e Boas Práticas de SEO para a Nodigital

Este documento concentra as estratégias e regras de ouro de SEO (Search Engine Optimization) definidas para o projeto da Nodigital, visando otimizar o ranqueamento orgânico no Google.

---

## 1. Arquitetura de Páginas (Multi-Page vs One-Page)

O site deixará de ser estritamente *One-Page* (página única) para adotar uma estrutura com múltiplas páginas. Isso aumenta a "pegada digital" do site no Google.

**Por que isso importa?**
- O Google indexa páginas individuais.
- Ao invés de ranquear apenas para "Desenvolvimento Web" na home, o site poderá ranquear para "Inteligência Artificial" com uma página dedicada `inteligencia-artificial.html`.
- Arquivos HTML físicos (`sobre.html`, `blog.html`) funcionam perfeitamente para o Googlebot. Para motores de busca, não importa se é uma rota gerada por um framework complexo ou um arquivo HTML estático, desde que retorne um código limpo e estruturado.

---

## 2. A Importância do "Mapa do Site" (Linkagem Interna)

Os links no rodapé (seção *Mapa do Site*) são cruciais para a navegação do Googlebot. 

**Como o Googlebot age:**
1. Ele entra na página `index.html`.
2. Varre o código até o rodapé.
3. Encontra os links do Mapa do Site (ex: `/sobre`, `/inteligencia-artificial`).
4. Segue esses links para descobrir e indexar as novas páginas no banco de dados do Google.

---

## 3. Regras de Ouro para Criação de Novas Páginas (HTML)

Sempre que um novo arquivo HTML for criado (ex: `blog.html`), siga este checklist obrigatório:

### A. Meta Tags Únicas (Obrigatório)
O Google usa o `<title>` e a `<meta name="description">` para criar o cartão de exibição nos resultados de busca.
- **NUNCA** duplique títulos ou descrições entre páginas.
- O `<title>` deve ter entre 50-60 caracteres, focado na palavra-chave da página (ex: `Blog de Tecnologia e Inovação | Nodigital`).
- A `<meta name="description">` deve ser atrativa e resumir a página em até 155 caracteres.

### B. URLs Amigáveis (Clean URLs)
- Configure o servidor de hospedagem para ocultar a extensão `.html`. 
- Ao invés de o usuário (e o Google) ver `nodigital.com.br/sobre.html`, ele deve acessar `nodigital.com.br/sobre`.
- Os links criados no HTML (`<a href="...">`) já devem apontar para o caminho limpo (ex: `href="/sobre"`).

### C. Estrutura Semântica (Heading Tags)
- Cada página deve ter **apenas UM** `<h1>`, que representa o assunto principal da página.
- Utilize `<h2>` e `<h3>` para dividir os tópicos do conteúdo de forma lógica e hierárquica.

### D. Consistência Visual
- Reutilize o mesmo código base de `<header>` (Menu de navegação) e `<footer>` (Rodapé) em todas as páginas para manter a consistência de navegação.

---

## 4. Otimização de Imagens
- Todas as tags `<img>` devem possuir o atributo `alt` preenchido descrevendo a imagem (importante para acessibilidade e busca por imagens do Google).
- Utilize formatos modernos (como WebP) e comprima as imagens para garantir um carregamento rápido, pois velocidade de página (*PageSpeed*) é um fator direto de ranqueamento.
