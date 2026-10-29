# Pendências

## Acesso ADM — revisão de 2026-10-29
- Configuração solicitada atualizada: GitHub API aceitou o hash na variável de Actions (HTTP 204). O próximo build/deploy aplica a configuração ao site.
- Modo ADM libera as seis fichas no app normal e escreve QR, marcador, atividade, perfil e reinício somente na memória durante a sessão. Sair limpa esses dados.
- Login e saída ADM ainda precisam de conferência no site depois do deploy. Câmera e RA seguem NÃO VALIDADAS em celular.

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
