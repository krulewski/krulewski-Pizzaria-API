import { useEffect, useState } from 'react'
import axios from 'axios'

type Order = {
  _id: string
  customerName: string
  items: string[]
  status: string
}

// 🔥 API ONLINE
const API_URL = 'https://krulewski-pizzaria-api.onrender.com'

function App() {
  const [orders, setOrders] = useState<Order[]>([])
  const [customerName, setCustomerName] = useState('')
  const [items, setItems] = useState('')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders`)
      setOrders(response.data)
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error)
    }
  }

  const createOrder = async () => {
    if (!customerName || !items) return

    try {
      await axios.post(`${API_URL}/orders`, {
        customerName,
        items: items.split(',')
      })

      setCustomerName('')
      setItems('')
      fetchOrders()
    } catch (error) {
      console.error('Erro ao criar pedido:', error)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.put(`${API_URL}/orders/${id}`, {
        status
      })

      fetchOrders()
    } catch (error) {
      console.error('Erro ao atualizar:', error)
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>🍕 Sistema de Pedidos</h1>

      <div style={{ marginBottom: '20px' }}>
        <h2>Novo Pedido</h2>

        <input
          type="text"
          placeholder="Nome do cliente"
          value={customerName}
          onChange={e => setCustomerName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Itens (ex: Pizza, Coca)"
          value={items}
          onChange={e => setItems(e.target.value)}
        />

        <button onClick={createOrder}>
          ➕ Criar Pedido
        </button>
      </div>

      <h2>Pedidos</h2>
      <p>Total: {orders.length}</p>

      {orders.map(order => (
        <div key={order._id}>
          <p><strong>Cliente:</strong> {order.customerName}</p>
          <p><strong>Itens:</strong> {order.items.join(', ')}</p>

          <p>
            <strong>Status:</strong>{' '}
            {order.status === 'PENDENTE' && '🟡 PENDENTE'}
            {order.status === 'EM_PREPARO' && '🔵 EM PREPARO'}
            {order.status === 'ENTREGUE' && '🟢 ENTREGUE'}
          </p>

          <button onClick={() => updateStatus(order._id, 'EM_PREPARO')}>
            🔵 Preparar
          </button>

          <button onClick={() => updateStatus(order._id, 'ENTREGUE')}>
            🟢 Entregar
          </button>
        </div>
      ))}
    </div>
  )
}

export default App