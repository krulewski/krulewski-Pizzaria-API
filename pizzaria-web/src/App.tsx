import { useEffect, useState } from 'react'
import axios from 'axios'

type Order = {
  _id: string
  customerName: string
  items: string[]
  status: string
}

function App() {
  const [orders, setOrders] = useState<Order[]>([])
  const [customerName, setCustomerName] = useState('')
  const [items, setItems] = useState('')

  // buscar pedidos
  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/orders')
      setOrders(response.data)
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error)
    }
  }

  // criar pedido
  const createOrder = async () => {
    if (!customerName || !items) return

    try {
      await axios.post('http://127.0.0.1:3000/orders', {
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

  // atualizar status
  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.put(`http://127.0.0.1:3000/orders/${id}`, {
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

      {/* FORMULÁRIO */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Novo Pedido</h2>

        <input
          type="text"
          placeholder="Nome do cliente"
          value={customerName}
          onChange={e => setCustomerName(e.target.value)}
          style={{
            display: 'block',
            marginBottom: '10px',
            width: '100%',
            padding: '8px'
          }}
        />

        <input
          type="text"
          placeholder="Itens (ex: Pizza, Coca)"
          value={items}
          onChange={e => setItems(e.target.value)}
          style={{
            display: 'block',
            marginBottom: '10px',
            width: '100%',
            padding: '8px'
          }}
        />

        <button onClick={createOrder}>
          ➕ Criar Pedido
        </button>
      </div>

      <h2>Pedidos</h2>
      <p>Total: {orders.length}</p>

      {orders.map(order => (
        <div
          key={order._id}
          style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '15px',
            marginBottom: '15px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <p><strong>Cliente:</strong> {order.customerName}</p>

          <p><strong>Itens:</strong> {order.items.join(', ')}</p>

          <p>
            <strong>Status:</strong>{' '}
            {order.status === 'PENDENTE' && '🟡 PENDENTE'}
            {order.status === 'EM_PREPARO' && '🔵 EM PREPARO'}
            {order.status === 'ENTREGUE' && '🟢 ENTREGUE'}
          </p>

          <div style={{ marginTop: '10px' }}>
            <button
              onClick={() => updateStatus(order._id, 'EM_PREPARO')}
              style={{ marginRight: '10px' }}
            >
              🔵 Preparar
            </button>

            <button
              onClick={() => updateStatus(order._id, 'ENTREGUE')}
            >
              🟢 Entregar
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App