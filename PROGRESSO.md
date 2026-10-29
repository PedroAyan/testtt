# Progresso — Exploradores do Mundo

## Etapa atual — auditoria e revisão visual (2026-10-29)
- AGENTS.md, SPEC.md, PROGRESSO.md e PENDENCIAS.md lidos antes de alterações.
- PDF local de cinco páginas renderizado e lido visualmente; cópias raiz/docs idênticas por SHA-256. Referência local `referencia-visual.png` inspecionada.
- Achados e reconciliação com a SPEC §14 em docs/AUDITORIA-FLUXOGRAMAS.md.
- Próximo passo exato: corrigir confirmação do QR, resumo/dica da RA, entradas da orientação, ficha e acessibilidade; aplicar tokens pastel; executar typecheck, build e testes essenciais.
- Revisão de interface por Computer Use impedida: host de navegador e pipe nativo indisponíveis nesta sessão. Câmera/RA seguem NÃO VALIDADAS.

## Estado atual: seis etapas implementadas e site publicado
- Site: https://pedroayan.github.io/testtt/
- Repositório: https://github.com/PedroAyan/testtt — branch main, origin configurado.
- Primeiro deploy confirmado: workflow 40804625866, commit d2abb47; jobs build e deploy concluídos com success.
- Leitura de AGENTS.md e SPEC.md completa; a navegação segue a §14. PDF original copiado para docs/ (5 páginas), preservando o original recebido na raiz.

## Etapas concluídas no código
1. África ponta a ponta: dados, GLB, QR, marcador, folha A4, QR interno, cena AR isolada, persistência e 3D sem câmera.
2. Arquitetura reutilizável: dados JSON, serviços TypeScript, repositórios assíncronos, ponte postMessage validada e módulo compartilhado entre app e RA inteira.
3. Seis continentes: África, América unificada, Antártida, Ásia, Europa e Oceania; 195 Estados em listas sem duplicação, 6 GLBs continentais + 177 nacionais, 6 QR/barcodes/folhas.
4. Interface: mapa com estados e lista alternativa, fichas ilustradas, países/busca/regiões da América, áudio pt-BR, Saiba mais, atividades por ano, dicas/repetição, contadores separados e duas celebrações. Antártida sem lista de países.
5. Publicação: GitHub Pages ativado por Actions; URL pública e recursos dos seis conjuntos verificados por HTTP. README, SOURCES, guias de impressão e roteiro físico entregues.
6. Organizador: PBKDF2/SHA-256 com sal, atraso crescente, editor por continente/ano, atividades extras, revisão, rascunhos locais e exportar/importar overrides validados. Hash configurado na variável VITE_ORGANIZER_PASSWORD_HASH do repositório; senha aleatória entregue somente ao responsável, sem texto em código.

## Verificado
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

## Não validado e próximo passo exato
- Câmera e AR em celular físico: NÃO VALIDADOS. Executar docs/TESTE-NO-CELULAR.md em Android Chrome e iPhone Safari, incluindo cinco ciclos de entrada/saída.
- Interface em navegador, voz, leitor de tela e editor: sem validação manual; Computer Use não encontrou host de navegador/pipe nativo no ambiente.
- Estatísticas null/verificar:true permanecem documentadas em docs/DADOS-EM-VERIFICACAO.md.
- Relatório item a item: docs/ENTREGA.md. Não confundir parse/HTTP/testes de lógica com execução física de câmera ou WebGL.
- Próximo passo do responsável: abrir o site no celular, imprimir as folhas públicas em 100% e executar o roteiro físico, registrando aparelho, navegador e resultados. Para publicar conteúdo do Organizador: exportar → public/content/overrides.json → commit/push/deploy.
