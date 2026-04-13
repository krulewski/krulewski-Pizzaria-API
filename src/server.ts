
import express from 'express'
import { connectDatabase } from './database/connection'
import orderRoutes from './routes/orderRoutes'
import dotenv from 'dotenv'
dotenv.config()

// cria a aplicação (servidor)
const app = express()

app.use(express.json())
app.use(orderRoutes)

// permite que a API receba JSON no body das requisições
app.use(express.json())

// rota GET na raiz "/"
app.get('/', (req, res) => {
  // retorna um JSON como resposta
  return res.json({ message: 'API da Pizzaria rodando 🍕' })
})

connectDatabase()
// inicia o servidor na porta 3000
app.listen(3000, () => {
  // mostra mensagem no terminal quando subir
  console.log('Servidor rodando em http://localhost:3000')
})