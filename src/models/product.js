const { Sequelize, Model, DataTypes } = require('sequelize')

const createProductModel = (sequelize) => {
    class Product extends Model { }

    // return class' structure
    return Product.init({
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.BIGINT
        },
        fruit_id: {
            type: DataTypes.BIGINT
        },
        address_id: {
            type: DataTypes.BIGINT
        },
        title: {
            type: DataTypes.STRING
        },
        product_type: {
            type: DataTypes.TINYINT
        },
        weight: {
            type: DataTypes.DOUBLE
        },
        fruit_pct: {
            type: DataTypes.FLOAT
        },
        sugar_pct: {
            type: DataTypes.FLOAT
        },
        weight_avg: {
            type: DataTypes.FLOAT
        },
        diameter_avg: {
            type: DataTypes.FLOAT
        },
        price_init: {
            type: DataTypes.DOUBLE
        },
        price_step: {
            type: DataTypes.DOUBLE
        },
        price_cur: {
            type: DataTypes.DOUBLE
        },
        product_status: {
            type: DataTypes.TINYINT
        },
        date_created: {
            type: 'TIMESTAMP'
        }
    }, {
        sequelize,
        // name of the table in database
        tableName: 'product',
        // compulsary
        timestamps: false,
    })
}

module.exports = {
    createProductModel,
}