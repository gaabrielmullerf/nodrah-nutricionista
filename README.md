# Helena Vasconcelos · Nutrição Integrativa

Landing page conceitual para o portfólio Nodrah. Desenvolvida com HTML, CSS e JavaScript puro, sem instalação, build ou dependências JavaScript.

## Executar

Abra esta pasta no VS Code, clique com o botão direito em `index.html` e selecione **Open with Live Server**. Também funciona abrindo `index.html` diretamente no navegador. Alternativa: execute `python3 -m http.server 8080` nesta pasta e acesse `http://localhost:8080`.

## Personalizar

- `js/config.js`: marca, cidade, endereço, horários, WhatsApp e Instagram. Não há número fictício configurado. O WhatsApp aceita código do país, DDD e número real (10 a 15 dígitos). Sem configuração, os CTAs abrem um modal explicitamente demonstrativo.
- `index.html`: textos institucionais, nome da profissional no conteúdo, credenciais verificadas, especialidades e SEO. A configuração centraliza os dados indicados por `data-config`; textos narrativos, título e metadados precisam de revisão editorial quando trocar a identidade.
- `css/style.css`: paleta, tipografia, seções e componentes.
- `css/responsive.css`: adaptações e preferências de movimento reduzido.
- `assets/images/`: retrato e composição de alimentação gerados por IA. Detalhes e prompts em `PROMPTS_IMAGENS.md`.
- `assets/icons/monogram.svg`: favicon vetorial local.

Para colocar em produção com uma profissional real, substitua o conteúdo ilustrativo por informações verificadas, configure os contatos e substitua os cards por depoimentos autorizados. O endereço e os horários estão explicitamente pendentes. O mapa é uma indicação demonstrativa, sem estabelecimento fictício. Configure URL canônica e URL absoluta de `og:image` após definir o domínio. Revise os avisos de demonstração somente depois de substituir a identidade fictícia.

## Design e conteúdo

12 seções: cabeçalho, abertura, conexão, diferenciais, especialidades, processo, acompanhamento, experiências ilustrativas, apresentação, localização, convite final e rodapé. Paleta off-white, bege e marrom; Cormorant Garamond e Manrope. As fontes usam Google Fonts, com fontes locais de sistema como fallback. Imagens e código estão locais.

A referência https://patriciadavidson.com.br/lp/ foi consultada em sua versão textual para entender a progressão comercial. Não foi possível verificar visualmente o layout ou suas interações. Identidade, composição e textos deste projeto são originais; não foram reutilizadas fotos ou alegações da clínica.

Helena é uma personagem fictícia. Não foram inventados CRN, formação, certificações, resultados, avaliações, pacientes ou endereço. Os cards apresentam desejos ilustrativos, claramente identificados como não sendo depoimentos.

## Acessibilidade e desempenho

HTML semântico, um H1, links de salto, foco visível, menu com `aria-expanded`, fechamento por Escape, modal nativo com gerenciamento de foco, links externos com `noopener`, imagens com dimensões explícitas, carregamento prioritário do hero e lazy loading abaixo da dobra. Animações por IntersectionObserver e respeito a `prefers-reduced-motion`. Sem bibliotecas externas de interação. Imagens JPEG otimizadas com ferramenta nativa do macOS; podem ser convertidas para WebP/AVIF futuramente.

## Verificação realizada

- Chrome headless: 320, 375, 390, 768, 1024, 1440 e 1920 px; nenhuma rolagem horizontal em todas as larguras.
- Menu mobile: abertura e fechamento após navegação aprovados.
- Agendamento sem número: modal abre e fecha corretamente.
- Carregamento das imagens e aplicação da configuração aprovados.
- Captura desktop em 1440 px revisada visualmente.
- Referências locais e âncoras verificadas por script Python.

Não foi feita auditoria Lighthouse, medição de Core Web Vitals em hospedagem nem validação com leitores de tela. O projeto é compatível com Live Server e está preparado para publicação como site estático no GitHub Pages. O estado da publicação pode ser consultado em Settings → Pages no repositório.

## Compartilhar com o sócio pelo GitHub Pages

Repositório: https://github.com/gaabrielmullerf/nodrah-nutricionista

Em Settings → Pages, selecione Deploy from a branch, branch main, pasta / (root) e Save. Após a conclusão, o endereço esperado é https://gaabrielmullerf.github.io/nodrah-nutricionista/. Compartilhe esse endereço para que qualquer pessoa veja no navegador, sem precisar de conta. O endereço só funciona após ativar o Pages e concluir a publicação.
