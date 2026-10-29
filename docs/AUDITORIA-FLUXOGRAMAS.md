# Auditoria dos fluxogramas — Exploradores do Mundo

Data: 2026-10-29. Referência normativa: SPEC §14, inclusive quando detalha ou reconcilia o PDF.

## Arquivos locais e método

- Fluxograma: `docs/Fluxogramas_Exploradores_do_Mundo.pdf`, cinco páginas renderizadas e inspecionadas visualmente. A extração textual contém apenas os títulos: os passos foram lidos nas imagens das páginas.
- Também existe `Fluxogramas_Exploradores_do_Mundo.pdf` na raiz. As cópias têm SHA-256 idêntico: `6872cc3e8b737ece03fe5b5f683674d076777ececa7aaE1d71d28ddc2be0ccbd` (comparação sem distinção de maiúsculas). Os seis PDFs em `public/print/` são folhas A4, não fluxogramas.
- Referência estética: `referencia-visual.png`, imagem local com três telas de aprendizado, lavanda/pêssego, cartões e ilustrações. Usada somente como inspiração; marca, textos e desenhos não são incorporados ao app. SVGs de continentes e QR não são referências concorrentes.
- Evidência de código não equivale a execução no celular. Câmera, leitura de papel, WebGL móvel, voz e rastreamento físico continuam NÃO VALIDADOS.

## Reconciliação PDF × SPEC

Os cinco percursos principais correspondem às §§14.1–14.5. O PDF não detalha primeira visita/ano escolar, cancelamento, três erros/resposta revelada, duas celebrações nem distribuição de rascunhos do Organizador. Aplicam-se os detalhes da §14. O retorno do QR inválido da página 4 usa o mesmo leitor da página 2, com aviso e tentativa explícitos. A consulta sem câmera da página 3 exige descoberta prévia (§14.0.3); abrir URL não concede acesso. A América é unificada e a conclusão exige seis continentes.

## Achados iniciais

1. QR válido navega com `state.discovered`, mas a ficha ignora esse estado: falta confirmação da descoberta.
2. Resumo educativo da RA está abaixo da câmera, não sobreposto como PDF p.3 / §14.3.
3. Erro de RA em continente bloqueado não mostra a dica ilustrada do material.
4. Falta atalho de arrastar a ficha para os países previsto no PDF p.4 / §14.4; o botão existente será preservado.
5. A primeira orientação pode ser contornada por “Meu mapa”/“Minha coleção”; alinhar todas as entradas do mapa.
6. Mapa usa símbolo abstrato em lugar de cadeado; importação de arquivo precisa de foco visível no rótulo.

Tabela de rastreabilidade e resultados finais: preenchimento após as correções e os comandos essenciais.
