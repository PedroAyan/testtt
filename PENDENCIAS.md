# Pendências

- Câmera, QR e rastreamento AR em Android Chrome e iPhone Safari: NÃO VALIDADOS. Executar docs/TESTE-NO-CELULAR.md quando disponível.
- Publicação: não há remote GitHub configurado nem URL pública informada. Preparar workflow e instruções; registrar resultado real ao final.
- O PDF original docs/Fluxogramas_Exploradores_do_Mundo.pdf não foi fornecido. Implementação segue a transcrição completa da SPEC §14.
- Dados estatísticos não confirmados ficarão null com verificar: true, listados aqui por campo.

## Dados não confirmados (sem números inventados)
- Os seis continentes: areaKm2 e populacao, com valor:null e verificar:true. É necessário confirmar valores com o mesmo recorte geográfico adotado pelo app; anoReferencia:0 é sentinela não exibida.
- Países e territórios: área oficial não foi confirmada. Populações presentes vêm de POP_EST/POP_YEAR do Natural Earth 5.1.2 e são históricas; não apresentadas como atuais.
- Relação completa por continente, país, campo e capital ausente: [docs/DADOS-EM-VERIFICACAO.md](docs/DADOS-EM-VERIFICACAO.md), reproduzível por `node scripts/report-pending.mjs`.
- Folhas de demonstração apontam para https://localhost:5173/. Regenerar com VITE_PUBLIC_URL igual à URL HTTPS final (ou IP local/túnel) antes de imprimir para a turma.
