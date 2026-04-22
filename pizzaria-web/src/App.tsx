import { useEffect, useState } from 'react'
import axios from 'axios'

type Order = {
  _id: string
  customerName: string
  items: string[]
  status: string
}

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
      await axios.put(`${API_URL}/orders/${id}`, { status })
      fetchOrders()
    } catch (error) {
      console.error('Erro ao atualizar:', error)
    }
  }

  // 🔥 DELETE
  const deleteOrder = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/orders/${id}`)
      fetchOrders()
    } catch (error) {
      console.error('Erro ao deletar:', error)
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>🍕 Sistema de Pedidos</h1>

      <div>
        <input
          type="text"
          placeholder="Nome do cliente"
          value={customerName}
          onChange={e => setCustomerName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Itens (Pizza, Coca)"
          value={items}
          onChange={e => setItems(e.target.value)}
        />

        <button onClick={createOrder}>➕ Criar</button>
      </div>

      <h2>Pedidos ({orders.length})</h2>

      {orders.map(order => (
        <div key={order._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <p><strong>{order.customerName}</strong></p>
          <p>{order.items.join(', ')}</p>

          <p>
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

          <button
            onClick={() => deleteOrder(order._id)}
            style={{ color: 'red' }}
          >
            ❌ Deletar
          </button>
        </div>
      ))}
    </div>
  )
}

export default App