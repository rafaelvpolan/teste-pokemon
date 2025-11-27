# API Documentation - Exemplos de Uso

## Índice
- [Trainers](#trainers)
- [Teams](#teams)
- [Pokemon](#pokemon)
- [Teams x Trainers](#teams-x-trainers)
- [Teams x Pokemon](#teams-x-pokemon)

---

## Trainers

### Criar Trainer
```http
POST http://localhost:3005/trainers
Content-Type: application/json

{
  "name": "João Silva",
  "cep": "01310-100"
}
```

**Resposta:**
```json
{
  "id": 1,
  "name": "João Silva",
  "cep": "01310-100",
  "logradouro": "Av. Paulista",
  "bairro": "Bela Vista",
  "cidade": "São Paulo",
  "estado": "SP",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

### Listar Todos os Trainers
```http
GET http://localhost:3005/trainers
```

**Resposta:**
```json
[
  {
    "id": 1,
    "name": "João Silva",
    "cep": "01310-100",
    "logradouro": "Av. Paulista",
    "bairro": "Bela Vista",
    "cidade": "São Paulo",
    "estado": "SP",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### Buscar Trainer por ID
```http
GET http://localhost:3005/trainers/1
```

**Resposta:**
```json
{
  "id": 1,
  "name": "João Silva",
  "cep": "01310-100",
  "logradouro": "Av. Paulista",
  "bairro": "Bela Vista",
  "cidade": "São Paulo",
  "estado": "SP",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

### Atualizar Trainer
```http
PUT http://localhost:3005/trainers/1
Content-Type: application/json

{
  "name": "João Silva Atualizado",
  "cep": "01001-000"
}
```

**Resposta:**
```json
{
  "id": 1,
  "name": "João Silva Atualizado",
  "cep": "01001-000",
  "logradouro": "Praça da Sé",
  "bairro": "Sé",
  "cidade": "São Paulo",
  "estado": "SP",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T12:00:00.000Z"
}
```

---

### Deletar Trainer
```http
DELETE http://localhost:3005/trainers/1
```

**Resposta:** `204 No Content`

---

## Teams

### Criar Team
```http
POST http://localhost:3005/teams
Content-Type: application/json

{
  "name": "Team Rocket",
  "status": true
}
```

**Resposta:**
```json
{
  "id": 1,
  "name": "Team Rocket",
  "status": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

### Listar Todos os Teams
```http
GET http://localhost:3005/teams
```

**Resposta:**
```json
[
  {
    "id": 1,
    "name": "Team Rocket",
    "status": true,
    "teamTrainers": [],
    "teamPokemons": [],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### Buscar Team por ID
```http
GET http://localhost:3005/teams/1
```

**Resposta:**
```json
{
  "id": 1,
  "name": "Team Rocket",
  "status": true,
  "teamTrainers": [
    {
      "id": 1,
      "trainer": {
        "id": 1,
        "name": "João Silva"
      }
    }
  ],
  "teamPokemons": [
    {
      "id": 1,
      "pokemon": {
        "id": 25,
        "name": "pikachu"
      }
    }
  ],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

### Buscar Detalhes Completos do Team
```http
GET http://localhost:3005/teams/1/details
```

**Resposta:**
```json
{
  "id": 1,
  "name": "Team Rocket",
  "status": true,
  "trainer": {
    "id": 1,
    "name": "João Silva"
  },
  "pokemons": [
    {
      "id": 25,
      "name": "pikachu",
      "pokedex_number": 25,
      "types": ["electric"],
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    }
  ],
  "pokemonCount": 1,
  "maxPokemons": 5,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

### Atualizar Team
```http
PUT http://localhost:3005/teams/1
Content-Type: application/json

{
  "name": "Team Rocket Updated",
  "status": false
}
```

**Resposta:**
```json
{
  "id": 1,
  "name": "Team Rocket Updated",
  "status": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T12:00:00.000Z"
}
```

---

### Deletar Team
```http
DELETE http://localhost:3005/teams/1
```

**Resposta:** `204 No Content`

**Nota:** Ao deletar um team, todas as associações com trainers e pokémons são removidas automaticamente (CASCADE).

---

## Pokemon

### Buscar Pokémon (no banco ou API e salvar)
```http
GET http://localhost:3005/pokemon/search/pikachu
```

**Ou por número:**
```http
GET http://localhost:3005/pokemon/search/25
```

**Resposta:**
```json
{
  "id": 1,
  "name": "pikachu",
  "pokedex_number": 25,
  "height": 4,
  "weight": 60,
  "base_experience": 112,
  "sprite_front": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  "sprite_back": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
  "types": ["electric"],
  "abilities": ["static", "lightning-rod"],
  "stats": {
    "hp": 35,
    "attack": 55,
    "defense": 40,
    "special_attack": 50,
    "special_defense": 50,
    "speed": 90
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Nota:** Se o Pokémon não existir no banco, ele será buscado na PokeAPI e salvo automaticamente.

---

### Listar Todos os Pokémons do Banco
```http
GET http://localhost:3005/pokemon
```

**Resposta:**
```json
[
  {
    "id": 1,
    "name": "pikachu",
    "pokedex_number": 25,
    "height": 4,
    "weight": 60,
    "types": ["electric"],
    "abilities": ["static", "lightning-rod"]
  }
]
```

---

### Buscar Pokémon por ID (no banco)
```http
GET http://localhost:3005/pokemon/1
```

**Resposta:**
```json
{
  "id": 1,
  "name": "pikachu",
  "pokedex_number": 25,
  "height": 4,
  "weight": 60,
  "base_experience": 112,
  "sprite_front": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  "sprite_back": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
  "types": ["electric"],
  "abilities": ["static", "lightning-rod"],
  "stats": {
    "hp": 35,
    "attack": 55,
    "defense": 40,
    "special_attack": 50,
    "special_defense": 50,
    "speed": 90
  }
}
```

---

### Buscar Pokémons por Tipo
```http
GET http://localhost:3005/pokemon/type/fire
```

**Resposta:**
```json
[
  {
    "id": 2,
    "name": "charizard",
    "pokedex_number": 6,
    "types": ["fire", "flying"]
  }
]
```

---

### Importar Pokémons da API
```http
POST http://localhost:3005/pokemon/import?limit=50
```

**Resposta:**
```json
[
  {
    "id": 1,
    "name": "bulbasaur",
    "pokedex_number": 1
  },
  {
    "id": 2,
    "name": "ivysaur",
    "pokedex_number": 2
  }
]
```

**Nota:** Importa os primeiros N pokémons da PokeAPI e salva no banco.

---

### Deletar Pokémon do Banco
```http
DELETE http://localhost:3005/pokemon/1
```

**Resposta:** `204 No Content`

**Nota:** Só é possível deletar se o Pokémon não estiver associado a nenhum team (RESTRICT).

---

## Teams x Trainers

### Associar Trainer ao Team
```http
POST http://localhost:3005/teams/1/trainer
Content-Type: application/json

{
  "trainerId": 1
}
```

**Resposta:**
```json
{
  "id": 1,
  "team": {
    "id": 1,
    "name": "Team Rocket"
  },
  "trainer": {
    "id": 1,
    "name": "João Silva"
  },
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Regra:** Um team pode ter apenas 1 trainer. Tentativa de adicionar um segundo trainer retorna erro 409.

---

### Buscar Trainer do Team
```http
GET http://localhost:3005/teams/1/trainer
```

**Resposta:**
```json
{
  "id": 1,
  "name": "João Silva",
  "cep": "01310-100",
  "logradouro": "Av. Paulista",
  "bairro": "Bela Vista",
  "cidade": "São Paulo",
  "estado": "SP"
}
```

---

### Buscar Teams de um Trainer
```http
GET http://localhost:3005/teams/trainer/1
```

**Resposta:**
```json
[
  {
    "id": 1,
    "name": "Team Rocket",
    "status": true,
    "teamPokemons": [
      {
        "pokemon": {
          "id": 25,
          "name": "pikachu"
        }
      }
    ]
  }
]
```

**Regra:** Um trainer pode ter múltiplos teams.

---

### Remover Trainer do Team
```http
DELETE http://localhost:3005/teams/1/trainer
```

**Resposta:** `204 No Content`

---

## Teams x Pokemon

### Adicionar Pokémon ao Team por ID
```http
POST http://localhost:3005/teams/1/pokemon
Content-Type: application/json

{
  "pokemonId": 25
}
```

**Resposta:**
```json
{
  "id": 1,
  "team": {
    "id": 1,
    "name": "Team Rocket"
  },
  "pokemon": {
    "id": 25,
    "name": "pikachu"
  },
  "addedAt": "2024-01-01T00:00:00.000Z"
}
```

**Regras:**
- Máximo 5 pokémons por team
- Não permite duplicação do mesmo pokémon no team

---

### Adicionar Pokémon ao Team por Nome (busca na API)
```http
POST http://localhost:3005/teams/1/pokemon/search
Content-Type: application/json

{
  "pokemonName": "charizard"
}
```

**Resposta:**
```json
{
  "id": 2,
  "team": {
    "id": 1,
    "name": "Team Rocket"
  },
  "pokemon": {
    "id": 6,
    "name": "charizard"
  },
  "addedAt": "2024-01-01T00:00:00.000Z"
}
```

**Nota:** Se o pokémon não existir no banco, ele será buscado na PokeAPI e salvo automaticamente.

---

### Listar Pokémons do Team
```http
GET http://localhost:3005/teams/1/pokemon
```

**Resposta:**
```json
[
  {
    "id": 25,
    "name": "pikachu",
    "pokedex_number": 25,
    "height": 4,
    "weight": 60,
    "types": ["electric"],
    "sprite_front": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
  },
  {
    "id": 6,
    "name": "charizard",
    "pokedex_number": 6,
    "height": 17,
    "weight": 905,
    "types": ["fire", "flying"],
    "sprite_front": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
  }
]
```

---

### Remover Pokémon do Team
```http
DELETE http://localhost:3005/teams/1/pokemon/25
```

**Resposta:** `204 No Content`

---

### Listar Teams que possuem um Pokémon
```http
GET http://localhost:3005/teams/pokemon/25
```

**Resposta:**
```json
[
  {
    "id": 1,
    "name": "Team Rocket",
    "status": true,
    "teamTrainers": [
      {
        "trainer": {
          "id": 1,
          "name": "João Silva"
        }
      }
    ]
  }
]
```

---

## Erros Comuns

### Erro 400 - Bad Request
```json
{
  "statusCode": 400,
  "message": "O time Team Rocket já possui o máximo de 5 Pokémons",
  "error": "Bad Request"
}
```

### Erro 404 - Not Found
```json
{
  "statusCode": 404,
  "message": "Pokémon pikachus não encontrado na API",
  "error": "Not Found"
}
```

### Erro 409 - Conflict
```json
{
  "statusCode": 409,
  "message": "O Pokémon pikachu já está no time Team Rocket",
  "error": "Conflict"
}
```

---

## Regras de Negócio

### Teams x Trainers
- ✅ Um team pode ter **apenas 1 trainer**
- ✅ Um trainer pode ter **múltiplos teams**
- ✅ Ao deletar um team, a associação com o trainer é removida (CASCADE)
- ✅ Ao deletar um trainer, suas associações com teams são removidas (CASCADE)

### Teams x Pokemon
- ✅ Um team pode ter **no máximo 5 pokémons**
- ✅ Não é possível adicionar o **mesmo pokémon duas vezes** no mesmo team
- ✅ Ao deletar um team, as associações com pokémons são removidas (CASCADE)
- ✅ Ao tentar deletar um pokémon que está em algum team, a operação é **bloqueada** (RESTRICT)
- ✅ Pokémons podem ser adicionados por **ID** (se já existir no banco) ou por **nome** (busca na API se não existir)

### Pokemon
- ✅ Ao buscar um pokémon que não existe no banco, ele é **automaticamente buscado na PokeAPI** e salvo
- ✅ Pokémons podem ser importados em **lote** da PokeAPI
- ✅ Não é possível ter pokémons **duplicados** no banco (constraint unique no nome)

---

## Tecnologias Utilizadas

- **NestJS** - Framework Node.js
- **TypeORM** - ORM para banco de dados
- **MySQL** - Banco de dados relacional
- **Axios** - Cliente HTTP para consumir APIs externas
- **PokeAPI** - API pública de Pokémon
- **ViaCEP** - API pública de consulta de CEP

---

## Estrutura do Banco de Dados

### Tabelas Principais
- `trainers` - Treinadores
- `teams` - Times
- `pokemons` - Pokémons

### Tabelas de Relacionamento
- `team_trainers` - Associação entre teams e trainers (1:1)
- `team_pokemons` - Associação entre teams e pokémons (1:N, máx 5)

---

**Documentação gerada em:** 2024-01-01