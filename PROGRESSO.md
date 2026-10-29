# Progresso — Exploradores do Mundo

## Etapa atual — Apple e paleta sálvia (2026-10-29)
- Pedido atual: reformular a aparência com `apple-design`, usar as cores da imagem enviada e enviar ao GitHub ao concluir. Plano, amostragem e revisão contra o pedido em `docs/DIRECAO-APPLE-SALVIA.md`.
- SPEC/AGENTS/PROGRESSO/PENDENCIAS e skills lidos; interface existente e referência examinadas. Verde de fundo `#eef3e9`, suporte `#e0e9d8` e tinta `#344b46` extraídos da imagem.
- Revisão visual bloqueada nesta sessão: host de navegador indisponível; Computer Use nativo interrompido por não conseguir identificar a URL do Chrome com segurança. Sem contorno por outra automação. Continuar implementação autorizada e separar código de validação visual/física.
- Implementação concluída: sistema sálvia e fonte do sistema; nova composição inicial/faixa de missão; materiais da navegação; destinos em lista agrupada; arte recolorida; arraste contínuo com Pointer Events/capture, resistência, projeção e mola crítica; botão de países preservado. Cena AR recebeu somente duas referências de token CSS; lógica AR e dados/persistência não mudaram.
- `npm.cmd run typecheck`, `npm.cmd test` (15/15), `npm.cmd run build`, `node scripts/check-ui-contrast.mjs` (33/33), verificação dos tokens e `git diff --check` passaram. Arte isolada do planeta e folha rasterizada e examinada. Detalhes em `docs/DIRECAO-APPLE-SALVIA.md`.
- Próximo passo exato: commitar a implementação, enviar com `git push origin main`, aguardar o workflow e conferir paleta/arte/CSS/chunks públicos atuais. Revisão visual, gesto real, câmera/AR e avaliação com crianças continuam pendentes.

## Reformulação ilustrada publicada — 2026-10-29
- Pedido de envio ao repositório atendido: `git push origin main` enviou os três commits pendentes, até `d6f8a23c1240c002ace57dd88100350427dbb350`, para https://github.com/PedroAyan/testtt . SHA remoto conferido com `git ls-remote`.
- Workflow https://github.com/PedroAyan/testtt/actions/runs/40953119140 terminou com `success` nos jobs build e deploy. Executou typecheck, testes, geração dos marcadores e build. Site: https://pedroayan.github.io/testtt/ .
- `node scripts/check-published.mjs`: exit 0, página/JS/Organizador e recursos dos seis continentes disponíveis; GLBs públicos idênticos aos locais. `node artifacts/revisao-visual/check-published-redesign.mjs`: exit 0; planeta, folha, seis paisagens e tokens com SHA-256 igual ao local; Home e CSS atuais contêm a nova composição. Caminhos dos chunks resolvidos a partir da entrada pública atual.
- Nenhuma revisão visual em navegador ou validação física foi realizada nesta publicação. Próximo passo exato: executar a seção de reformulação ilustrada em `docs/TESTE-NO-CELULAR.md`; câmera/AR continuam NÃO VALIDADAS fisicamente.
- Registro posterior somente documental, com `[skip ci]`, sem alteração do app publicado. Referência local e `windbg.appinstaller` não foram enviados.

## Reformulação visual com as três skills — concluída localmente (2026-10-29)
- Referência inspecionada, especificação/fluxos e skills lidos. Plano de composição, tokens, revisão prévia e bloqueio de navegador registrados em `docs/DIRECAO-VISUAL-INFANTIL.md`.
- Implementados: planeta-guia, acolhida integrada, navegação móvel com ícone/nome, orientação com três cenas, coleção com campos orgânicos, folha ilustrada/legendada e seis paisagens novas. Arte autoral MIT e SVGs preservados pelo gerador de dados. Sem novas dependências.
- `npm.cmd run typecheck`, `npm.cmd test` (11/11), `npm.cmd run build` e `node scripts/check-ui-contrast.mjs` (35/35) passaram. `build:data` conferido quanto à preservação dos SVGs; dados finais mantidos byte a byte. Arte isolada rasterizada e examinada. Documentação e limites em `docs/DIRECAO-VISUAL-INFANTIL.md`.
- Próximo passo exato: executar o roteiro novo de `docs/TESTE-NO-CELULAR.md` em navegador disponível e em aparelhos físicos; registrar resultados de layout, 200%, teclado/leitor de tela e AR. Não houve publicação nesta tarefa. AGENTS/SPEC, fluxos, domínio, dados, modelos e cena AR preservados.
- Comparação antes/depois no navegador bloqueada: host indisponível; Computer Use encerrou a alternativa Chrome por não identificar a URL com segurança. Não contornar o bloqueio. Validação física continua pendente.

