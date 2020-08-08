// library
const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('sequelize')

// middleware



const createAdminRouter = ({ Admin, Product, Fruit, ProductUpdateRequest, User }) => {
    const router = express.Router()

    // Review post by id
    router.get('/:id', async (req, res) => {
        Product.belongsTo(Fruit, { foreignKey: 'fruit_id' })
        Fruit.hasMany(Product , { foreignKey: 'fruit_id' })
        const products = await Product.findAll({
            where: { id: req.params.id },
            distinct: true,
            include: [{
                model: Fruit,
                required: true
            }]
        })
        if (products) {
            res.send(products)
        } else {
            res.sendStatus(404)
        }
    })

    //Review post
    router.post('/', async (req, res) => {
        const products = {
            product_id: req.body.product_id,
            admin_id: req.body.admin_id,
            title: req.body.title,
            weight: req.body.weight,
            fruit_pct: req.body.fruit_pct,
            sugar_pct: req.body.sugar_pct,
            weight_avg: req.body.weight_avg,
            diameter_avg: req.body.diameter_avg,
            price_init: req.body.price_init,
            price_step: req.body.price_step,
            notes: req.body.notes,
        }
        await ProductUpdateRequest.create(products)
            .then(data => res.send(data))
            .catch(err => {
                res.status(500).send({
                    message: err.message
                })
            })
    })

    //Screen name: Dashboard - 1
    //Function name: getAllProduct
    //Description: Get all product for displaying
    //Created by: HaPTH
    //Get all product to display into post dashboard page
    router.get('/', async (req, res) => {
        Product.belongsTo(Fruit, { foreignKey: 'fruit_id' })
        Fruit.hasMany(Product, { foreignKey: 'fruit_id' })

        Product.belongsTo(User, { foreignKey: 'user_id' })
        User.hasMany(Product, { foreignKey: 'user_id' })

        const products = await Product.findAll({
            distinct: true,
            attributes:['fruit_id','title','date_created','product_status'],
            include: [{
                model:  Fruit,
                required: true,
                attributes:['title']
            },{
                model:  User,
                required: true,
                attributes:['name']
            }]
        })
        
        if (products) {
            res.send(products)
        } else {
            res.sendStatus(404)
        }
    })

    return router
}

module.exports = {
    createAdminRouter,
}