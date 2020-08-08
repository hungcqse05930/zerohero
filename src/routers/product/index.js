const express = require('express')
const bodyParser = require('body-parser')
const { Sequelize,Op } = require('sequelize');
// const timediff = require('timediff');

const createProductRouter = ({ Product, User, Auction, Address, ProductMedia, Fruit }) => {
    const router = express.Router()

    // APPROVED
    // get product by id
    router.get('/id/:id', async (req, res) => {
        // find by primary key = find by id
        const product = await Product.findByPk(req.params.id)
        if (product) {
            res.send(product)
        } else {
            res.sendStatus(404)
        }
    })

    // APPROVED
    // Create Product  cần check
    router.post('/', async (req, res) => {
        const product = {
            user_id: req.body.user_id,
            fruit_id: req.body.fruit_id,
            address_id: req.body.address_id,
            title: req.body.title,
            weight: req.body.weight,
            fruit_pct: req.body.fruit_pct,
            sugar_pct: req.body.sugar_pct,
            weight_avg: req.body.weight_avg,
            diameter_avg: req.body.diameter_avg,
            price_init: req.body.price_init,
            price_step: req.body.price_step,
            price_cur: req.body.price_cur,
            product_type: req.body.product_status,
            product_status: req.body.product_status
        }

        await Product.create(product)
            .then(data => res.send(data))
            .catch(err => {
                res.status(500).send({
                    message: err.message
                })
            })
    })

    // APPROVED
    // get GetIdProductAndIdUser after create product chưa hoàn thành
    // get user id and product id of the latest post posted by this user
    router.get('/user/latest/:id', async (req, res) => {
        // find by primary key = find by id
        // const product = await 
        Product.findOne(
            {
                where: {
                    user_id: req.params.id
                },
                order: [
                    ['id', 'DESC']
                ],
                attributes: ['id', 'user_id']
            }
        ).then(product => {
            if (!product) {
                res.sendStatus(404)
            } else {
                res.send(product)
            }
        }).catch(error => {
            res.sendStatus(500).json({
                error: error.message
            })
        })

        // if (product) {
        //     res.send(product)
        // } else {
        //     res.sendStatus(404)
        // }
    })

    // get all products
    router.get('/', async (req, res) => {
        // offset: number of records you skip
        const offset = Number.parseInt(req.query.offset) || 0
        // limit: number of records you get
        const limit = Number.parseInt(req.query.limit) || 10

        const products = await Product.findAll({ offset, limit })

        if (products) {
            res.send(products)
        } else {
            res.sendStatus(404)
        }
    })

    // PENDING
    // !! move to admin
    // !! add fruit phải có cả fruit id
    // get post and user by id
    // router.get('/product/:id', async (req, res) => {
    //     Product.belongsTo(User, { foreignKey: 'user_id' })
    //     User.hasMany(Product)
    //     const products = await Product.findAll({
    //         where: { id: req.params.id },
    //         include: [
    //             {
    //                 model: User,
    //                 required: false,
    //             }]
    //     })
    //     if (products) {
    //         res.send(products)
    //     } else {
    //         res.sendStatus(404)
    //     }
    // })

    // PENDING
    // Chưa lấy được datediff
    // sequelize is not defined
    // get top 10 post from db (kiêm luôn Get newest post)
    router.get('/latest', async (req, res) => {
        // product 1 - n auction
        Product.hasMany(Auction, { foreignKey: 'product_id' })
        Auction.belongsTo(Product, { foreignKey: 'product_id' })

        // address 1 - n product
        Address.hasMany(Product, { foreignKey: 'address_id' })
        Product.belongsTo(Address, { foreignKey: 'address_id' })

        // product 1 - n product_media
        Product.hasMany(ProductMedia, { foreignKey: 'product_id' })
        ProductMedia.belongsTo(Product, { foreignKey: 'product_id' })

        const products = await Product.findAll({
            attributes: ['title', 'id', 'price_cur'], 
            limit: 10,
            include: [{
                model: Auction,
                attributes: ['views' , [Sequelize.fn('timediff', Sequelize.col('date_created', Sequelize.literal('CURRENT_TIMESTAMP'))) , 'remain' ]],
                order: ['views', 'DESC'],
                required: true,
            },
            {
                model: Address,
                attributes: ['province'],
                required: true
            },
            {
                model: ProductMedia,
                attributes: ['media_url'],
                required: true
            }]
        })
        if (products) {
            res.send(products)
        } else {
            res.sendStatus(404)
        }
    })

    //deleteProductById

    return router
}

module.exports = {
    createProductRouter
}