## Orientações permanentes de interface infantil — 2026-10-29
- Seção acrescentada ao `AGENTS.md` da raiz, entre estilo de código e relatório final, para orientar alterações de interface em todo o projeto: skills pertinentes, escopo proporcional, decisões concretas e revisão visual quando disponível/autorizada.
- `SPEC.md` §1 e §7 complementadas com compreensão infantil, instruções por etapa, ícones com rótulos, acessibilidade no celular/texto ampliado, estados claros e separação do percurso infantil e dos detalhes do Organizador. Fluxos, desbloqueio, arquitetura e requisitos de AR preservados.
- Alteração somente documental; não constitui nova implementação nem validação da interface. Verificação desta etapa: revisão do diff e `git diff --check`; testes do app não foram repetidos porque não houve mudança de código.
- Próximo passo exato: aplicar os novos critérios na próxima revisão visual e executar os percursos manuais de `docs/TESTE-NO-CELULAR.md`, registrando separadamente navegador, aparelho físico e avaliação de compreensão com crianças quando realizada.

## Etapa atual — refinamento infantil e mobile concluído localmente (2026-10-29)
- Leitura integral dos quatro documentos obrigatórios e inspeção da referência concluídas antes de editar o app. Telas, componentes, estilos, testes e isolamento da cena AR examinados.
- Direção e achados registrados em docs/REVISAO-INTERFACE.md; preservar arte autoral, dados, fluxos, sessão ADM e persistência. Skills frontend-design, emil-design-eng e apple-design aplicadas; nenhuma mudança 3D necessária.
- Concluídos: início e orientação mais claros, navegação agrupada, coleção com rótulos acessíveis, texto de apoio ≥ 16 px, ações ≥ 44 px, atividades em coluna no celular, bordas contrastantes, foco e movimento reduzido. Arte existente reutilizada; referência não incorporada.
- Fichas preservam conteúdo curto e Saiba mais. Visualizador com recuperação de erro e controles após carga. RA com status/resumo/saídas distribuídos em coluna, mantendo iframe/ponte/teardown. Organizador com ações por continente, importação/exportação de rascunho e foco na revisão; retorno da visualização pública funciona também na ficha descoberta.
- `npm.cmd run typecheck`, `npm.cmd test` (11/11) e `npm.cmd run build`: exit 0. `node scripts/check-ui-contrast.mjs`: 29 pares principais aprovados (texto ≥ 4,67:1, foco avaliado ≥ 5,46:1, bordas ≥ 3,26:1). `git diff --check` sem erros. Relação completa de arquivos em docs/REVISAO-INTERFACE.md.
- Revisão visual no navegador NÃO EXECUTADA: host de navegador indisponível e Computer Use nativo recusou Edge/Chrome por falta de autorização nesta sessão. Câmera/QR/RA e revisão em aparelhos físicos NÃO VALIDADOS. Os testes automatizados não equivalem a essas validações.
- Próximo passo exato: executar as tabelas de docs/TESTE-NO-CELULAR.md em Android Chrome e iPhone Safari, incluindo o novo roteiro de refinamento, e registrar aparelho, navegador, responsável e resultado. Serviços, regras de desbloqueio, dados, modelos, sessão ADM, persistência, links de rota e dependências preservados.

## Visualização pública no Organizador — 2026-10-29
- Botão “Ver como público” adicionado ao lado de cada continente. Abre a ficha pública publicada, oculta os avisos/controles de ADM nessa tela e oferece retorno ao Organizador.
- `npm.cmd run typecheck` e `npm.cmd run build` passaram. Publicado no commit `52963fc`; workflow https://github.com/PedroAyan/testtt/actions/runs/40818399955 concluiu com sucesso. Chunks públicos do Organizador e da ficha conferidos. O conteúdo de rascunho ainda não publicado não é aplicado nesta visualização.
- Próximo passo exato: nenhum para esta alteração; teste visual manual permanece opcional.

