# Prompt para o Codex

Cole o texto abaixo no Codex, com `AGENTS.md` e `SPEC.md` na raiz do repositório.

---

Você é um engenheiro de software sênior em React, TypeScript, Three.js/A-Frame, WebAR e aplicações educacionais mobile-first.

Leia `AGENTS.md` e `SPEC.md` por inteiro antes de escrever código. Eles definem as regras, a arquitetura e os critérios de pronto. A navegação do app segue os fluxogramas transcritos na **§14 da SPEC** (o PDF original está em `docs/Fluxogramas_Exploradores_do_Mundo.pdf`); onde a §14 e outra seção divergirem, vale a §14.

**Objetivo final (obrigatório): entregar o projeto Exploradores do Mundo completo, com os SEIS continentes funcionando (África, América, Antártida, Ásia, Europa e Oceania)**, cada um com seu modelo 3D, seus dados educativos, seu QR Code e seu marcador AR, impressos na folha correspondente (6 folhas), mais coleção, exploração 3D, persistência e publicação no GitHub Pages. Parar na África NÃO é uma entrega aceitável.

**Como chegar lá: trabalhe em etapas, validando cada uma antes de seguir.**

1. **Etapa 1 — África ponta a ponta.** Use-a para validar a arquitetura inteira (dados, pipeline do modelo, cena AR isolada, desbloqueio, persistência, exploração sem câmera, folha imprimível).
2. Ao concluir os critérios de pronto da Etapa 1 (SPEC §13), **continue automaticamente** para a Etapa 2 (arquitetura reutilizável dirigida por dados), depois Etapa 3 (os outros cinco continentes: América, Antártida, Ásia, Europa e Oceania), Etapa 4 (países, atividades, mapa completo e interface), Etapa 5 (publicação e documentação) e Etapa 6 (Modo Organizador).
3. Só pare antes do fim se houver um bloqueio real (ex.: sem acesso à internet para obter o Natural Earth). Nesse caso, implemente tudo o que for possível, registre o bloqueio em `PENDENCIAS.md`, diga exatamente o que falta e como destravar.

**Checklist de entrega final (confirme item a item no relatório):**
- [ ] 6 modelos GLB gerados pelo pipeline, dentro do orçamento
- [ ] 6 arquivos de dados com fontes (`verificar` onde houver dúvida)
- [ ] 6 QR Codes + 6 marcadores AR distintos + 6 folhas A4 imprimíveis
- [ ] Mapa de exploração com estados bloqueado/descoberto/selecionado, contador "X de 6" e lista alternativa acessível
- [ ] Leitura de QR Code dentro do app (validada só para o continente selecionado) e desbloqueio também pelo marcador AR
- [ ] Fichas curtas e ilustradas (localização + curiosidade) com Ouvir e Saiba mais; botões sempre visíveis (Conhecer os países, Voltar ao continente, Voltar ao mapa, Ver sem câmera, Ver em RA) além dos gestos; países com ficha e modelo 3D sob demanda (Antártida sem lista de países)
- [ ] Atividade padrão por continente (reconhecer o formato) e atividades por ano escolar, com dica, repetição sem punição, conclusão sem duplicar contagem, contadores separados de continentes descobertos e atividades concluídas, e tela de conclusão com os 6
- [ ] Modo Organizador (senha por hash, editor, exportar/importar overrides) com a limitação documentada
- [ ] Exploração 3D sem câmera para os 6, com lista de países
- [ ] `npm run typecheck`, `npm run build` e `npm test` passando
- [ ] Workflow do GitHub Pages, README, `SOURCES.md`, `PENDENCIAS.md`, `docs/IMPRESSAO.md`, `docs/TESTE-NO-CELULAR.md`

Se algum item não for concluído, o relatório deve dizer qual e por quê.

Regras de execução: inspecione o repositório antes de começar; se não conseguir baixar fontes de dados, não invente (deixe instruções exatas e registre pendência); rode as verificações e corrija os erros; marque câmera/AR como **não validados** até testes em celular real; nunca declare testado o que não foi executado.

Ao terminar, responda em: **Feito e verificado** (com comandos), **Feito mas não verificado**, **Pendente**, e **como eu rodo e testo no celular** (passo a passo, incluindo HTTPS local).
