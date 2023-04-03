# carefy-backend

Requisitos obedecidos:
 - CRUD
   - Criar paciente
      - endpoint: POST - /patients
        body: name, lastName, birthDate e disease
   - Listar pacientes
      - endpoint: GET - /patients?page={}&limit={}
   - Deletar paciente
      - endpoint: DELETE - /patients/{{patientId}}
   - Editar paciente
      - endpoint: PATCH - /patients/{{patientId}}
        body: name (opcional), lastName (opcional), birthDate (opcional) e disease (opcional)
 - Deploy
 
Requisitos não obedecidos:
 - Login com github (solicitei que me tirassem uma dúvida sobre isso, sem respostas)

Para acessar basta abrir esse link: [Live App](https://squid-app-r2xuu.ondigitalocean.app/)

## Como rodar
Clone o repositório
```
git clone https://github.com/augustosilas/carefy

cd carefy
```

Instale as dependências
```
npm install
```

Renomeie o arquivo .env.example para .env
Cole a url enviada na variável de ambiente DB_URL


Inicie o servidor
```
npm run dev
```

Caso queira buildar, execute
```
npm run build
```

Para iniciar o servidor a partir do build, execute
```
npm start
```
