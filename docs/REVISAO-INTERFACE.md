# Revisão da interface — 2026-10-29

## Direção e escopo

AGENTS.md, SPEC.md, PROGRESSO.md e PENDENCIAS.md lidos integralmente antes da edição. Referência visual inspecionada apenas no disco. Skills frontend-design, emil-design-eng e apple-design lidas e aplicadas. As skills de Three.js não se aplicam: não há alteração de modelos, dados espaciais, renderização ou orçamento 3D.

O projeto já tem uma direção infantil adequada: arte SVG autoral, cores pastel, fichas curtas, mapa com lista alternativa e exploração por model-viewer. Preservar esses elementos e os cinco fluxos da SPEC §14. A referência orienta a acolhida, o arredondamento e a hierarquia; seus desenhos, marca e arquivo não entram no app.

## Plano visual

Paleta: fundo névoa `#faf7fd`, tinta ameixa `#39334f`, lavanda `#ded8f5`, pêssego `#f9ddd3`, menta `#d7eee1`, rosa `#ffe5f0`. Tinta secundária `#655a73` e foco `#62549b` preservados. Pastéis como superfícies, texto escuro e bordas de controles contrastantes. Não usar as cores dos continentes como texto.

Tipografia: Trebuchet MS, com Segoe UI/Arial como alternativas locais. Corpo e controles a partir de 1rem; títulos arredondados pela fonte existente, em sentence case, com escala fluida e linhas curtas. Sem novas fontes ou dependências.

Layout: início com mensagem de boas-vindas, companheiros de viagem e uma ação principal. Organizador em área própria. Nas telas internas, título direto, contexto curto e ações próximas do conteúdo. No celular, uma coluna para fichas/editor e duas colunas confortáveis para a coleção. O mapa continua com rolagem horizontal e alternativa por lista. A câmera mantém sua área própria com status, resumo e saídas distribuídos verticalmente.

```text
Início                      Ficha                      Câmera
marca + navegação           voltar + título + RA       voltar + continente
acolhida | ilustração       modelo | ficha curta       status
explorar + coleção          países + atividade         área de reconhecimento
passos / Organizador        informações expansíveis    resumo + saída
                                                       controles + ajuda
```

A personalidade vem dos companheiros de viagem e do mapa real do projeto. Evitar adicionar decoração repetitiva ou transformar cada parágrafo em um cartão. Animação apenas como resposta ao toque e confirmação; sem movimento contínuo. Revisado contra o pedido antes de implementar.

## Revisão do código

| Before | After | Why |
| --- | --- | --- |
| Textos de apoio entre 0,5rem e 0,9rem | Corpo, rótulos e apoio a partir de 1rem | Leitura infantil e zoom no celular |
| Navegação em coluna e títulos genéricos longos | Navegação agrupada e títulos que identificam a tela | Localização e ação mais claras |
| Vários ajustes CSS sobrepostos nos mesmos componentes | Regras organizadas por base, componentes e acolhida | Consistência sem multiplicar exceções |
| Hover move botões em qualquer dispositivo | Feedback breve ao pressionar, hover só com ponteiro preciso | Evitar estados presos no toque |
| Resumo e saídas RA em coordenadas absolutas | Camadas de interface distribuídas em coluna | Evitar colisão com texto ampliado |
| Erro 3D sem ação local de recuperação | Estado de erro e botão de recarregar o modelo | Próximo passo junto ao problema |

## Verificação

Implementação e comandos ainda em andamento. Câmera/QR/RA e revisão visual em aparelhos físicos NÃO VALIDADOS. Resultados finais serão registrados nesta seção e em PROGRESSO.md/PENDENCIAS.md.
