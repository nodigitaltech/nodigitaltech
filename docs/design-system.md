# Design System - TechXen (Landing Page de Tecnologia)

Este documento contém a extração detalhada do Design System baseado na interface fornecida, com foco em UI/UX para a construção de uma landing page moderna e de alta conversão.

## 1. Cores (Color Palette)

O tema principal é **Dark Mode**, transmitindo uma sensação tecnológica, premium e futurista. As cores de destaque (accent) contrastam fortemente com o fundo escuro para guiar o olhar do usuário e incentivar cliques (CTAs).

### Fundo (Backgrounds)
- **Background Principal:** `#0A0B1A` (Azul marinho quase preto) - Usado no fundo geral da página.
- **Background Secundário (Cards/Seções):** `#141526` (Azul escuro levemente mais claro) - Usado em cards, depoimentos, e fundos de formulários/inputs.
- **Glow/Efeitos de Luz:** Tons de roxo (`#7A22A5`) e azul (`#2142B2`) aplicados como gradientes radiais suaves e desfocados ao fundo para dar profundidade.

### Cores de Destaque (Accents)
- **Primary Accent (Verde Neon/Lime):** `#B6F516` (Hex aproximado) - Cor principal da marca. Usada em botões principais (CTAs), ícones de destaque, textos de "eyebrow" (pequenos títulos acima dos h1/h2), links e tags ativas.
- **Hover do Accent:** `#95D110` (Levemente mais escuro) - Sugerido para interações com botões.

### Tipografia (Text Colors)
- **Texto Principal (Títulos/Headings):** `#FFFFFF` (Branco puro) - Usado em H1, H2, H3 para máximo contraste.
- **Texto Secundário (Parágrafos/Body):** `#9CA3AF` ou `#A0A3B1` (Cinza claro/azulado) - Usado em descrições textuais longas para conforto visual, evitando o contraste extremo do branco sobre o preto.
- **Texto em Botões Primários:** `#05050A` (Quase preto) - Usado sobre o fundo verde neon para legibilidade.

### Bordas (Borders)
- **Subtle Border:** `#2A2B3F` - Bordas discretas em volta de cards, abas e separadores.

---

## 2. Tipografia (Typography)

A fonte utilizada possui um estilo limpo, geométrico, sem serifa (Sans-Serif), típica de empresas SaaS e tecnologia moderna.

- **Fonte Primária Sugerida:** `Inter`, `Plus Jakarta Sans` ou `Outfit`.
- **Pesos (Weights):**
  - **Regular (400):** Para textos de parágrafos.
  - **Medium (500) / SemiBold (600):** Para links, botões, tags e subtítulos.
  - **Bold (700) / ExtraBold (800):** Para grandes títulos (Headings).

### Escala Tipográfica Sugerida (Desktop)
- **H1 (Hero):** ~56px a 64px, Bold, Line-height apertado (1.1 ou 1.2).
- **H2 (Seções):** ~40px a 48px, Bold.
- **H3 (Cards):** ~20px a 24px, SemiBold.
- **Eyebrow (Acima dos títulos):** ~14px, Medium, Verde Neon. Muitas vezes acompanhado de um ícone ou marcação visual.
- **Body Text (Parágrafos):** 16px, Regular, Line-height confortável (1.6).
- **Small Text (Tags/Data):** 12px a 14px, Medium.

---

## 3. Estilo de Botões (Buttons & Tags)

Os botões são desenhados para chamar a atenção imediatamente (Alto Contraste).

- **Primary Button:** 
  - Fundo: Verde Neon (`#B6F516`).
  - Texto: Preto.
  - Border-radius: Totalmente arredondado (Pill shape / `border-radius: 9999px`).
  - Padding: Espaçoso (ex: `12px 24px`).
  - Ícone: Uso frequente de uma seta diagonal (↗) para indicar ação/movimento.
  
- **Tags / Badges (ex: "Software Development"):**
  - Fundo: Transparente ou levemente translúcido (`rgba(255,255,255, 0.05)`).
  - Borda: `1px solid rgba(255, 255, 255, 0.15)`.
  - Texto: Branco (quando inativa) e Verde Neon com fundo preenchido (quando ativa).
  - Border-radius: Pill shape (`9999px`).

---

## 4. Estilo de Imagens (Imagery)

A direção de arte foca no futurismo e em ambientes corporativos de ponta.

- **Imagens "Hero" e 3D:** Ilustrações e renderizações 3D de alta qualidade, com iluminação de estúdio, hologramas, globos conectados, braços robóticos. Texturas metálicas, vidro e luzes de neon.
- **Fotografia Corporativa:** Pessoas em ambientes de trabalho (escritórios modernos, reuniões). O tratamento da imagem possui tons levemente dessaturados e com controle de sombras fortes para não competir com a paleta dark do site.
- **Recortes e Composições:** Imagens em formato de grade (grid) ou composições sobrepostas (uma imagem maior de fundo e uma menor em destaque no canto inferior). Tags flutuantes verdes sobre as fotos (ex: "25 Years Of Experience") agregam autoridade.

---

## 5. UI Elements & Layout (Componentes e Estrutura)

### Cards
- **Design Glassmorphism sutil:** Fundo sólido `#141526` com bordas suaves de 1px.
- **Border-radius:** Arredondamento médio/suave (aprox. `12px` ou `16px`).
- **Ícones dentro dos cards:** Círculos ou quadrados com fundo escuro e ícones vetorizados na cor verde neon.

### Navegação (Header)
- Fundo transparente ou translúcido com *backdrop-blur* para aderir ao topo quando a página rolar.
- Logotipo estilizado à esquerda, links de navegação (`Home`, `About`, `Services`, etc.) centralizados ou à direita, com efeito de hover.
- Botão "Get A Quote" em destaque à direita.

### Progress Bars (Barras de Progresso)
- Usadas na seção "About Us" para mostrar proficiência (ex: IT Consulting 80%).
- Trilha: Cinza bem escuro (`#2A2B3F`).
- Preenchimento: Verde Neon.
- Valores percentuais alinhados à direita acima da barra.

### Depoimentos (Testimonials)
- Ícone de "Quote" (Citação) destacado no canto superior esquerdo do card de depoimento, em um pequeno círculo verde neon.
- Estrelas de avaliação (5 estrelas).

### Seção de Equipe (Team)
- Imagens de retrato (portraits) padronizadas em tamanho vertical.
- Sobreposição de redes sociais (ícones circulares) que provavelmente aparecem num efeito de *hover* quando o mouse passa sobre a foto.

---

## 6. UX / Micro-Interações Esperadas
Para replicar o nível "Premium", as seguintes animações são recomendadas:
- **Hover States:** Mudança de opacidade e cores em links; botões primários devem ter leve *scale* (aumentar tamanho suavemente) ou deslocamento da sombra.
- **Scroll Animations:** Os elementos devem entrar na tela suavemente (`fade-in-up`) enquanto o usuário desce a página.
- **Parallax Sutil:** Elementos de fundo, como as esferas de luz e formas abstratas, podem se mover levemente de acordo com a posição do mouse ou do scroll.