## Sessão ADM — publicada e conferida (2026-10-29)
- O responsável pediu os seis continentes liberados no próprio app enquanto estiver logado como ADM, com a senha escolhida `camila`.
- Hash PBKDF2 atualizado pela GitHub API na variável `VITE_ORGANIZER_PASSWORD_HASH` (HTTP 204); a senha em texto não foi adicionada ao código.
- Login ADM ativa mapa/fichas/atividades normais com os seis continentes liberados. QR/AR/atividades/perfil/reset usam memória temporária, descartada ao sair; progresso regular não é alterado.
- `npm.cmd run typecheck` e `npm.cmd run build` passaram; seis conjuntos de dados/arquivos validados. `git diff --check` sem erros.
- Publicação principal: commit `4f450d5` no site; hash PBKDF2 comparado ao valor escolhido no bundle público, sem exibir senha ou hash. `node scripts/check-published.mjs` passou; Actions concluiu build/testes/deploy.
- O site usa o app normal durante a sessão ADM: seis continentes liberados; QR, marcador, atividades e perfil gravam apenas em memória. A sessão encerra e descarta os dados ao sair.
- Rótulo “Sair do ADM” publicado no commit `9055404dfb72128c6c9cdf37e8eb5f4c0e93cf89`; workflow https://github.com/PedroAyan/testtt/actions/runs/40817056904 concluiu `success`.
- `npm.cmd run typecheck` e `npm.cmd run build` passaram localmente; o workflow executou testes, build e deploy. `node scripts/check-published.mjs` e `node artifacts/auditoria/verify-admin-published.mjs` passaram após o deploy.
- Próximo passo exato: executar o roteiro docs/TESTE-NO-CELULAR.md em aparelhos físicos; câmera e RA permanecem NÃO VALIDADAS.

## Publicação concluída — 2026-10-29
- Repositório atualizado: https://github.com/PedroAyan/testtt , branch main. Os três commits da auditoria e do visual foram enviados por `git push origin main`.
- Site atualizado: https://pedroayan.github.io/testtt/ . Código publicado: `7a5b95a6f64b7198896013af33310441394a6ef7`.
- GitHub Actions: https://github.com/PedroAyan/testtt/actions/runs/40814989509 — build e deploy concluídos com `success`; executou npm ci, typecheck, testes, build:markers e build em Node 22.
- `node scripts/check-published.mjs`: exit 0; página/JS, Organizador com hash configurado, bibliotecas AR locais e GLB/QR/marcador/PDF dos seis continentes responderam HTTP 200; GLBs iguais aos locais.
- `node artifacts/auditoria/check-new-published.mjs`: exit 0; confirmou Home com ilustração nova, confirmação na ficha, resumo RA, fonte de Juba e CSS pastel. SVG novo e tokens públicos têm SHA-256 igual aos arquivos locais.
- O registro documental posterior usa `[skip ci]`, pois não altera o app nem exige novo deploy. A imagem de referência permanece local, fora dos commits e do site.
- Próximo passo exato: abrir o site atualizado em Android Chrome e iPhone Safari e executar docs/TESTE-NO-CELULAR.md com as folhas públicas. Câmera/RA, áudio, WebGL e revisão visual de interação continuam NÃO VALIDADOS fisicamente.

## Etapa atual — auditoria e revisão visual concluídas localmente (2026-10-29)
- AGENTS.md, SPEC.md, PROGRESSO.md e PENDENCIAS.md lidos antes de alterações.
- PDF local de cinco páginas renderizado e lido visualmente; cópias raiz/docs idênticas por SHA-256. Referência local `referencia-visual.png` inspecionada.
- Achados e reconciliação com a SPEC §14 em docs/AUDITORIA-FLUXOGRAMAS.md.
- Concluídos: correções de fluxo, tokens pastel, ilustração autoral, contraste e comandos essenciais. Tabela final de rastreabilidade em docs/AUDITORIA-FLUXOGRAMAS.md.
- Revisão de interface por Computer Use impedida: host de navegador e pipe nativo indisponíveis nesta sessão. Câmera/RA seguem NÃO VALIDADAS.

### Marco de implementação e verificações
- Correções de navegação implementadas: confirmação QR, resumo RA sobreposto, dica QR em erros de câmera, orientação em todas as entradas do mapa e atalho opcional para países com botão permanente.
- Tokens pastel, ilustração SVG autoral, foco de importação e cadeados aplicados. Juba confirmada na UNdata e registrada no pipeline.
- Última execução: `npm.cmd run typecheck` e `npm.cmd run build`, ambos exit 0; `npm.cmd test`, 11 testes em 2 arquivos, todos passaram. Uma regressão essencial de HTML foi acrescentada; não executa câmera/WebGL.
- Contrastes principais calculados: texto >= 5,45:1; foco 6,44:1 e borda de campo 3,98:1. Revisão de layout no navegador continua pendente.
- Documentação finalizada: auditoria de cada passo dos cinco fluxos, roteiro físico ampliado e pendências atualizadas. Nenhuma validação de câmera/RA foi declarada.
- Commits desta revisão: `0c99b76` (leitura/achados), `1d6ffcd` (implementação) e `7a5b95a` (auditoria final). Publicação concluída conforme o registro acima.
- Imagem local do responsável preservada como referência; não incorporada ao build nem adicionada ao commit por não ter licença de redistribuição informada.
- Próximo passo exato: executar `npm.cmd run dev`, configurar a URL HTTPS conforme README, gerar/imprimir as folhas para essa URL e cumprir docs/TESTE-NO-CELULAR.md separadamente em Android Chrome e iPhone Safari. Registrar aparelho, navegador, responsável e resultado de cada item. A revisão completa de layout, voz e Organizador também continua manual.

