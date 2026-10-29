# Progresso — Exploradores do Mundo

## Etapa atual — refinamento infantil e mobile (2026-10-29)
- Leitura integral dos quatro documentos obrigatórios e inspeção da referência concluídas antes de editar o app. Telas, componentes, estilos, testes e isolamento da cena AR examinados.
- Direção e achados registrados em docs/REVISAO-INTERFACE.md; preservar arte autoral, dados, fluxos, sessão ADM e persistência. Skills frontend-design, emil-design-eng e apple-design aplicadas; nenhuma mudança 3D necessária.
- Próximo passo exato: implementar os ajustes de hierarquia, leitura, controles e estados; executar typecheck, testes e build; registrar os limites da revisão visual e física.

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
