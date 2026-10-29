# Pendências

## Validação física e manual
- Câmera, leitura de papel e rastreamento AR em Android Chrome/iPhone Safari: NÃO VALIDADOS. Executar docs/TESTE-NO-CELULAR.md; verificar pose, perda/retorno, gestos, permissão negada e cinco ciclos de teardown.
- Interface real, acessibilidade com leitor de tela, áudio pt-BR, exploração WebGL e editor: implementados, mas não validados manualmente. O host de navegador e o pipe nativo de Computer Use estavam indisponíveis.

## Dados em verificação
- Seis continentes: areaKm2 e populacao com valor:null e verificar:true; anoReferencia:0 é sentinela não exibida. Confirmar valores segundo o mesmo recorte geográfico antes de substituir.
- Países/territórios: área oficial não confirmada. Populações são estimativas históricas POP_EST/POP_YEAR do Natural Earth 5.1.2, com ano na interface.
- Lista por país/campo e capitais ausentes: docs/DADOS-EM-VERIFICACAO.md; reproduzível por node scripts/report-pending.mjs. Sem dados inventados.

## Configuração de uso
- Folhas prontas para https://pedroayan.github.io/testtt/ . Para usar IP/túnel local, definir VITE_PUBLIC_URL em .env.local, reiniciar o Vite e regenerar antes de imprimir.
- Organizador publicado com variável de hash configurada. A senha aleatória foi informada ao responsável fora do repositório. Para alterar ou usar localmente, executar npm run organizer:hash e configurar o hash correspondente. A senha é barreira de conveniência, não autenticação de servidor.
- Edições não chegam automaticamente aos alunos: exportar overrides, versionar os arquivos/mídias/fontes e publicar.

## Pendências resolvidas
- Destino GitHub informado: https://github.com/PedroAyan/testtt . main enviada; Pages ativado e deploy com sucesso. Página e seis conjuntos responderam HTTP 200.
- PDF original recebido na raiz e copiado para docs/Fluxogramas_Exploradores_do_Mundo.pdf (5 páginas); original preservado. A SPEC §14 continua normativa.