## Histórico anterior a esta revisão: seis etapas e publicação registrada
Os resultados abaixo são do registro anterior, não foram repetidos nesta sessão. O site publicado anteriormente não contém automaticamente as mudanças locais acima.
- Site: https://pedroayan.github.io/testtt/
- Repositório: https://github.com/PedroAyan/testtt — branch main, origin configurado.
- Primeiro deploy confirmado: workflow 40804625866, commit d2abb47; jobs build e deploy concluídos com success.
- Leitura de AGENTS.md e SPEC.md completa; a navegação segue a §14. PDF original copiado para docs/ (5 páginas), preservando o original recebido na raiz.

## Etapas da entrega anterior
1. África ponta a ponta: dados, GLB, QR, marcador, folha A4, QR interno, cena AR isolada, persistência e 3D sem câmera.
2. Arquitetura reutilizável: dados JSON, serviços TypeScript, repositórios assíncronos, ponte postMessage validada e módulo compartilhado entre app e RA inteira.
3. Seis continentes: África, América unificada, Antártida, Ásia, Europa e Oceania; 195 Estados em listas sem duplicação, 6 GLBs continentais + 177 nacionais, 6 QR/barcodes/folhas.
4. Interface: mapa com estados e lista alternativa, fichas ilustradas, países/busca/regiões da América, áudio pt-BR, Saiba mais, atividades por ano, dicas/repetição, contadores separados e duas celebrações. Antártida sem lista de países.
5. Publicação: GitHub Pages ativado por Actions; URL pública e recursos dos seis conjuntos verificados por HTTP. README, SOURCES, guias de impressão e roteiro físico entregues.
6. Organizador: PBKDF2/SHA-256 com sal, atraso crescente, editor por continente/ano, atividades extras, revisão, rascunhos locais e exportar/importar overrides validados. Hash configurado na variável VITE_ORGANIZER_PASSWORD_HASH do repositório; senha aleatória entregue somente ao responsável, sem texto em código.

## Verificações da entrega anterior
- npm.cmd run typecheck e npm.cmd run build: sem erros.
- npm.cmd test: 10 testes essenciais passaram, sem bateria exaustiva; inclusive seis PNGs QR decodificados por software.
- GitHub Actions também executou npm ci, typecheck, testes, geração das folhas e build com sucesso em Linux/Node 22.
- 183 GLBs parseados e dentro dos orçamentos; normalização e ausência de texturas verificadas.
- node scripts/verify-model-determinism.mjs: SHA-256 idêntico nos 183 GLBs após regenerar.
- npm.cmd run dev + node scripts/check-local-https.mjs: HTTPS local e recursos responderam 200.
- node scripts/verify-subpath.mjs: build com base /exploradores-do-mundo/ e recursos locais presentes.
- node scripts/check-published.mjs: página, JavaScript, cena/bibliotecas locais e seis conjuntos de GLB/QR/marcador/PDF responderam 200; GLBs públicos idênticos aos locais.
- Seis PDFs finais A4, uma página cada, renderizados e inspecionados; QR aponta para a URL pública. Silhuetas revisadas. Exceções geométricas ultramarinas documentadas em data-src/geographic-parts.json.
- Teardown ajustado para preservar o iframe no mesmo nó DOM até ACK/timeout, sem reiniciá-lo por movimentação durante desmontagem.

## Pendências já registradas na entrega anterior
- Câmera e AR em celular físico: NÃO VALIDADOS. Executar docs/TESTE-NO-CELULAR.md em Android Chrome e iPhone Safari, incluindo cinco ciclos de entrada/saída.
- Interface em navegador, voz, leitor de tela e editor: sem validação manual; Computer Use não encontrou host de navegador/pipe nativo no ambiente.
- Estatísticas null/verificar:true permanecem documentadas em docs/DADOS-EM-VERIFICACAO.md.
- Relatório item a item: docs/ENTREGA.md. Não confundir parse/HTTP/testes de lógica com execução física de câmera ou WebGL.
- Próximo passo do responsável: abrir o site no celular, imprimir as folhas públicas em 100% e executar o roteiro físico, registrando aparelho, navegador e resultados. Para publicar conteúdo do Organizador: exportar → public/content/overrides.json → commit/push/deploy.
