# AGENTS.md — Exploradores do Mundo

Projeto universitário: jogo educativo em realidade aumentada (WebAR) sobre os 6 continentes (modelo com América unificada).
Especificação completa em `SPEC.md` (a navegação oficial está na §14, transcrita dos fluxogramas em `docs/Fluxogramas_Exploradores_do_Mundo.pdf`). Leia-a antes de qualquer tarefa.

## Regras inegociáveis

1. **AR real.** Nada de simular reconhecimento de marcador nem sobrepor imagem fixa à câmera. O modelo 3D deve acompanhar posição e orientação do marcador físico.
2. **Desbloqueio só por reconhecimento.** Abrir uma URL nunca desbloqueia um continente. Só dois eventos chamam `unlock()`: leitura válida do QR Code do continente selecionado dentro do app, ou marcador AR do continente reconhecido de forma estável.
3. **Sem dados inventados.** Dados geográficos e estatísticos precisam de fonte registrada em `SOURCES.md`. Se não tiver certeza ou não puder consultar a fonte, marque `"verificar": true` no JSON e liste em `PENDENCIAS.md`. Nunca preencha com confiança falsa.
4. **Sem serviços pagos, sem GPS, sem cadastro, sem backend.** Sem batalhas, comércio ou multiplayer.
5. **Licenças.** Só usar dados, imagens e modelos com licença compatível. Registrar cada um em `SOURCES.md`.
6. **Honestidade nos relatórios.** Nunca declarar "testado" o que não foi executado. Câmera e AR só são validáveis em celular físico: documente o roteiro em `docs/TESTE-NO-CELULAR.md` e marque como "não validado" até alguém executar.
7. **Dependências enxutas.** Fixe versões exatas das bibliotecas de AR e hospede-as localmente (`public/vendor/`), sem depender de CDN em produção.

## Comandos esperados

```bash
npm install
npm run dev          # desenvolvimento (HTTPS local, ver SPEC §10)
npm run build        # deve passar sem erros
npm run typecheck    # tsc --noEmit sem erros
npm test             # vitest
npm run build:models # gera GLB a partir do GeoJSON
npm run build:markers# gera QR Codes e marcadores imprimíveis
```

## Ambiente e fluxo de trabalho

- O desenvolvedor usa **Windows (PowerShell)**. Scripts do projeto devem ser em **Node.js** multiplataforma (use `path.join`, sem comandos bash, sem `rm -rf`, sem `&&` obrigatório em scripts do `package.json` — prefira pacotes como `cross-env`, se necessário).
- Se o sandbox bloquear a rede (download do Natural Earth, `npm install`), peça permissão. Se não for concedida, escreva em `PENDENCIAS.md` o link exato do arquivo e a pasta de destino para o desenvolvedor baixar manualmente, e continue com o que for possível.
- A execução pode ser interrompida pelo limite de uso. Por isso: **faça `git commit` ao fim de cada etapa e de cada marco relevante** (mensagem clara) e mantenha `PROGRESSO.md` atualizado com: etapa atual, o que está concluído, o que falta e o próximo passo exato. Ao retomar, leia `PROGRESSO.md` e `PENDENCIAS.md` antes de qualquer ação.

## Estilo de código

- TypeScript estrito (`strict: true`), sem `any` injustificado.
- Componentes pequenos; lógica de domínio fora dos componentes (`src/services`, `src/hooks`).
- Comentários só onde o porquê não é óbvio.
- Textos da interface em português do Brasil.

## Alterações de interface e acessibilidade infantil

- Em tarefas de interface, leia e aplique as skills instaladas `frontend-design`, `apple-design` e `emil-design-eng` quando pertinentes. Use `threejs-assets`, `threejs-spatial-data` e `threejs-performance` somente para mudanças relacionadas a modelos, dados 3D ou desempenho. As skills não autorizam alterar os fluxos e as regras da `SPEC.md`.
- Examine as telas existentes e a referência visual indicada antes de editar. Defina uma direção coerente com o pedido e preserve o que já atende bem ao projeto. Em reformulações visuais, trabalhe composição, hierarquia e ilustrações, além de cores e espaçamentos; em correções pontuais, mantenha o escopo pequeno.
- Priorize crianças do ensino fundamental, inclusive em alfabetização e com diferentes necessidades de acessibilidade: frases curtas, palavras familiares, instruções por etapa, ações com rótulos claros e ilustrações que ajudem a entender. Siga os critérios da `SPEC.md` §7.
- Priorize o celular: texto base ≥ 16 px, alvos de toque ≥ 44 px, contraste WCAG AA, foco visível, texto ampliável e respeito a `prefers-reduced-motion`. Não dependa somente de cor, ícone, áudio ou gesto para transmitir informação ou permitir uma ação.
- Mantenha carregamentos, erros, bloqueios e confirmações compreensíveis, com uma indicação clara do próximo passo. Detalhes técnicos de implementação ficam fora do percurso infantil; podem aparecer no Organizador quando necessários à edição/publicação.
- Quando houver ferramenta de navegador disponível e autorizada, revise as telas alteradas em larguras pequenas e desktop, incluindo texto ampliado e navegação por teclado. Compare antes e depois quando possível e corrija os problemas encontrados antes de encerrar.
- Se a revisão visual estiver bloqueada, continue o trabalho autorizado, registre o motivo e os casos pendentes em `PROGRESSO.md` e `PENDENCIAS.md`. Build, testes automatizados e cálculo de contraste não equivalem a revisão visual, uso por crianças ou teste físico de câmera/AR.
- Ao relatar a alteração, descreva decisões concretas orientadas pelas skills e o que foi realmente conferido. Apenas dizer que uma skill foi lida não comprova sua aplicação. Não declare validação com crianças ou aparelhos físicos sem execução e registro.

## Ao terminar qualquer tarefa

Reporte em três blocos: **Feito e verificado** (com o comando executado), **Feito mas não verificado** (e por quê), **Pendente**.
