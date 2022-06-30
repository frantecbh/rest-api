const { Router } = require('express')

const routes = Router()


const produtos = require('../controllers/ProdutosController')
const pedidos = require('../controllers/PedidosController')

//rotas produto
routes.get('/listprodutos', produtos.listAllProducts)
routes.get('/listproduto/:id', produtos.listProductEspecifico)
routes.post('/createproduto', produtos.createProduct)
routes.patch('/updateproduto/:id', produtos.updateProduct)
routes.delete('/deleteproduto/:id', produtos.deleteProduct)


//rotas pedidos
routes.post('/createpedido', pedidos.createPedido)
routes.get('/listpedidos', pedidos.listAllPedidos)
routes.get('/listpedido/:id', pedidos.listProductEspecifico)
routes.delete('/deletepedido/:id', pedidos.deletePedidos)






module.exports = routes;