import express from 'express'
import { connectDatabase } from './database/connection'
import orderRoutes from './routes/orderRoutes'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

// cria o servidor
const app = express()

// 👇 PRIMEIRO: middlewares
app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use(express.json())

// 👇 DEPOIS: rotas
app.use('/orders', orderRoutes)

// rota teste
app.get('/', (req, res) => {
  return res.json({ message: 'API da Pizzaria rodando 🍕' })
})

// conecta no banco
connectDatabase()

// inicia servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000')
})