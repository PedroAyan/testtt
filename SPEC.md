# SPEC — Exploradores do Mundo

## 1. Visão

Jogo educativo em realidade aumentada, inspirado na mecânica de exploração do Pokémon GO, para ensinar os **6 continentes** (modelo com a América unificada, usado no ensino brasileiro). Cada continente corresponde a uma folha impressa contendo um **QR Code** (abre o site) e um **marcador AR** (ancora o modelo 3D). Ao reconhecer o marcador, o continente é desbloqueado e passa a ser acessível sem QR Code.

Público: estudantes do 1º ao 9º ano do ensino fundamental, incluindo crianças em alfabetização, em um projeto universitário. Priorizar linguagem simples, leitura fácil, acolhimento e autonomia com apoio do professor, respeitando diferentes idades e necessidades de acessibilidade. Critérios de interface na §7.

Fluxo:

1. Aluno lê o QR Code com a câmera nativa → abre `…/?continente=africa`.
2. Vê a página do continente e toca em "Iniciar realidade aumentada".
3. Concede a câmera, aponta para o marcador da mesma folha.
4. O continente 3D surge sobre o marcador, acompanha-o, e pode ser ampliado/girado por gestos.
5. Após reconhecimento estável, o continente é desbloqueado e salvo.
6. Depois, acessa pela coleção, em visualização 3D sem câmera.

## 2. Continentes

IDs: `africa`, `america`, `antartida`, `asia`, `europa`, `oceania`.

### Critério geográfico (documentar no README)

- Modelo de **6 continentes**: África, América, Antártida, Ásia, Europa e Oceania. A América é um só continente. Registrar a escolha no README e mencionar em "Saiba mais" da ficha da América que existe também o modelo de 7 continentes (com América do Norte e do Sul separadas), para evitar confusão com livros que usem outro modelo.
- Países listados no continente de maior parte do território; transcontinentais (Rússia, Turquia, Egito, Cazaquistão, etc.) recebem nota explicativa. Definir e documentar uma regra única e aplicá-la a todos.
- Soberanos = Estados-membros da ONU + observadores (Santa Sé, Palestina). Territórios dependentes ficam em lista separada (`territorios`), fora da contagem de países.
- Contagens e listas devem ser **geradas ou validadas a partir de uma fonte** (ex.: Natural Earth `admin_0_countries`, ONU/M49), não digitadas de memória.
- A América reúne América do Norte, Central, Caribe e do Sul. O mapa país→continente da §4 junta o `North America` e o `South America` do Natural Earth em `america`. Cada país da América tem o campo `regiao` (`'América do Norte' | 'América Central' | 'Caribe' | 'América do Sul'`) para filtrar a lista de países. O modelo 3D e a silhueta da América são alongados (norte-sul): escolher a projeção que preserve a forma reconhecível, evitar distorção exagerada no Alasca e na Terra do Fogo e validar visualmente.

### Schema (`src/types/continent.ts`)

```ts
interface Continent {
  id: ContinentId;
  nome: string;
  descricaoCurta: string;          // até ~200 caracteres
  descricao: string;
  fichaCurta: { localizacao: string; curiosidade: string; ilustracao: string; ilustracaoAlt: string }; // 1 frase cada, até ~140 caracteres
  areaKm2: Sourced<number>;
  populacao: Sourced<number> & { anoReferencia: number };
  quantidadePaises: Sourced<number> & { criterio: string };
  caracteristicasGeograficas: string[];
  climas: string[];
  faunaFlora: string[];
  cultura: string[];
  curiosidades: string[];
  paises: Country[];
  territorios: Country[];
  marcador: { tipo: 'barcode' | 'pattern'; id: number | string; arquivo: string };
  modelo: { arquivo: string; tamanhoKb?: number };
  cor: string;                     // cor de destaque na coleção
  // Fontes dos textos: chave = campo textual, valor = IDs de fontes cadastradas em SOURCES.md
  fontesTexto: Partial<Record<
    'descricao' | 'caracteristicasGeograficas' | 'climas' | 'faunaFlora' | 'cultura' | 'curiosidades',
    string[]
  >>;
}
interface Sourced<T> { valor: T | null; fonte: string; verificar?: boolean }
```

- Todo campo numérico tem `fonte`. Se o dado não puder ser confirmado, use `valor: null` com `verificar: true` (nunca preencha um número só para cumprir o schema). A interface mostra "dado em verificação" no lugar do número, e o item entra em `PENDENCIAS.md`.
- Todo campo textual listado em `fontesTexto` referencia ao menos um ID de fonte existente em `SOURCES.md` (formato `## [id] Título — URL — licença — data de acesso`). Textos sem fonte registrada não entram no build.
- Testes automatizados falham se faltar `fonte` num número, se `valor` for `null` sem `verificar: true`, ou se um ID de `fontesTexto` não existir em `SOURCES.md`.

Conteúdo de fauna, flora, cultura e curiosidades deve ser factual e conservador; evitar estereótipos culturais e generalizações sobre povos.

## 3. Realidade aumentada

### 3.1 Tecnologia

- **AR.js (build A-Frame) + A-Frame**, versões exatas fixadas e hospedadas em `public/vendor/`.
- Marcadores: preferir **barcode 3×3 (matriz)** com IDs distintos (0–5): geração reprodutível por script e boa robustez. Se o gerador de barcode for inviável, usar **pattern markers** (`.patt`) com bordas pretas largas e miolo de alto contraste, commitados em `public/markers/`. Justificar a escolha no README.
- Cada folha impressa: QR Code + marcador, lado a lado, com legenda do continente. O QR não é o marcador.

