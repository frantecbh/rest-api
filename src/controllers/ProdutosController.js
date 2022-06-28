

module.exports = {

    async listAllProducts(req, res, next) {

        res.status(200).json({
            mensagem: 'Lista de produtos'
        })
    },

    async listProductEspecifico(req, res, next) {

        const id = req.params.id_produto

        if (id === 'teste') {
            res.status(200).json({
                mensagem: 'id descoberto com sucesso',
                id: id
            })
        } else {
            res.status(200).json({
                mensagem: `id passado ${id}`,

            })
        }
    },

    async createProduct(req, res, next) {

        const { nome, preco } = req.body

        const produto = {
            nome,
            preco
        }

        res.status(201).json({
            mensagem: 'Produto Criado',
            produto
        })
    },



}






