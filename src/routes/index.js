const { Router } = require('express')

const routes = Router()


const products = require('../controllers/ProdutosController')


routes.get('/produto', products.listAllProducts)
routes.get('/produto/:id_produto', products.listProductEspecifico)
routes.post('/produto', products.createProduct)










module.exports = routes;