### 3.2 Integração React ↔ A-Frame (decisão obrigatória)

A-Frame e AR.js manipulam o DOM, criam `<video>` e canvas próprios e conflitam com o ciclo de vida do React. Portanto:

- A cena AR vive em uma **página HTML estática isolada** (`public/ar/scene.html`), carregada pelo React num `<iframe allow="camera; fullscreen" />` de mesma origem.
- Comunicação **somente por `postMessage`**. Formato único de mensagem: `{ app: 'exploradores-ar', version: 1, type: string, payload?: object }`. Regras:
  - **Envio:** React envia para `iframe.contentWindow` com `targetOrigin = window.location.origin`; a cena envia para `window.parent` com o mesmo `targetOrigin`. Nunca usar `'*'`.
  - **Recebimento (ambos os lados):** descartar a mensagem se `event.origin !== window.location.origin`, se `event.source` não for o esperado (React: `iframe.contentWindow`; cena: `window.parent`), ou se `app`/`version`/`type` forem inválidos. Validar o `payload` por tipo antes de usar.
  - Tipos:
  - AR → React: `ar:ready`, `ar:camera-denied`, `ar:camera-error`, `ar:marker-found`, `ar:marker-lost`, `ar:model-loaded`, `ar:model-error`.
  - AR → React (encerramento): `ar:stopped`.
  - React → AR: `ar:reset`, `ar:set-scale`, `ar:rotate`, `ar:stop`.
- **Teardown obrigatório** ao desmontar. Protocolo: o React envia `ar:stop`; a cena para as câmeras, libera os recursos e responde `ar:stopped`; o React remove o iframe ao receber `ar:stopped` **ou** após timeout de 1500 ms, o que ocorrer primeiro (no timeout, remover o iframe mesmo assim e registrar aviso no console). A cena executa: parar todos os `MediaStreamTrack`, remover `<video>`/canvas, `dispose()` de geometrias/materiais/texturas, remover o iframe. Teste manual: entrar e sair da AR cinco vezes sem a câmera travar nem o consumo de memória crescer.
- A cena deve receber o continente e o arquivo do modelo por query string do iframe.
- **Risco conhecido e plano B.** Câmera dentro de iframe pode se comportar de forma diferente no iOS Safari. Implemente o iframe primeiro e valide no celular (`docs/TESTE-NO-CELULAR.md`). Se falhar, o plano B é abrir `ar/scene.html` como **página inteira** (navegação normal, `window.location`), com botão "Voltar" que retorna ao app. Nesse modo o teardown é automático ao sair da página e o desbloqueio é gravado pelo **mesmo `CollectionRepository`** (mesma origem, mesmo `localStorage`) antes de voltar. Deixe o código da cena independente de ser iframe ou página inteira (detectar `window.parent !== window`) para a troca ser barata, e documente a decisão no README.

### 3.3 Estados e mensagens

`carregando` → `aguardando-permissao` → `procurando-marcador` → `marcador-reconhecido` (→ `marcador-perdido` ↔ reconhecido). Erros: `camera-bloqueada` (com instruções para liberar nas configurações do navegador), `sem-camera`, `navegador-incompativel`, `modelo-falhou`. Cada estado tem mensagem clara em português e, nos erros, um fallback que depende do progresso:

- **Continente já desbloqueado:** botão "Ver em 3D sem câmera" abre a Exploração 3D completa (§6).
- **Continente ainda bloqueado:** não há prévia nem 3D completo. Segue o fluxograma 2 (§14.2): explicar como liberar a câmera (com "Tentar novamente") ou mostrar aviso simples, sempre com "Voltar ao mapa", além da dica ilustrada de onde encontrar o QR Code.

Indicador visual de reconhecimento (moldura/ícone que muda de estado) e dicas: boa iluminação, folha plana, marcador inteiro no enquadramento, sem reflexo.

### 3.4 Gestos × rastreamento

- O modelo é **filho** da entidade do marcador (`<a-marker><a-entity gltf-model …/></a-marker>`).
- Gestos alteram **apenas** `scale` e `rotation` locais do filho. Nunca tocar a matriz do marcador.
- Um dedo: gira em torno do eixo vertical (e leve inclinação limitada). Dois dedos: pinça de escala, com limites (ex.: 0,5×–3×).
- Overlay de gestos capta `touch` com `touch-action: none`, sem bloquear os botões de interface.
- Alternativas sem gesto (acessibilidade): botões "+", "−", "girar", "restaurar".
- Marcador perdido: modelo some; ao reencontrar, mantém escala/rotação do usuário (opção "restaurar" volta ao padrão).

### 3.5 Desbloqueio

- Há **dois caminhos válidos** de desbloqueio, ambos exigindo o material impresso e ambos terminando em `unlock()` (única porta, §5): (a) **leitura do QR Code dentro do app**, válida só se o QR for do continente selecionado no mapa (fluxograma 2, §14.2); (b) **marcador AR do continente reconhecido continuamente por ≥ 500 ms** (evita falso positivo). Abrir a URL, por si só, nunca desbloqueia.
- A cena do continente X só reage ao marcador de X. Marcador de outro continente não desbloqueia nada (opcional: dica "este marcador é de outro continente").
- Ao desbloquear: animação discreta + confirmação "Continente descoberto!" + link para a coleção.
- Idempotente: reconhecer de novo não duplica nem reseta nada.

## 4. Modelos 3D

