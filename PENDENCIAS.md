# Pendências

## Reformulação visual ilustrada — 2026-10-29
- Implementação local e verificações concluídas: typecheck, 11 testes, build e 35 pares de contraste passaram. Planeta, folha e seis paisagens revisados como arte isolada; isso não equivale à revisão da interface.
- Comparação antes/depois no navegador NÃO EXECUTADA: `cua.getState()` retornou host indisponível, sem navegadores; Computer Use encerrou o acesso nativo ao Chrome por não conseguir determinar a URL com segurança. Não houve contorno por outro mecanismo.
- Pendente: executar a nova seção de `docs/TESTE-NO-CELULAR.md` a 320/360/390 px e desktop, paisagem, 200%, foco/teclado/leitor de tela e preferências de movimento/transparência/contraste. Conferir especialmente reserva de espaço sob navegação inferior e arte da ficha junto à dica de gesto. Avaliação com crianças e câmera/AR físicas continuam NÃO VALIDADAS.
- Sem pendências novas de dados, modelos, fontes ou dependências. Alterações locais ainda não publicadas. Decisões das três skills e evidências em `docs/DIRECAO-VISUAL-INFANTIL.md`.

## Critérios permanentes de acessibilidade infantil — 2026-10-29
- Orientações registradas no `AGENTS.md` da raiz e na `SPEC.md` §1/§7. Esta atualização é documental: não valida retroativamente a interface implementada.
- Na próxima revisão, conferir também leitura e compreensão das instruções, ícones com rótulos, 320–390 px/paisagem, texto a 200%, teclado/leitor de tela e distinção entre QR e marcador. Avaliação com crianças NÃO EXECUTADA; quando realizada, registrar contexto, responsável e resultados sem confundir com testes automatizados.
- Permanecem pendentes a revisão visual e os testes físicos já descritos abaixo. Nenhuma alteração em dados, modelos, persistência ou regras de desbloqueio nesta etapa.

## Refinamento infantil e mobile — 2026-10-29
- Código e verificações locais concluídos; detalhes e arquivos em docs/REVISAO-INTERFACE.md. Typecheck, 11 testes e build passaram; conteúdo/fontes/arquivos dos seis continentes validados pelo build. Contrastes principais aprovados por `node scripts/check-ui-contrast.mjs` (29/29); não equivale a certificação WCAG completa.
- Pendente: revisão visual e interação em navegador e em aparelhos físicos, especialmente 320–390 px, texto ampliado, foco/leitor de tela, rolagem do mapa, recarga após falha do visualizador, alternativas de atividades e foco na revisão do Organizador. Computer Use recusou acesso ao Edge e ao Chrome por falta de autorização; não foi possível executar essa revisão nesta sessão.
- Câmera/QR/RA, pose do marcador, perda/retorno e cinco ciclos de teardown continuam NÃO VALIDADOS fisicamente. Roteiro adicional em docs/TESTE-NO-CELULAR.md; registrar responsável e evidência antes de marcar como aprovado.
- Nenhuma pendência nova de dados, fontes, dependências ou modelos. Referência visual preservada apenas para consulta local, fora do site.

## Visualização pública do Organizador — 2026-10-29
- Publicada e conferida nos chunks públicos; typecheck/build passaram e Actions concluiu com sucesso. A visualização mostra o conteúdo publicado atual; alterações em rascunho precisam ser exportadas/publicadas para aparecer. Revisão visual manual não executada.

## Acesso ADM — revisão de 2026-10-29
- Hash publicado em `VITE_ORGANIZER_PASSWORD_HASH`; bundle público conferido por derivação PBKDF2 contra a senha escolhida. Sem senha ou hash expostos nos relatórios.
- Modo ADM libera as seis fichas no app normal e escreve QR, marcador, atividade, perfil e reinício somente na memória durante a sessão. Sair limpa esses dados.
- Verificado após deploy: login publicado possui o hash esperado (comparação PBKDF2 sem exibir credenciais); app, seis conjuntos de recursos e o rótulo “Sair do ADM” estão no site. Actions `40817056904` concluiu com sucesso.
- Pendente: executar manualmente login, navegação e saída no navegador; validar câmera e RA em celular físico. Não declarar câmera/RA validadas até esse teste.

