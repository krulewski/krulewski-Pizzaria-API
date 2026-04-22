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
      const res = await axios.get(`${API_URL}/orders`)
      setOrders(res.data)
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

  const deleteOrder = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/orders/${id}`)
      fetchOrders()
    } catch (error) {
      console.error('Erro ao deletar:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-3xl font-bold text-center mb-6">
          🍕 Sistema de Pedidos
        </h1>

        {/* FORM */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-3">Novo Pedido</h2>

          <input
            className="w-full border p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Nome do cliente"
            value={customerName}
            onChange={e => setCustomerName(e.target.value)}
          />

          <input
            className="w-full border p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Itens (Pizza, Coca)"
            value={items}
            onChange={e => setItems(e.target.value)}
          />

          <button
            onClick={createOrder}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
          >
            ➕ Criar Pedido
          </button>
        </div>

        {/* LISTA */}
        <h2 className="text-xl font-semibold mb-3">
          Pedidos ({orders.length})
        </h2>

        <div className="space-y-4">
          {orders.map(order => (
            <div
              key={order._id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <p className="font-bold text-lg">{order.customerName}</p>

              <p className="text-gray-600">
                {order.items.join(', ')}
              </p>

              {/* STATUS */}
              <p className="mt-2">
                {order.status === 'PENDENTE' && (
                  <span className="text-yellow-600 font-semibold">
                    🟡 PENDENTE
                  </span>
                )}

                {order.status === 'EM_PREPARO' && (
                  <span className="text-blue-600 font-semibold">
                    🔵 EM PREPARO
                  </span>
                )}

                {order.status === 'ENTREGUE' && (
                  <span className="text-green-600 font-semibold">
                    🟢 ENTREGUE
                  </span>
                )}
              </p>

              {/* BOTÕES */}
              <div className="mt-3 flex gap-2 flex-wrap">
                <button
                  onClick={() => updateStatus(order._id, 'EM_PREPARO')}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                  Preparar
                </button>

                <button
                  onClick={() => updateStatus(order._id, 'ENTREGUE')}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                >
                  Entregar
                </button>

                <button
                  onClick={() => deleteOrder(order._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default App