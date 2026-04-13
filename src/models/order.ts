import mongoose from 'mongoose'

// define estrutura do pedido
const OrderSchema = new mongoose.Schema({

  // nome do cliente
  customerName: {
    type: String,
    required: true
  },

  // itens do pedido (ex: pizza, bebida)
  items: {
    type: [String],
    required: true
  },

  // status do pedido
  status: {
  type: String,
  enum: ['PENDENTE', 'EM_PREPARO', 'ENTREGUE'],
  default: 'PENDENTE'
},

  // data de criação
  createdAt: {
    type: Date,
    default: Date.now
  }

})

// exporta o modelo
export const Order = mongoose.model('Order', OrderSchema)