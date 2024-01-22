<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Teslo API

1. Levantar la base de datos
```
docker-compose up -d
```

2. Configurarlas variables de entorno requeridas
```
cp .env.example .env
```

3. Iniciar el proyecto en modo desarrollo
```
yarn start:dev
```

4. Popular la base de datos
```
GET http://localhost:3000/api/seed
```
