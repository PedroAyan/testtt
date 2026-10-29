# Teste no celular — NÃO VALIDADO

Nenhum teste físico foi executado pelo agente. Testes automatizados de lógica/build não validam câmera, leitura de papel nem pose AR.

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
