# Teste no celular — NÃO VALIDADO

Nenhum teste físico foi executado pelo agente. Testes automatizados de lógica/build não validam câmera, leitura de papel nem pose AR.

Revisão de 2026-10-29: os 11 testes de domínio/artefatos/HTML e o build passaram. O navegador não esteve disponível ao agente; nenhum item manual abaixo foi marcado como aprovado. Esta revisão foi publicada em https://pedroayan.github.io/testtt/ pelo workflow 40814989509; arquivos novos e recursos responderam HTTP 200. Use esse site para o roteiro com as folhas públicas, ou siga a preparação local abaixo.

## Preparação
1. Node.js 22.12+ e celular na mesma rede do computador.
2. PowerShell: `npm.cmd install`, `npm.cmd run dev`.
3. Use o endereço HTTPS de rede mostrado pelo Vite. O certificado local é autoassinado: autorize a exceção no aparelho somente na sua rede de desenvolvimento. Se o navegador não permitir câmera assim, use certificado confiável ou túnel HTTPS (README).
4. Configure `VITE_PUBLIC_URL` com esse endereço terminado em `/`, execute `npm.cmd run build:markers` e imprima a folha correspondente em 100%.
5. Também pode exibir uma folha em outra tela para verificar preliminarmente o reconhecimento, mas a aceitação final exige material impresso.
6. Anote modelo do aparelho, SO, navegador, URL, data e responsável.

## Executar separadamente em Android Chrome e iPhone Safari
Copie o checklist para cada dispositivo. Todos os itens começam **NÃO VALIDADOS**.

| Caso | Resultado | Observações |
|---|---|---|
| URL direta seleciona, mas não descobre | [ ] Passou [ ] Falhou | |
| Permissão de câmera negada: orientações, tentar novamente, voltar | [ ] Passou [ ] Falhou | |
| QR do continente selecionado descobre exatamente uma vez | [ ] Passou [ ] Falhou | |
| QR de outro continente/origem: aviso e nenhuma descoberta | [ ] Passou [ ] Falhou | |
| Cancelar QR desliga indicador de câmera | [ ] Passou [ ] Falhou | |
| Leitor QR encerrado antes de iniciar RA; uma câmera apenas | [ ] Passou [ ] Falhou | |
| Cada um dos 6 barcodes reconhece só seu continente | [ ] Passou [ ] Falhou | |
| Reconhecimento contínuo >= 500 ms descobre | [ ] Passou [ ] Falhou | |
| Passagem breve (<500 ms) não descobre | [ ] Passou [ ] Falhou | |
| Modelo acompanha posição E orientação do papel físico | [ ] Passou [ ] Falhou | |
| Perda do marcador esconde modelo; retorno preserva ajustes | [ ] Passou [ ] Falhou | |
| Um dedo gira, dois ampliam; limites e botões funcionam | [ ] Passou [ ] Falhou | |
| Restaurar volta à orientação e escala padrão | [ ] Passou [ ] Falhou | |
| Ver sem câmera desliga câmera e abre ficha liberada | [ ] Passou [ ] Falhou | |
| Sair da RA 5 vezes: câmera não trava, memória sem crescimento continuado | [ ] Passou [ ] Falhou | |
| Aba em segundo plano pausa render; retorno não descobre sem estabilidade | [ ] Passou [ ] Falhou | |
| Página inteira de RA (plano B) persiste pela mesma implementação | [ ] Passou [ ] Falhou | |
| Fechar/reabrir navegador mantém descobertas/ano/atividades | [ ] Passou [ ] Falhou | |
| Consulta 3D dos seis e modelos de países sob demanda | [ ] Passou [ ] Falhou | |
| América Norte–Sul e Antártida polar têm silhuetas reconhecíveis | [ ] Passou [ ] Falhou | |
| Antártida não oferece países; regiões da América filtram | [ ] Passou [ ] Falhou | |
| Ouvir pt-BR/áudio local, Saiba mais e navegação por botões | [ ] Passou [ ] Falhou | |
| Atividades: dica, 3 erros, resposta sem contar, novo acerto | [ ] Passou [ ] Falhou | |
| Dois contadores independentes; duas celebrações distintas | [ ] Passou [ ] Falhou | |
| Organizador: hash, editor, exportar/importar, publicar override | [ ] Passou [ ] Falhou | |
| Layout 360 px, alvos 44 px, teclado/leitor de tela | [ ] Passou [ ] Falhou | |

Não remover o status de não validado sem anotar evidência e responsável. Se iframe falhar no Safari, testar o botão de página inteira e registrar o comportamento.

## Retornos e regressões da auditoria de 2026-10-29 — NÃO VALIDADOS

Executar somente os percursos essenciais abaixo; não é uma bateria exaustiva. Usar um perfil de teste separado para não apagar progresso de uso.