### 4.1 Pipeline (`scripts/build-models.mjs`)

Entrada: GeoJSON **Natural Earth** (domínio público), em `data-src/geo/` com escala 1:50m ou 1:110m, escolhida para caber no orçamento.

Passos:

1. Filtrar e agrupar países por continente conforme o critério da §2 (mapa explícito `país → continente`, versionado; não confiar cegamente no campo `CONTINENT` do arquivo).
2. Tratar **antimeridiano** (Rússia/Chukotka, Fiji, Alasca/Aleutas) sem gerar polígonos cortados.
3. Projetar com `d3-geo` por continente (azimutal de área igual centrada no continente). **Antártida: projeção polar** própria.
4. Simplificar (Visvalingam/Douglas-Peucker, ex. `topojson-simplify` ou `mapshaper`) e descartar ilhas menores que um limiar de área (parametrizado e documentado).
5. Triangular com `earcut` respeitando buracos; extrudar com pequena espessura e leve bisel; normais suaves.
6. Normalizar: centralizar na origem, caber em esfera de raio 1 (unidades arbitrárias, escala aplicada na cena), base apoiada em y=0.
7. Escrever GLB com `@gltf-transform/core` (sem DOM), aplicar `weld`/`dedup`/`prune` e, se compatível com o A-Frame fixado, compressão **meshopt/Draco** (carregador local em `public/vendor/`); caso contrário, sem compressão.
8. Emitir relatório (`models-report.json`): triângulos e KB por modelo.

### 4.2 Orçamento (verificado por teste)

| Item | Limite |
|---|---|
| Triângulos por modelo | ≤ 20 000 |
| Tamanho do GLB | ≤ 400 KB |
| Texturas | nenhuma (cor sólida + material simples) |
| Materiais | 1–2, `MeshStandardMaterial`, sem transparência |

Aparência: cor por continente (paleta §7), iluminação ambiente + direcional, silhueta reconhecível. O build de modelos é **determinístico** e os GLB gerados vão para o repositório.

## 5. Coleção e persistência

```ts
interface CollectionRepository {
  getUnlocked(): Promise<ContinentId[]>;
  isUnlocked(id: ContinentId): Promise<boolean>;
  unlock(id: ContinentId): Promise<void>;   // única porta de desbloqueio
  completeActivity(activityId: string): Promise<void>;   // idempotente (fluxograma 5)
  getCompletedActivities(): Promise<string[]>;
  getProfile(): Promise<{ anoEscolar?: SchoolYear }>;
  setProfile(p: { anoEscolar: SchoolYear }): Promise<void>;
  reset(): Promise<void>;
}
```

- Implementação `LocalStorageRepository` com chave versionada (`exploradores:v1`), validação do JSON lido (IDs desconhecidos são descartados) e `try/catch`.
- Se `localStorage` estiver indisponível (modo privativo/bloqueado): fallback em memória + aviso "seu progresso não será salvo".
- Interface assíncrona desde já para permitir `SupabaseRepository` futuro sem reescrever telas. **Não** implementar Supabase agora.
- `unlock()` só é chamado pelo handler de `ar:marker-found` estável. Nenhuma rota, query string ou componente de página o chama.
- "Reiniciar progresso" existe em área discreta, com confirmação. Qualquer atalho de desbloqueio para desenvolvimento só pode existir sob `import.meta.env.DEV` e nunca no build de produção.

## 6. Exploração 3D (sem câmera)

Rota completa acessível apenas para continentes desbloqueados. Continente bloqueado mostra a dica ilustrada de onde encontrar o QR Code (fluxograma 2, §14.2). Reutiliza o **mesmo GLB** da AR e da coleção.

- Preferir `<model-viewer>` (local, versão fixada) com `camera-controls`, zoom, pan e botão restaurar; usar Three.js só se model-viewer não atender.
- Painel com informações completas, lista de países com busca, e detalhe do país (nome, capital, curiosidade curta, fonte). Dados de países vêm de fonte registrada; sem capital/dado confiável → omitir o campo, não inventar.
- Carregar o modelo sob demanda e descartá-lo ao sair.

## 7. Interface

### Paleta

| Uso | Cor |
|---|---|
| Fundo | `#ffe5f0` |
| Texto | `#5c3a45` |
| Destaque | `#ff75a0` |
| Menta | `#a8e6cf` |
| Amarelo | `#ffd166` |

Bordas arredondadas, ícones, animações discretas (respeitar `prefers-reduced-motion`).

### Acessibilidade e legibilidade

- Verificar contraste WCAG AA (≥ 4,5:1 para texto). Rosa `#ff75a0` **não** serve como cor de texto sobre fundo claro; usar como fundo de botão com texto escuro em peso forte e tamanho suficiente, ou escurecer um tom e documentar o ajuste.
- Alvos de toque ≥ 44 px, `aria-label` nos controles, foco visível.
- Fonte legível (sem serifa, tamanho base ≥ 16 px), textos curtos e hierarquia clara.
- Tudo funciona sem depender de gesto (botões alternativos).

### Experiência infantil e compreensão

