const { Router } = require('express')

const routes = Router()


const produtos = require('../controllers/ProdutosController')

//rotas produto
routes.get('/listprodutos', produtos.listAllProducts)
routes.get('/listproduto/:id', produtos.listProductEspecifico)
routes.post('/createproduto', produtos.createProduct)
routes.patch('/updateproduto/:id', produtos.updateProduct)
routes.delete('/deleteproduto/:id', produtos.deleteProduct)











module.exports = routes;