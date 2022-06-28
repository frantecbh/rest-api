const prisma = require("../prisma")


module.exports = {

    async listAllProducts(req, res, next) {

        const produtos = await prisma.produto.findMany()

        res.status(200).json({
            produtos
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


        res.status(200).json({ produto: produto })



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
                select: {
                    id: true,
                    nome: true,
                    preco: true,
                    created_at: true,


                }


            })

            return res.status(201).json({ produtos: produto })

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
                return res.status(400).json({ message: 'Product does not exists!' })
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

            return res.status(202).json({ produto: updateProduto })



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

            return res.status(202).json({ message: "Produto deletado com sucesso!" })



        } catch (error) {
            return res.status(error.status || 500).send({
                error
            })
        }


    }


}






