import { Request, Response } from 'express'
import { Order } from '../models/order'

// ✅ criar pedido
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { customerName, items } = req.body

    if (!customerName || !items || items.length === 0) {
      return res.status(400).json({ error: 'Dados inválidos' })
    }

    const order = await Order.create({
      customerName,
      items,
      status: 'PENDENTE' // 🔥 garante padrão
    })

    return res.status(201).json(order)

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro ao criar pedido' })
  }
}

// ✅ listar pedidos
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }) // 🔥 mais recente primeiro
    return res.json(orders)

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro ao buscar pedidos' })
  }
}

// ✅ atualizar status
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
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
    console.error(error)
    return res.status(500).json({ error: 'Erro ao atualizar pedido' })
  }
}

// ✅ buscar por ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const order = await Order.findById(id)

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' })
    }

    return res.json(order)

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro ao buscar pedido' })
  }
}

// 🔥 DELETAR pedido
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const order = await Order.findByIdAndDelete(id)

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' })
    }

    return res.json({ message: 'Pedido deletado com sucesso' })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro ao deletar pedido' })
  }
}