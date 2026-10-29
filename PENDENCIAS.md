# Pendências

- Câmera, QR e rastreamento AR em Android Chrome e iPhone Safari: NÃO VALIDADOS. Executar docs/TESTE-NO-CELULAR.md quando disponível.
- Publicação: repositório informado durante a execução, https://github.com/PedroAyan/testtt . Remote configurado; publicação em andamento. Registrar o resultado real ao concluir.
- O PDF original apareceu na raiz durante a execução, foi conferido (5 páginas) e copiado para docs/Fluxogramas_Exploradores_do_Mundo.pdf. Pendência resolvida; a SPEC §14 continua sendo a referência de navegação.
- Dados estatísticos não confirmados ficarão null com verificar: true, listados aqui por campo.

## Dados não confirmados (sem números inventados)
- Os seis continentes: areaKm2 e populacao, com valor:null e verificar:true. É necessário confirmar valores com o mesmo recorte geográfico adotado pelo app; anoReferencia:0 é sentinela não exibida.
- Países e territórios: área oficial não foi confirmada. Populações presentes vêm de POP_EST/POP_YEAR do Natural Earth 5.1.2 e são históricas; não apresentadas como atuais.
- Relação completa por continente, país, campo e capital ausente: [docs/DADOS-EM-VERIFICACAO.md](docs/DADOS-EM-VERIFICACAO.md), reproduzível por `node scripts/report-pending.mjs`.
- Folhas serão regeneradas para https://pedroayan.github.io/testtt/ antes da publicação. Para usar um IP/túnel local, definir VITE_PUBLIC_URL em .env.local e regenerar antes de imprimir.

## Verificações manuais ainda necessárias
- Layout em navegador real, acessibilidade com leitor de tela, áudio pt-BR, exploração 3D e fluxo do editor: código implementado, mas o host de navegador e o pipe nativo de Computer Use estavam indisponíveis. Não são declarados testados.
- Rastreamento físico, permissão negada e teardown em cinco ciclos por Android/iOS: não validados; seguir docs/TESTE-NO-CELULAR.md.
- Configure uma senha própria com `npm run organizer:hash`; não há senha padrão. Isso é configuração do responsável, não autenticação de servidor.
2
