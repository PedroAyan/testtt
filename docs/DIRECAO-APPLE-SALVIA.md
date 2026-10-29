# Direção Apple com sálvia — 2026-10-29

Pedido: aplicar `apple-design` como direção principal, usar a paleta da imagem enviada e publicar no GitHub. A nova referência de cor tem prioridade sobre a paleta anterior da SPEC §7; os fluxos da §14 e as regras de descoberta permanecem.

## Plano antes da implementação

Referência `C:/Users/ayan-/Desktop/Sem título.png` inspecionada. Amostragem dos pixels com PNGJS: fundo `#eef3e9` (26 499 pixels), suporte `#e0e9d8` (929), neutro `#e0e5d9` (387), ícone `#789071` e texto `#344b46`. A imagem não será incorporada ao site. Tons claros serão usados em superfícies; texto secundário e foco terão derivados mais escuros para contraste AA.

Base: branco `#ffffff`, canvas `#f8faf6`, sálvia `#eef3e9`, suporte `#e0e9d8`, tinta `#344b46`, ação verde `#4d6947`. Fonte do sistema (`-apple-system`, BlinkMacSystemFont, Segoe UI, system-ui). Títulos com peso 650–700, tracking negativo proporcional ao tamanho e entrelinha curta; texto ≥ 16 px, entrelinha confortável. Nenhuma fonte Apple redistribuída.

Composição: acolhida editorial com título amplo, uma ação principal e planeta-guia em uma área própria, sem bloco lavanda nem bordas orgânicas. Faixa de missão inspirada nas cores da referência liga ao mapa; progresso continua explícito. Na coleção, mapa primeiro e destinos como linhas de uma lista agrupada com silhueta, nome, estado e seta. Orientação mantém desenhos que explicam cada etapa. Fichas e Organizador compartilham o sistema, com conteúdo curto e Saiba mais preservados.

```text
Início / celular           Mapa                     Ficha
marca                      voltar / título          voltar / nome
título e convite           2 progressos separados   modelo com controles
Explorar | Minha coleção   mapa e legenda           ilustração / ficha curta
planeta sálvia             lista de 6 destinos      Ouvir / Saiba mais
missão / progresso         Como jogar               países / atividade
navegação flutuante        navegação flutuante      navegação flutuante
```

Apple: material translúcido apenas na navegação; superfícies de leitura sólidas; hierarquia por proximidade/tipografia, não cartões coloridos em tudo. Pressão responde imediatamente, ações confirmam no click; nenhum bloqueio de entrada ou atraso artificial. O gesto opcional da ficha deve acompanhar o dedo com Pointer Events/capture e voltar por mola sem overshoot, carregando a velocidade atual; o botão de países permanece. Movimento, transparência reduzida e contraste reforçado têm alternativas.

## Revisão do plano contra o pedido

| Before | After | Why |
| --- | --- | --- |
| Trebuchet, lavanda/pêssego e formas orgânicas dominam | Fonte do sistema, sálvia amostrada e geometria regular | Direção Apple visível no conjunto, além de detalhes |
| Painel infantil pesado e destinos como cartões com decoração | Acolhida com respiro, faixa de missão e lista agrupada | Priorizar conteúdo e próxima ação sem perder as ilustrações úteis |
| Gesto da alça só reage no touchend | Rastreamento 1:1, captura de ponteiro e retorno por mola | apple-design: manipulação direta, resposta contínua e interrupção |
| Navegação móvel com borda forte e fundo quase opaco | Material flutuante com estado atual legível | Profundidade funcional; opção sólida nas preferências de acessibilidade |

## Limite de revisão visual observado antes das edições

`cua.getState()` retornou `The browser access host is unavailable`. A seleção do Chrome nativo foi interrompida porque a ferramenta não conseguiu identificar a URL atual com segurança. Nenhuma automação alternativa será usada para contornar esse bloqueio. A comparação das telas renderizadas, 320/360/390 px, desktop, 200%, teclado e gesto real continua pendente. Leitura de CSS, cálculos de contraste e testes de domínio não equivalem à revisão visual. Câmera/AR física e avaliação com crianças continuam NÃO VALIDADAS.

## Estado

Plano registrado. Próximo passo: implementar o sistema visual e o gesto, executar typecheck/testes/build/contraste, revisar o diff e publicar os commits autorizados.
