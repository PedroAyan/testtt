# Atlas mobile — 2026-10-29

Reformular toda a interface, preservando a SPEC §14. A correção posterior do responsável substitui o verde pela paleta da captura enviada. Somente as cores são referência; a imagem não entra no site.

## Plano antes de editar

Aplicação de bolso, estreita inclusive no computador. O mapa real é a imagem principal do início; as seis descobertas formam um passaporte. Coleção com atlas e fichas de destinos. Estudo em uma coluna: modelo, ficha curta e ações. Barra inferior rotulada em todas as larguras; durante a câmera, navegação no fluxo para liberar a cena.

Paleta amostrada com PNGJS na captura: canvas `#faf7fd`, branco `#ffffff`, lilás `#eeeafb`, destaque `#ded8f5`, pêssego `#f9ddd3`, menta `#d7eee1`, tinta `#39334f`, apoio `#655a73`. Títulos compactos com fonte do sistema e peso 700; texto ≥16 px. Sem gradientes, brilho ou animações contínuas. Geografia dos dados existentes Natural Earth.

```text
Início                 Mapa                  Ficha
marca / ajuda          título / ajuda        voltar / nome
pergunta curta         dois progressos       modelo e controles
mapa ilustrado         atlas e legenda       ficha curta ilustrada
Explorar / coleção     seis fichas           Ouvir / Saiba mais
seis descobertas       estados e atividades  países / atividade
ajuda / Organizador    navegação inferior    navegação inferior
```

| Before | After | Why |
| --- | --- | --- |
| Landing com duas colunas e chamada genérica | Aplicação estreita centrada no mapa | Preservar formato mobile e identidade da geografia |
| Chamadas repetidas e planeta em halo | Mapa, passaporte e fichas com papéis distintos | Hierarquia por conteúdo e composição |
| Sálvia em toda a interface | Cores da última captura com texto/foco escuros | Seguir a correção explícita e preservar contraste |
| Navegação muda conforme largura | Barra inferior consistente e rotulada | Familiaridade e alcance no celular |
| Viewport sem safe areas e chrome rosa | Insets e chrome coerente com o fundo | mobile-native sem desativar zoom |

Skills: emil-design-eng/mobile-native solicitadas; frontend-design/apple-design conforme AGENTS.md. Pressão em 100 ms, hover apenas para mouse, foco sem movimento, preferências reduzidas preservadas. Gesto existente da ficha mantido.

## Verificação inicial

SPEC, progresso, pendências, telas e estilos lidos. Referência local e captura nova inspecionadas. Interface anterior observada no navegador a partir do build existente. HTTPS local interrompido por certificado; revisão usa prévia HTTP de QA, sem mudar HTTPS de desenvolvimento nem aceitar avisos de certificado.

Câmera/QR/AR, safe areas, teclado de celular, áudio e avaliação com crianças continuam sem validação física. Resultados finais serão registrados abaixo.
