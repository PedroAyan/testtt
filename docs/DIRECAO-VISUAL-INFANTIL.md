# Reformulação visual infantil — 2026-10-29

## Plano antes da implementação

Referência `referencia-visual.png` examinada localmente. AGENTS, SPEC (incluindo §14), PROGRESSO e PENDENCIAS lidos. Skills frontend-design, apple-design e emil-design-eng lidas nos caminhos instalados. Nenhuma mudança em modelos, dados 3D ou desempenho: as skills de Three.js não se aplicam.

Tokens principais: branco papel #FFFFFF, lavanda personagem #B5ADEB, pêssego #F5C5B8, menta #D9EFE5, tinta #302C43, roxo de ação #63549F. Tons claros derivados mantêm o texto escuro; rosa permanece como superfície da identidade existente. A cor mais saturada concentra-se na acolhida. Trebuchet MS para títulos e corpo: fonte local, sem nova transferência, formas abertas e arredondadas adequadas ao material infantil; hierarquia por tamanho, peso e entrelinha. Corpo >= 1rem e textos sem caixa alta decorativa.

Composição: um grande planeta-guia na acolhida, integrado ao painel lavanda, em vez de uma imagem em cartão ao lado de outros cartões. No celular a ilustração antecede o convite e a ação Explorar. Navegação com ícone e nome, próxima do polegar; conteúdo alinhado à esquerda, ações centrais. Orientação com imagens junto de cada etapa real. Coleção com silhuetas sobre campos orgânicos e estados escritos. Bloqueio com uma tarefa clara e diagrama da folha; ficha descoberta mantém modelo, ficha curta e Saiba mais.

```text
Celular / início       Orientação              Coleção
marca                  voltar + título         título + guia
[planeta-guia]         imagem / escolha        descobertas | atividades
convite curto          imagem / folha          mapa real + legenda
Explorar               imagem / câmera         seis destinos ilustrados
Minha coleção          ano + Explorar mapa     navegação com nomes
entrada Organizador
nav: início mapa ajustes
```

Revisão do plano contra o pedido: rejeitada a mera troca de cores e repetição de cartões iguais. A composição memorável será o planeta que ocupa a abertura; as telas internas terão superfícies mais calmas e arte que explica a tarefa. Não copiar o personagem, tipografia serifada, marca ou desenhos da referência. Seu texto branco sobre lavanda também não será reproduzido: usar tinta escura com contraste calculado. Sem animação de entrada repetitiva, flutuação contínua ou biblioteca adicional de gestos. O atalho de gesto existente e todos os botões permanentes continuam.

## Revisão inicial do código

| Before | After | Why |
| --- | --- | --- |
| Texto primeiro no celular, arte em bloco separado abaixo | Planeta-guia integrado à abertura e convite curto | Personalidade e compreensão visual antes da leitura |
| Ilustração da folha separada das três instruções | Uma pequena cena junto de cada etapa | Relacionar desenho e ação para crianças em alfabetização |
| Navegação textual ocupa duas linhas no topo | Navegação móvel inferior com ícones e nomes | Mais espaço para o conteúdo e ações ao alcance do polegar |
| Silhuetas em cartões brancos uniformes | Campos orgânicos, nome destacado e estado por texto/símbolo | Facilitar reconhecimento sem depender só de cor |
| Ações principais e secundárias com peso próximo | Botão escuro para ação principal e superfícies brancas para alternativas | Próximo passo mais evidente |

## Revisão visual: bloqueio observado antes das edições

Não foi possível capturar o antes no navegador. `cua.getState()` informou `The browser access host is unavailable`, sem navegadores disponíveis. A tentativa nativa pelo Chrome aberto foi encerrada por Computer Use: `could not determine the current browser URL on Windows with enough confidence to enforce policy`. Nenhuma outra automação de navegador foi usada para contornar esse bloqueio. Inspeção da referência local e leitura do código não equivalem a comparar telas renderizadas. Revisão antes/depois, texto ampliado e teclado no navegador ficam pendentes, assim como câmera/AR física e avaliação com crianças.
