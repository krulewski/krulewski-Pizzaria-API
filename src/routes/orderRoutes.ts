import { Router } from 'express'
import { createOrder, getOrders, updateOrderStatus, getOrderById, deleteOrder } from '../controllers/orderController'

const router = Router()

router.post('/orders', createOrder)
router.get('/orders', getOrders)
router.get('/orders/:id', getOrderById)
router.delete('/orders/:id', deleteOrder)

router.put('/orders/:id', updateOrderStatus)

export default router