- **Linguagem:** usar palavras familiares, frases curtas e verbos que indiquem a ação. Apresentar uma instrução por etapa e manter o mesmo nome para a mesma ação ao longo do fluxo. Explicar termos novos no contexto: por exemplo, “realidade aumentada (RA)”. Textos por ano escolar continuam seguindo §14.0.4 e §14.6.
- **Hierarquia:** deixar a ação principal de cada tela evidente e as ações secundárias reconhecíveis. Informações complementares permanecem em “Saiba mais”, sem substituir a ficha curta definida na §14.0.10. Separar visualmente descoberta e atividade concluída, conforme §14.0.14.
- **Ilustrações:** usar arte amigável, formas arredondadas e cores pastel como direção visual, com licença registrada e texto alternativo nas imagens informativas. A ilustração deve ajudar a compreender a tarefa, especialmente a diferença entre QR Code e marcador AR. Decoração não deve competir com instruções, controles ou modelo. A referência visual sem licença de redistribuição permanece apenas para consulta local.
- **Múltiplas formas de acesso:** combinar ícones com rótulos textuais nos controles de navegação e estudo. Não depender somente de cor, posição, ícone, áudio ou gesto. Manter textos legíveis mesmo quando “Ouvir” não estiver disponível; seguir §14.0.6 para áudio e §14.0.11 para alternativas aos gestos. Imagens decorativas não devem gerar anúncios desnecessários no leitor de tela.
- **Estados compreensíveis:** carregamentos, erros e bloqueios devem explicar o que está acontecendo e qual é a próxima ação possível, com linguagem acolhedora e sem culpar a criança. Preservar “Tentar novamente”, saídas claras e tentativas sem punição nas atividades. Mensagens não podem prometer desbloqueio sem os eventos válidos da §3.5.
- **Celular e texto ampliado:** considerar larguras de 320, 360 e 390 px e orientação paisagem. Permitir ampliação de texto a 200% sem cortar informações ou tornar controles inacessíveis. A página não deve exigir rolagem horizontal; o mapa pode ter rolagem própria, com indicação visível e lista alternativa dos seis continentes. Respeitar os mínimos de texto/toque acima e a separação da cena AR em iframe; status, resumo e saídas da câmera não podem se sobrepor a ponto de impedir o uso.
- **Percurso infantil:** detalhes de arquivos, hashes, JSON, build e publicação não entram nas instruções dirigidas ao aluno. O Organizador pode apresentar esses detalhes quando forem necessários para preparar e publicar conteúdo, mantendo sua entrada identificada e os fluxos da §14.1.

### Verificação de alterações visuais

Revisar as telas alteradas no navegador quando houver ferramenta disponível e autorizada, incluindo larguras pequenas, desktop, texto ampliado, foco e alternativas por teclado. Usar capturas antes/depois quando possível para avaliar a direção visual e corrigir problemas observados. As mudanças devem ser proporcionais ao pedido: reformulações precisam trabalhar a composição e a hierarquia; correções pontuais não exigem redesenhar o projeto.

Registrar separadamente verificação de código/contraste, revisão visual no navegador, teste em aparelho físico e avaliação com crianças. Nenhuma dessas verificações substitui as demais. Se alguma não puder ser executada, registrar o motivo e o próximo passo em `PROGRESSO.md`/`PENDENCIAS.md`, mantendo câmera/AR como **não validadas** até o roteiro físico da §11. Um visual infantil, por si só, não comprova acessibilidade ou compreensão pelas crianças.

### Telas

1. **Início**: nome, proposta em 2–3 linhas, botões "Explorar" e "Minha coleção", progresso "X de 6 continentes descobertos".
2. **Continente** (`?continente=id`): nome, descrição, dados, informações do marcador e "Iniciar realidade aumentada". Dica de como encontrar o marcador na folha.
3. **AR**: câmera, modelo ancorado, controles, resumo, status, confirmação de descoberta, saída para fallback.
4. **Minha coleção**: 6 cartões. Bloqueado = silhueta escurecida + cadeado. Desbloqueado = colorido e acessível. Selecionado destacado. Contador de progresso.
5. **Exploração 3D**: modelo interativo, informações, países, detalhe do país.

## 8. Arquitetura

```text
exploradores-do-mundo/
├── AGENTS.md  SPEC.md  README.md  SOURCES.md  PENDENCIAS.md
├── docs/ (IMPRESSAO.md, TESTE-NO-CELULAR.md)
├── data-src/geo/            # GeoJSON de origem (Natural Earth)
├── public/
│   ├── ar/scene.html        # cena A-Frame + AR.js isolada
│   ├── vendor/              # aframe, ar.js, model-viewer, decoders (versões fixas)
│   ├── models/              # GLB gerados
│   ├── markers/             # PNG/SVG dos marcadores e QR Codes gerados
│   └── images/
├── scripts/                 # build-models, build-markers, check-budget
├── src/
│   ├── components/ (ARFrame, ContinentCard, ModelViewer3D, Navigation, ErrorState…)
│   ├── pages/ (Home, Continent, ARExperience, Collection, Explore3D)
│   ├── data/continents/*.json
│   ├── hooks/ (useCollection, useARMessages, useCameraSupport)
│   ├── services/ (collectionRepository, arBridge)
│   ├── types/  styles/  App.tsx
└── package.json
```

Pode ser adaptada com justificativa técnica registrada no README.

### Roteamento e GitHub Pages

- `vite.config.ts` com `base` configurável por variável (`/nome-do-repo/`).
- Roteamento por **HashRouter** (evita 404 em subpasta). A URL dos QR Codes usa query string: `https://USUARIO.github.io/REPO/?continente=africa`. Ao carregar, o app lê o parâmetro e navega para a rota interna do continente.
- URL base dos QR Codes vem de variável de ambiente (`VITE_PUBLIC_URL`), nunca hardcoded.
- Deploy via GitHub Actions (`actions/deploy-pages`), workflow incluído.
- Lazy loading de páginas pesadas (`React.lazy`) e modelos sob demanda.

