# Site Portfólio — Vinícius Galvani

Conheça um pouco mais do meu trabalho como desenvolvedor Front-End, e um pouco da minha trajetória no design gráfico que me fez chegar até aqui.

Hoje o portfólio também mostra meus projetos com IA, agentes e automação (n8n, Claude Code, MCP), sites com motion design (WebRápido) e meus projetos acadêmicos em Java/Spring Boot e React Native.

## Estrutura

| Arquivo | O que faz |
| --- | --- |
| `index.html` | Conteúdo: hero, sobre, skills, projetos e contato |
| `style.css` | Estilos, dark mode, responsivo e camada de motion design |
| `main.js` | Menu mobile, navegação, dark mode, distorção do grid |
| `motion.js` | Animações: intro, rotator, progresso de scroll, cascatas, tilt 3D |

## Motion design

- Intro em cortina (uma vez por sessão)
- Título do hero revelado em wipe e rotator de palavras
- Orbs flutuantes, brilho que segue o cursor e parallax do número decorativo
- Barra de progresso de scroll
- Entradas em cascata (cards, chips de skills) e títulos com linha que se desenha
- Tilt 3D no card de perfil e nos cards de projeto
- Respeita `prefers-reduced-motion` e não aplica tilt em telas touch

Tudo em CSS e JavaScript puro, sem bibliotecas.

## Como rodar

Abra o `index.html` no navegador (ou use o Live Server do VS Code).
