import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import fs from 'fs'

const app = express()
const PORT = process.env.SERVER_PORT || 3000
const FILE_PATH = './data/pedidos.json'

app.use(cors())
app.use(express.json({ limit: '10kb' }))

app.get('/pedidos', (req, res) => {
  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err || !data) {
      return res.json([])
    }
    res.json(JSON.parse(data))
  })
})

app.post('/salvar', (req, res) => {
  const novoPedido = req.body

  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    let listaPedidos = []

    if (!err && data) {
      try {
        listaPedidos = JSON.parse(data)
      } catch (e) {
        listaPedidos = []
      }
    }

    const pedidoFinal = {
      id: Date.now(),
      ...novoPedido,
    }

    listaPedidos.push(pedidoFinal)

    fs.writeFile(FILE_PATH, JSON.stringify(listaPedidos, null, 2), (err) => {
      if (err) {
        console.error('Erro ao salvar:', err)
        return res.status(500).send('Erro interno no servidor')
      }
      console.log('Pedido salvo com sucesso!')
      res.status(200).send('Pedido registrado!')
    })
  })
})

app.listen(PORT, () => {
  console.log(`💜 Servidor rodando em http://localhost:${PORT}`)
  console.log(`Os pedidos serão salvos em: ${FILE_PATH}`)
})