| Percurso | Resultado esperado | Resultado real / responsável |
|---|---|---|
| Primeira visita por Explorar e pelo atalho Meu mapa | Orientação ilustrada e pergunta do ano; pular usa geral; Voltar ao início funciona | NÃO VALIDADO |
| Voltar ao mapa em visita seguinte e tocar Como jogar | Mapa direto; ajuda pode ser reaberta; ano continua salvo | NÃO VALIDADO |
| Bloqueado → câmera negada → Tentar novamente ou Voltar ao mapa | Instrução, dica ilustrada, nenhum modelo completo nem descoberta | NÃO VALIDADO |
| Selecionar África e ler QR da Ásia → Tentar novamente → QR da África | Aviso de continente errado sem progresso; depois câmera fecha, aparece “Continente descoberto!” e ficha sem câmera | NÃO VALIDADO |
| Cancelar enquanto o leitor inicia | Mapa, câmera desligada; resultado tardio não deve abrir ficha após o cancelamento | NÃO VALIDADO |
| Descoberto → Ver em RA → perder/reencontrar marcador → Ver sem câmera | Resumo sobre a câmera, rastreamento real, estado preservado e câmera desliga ao estudar | NÃO VALIDADO |
| Erro de RA de continente já descoberto | Ver em 3D sem câmera abre a mesma ficha; Tentar novamente reinicia | NÃO VALIDADO |
| Ficha → Conhecer os países → ficha do país → dois retornos | Botão funciona sem gesto, modelo/ícone adequado, Voltar ao continente e Voltar ao mapa preservam progresso | NÃO VALIDADO |
| Arrastar só a alça da ficha para baixo / Entendi | Abre países; dica dispensada não volta; rolagem normal fora da alça não deve navegar | NÃO VALIDADO |
| Abrir Antártida pela ficha e tentar URL de países | Sem lista/botão de países; rota volta à ficha antártica | NÃO VALIDADO |
| Atividade → três erros → Mostrar a resposta → Refazer → acerto | Dicas sem punição; revelação não conclui; novo acerto conta uma vez; saída sem concluir preserva contagem | NÃO VALIDADO |
| Mapa com seis descobertas, antes/depois de seis atividades | Duas celebrações diferentes e consulta continua disponível | NÃO VALIDADO |
| Organizador → senha errada → correta → editar/revisar/cancelar/salvar → Sair | Atraso após erro, cancelamento não salva, salvar volta ao mapa e Sair encerra sessão em cada tela | NÃO VALIDADO |
| Organizador → importar inválido → exportar/importar rascunho válido | Aviso sem aplicar inválido; rascunho local; não altera descobertas dos alunos | NÃO VALIDADO |
| 360 px / teclado / movimento reduzido / leitor de tela | Sem corte dos cartões/botões; mapa desliza lateralmente e lista funciona; foco claro, importação focável e animação dispensável | NÃO VALIDADO |

Se qualquer percurso falhar, registrar o passo da tabela em AUDITORIA-FLUXOGRAMAS.md e atualizar PENDENCIAS.md, sem transformar evidência de código em aprovação manual.

## Refinamento infantil e mobile — 2026-10-29 — NÃO VALIDADO

Repetir em Android Chrome e iPhone Safari, em perfil de teste, com largura pequena e texto ampliado. Nenhuma linha abaixo foi executada em aparelho físico nesta revisão.

| Percurso | Resultado esperado | Resultado real / responsável |
|---|---|---|
| Início → Explorar / Minha coleção / Organizador | Ações legíveis, orientação na primeira visita e entrada do professor separada | NÃO VALIDADO |
| Mapa a 320, 360 e 390 px, paisagem e texto ampliado | Página sem rolagem lateral; só o mapa desliza; nomes e alvos legíveis; lista oferece os mesmos destinos | NÃO VALIDADO |
| Ficha / país → modelo carregando e falha de conexão | Status legível; controles indisponíveis durante carga; Tentar novamente recupera o visualizador | NÃO VALIDADO |
| RA com ficha curta longa e texto ampliado | Status, ficha e saídas sem colisão; área para ver marcador; botões acessíveis pela rolagem; iframe alinhado à área da câmera | NÃO VALIDADO |
| RA → Ajuda com câmera → página inteira | Ajuda expansível e plano B abrem a cena real; retornos e teardown continuam corretos | NÃO VALIDADO |
| Atividades no celular, por toque e teclado | Alternativas em coluna, silhuetas com mesmo tamanho, dica/acerto claros, foco visível e sem punição | NÃO VALIDADO |
| ADM → Ver como público → Voltar ao Organizador | Retorno disponível também quando a ficha já está desbloqueada; rascunho não aplicado como conteúdo publicado | NÃO VALIDADO |
| Editor → Revisar modificações | Foco chega ao painel de revisão; dados legíveis; salvar/cancelar/importar/exportar mantêm o fluxo | NÃO VALIDADO |
| Navegação com leitor de tela, zoom de 200% e movimento reduzido | Rótulos claros, ordem de foco coerente, controles ≥ 44 px, texto base ≥ 16 px, sem animação de movimento | NÃO VALIDADO |
