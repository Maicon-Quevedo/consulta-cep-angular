# Consulta CEP (Angular + ViaCEP)

Projeto simples de estudo que mostra como consumir uma API REST em Angular. O usuário digita um CEP, clica em **Buscar Cep** e a aplicação consulta a API pública [ViaCEP](https://viacep.com.br/) para exibir a rua, o bairro e a UF.

## Tecnologias

- [Angular](https://angular.dev/) (componentes standalone)
- TypeScript
- `HttpClient` para a requisição HTTP
- `FormsModule` (`ngModel`) para ligar o campo de texto à variável do componente
- API [ViaCEP](https://viacep.com.br/)

## Como funciona

```
Usuário digita o CEP
        │
        ▼
Componente Endereco  ──►  CepService  ──►  GET https://viacep.com.br/ws/{cep}/json/
        ▲                                              │
        └────────────── logradouro, bairro, uf ◄───────┘
```

1. O campo de texto está ligado à propriedade `cep` com `[(ngModel)]`.
2. O botão chama o método `buscarCep()` no evento `(click)`.
3. `buscarCep()` chama `CepService.buscar(cep)`, que faz o `GET` no ViaCEP.
4. No `subscribe`, os dados retornados são guardados em `logradouro`, `bairro` e `uf`, e o template os exibe na tela.

## Estrutura do projeto

```
src/app/
├── app.ts                      # Componente raiz (importa o Endereco)
├── app.html                    # <app-endereco></app-endereco>
├── app.config.ts               # provideHttpClient() configurado aqui
├── components/
│   └── endereco/
│       ├── endereco.ts         # Lógica do componente (buscarCep)
│       ├── endereco.html       # Input, botão e resultado
│       └── endereco.css
└── services/
    └── cep.ts                  # CepService: requisição ao ViaCEP
```

## Como executar

Pré-requisitos: [Node.js](https://nodejs.org/) e o Angular CLI.

```bash
# instalar o Angular CLI (se ainda não tiver)
npm install -g @angular/cli

# instalar as dependências do projeto
npm install

# iniciar o servidor de desenvolvimento
ng serve
```

Depois acesse `http://localhost:4200`.

## Como usar

1. Digite um CEP com 8 números, sem traço (exemplo: `85912130`).
2. Clique em **Buscar Cep**.
3. Rua, bairro e UF aparecem abaixo do botão.

## Trechos principais

**Serviço (`services/cep.ts`)**

```ts
@Injectable({ providedIn: 'root' })
export class CepService {
  private http = inject(HttpClient);

  buscar(cep: string) {
    return this.http.get<{
      cep: string;
      logradouro: string;
      bairro: string;
      uf: string;
    }>(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
```

**Configuração do `HttpClient` (`app.config.ts`)**

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};
```

**Componente (`components/endereco/endereco.ts`)**

```ts
buscarCep() {
  this.cepService.buscar(this.cep).subscribe({
    next: (dados) => {
      this.logradouro = dados.logradouro;
      this.bairro = dados.bairro;
      this.uf = dados.uf;
    },
    error: () => alert('Não foi possível buscar o CEP.')
  });
}
```

## Problemas comuns

| Erro no console | Causa provável | Solução |
|---|---|---|
| `NG8001: 'app-endereco' is not a known element` | Componente não importado | Adicionar `Endereco` em `imports` do `App` |
| `NG8002: Can't bind to 'ngModel'` | `FormsModule` ausente | Adicionar `FormsModule` em `imports` do `Endereco` |
| `NullInjectorError: No provider for HttpClient` | Provider ausente | Adicionar `provideHttpClient()` no `app.config.ts` |
| `ERR_NAME_NOT_RESOLVED` | URL errada (ex.: `viacep.com.brws`) | Conferir a barra: `https://viacep.com.br/ws/...` |
| `400 Bad Request` / erro de CORS com `ws//json` | CEP vazio na URL | Digitar o CEP antes de buscar e usar crases (`` ` ``) no template string |

## Possíveis melhorias

- Validar que o CEP tem exatamente 8 dígitos antes de buscar
- Tratar a resposta `{ "erro": true }` do ViaCEP para CEPs inexistentes
- Exibir mensagens de erro na tela em vez de `alert`
- Mostrar também cidade (`localidade`) e complemento
- Criar uma interface `Endereco` para tipar a resposta da API

## Autor

Maicon Quevedo — atividade da disciplina de Desenvolvimento Web, Grupo Marista.