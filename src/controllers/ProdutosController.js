const prisma = require("../prisma")


module.exports = {

    async listAllProducts(req, res, next) {

        const produtos = await prisma.produto.findMany()

        const response = {

            produtos,
            quantidade: produtos.length,
            request: {
                tipo: 'GET',
                descricao: 'Retorna todo os produtos',
                url: `http://localhost:3001/api/listproduto/${produtos.id}`
            }


        }

        res.status(200).json({
            response
        })
    },

    async listProductEspecifico(req, res, next) {

        const id = req.params.id

        const produto = await prisma.produto.findUnique({
            where: {
                id: id,
            },
        })

        if (!produto) {
            return res.status(400).json({ message: 'Product does not exists!' })
        }
        const response = {
            status: "Produto criado com sucesso!",
            produto,
            request: {
                tipo: 'GET',
                descricao: 'Retorna o produto criado',
                url: `http://localhost:3001/api/listproduto/${produto.id}`
            }

        }




        res.status(200).json({ response })



    },

    async createProduct(req, res, next) {

        const { nome, preco } = req.body

        try {

            const productAlredyExists = await prisma.produto.findFirst({
                where: {
                    nome: {
                        equals: nome,
                        mode: 'insensitive'
                    }
                }
            })

            if (productAlredyExists) {
                return res.status(400).json({ message: 'Product already exists!' })
            }

            const produto = await prisma.produto.create({
                data: {
                    nome,
                    preco,

                },



            })

            const response = {
                message: "Produto criado com sucesso!",
                produto,
                request: {
                    tipo: 'POST',
                    descricao: 'Retorna o produto criado',
                    url: `http://localhost:3001/api/listprodutos`
                }


            }

            return res.status(201).json({ response })

        } catch (error) {

            return res.status(error.status || 500).send({
                error
            })

        }


    },

    async updateProduct(req, res, next) {


        const { nome, preco } = req.body
        const { id } = req.params


        try {

            const produto = await prisma.produto.findUnique({
                where: {
                    id: id
                }
            })

            if (!produto) {
                return res.status(404).json({ message: 'Product does not exists!' })
            }

            const updateProduto = await prisma.produto.update({
                where: {
                    id: produto.id
                },
                data: {
                    nome,
                    preco
                },
            })

            const response = {
                message: 'Produto atualizado com sucesso',
                produto: updateProduto,
                request: {
                    type: 'GET',
                    description: 'Retorna os detalhes de um produto específico',
                    url: `http://localhost:3001/api/listproduto/${produto.id}`


                }
            }
            return res.status(202).json({ response })



        } catch (error) {
            return res.status(error.status || 500).send({
                error
            })
        }


    },

    async deleteProduct(req, res, next) {


        const { id } = req.params


        try {

            const produto = await prisma.produto.findUnique({
                where: {
                    id: id
                }
            })

            if (!produto) {
                return res.status(400).json({ message: 'Product does not exists!' })
            }

            await prisma.produto.delete({
                where: {
                    id: produto.id
                }
            })


            const response = {
                message: 'Produto removido com sucesso',
                request: {
                    type: 'POST',
                    description: 'Insere um produto',
                    url: `http://localhost:3001/api/createproduto`,
                    body: {
                        nome: 'String',
                        preco: 'Number'
                    }
                }
            }
            return res.status(202).json({ response });



            // return res.status(202).json({ message: "Produto deletado com sucesso!" })



        } catch (error) {
            return res.status(error.status || 500).send({
                error
            })
        }


    }


}






