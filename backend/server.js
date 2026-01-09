import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import fs from 'fs'

const app = express()
const PORT = process.env.SERVER_PORT || 3000
const FILE_PATH = './data/pedidos.json'

app.use(cors())
app.use(express.json({ limit: '10kb' }))

app.get('/health', (req, res) => {
  res.status(200).send('OK')
})

app.get('/pedidos', (req, res) => {
  fs.readFile(FILE_PATH, 'utf8', (err, fileData) => {
    if (err || !fileData) {
      return res.json([])
    }
    try {
      res.json(JSON.parse(fileData))
    } catch (e) {
      res.json([])
    }
  })
})

app.post('/salvar', (req, res) => {
  const newOrder = req.body

  fs.readFile(FILE_PATH, 'utf8', (err, fileData) => {
    let orders = []

    if (!err && fileData) {
      try {
        orders = JSON.parse(fileData)
      } catch (e) {
        orders = []
      }
    }

    const finalOrder = {
      id: Date.now(),
      ...newOrder,
      status_realizado: false,
      status_chegou: false,
    }

    orders.push(finalOrder)

    fs.writeFile(FILE_PATH, JSON.stringify(orders, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error saving order:', writeErr)
        return res.status(500).send('Internal Server Error')
      }
      console.log('Order saved successfully!')
      res.status(200).send('Pedido registrado!')
    })
  })
})

app.patch('/pedidos/:id', (req, res) => {
  const idToEdit = Number(req.params.id)
  const updates = req.body

  fs.readFile(FILE_PATH, 'utf8', (err, fileData) => {
    if (err) return res.status(500).json({ error: 'Error reading database' })

    let orders = []
    try {
      orders = JSON.parse(fileData)
    } catch (e) {
      return res.status(500).json({ error: 'JSON Parse Error' })
    }

    const index = orders.findIndex((order) => order.id === idToEdit)

    if (index === -1) {
      return res.status(404).json({ error: 'Order not found' })
    }

    orders[index] = { ...orders[index], ...updates }

    fs.writeFile(FILE_PATH, JSON.stringify(orders, null, 2), (writeErr) => {
      if (writeErr)
        return res.status(500).json({ error: 'Error updating status' })
      res.json({ success: true })
    })
  })
})

app.delete('/pedidos/:id', (req, res) => {
  const idToDelete = Number(req.params.id)

  fs.readFile(FILE_PATH, 'utf8', (err, fileData) => {
    if (err) return res.status(500).json({ error: 'Error reading database' })

    let orders = []
    try {
      orders = JSON.parse(fileData)
    } catch (e) {
      return res.status(500).json({ error: 'JSON Parse Error' })
    }

    const filteredOrders = orders.filter((order) => order.id !== idToDelete)

    fs.writeFile(
      FILE_PATH,
      JSON.stringify(filteredOrders, null, 2),
      (writeErr) => {
        if (writeErr)
          return res.status(500).json({ error: 'Error saving deletion' })
        res.json({ success: true })
      }
    )
  })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`💜 Server running at http://localhost:${PORT}`)
  console.log(`Orders will be saved at: ${FILE_PATH}`)
})
