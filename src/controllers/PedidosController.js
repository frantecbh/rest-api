const prisma = require("../prisma")


module.exports = {

    async listAllPedidos(req, res, next) {

        const pedidos = await prisma.pedido.findMany({
            include: {
                produto: true
            }
        })

        const response = {
            pedidos,
            quantidade: pedidos.length,
            request: {
                tipo: 'GET',
                descricao: 'Retorna todos os pedidos',
                url: `http://localhost:3001/api/listpedidos`
            }
        }

        res.status(200).json({
            response
        })
    },


    async createPedido(req, res, next) {

        const { produto_id, quantidade } = req.body

        try {


            const result = await prisma.produto.findUnique({
                where: {
                    id: produto_id
                },
            })

            if (!result) {
                return res.status(400).json({ message: 'Produto nao existe!' })
            }

            const pedido = await prisma.pedido.create({
                data: {
                    quantidade,
                    produto_id,

                },
                select: {
                    id: true,
                    produto_id: true,
                    quantidade: true,
                    created_at: true,


                }


            })

            const response = {
                message: "Pedido criado com sucesso!",
                pedido,
                request: {
                    tipo: 'GET',
                    descricao: 'Retorna todos os pedidos',
                    url: `http://localhost:3001/api/listpedidos`
                }

            }

            return res.status(201).json({ response })

        } catch (error) {

            return res.status(error.status || 500).send({
                error
            })

        }


    },

    async listProductEspecifico(req, res, next) {

        const id = req.params.id

        const pedido = await prisma.pedido.findUnique({
            where: {
                id: id,
            },
        })

        if (!pedido) {
            return res.status(400).json({ message: 'Pedido nao existe!' })
        }
        const response = {

            pedido,
            request: {
                tipo: 'GET',
                descricao: 'Retorna todos os pedidos',
                url: `http://localhost:3001/api/listpedidos`
            }


        }




        res.status(200).json({ response })



    },

    async deletePedidos(req, res, next) {


        const { id } = req.params


        try {

            const pedido = await prisma.pedido.findUnique({
                where: {
                    id: id
                }
            })

            if (!pedido) {
                return res.status(400).json({ message: 'Pedido não existe!' })
            }

            await prisma.pedido.delete({
                where: {
                    id: pedido.id
                }
            })


            const response = {
                message: 'Pedido removido com sucesso',
                request: {
                    type: 'POST',
                    description: 'Inserir um pedido novo',
                    url: `http://localhost:3001/api/createpedido`,
                    body: {
                        produto_id: 'Number',
                        quantidade: 'Number'
                    }
                }
            }
            return res.status(202).json({ response });



            // return res.status(202).json({ message: "Produto deletado com sucesso!" })



        } catch (error) {
            return res.status(error || 500).send({
                error
            })
        }


    }


}