## 9. QR Codes e marcadores

`npm run build:markers` gera, para cada continente:

- QR Code (nível de correção M ou superior) apontando para a URL do §8, em SVG/PNG de alta resolução.
- Marcador AR correspondente (barcode ou pattern).
- **Folha A4 em PDF/PNG pronta para impressão**: título do continente, QR, marcador com borda e margem branca generosa, tamanho do marcador ≥ 8 cm, legenda "Aponte a câmera para o quadrado preto" e rodapé com o ID.
- `docs/IMPRESSAO.md`: impressora, papel fosco (evitar brilho), tamanho mínimo, fixar plano em parede/mesa, iluminação, como testar antes de distribuir, distância de leitura.

## 10. Desempenho, compatibilidade e ambiente

- Alvo: Android intermediário (Chrome). Também testar iOS Safari (câmera via `getUserMedia` exige HTTPS e gesto do usuário; iniciar a AR a partir de um toque).
- Detectar `getUserMedia`/WebGL ausentes e exibir mensagem + fallback 3D.
- Sem trabalho pesado em segundo plano; limitar `devicePixelRatio` da cena AR (ex.: ≤ 1,5); pausar o loop de render quando a aba perde foco.
- **HTTPS local**: câmera não funciona em `http://IP-da-rede`. Configurar `npm run dev` com `@vitejs/plugin-basic-ssl` **ou** documentar túnel gratuito (`cloudflared tunnel --url https://localhost:5173`). Documentar no README.
- Sem cadastro, GPS, instalação ou serviços pagos.

## 11. Testes

**Escopo por etapa.** Os testes de dados e de modelos são parametrizados pela lista de continentes **implementados** (`IMPLEMENTED_CONTINENTS` em um único arquivo de configuração). Etapas 1 e 2: a lista contém apenas `africa`, e `npm test` valida só ela. Etapa 3 em diante: a lista contém os 6, e `npm test` passa a exigir os 6. Um teste separado confere que a lista de IDs conhecidos tem exatamente os 6 IDs da §2, para que ninguém "esqueça" um continente. Nada é pulado silenciosamente (`skip`).

Automatizados (Vitest, enxutos):

1. Repositório: `unlock` persiste, sobrevive a "reload" (nova instância lendo o mesmo storage), IDs inválidos são ignorados, fallback em memória funciona.
2. Lógica de desbloqueio: evento de marcador **válido e estável** desbloqueia o continente correto; marcador de outro continente, evento instável (< 500 ms) ou ausência de evento **não** desbloqueia.
3. Rota/URL de continente **não** desbloqueia nada.
4. Dados: 6 continentes, IDs únicos, todos com `fonte`, modelo existente, orçamento de triângulos/KB respeitado.
5. Carregamento do GLB em ambiente de teste (parse com `@gltf-transform/core` ou three `GLTFLoader` em Node).

Opcional (bônus, só se funcionar): Playwright/Chromium com câmera falsa (`--use-fake-device-for-media-stream --use-file-for-fake-video-capture=…`) apontando para vídeo do marcador, para validar o fluxo de reconhecimento. Se não rodar, documentar e **não afirmar** que foi validado.

Manual obrigatório: `docs/TESTE-NO-CELULAR.md` com checklist (Android Chrome, iPhone Safari): permissão negada, marcador reconhecido, perda e retorno do marcador, gestos, restaurar, desbloqueio, fechar e reabrir o navegador, acesso sem câmera, entrar/sair da AR cinco vezes. Cada item com `[ ] Passou  [ ] Falhou  Observações`.

## 12. README

Descrição, objetivo educacional, tecnologias, pré-requisitos, instalação, execução local (com HTTPS), geração de modelos, geração de QR/marcadores, impressão, como adicionar continente/modelo, publicação no GitHub Pages, limitações conhecidas, compatibilidade de navegadores, critério geográfico adotado, licenças e fontes (Natural Earth e demais, com links).

## 13. Etapas e critérios de pronto

**Etapa 1 — África ponta a ponta.** Pronta quando:
- `npm run typecheck`, `npm run build` e `npm test` passam.
- GLB da África gerado pelo pipeline, dentro do orçamento.
- Folha imprimível da África gerada (QR + marcador).
- Cena AR isolada funcionando em iframe com teardown; mensagens de estado e erro implementadas.
- Desbloqueio por marcador estável, persistência e acesso posterior sem câmera implementados e cobertos pelos testes automatizados.
- `docs/TESTE-NO-CELULAR.md` escrito; itens de câmera marcados como **não validados** até execução em celular real.

**Etapa 2 — Reutilização.** Tudo da Etapa 1 dirigido por dados (`data/continents/*.json`), sem código específico da África.

**Etapa 3 — Seis continentes.** Modelos, dados e folhas dos 5 restantes. `PENDENCIAS.md` lista tudo marcado `verificar`.

**Etapa 4 — Interface completa.** Coleção, navegação, exploração 3D com países, responsividade, acessibilidade.

**Etapa 5 — Publicação.** Workflow de GitHub Pages, teste de carregamento publicado, guia de impressão e uso.

Não avançar de etapa sem os critérios da anterior atendidos ou pendências explicitamente registradas.

**Entrega final: as Etapas 1 a 6 completas (§14.7), com os 6 continentes funcionando.** A Etapa 1 é apenas o primeiro marco, usado para validar a arquitetura. Concluí-la não encerra o trabalho: o agente segue para as etapas seguintes até entregar os 6 conjuntos (modelo, dados, QR Code, marcador AR e folha imprimível), ou registrar em `PENDENCIAS.md` o bloqueio real que o impediu.

