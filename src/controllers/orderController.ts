import { Request, Response } from 'express'
import { Order } from '../models/order'

// função para criar pedido
export const createOrder = async (req: Request, res: Response) => {
  try {
    // pega os dados enviados no body
    const { customerName, items } = req.body

    // validação simples
    if (!customerName || !items || items.length === 0) {
      return res.status(400).json({ error: 'Dados inválidos' })
}

    // cria o pedido no banco
    const order = await Order.create({
      customerName,
      items
    })

    // retorna o pedido criado
    return res.status(201).json(order)

  } catch (error) {
    // caso dê erro
    return res.status(500).json({ error: 'Erro ao criar pedido' })
  }
}

// listar todos os pedidos
export const getOrders = async (req: Request, res: Response) => {
  try {
    // busca todos no banco
    const orders = await Order.find()

    // retorna a lista
    return res.json(orders)

  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar pedidos' })
  }
}

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    console.log('CHEGOU NO UPDATE')
    console.log('ID:', req.params.id)
    console.log('BODY:', req.body)

    const { id } = req.params
    const { status } = req.body

    const order = await Order.findById(id)

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' })
    }

    order.status = status
    await order.save()

    return res.json(order)

  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar pedido' })
  }
}

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const order = await Order.findById(id)

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' })
    }

    return res.json(order)

  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar pedido' })
  }
}

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const order = await Order.findByIdAndDelete(id)

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' })
    }

    return res.json({ message: 'Pedido deletado com sucesso' })

  } catch (error) {
    return res.status(500).json({ error: 'Erro ao deletar pedido' })
  }
}