## Revisão de 2026-10-29
- Auditoria dos cinco fluxos concluída por comparação visual do PDF local com SPEC §14 e rastreamento do código: docs/AUDITORIA-FLUXOGRAMAS.md. A tabela distingue código, testes de domínio/HTML e teste físico pendente.
- Verificações locais executadas: `npm.cmd run typecheck` (exit 0), `npm.cmd run build` (exit 0) e `npm.cmd test` (11/11 passaram). Não há falha automatizada conhecida nesta revisão.
- Revisão visual da interface no navegador continua pendente: o inventário de Computer Use retornou host de navegador indisponível e falha no pipe nativo. SVG novo inspecionado isoladamente e contrastes principais calculados; isso não valida layout, toque ou leitor de tela.
- Publicação resolvida em 2026-10-29: código `7a5b95a` no GitHub Pages, com build/deploy bem-sucedidos no workflow 40814989509. Página, arquivos novos e recursos dos seis continentes verificados por HTTP. A versão atual está em https://pedroayan.github.io/testtt/ .
- Referência `referencia-visual.png` preservada no projeto para consulta local. Licença não informada: a imagem não é distribuída no app, apenas inspira a arte autoral e os tokens.

## Validação física e manual
- Câmera, leitura de papel e rastreamento AR em Android Chrome/iPhone Safari: NÃO VALIDADOS. Executar docs/TESTE-NO-CELULAR.md; verificar pose, perda/retorno, gestos, permissão negada e cinco ciclos de teardown.
- Interface real, acessibilidade com leitor de tela, áudio pt-BR, exploração WebGL e editor: implementados, mas não validados manualmente. Conferir especialmente confirmação de descoberta, resumo sobre a RA, dicas com câmera negada, alça da ficha, rolagem/lista do mapa em 360 px, foco no arquivo de importação e cancelamento/saída do Organizador.

## Dados em verificação
- Seis continentes: areaKm2 e populacao com valor:null e verificar:true; anoReferencia:0 é sentinela não exibida. Confirmar valores segundo o mesmo recorte geográfico antes de substituir.
- Países/territórios: área oficial não confirmada. Populações são estimativas históricas POP_EST/POP_YEAR do Natural Earth 5.1.2, com ano na interface.
- Lista por país/campo e capitais ausentes: docs/DADOS-EM-VERIFICACAO.md; reproduzível por node scripts/report-pending.mjs. Sem dados inventados.

## Configuração de uso
- Folhas prontas para https://pedroayan.github.io/testtt/ . Para usar IP/túnel local, definir VITE_PUBLIC_URL em .env.local, reiniciar o Vite e regenerar antes de imprimir.
- Organizador publicado com variável de hash configurada. A senha aleatória foi informada ao responsável fora do repositório. Para alterar ou usar localmente, executar npm run organizer:hash e configurar o hash correspondente. A senha é barreira de conveniência, não autenticação de servidor.
- Edições não chegam automaticamente aos alunos: exportar overrides, versionar os arquivos/mídias/fontes e publicar.

## Pendências resolvidas
- Envio e atualização do site pedidos pelo responsável: `git push origin main`, GitHub Actions com `success`, `node scripts/check-published.mjs` e verificação dos novos chunks/CSS/arte/valores, ambos exit 0. Não equivale a teste de câmera ou RA física.
- Capital do Sudão do Sul: Juba, confirmada em https://data.un.org/legacy/en/iso/ss.html em 2026-10-29, fonte `undata-south-sudan` em SOURCES.md. Registrada em data-src/country-facts.json e aplicada no pipeline/JSON. Relatório de dados regenerado com `node scripts/report-pending.mjs`. Demais capitais não confirmadas continuam omitidas.
- Divergências de interface/navegação encontradas nesta revisão corrigidas no código: confirmação QR, resumo sobreposto da RA, dica ilustrada em erro de câmera, orientação por todas as entradas do mapa, gesto opcional com botão permanente e foco de importação. Aceitação física/manual segue pendente.
- Destino GitHub informado: https://github.com/PedroAyan/testtt . main enviada; Pages ativado e deploy com sucesso. Página e seis conjuntos responderam HTTP 200.
- PDF original recebido na raiz e copiado para docs/Fluxogramas_Exploradores_do_Mundo.pdf (5 páginas); original preservado. A SPEC §14 continua normativa.