---

## 14. Fluxogramas (navegação oficial)

Fonte: `docs/Fluxogramas_Exploradores_do_Mundo.pdf` (5 páginas; copiar o PDF para `docs/`). Como os diagramas são gráficos, esta seção os **transcreve**: ela é a referência de navegação para o agente. Em caso de divergência com seções anteriores, vale a §14 (as demais já foram ajustadas).

### 14.0 Decisões que reconciliam os fluxogramas com o restante da SPEC

1. **São 6 continentes (modelo com América unificada).** O fluxograma 5 já falava em "seis continentes", e adotamos o modelo usado no ensino brasileiro: África, América, Antártida, Ásia, Europa e Oceania. A Antártida continua com ficha e QR Code, mas sem lista de países. A ficha da América permite filtrar países por região (Norte, Central, Caribe, Sul). A conclusão da exploração ocorre com os **6** descobertos.
2. **Desbloqueio por dois caminhos** (§3.5): QR lido dentro do app (fluxograma 2) **ou** marcador AR reconhecido de forma estável. Abrir a URL (por exemplo, ao ler o QR com a câmera nativa do celular) leva à tela do continente **bloqueado**, com os botões "Escanear QR code" e "Iniciar realidade aumentada"; não desbloqueia nada.
3. **Sem prévia de continente bloqueado.** Quem não conseguir usar a câmera vê as orientações do fluxograma 2 e volta ao mapa. Limitação conhecida: aparelho sem câmera não consegue desbloquear. Registrar no README e, opcionalmente, oferecer ao Organizador uma ação "liberar neste dispositivo" (§14.6).
4. **Ano escolar.** Os fluxogramas usam o ano escolar (atividades e edição do Organizador), mas não dizem onde o aluno o informa. Decisão: na orientação inicial do modo Explorar, uma pergunta "Qual é o seu ano?" (1º ao 9º, com "Pular"), salva no perfil local e editável em Configurações. Sem ano, usar conteúdo marcado como `geral`.
5. **Organizador sem backend.** A senha é uma barreira de conveniência, **não** segurança: tudo roda no navegador e o código é público. Edições ficam em rascunho local e só chegam aos alunos por **exportar → commit no repositório → deploy** (§14.6). Documentar isso claramente.
6. **"Ouvir".** Usar a Web Speech API (`speechSynthesis`, voz pt-BR) para ler o texto; se o navegador não tiver voz em português, esconder o botão. Se o Organizador fornecer arquivo de áudio, ele tem prioridade sobre a voz sintética.
7. **"Saiba mais".** Seção expansível com conteúdo complementar curto e, quando houver, links para fontes confiáveis (nova aba, `rel="noopener noreferrer"`).
8. **Modelo 3D do país.** O fluxograma 4 prevê modelo 3D também por país. Gerar com o mesmo pipeline (§4), com orçamento menor (≤ 3 000 triângulos e ≤ 60 KB por país), carregamento sob demanda e descarte ao sair. Países sem geometria utilizável (microestados) mostram um marcador/ícone em vez do modelo. Dados de país: nome, capital, população (com ano), área e uma curiosidade curta, todos com fonte; o que não for confirmado fica `valor: null` + `verificar`.
9. **Acessibilidade do mapa.** O mapa usa nome, símbolo **e** cor (nunca só cor), e existe uma lista alternativa dos 6 continentes para leitores de tela e teclado.
10. **Fichas curtas e ilustradas.** A ficha do continente mostra nome, ilustração, **localização no mundo** (1 frase) e **uma curiosidade** (1 frase), com até ~140 caracteres cada, vocabulário do ensino fundamental e frases diretas. Área, população (com ano), clima, fauna e flora e cultura ficam em **"Saiba mais"**, recolhido por padrão. Ilustrações: SVG autoral simples ou material CC0/licença registrada em `SOURCES.md`; texto alternativo obrigatório. "Ouvir" lê a ficha curta primeiro.
11. **Controles visíveis, nunca só gesto.** Toda ação por gesto tem também um botão permanente com rótulo textual: **"Conhecer os países"**, **"Voltar ao continente"**, **"Voltar ao mapa"**, **"Ouvir"**, **"Saiba mais"**, **"Ver sem câmera"**, **"Ver em RA"**. Gestos (arrastar a ficha para baixo, pinça, girar) são atalhos opcionais. Alvos de toque ≥ 44 px e instrução de uma linha na primeira vez (dispensável, lembrada em `localStorage`).
12. **Estudar sem segurar a câmera.** Depois de descobrir, a ficha abre **sem câmera**; a RA é opcional ("Ver em RA"). Dentro da RA, o botão **"Ver sem câmera"** fica sempre visível e leva à mesma ficha, para estudar com o aparelho apoiado.
13. **Continentes primeiro, países depois.** A apresentação do continente vem antes; "Conhecer os países" é um botão secundário, abaixo da ficha.
14. **Descoberta é diferente de aprendizagem; progresso separado.** O mapa mostra **dois contadores**: "Continentes descobertos: X de 6" (QR ou marcador) e "Atividades concluídas: Y de 6". Descobrir não conclui atividade.
15. **Mapa cinza explicado.** Enquanto houver continente bloqueado, mostrar "Encontre os QR codes para descobrir os continentes" e uma legenda: cadeado = ainda não descoberto, marca de verificação = descoberto, estrela = atividade concluída. A cor nunca é a única indicação.

