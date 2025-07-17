### Usage

nota : nécessite node.js >= 24

```bash
cd backend
npm install
docker run --name some-mongo -d mongo:latest -p 21664:27017
node .
```

L'application est accessible sur `localhost:3000`
