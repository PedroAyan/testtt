# Progresso — Exploradores do Mundo

## Etapa atual: Etapa 4 — interface, países e atividades
- AGENTS.md e SPEC.md lidos integralmente; §14 governa a navegação.
- Pasta original continha apenas AGENTS.md, SPEC.md e PROMPT-CODEX.md.
- Repositório Git próprio iniciado nesta pasta (o repositório ancestral era C:/).
- África: 54 países gerados de fontes, GLB 6.004 triângulos / 386,58 KB, QR, barcode 0 e folha A4 de 9 cm.
- React, HashRouter, mapa, QR real via jsQR local, AR isolada com protocolo/teardown, fichas e exploração 3D implementados.
- Verificados: `npm.cmd run typecheck`, `npm.cmd run build`, `npm.cmd test` (8 testes essenciais).
- Build/Vitest exigiram execução fora do sandbox porque esbuild recebeu Acesso negado ao resolver diretórios.
- Próximo passo exato: formalizar arquitetura reutilizável; expandir IMPLEMENTED_CONTINENTS para os seis, gerar e validar dados/modelos/folhas.
- Leitor QR, ponte AR, repositórios e pipeline independem da África. Configuração única em scripts/config.mjs.
- Ajustes da Etapa 2: mapa com simplificação própria, build Node sem encadeamento de shell, fechamento de streams tardios da AR e correção da detecção do sistema arjs.
- Etapa 2 verificada: typecheck/build/8 testes passam; mapa reduzido de 937 KB para 195 KB no chunk.
- Próximo passo: gerar os seis conjuntos e conferir orçamento/normalização/fontes antes de implementar os fluxos finais de países, atividades e Organizador.
- Etapa 3 concluída em código: 195 Estados distribuídos uma única vez; 6 GLBs continentais + 177 nacionais; 6 QR/barcodes/PDFs.
- Verificados os 183 GLBs por parse, limites e normalização. O teste foi otimizado para uma asserção agregada de limites por modelo (465 ms no conjunto), sem testes exaustivos.
- Etapa 4 implementada: países/busca/regiões, fichas, Ouvir, Saiba mais, 2 atividades gerais + variantes por ano, dicas e resposta após 3 erros, contadores e duas celebrações.
- Inspeção via navegador indisponível: CUA relatou ausência do host de navegador e pipe nativo. Testes físicos seguem não validados.
- Próximo passo: verificar tipos/build/testes, registrar marco da interface e concluir workflow/documentação/Organizador.
- Em seguida: reutilização, seis conjuntos, países/atividades, publicação/documentação e Organizador.
- Câmera e AR: NÃO VALIDADOS em celular físico.