### 14.1 Fluxo 1 — Entrada e organização do conteúdo

1. Acessar o site pelo celular → carregar conteúdo e **progresso deste navegador**.
2. Tela inicial com duas entradas: **Explorar** e **Organizador**.
3. **Explorar** → na **primeira visita** (marca em `localStorage`), orientação curta e ilustrada sobre mapa, QR Codes e câmera, com a pergunta do ano escolar (§14.0.4) → **Mapa de exploração**. Nas visitas seguintes vai direto ao mapa; o botão **"Como jogar"** (sempre visível no mapa) reabre a orientação.
4. **Organizador** → "Informar senha" (com "Voltar" para a tela inicial) → senha correta? Não: aviso e nova tentativa. Sim: **Mapa do organizador**.
5. Mapa do organizador → selecionar continente e ano escolar → editar fichas, imagens, áudio e conteúdo complementar → editar a dica de localização do QR Code → configurar atividade, resposta e dica de ajuda → revisar e salvar modificações → volta ao mapa do organizador. Em todas as telas do Organizador há **"Sair"**, que encerra a sessão do organizador e volta à tela inicial.

Senha do Organizador: comparar o hash (PBKDF2/SHA-256 via WebCrypto, com sal) com o valor de `VITE_ORGANIZER_PASSWORD_HASH`; nunca guardar a senha em texto no repositório; script `npm run organizer:hash` gera o hash. Pequeno atraso crescente após tentativas erradas.

### 14.2 Fluxo 2 — Mapa, leitura do QR Code e descoberta

1. **Mapa de exploração**: mapa-múndi em SVG gerado pelo script a partir do Natural Earth (um `<path id="africa">` etc. por continente), com nomes, símbolos, cores, legenda e **dois progressos separados** ("Continentes descobertos: X de 6" e "Atividades concluídas: Y de 6"), mais a mensagem "Encontre os QR codes para descobrir os continentes" enquanto houver bloqueados (§14.0.15). Estados: bloqueado (escurecido + cadeado), descoberto (colorido + marca de verificação), selecionado (destaque).
2. Selecionar continente → **Já foi descoberto?**
   - **Sim** → reabrir apresentação e ficha **sem nova leitura** (§14.3).
   - **Não** → mostrar a **dica ilustrada de onde encontrar o QR Code** (com "Voltar ao mapa") → "Escanear QR code".
3. **Câmera autorizada?** Não → explicar como liberar a câmera → "Tentar novamente" ou "Voltar ao mapa". Sim → abrir a câmera com instrução de enquadramento e botão **"Cancelar"** (libera a câmera e volta ao mapa) → ler QR Code.
4. **Código válido e do continente selecionado?** Não → aviso simples ("Tentar novamente" ou "Voltar ao mapa"). Sim → encerrar a leitura (liberar a câmera) → registrar a descoberta **sem duplicar progresso** → colorir o continente e atualizar contador e percentual → abrir apresentação e ficha.

Validação do QR (função pura, testada): `new URL(texto)`; exigir `origin + pathname` iguais à URL base configurada; parâmetro `continente` ∈ IDs conhecidos **e** igual ao continente selecionado. QR de outro continente válido mostra "Este QR é de outro continente" e não desbloqueia. Leitor: biblioteca pequena e livre (`jsQR` ou `qr-scanner`), versão fixada e hospedada em `public/vendor/`. **Liberar o stream do leitor antes de abrir a AR**, para nunca haver duas câmeras ativas.

### 14.3 Fluxo 3 — Realidade aumentada e consulta sem câmera

1. Abrir apresentação do continente e sua ficha → **Câmera e RA disponíveis?**
   - **Não** → explicar a limitação e oferecer consulta sem câmera → **modelo 3D e ficha sem câmera** → explorar a ficha educativa.
   - **Sim** (ao tocar em "Ver em RA") → iniciar rastreamento do marcador impresso → **Marcador visível?**
2. **Sim** → exibir modelo 3D com **ficha sobreposta** (resumo); em qualquer momento, "Ver sem câmera" → encerrar RA e **desligar a câmera** → modelo 3D e ficha sem câmera.
3. **Não** (ou perda do marcador) → orientar a reposicionar o material → volta a "Marcador visível?"; também é possível "Ver sem câmera".
4. Na tela sem câmera, o botão "Ver em RA" retorna à verificação de câmera e RA.

### 14.4 Fluxo 4 — Fichas educativas, países e Antártida

1. Início da ficha (modelo 3D disponível) → informações do continente com **Ouvir** e **Saiba mais**.
2. **É a Antártida?**
   - **Sim** → conteúdo sobre ambiente e pesquisa científica (Tratado Antártico, estações, clima, fauna), **sem lista de países** (`paises: []`, botão de países oculto) → voltar ao mapa.
   - **Não** → botão **"Conhecer os países"** sempre visível e secundário, abaixo da ficha (arrastar a ficha para baixo é só atalho; painel tipo bottom sheet), com "Voltar ao continente" e "Voltar ao mapa" também sempre visíveis → selecionar um país → **ficha do país** (modelo 3D do país, informações, Ouvir e Saiba mais) → "Voltar ao continente" ou "Voltar ao mapa".
3. Desde o mapa: selecionar continente → desbloqueado? Sim → ficha do continente. Não → segue **exatamente o fluxo 2** (§14.2), inclusive o aviso e o "Tentar novamente" para QR incorreto; o comportamento é único e não deve ser reimplementado de outra forma.

### 14.5 Fluxo 5 — Atividades e conclusão

1. **Entrada:** botão **"Fazer atividade"** na ficha do continente e no mapa. Apresentar **atividade curta adequada ao ano escolar** → escolher resposta → **Resposta correta?**
   - **Sim** → confirmar o acerto e explicar → salvar conclusão **sem duplicar contagem** → atualizar atividades concluídas → mapa.
   - **Não** → oferecer dica → "Tentar novamente" (tentativas ilimitadas, sem punição). Depois de **3 erros seguidos**, aparece também **"Mostrar a resposta"**: exibe a resposta e a explicação, mas **não** conta como concluída (a criança pode refazer depois).
   - "Voltar sem concluir" → mapa, sem registrar.
2. No mapa: **os 6 continentes foram descobertos?** Não → continuar explorando. Sim → **celebrar a conclusão da exploração** → continuar consultando fichas, países e atividades. Quando, além disso, **todas as atividades** estiverem concluídas, mostrar uma segunda celebração, distinta, de "Exploração e atividades completas".

**Atividade padrão (uma por continente, opcional e sem punição):** "Qual continente você acabou de conhecer?", com 3 alternativas ilustradas por silhuetas (`reconhecer-formato`) geradas pelo pipeline, na mesma caixa delimitadora e com o mesmo traço, para o tamanho não servir de pista. Erro → dica e nova tentativa, sem limite. Acerto → explicação curta e marca de atividade concluída. **Segunda atividade padrão, `localizar-no-mapa`:** "Toque no mapa onde fica a Ásia", usando o mapa-múndi SVG do §14.2 (a resposta correta é o ID do continente; `opcoes` fica vazio). Erro → dica textual (`dica`, ex.: "Fica no hemisfério norte, ao leste da Europa") e nova tentativa, sem limite e sem punição. Alvos de toque grandes e alternativa acessível por lista dos 6 continentes (teclado e leitor de tela). Cada continente tem as duas atividades padrão; concluir qualquer uma marca "atividade concluída" uma única vez. O Organizador pode acrescentar outras (§14.6).

### 14.6 Modelo de dados adicional e Modo Organizador

```ts
type SchoolYear = '1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'geral';
interface Activity {
  id: string; continentId: ContinentId; anosEscolares: SchoolYear[];
  tipo: 'multipla-escolha' | 'reconhecer-formato' | 'localizar-no-mapa';
  enunciado: string; opcoes: { id: string; texto: string; silhueta?: string }[];
  respostaCorretaId: string; dica: string; explicacao: string;
  fontes?: string[];                       // IDs de SOURCES.md
}
// Campos opcionais por continente/país: audioUrl, saibaMais: { texto; links?: {titulo; url}[] },
// dicaQr: { texto; imagem? }, variantesPorAno?: Partial<Record<SchoolYear, { descricao: string }>>
```

Modo Organizador (MVP):
- Edita texto das fichas, dica de localização do QR, atividade (enunciado, opções, resposta, dica) e referências a imagens/áudio por **caminho de arquivo** em `public/media/`. Upload local de imagem/áudio é opcional (guardado em IndexedDB, só naquele aparelho) e **não** vale para os alunos.
- Rascunho salvo localmente (`exploradores:organizer:v1`). **Exportar** gera `content-overrides.json`; **Importar** carrega um arquivo. Para publicar: colocar o arquivo em `public/content/overrides.json`, fazer commit e deploy. O app carrega os dados base e aplica os overrides, **validados por schema**; override inválido é ignorado com aviso.
- Aviso na interface: "Suas alterações só aparecem para os alunos depois de exportar e publicar."
- Conteúdo de imagem e áudio exige licença registrada em `SOURCES.md`.
- Futuro: trocar overrides por Supabase (mesma interface de repositório de conteúdo `ContentRepository`).

### 14.7 Telas, testes e etapas

- Telas adicionais em relação à §7: Orientação inicial, Mapa de exploração (substitui e inclui "Minha coleção"), Ficha do país, Atividade, Conclusão, Organizador (senha, mapa, editor). Estados de erro e "Tentar novamente" conforme os fluxos.
- Testes automatizados a acrescentar: (1) QR válido do continente selecionado desbloqueia; QR de outro continente, de outra origem, malformado ou sem parâmetro **não** desbloqueia; (2) `completeActivity` é idempotente; (3) Antártida não tem países e a ficha não oferece a lista; (4) override inválido é rejeitado; (5) validação de senha por hash (sem guardar a senha); (6) conclusão só aparece com os 6 descobertos; (7) os contadores de descobertas e de atividades são independentes, e resposta errada em `localizar-no-mapa` ou `reconhecer-formato` não conclui nada; (8) `fichaCurta` existe, respeita o limite de caracteres e a ilustração tem texto alternativo.
- Etapas (complementam a §13):
  - **Etapa 1 (África):** fluxos 2 e 3 completos para a África, mapa simples com os 6 e só a África ativa, ficha do continente, persistência.
  - **Etapa 2:** tudo dirigido por dados; leitor de QR e AR reutilizáveis.
  - **Etapa 3:** os outros 6 continentes.
  - **Etapa 4:** fluxo 4 (países, Ouvir, Saiba mais, Antártida) e fluxo 5 (atividades, conclusão), mapa-múndi completo, perfil de ano escolar, acessibilidade.
  - **Etapa 5:** publicação no GitHub Pages, documentação e roteiro de teste no celular.
  - **Etapa 6:** Modo Organizador (§14.1 e §14.6).
