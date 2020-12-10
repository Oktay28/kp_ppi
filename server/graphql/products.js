const {gql} = require("apollo-server-express");

const productType = gql`
    
    type Product {
        id: ID!
        name: String
        short_text: String
        price: String
        description: String
        image: String
        old_price: String
        Favourites: Favourite
        category_id: ID
        is_featured: Int
        images: [Image]
    }

    type Products {
        products: [Product]!
        count: Int!
    }

    input ProductsFilter {
        name: String
        category_id: ID
        is_featured: Int
        is_new: Int
        min: Int
        max: Int
        page: Int
        limit: Int
        discount: Int
    }

    extend type Query {
        products(filter: ProductsFilter): Products
        product(id: ID!, userId: ID): Product
        cartItems(ids: [ID]!): [Product]
        featuredProducts: [Product]
    }

`
function formatDate1(d) {
    d.setDate(d.getDate() + 1)
    return `${d.getFullYear()}-${d.getUTCMonth() + 1}-${`${d.getUTCDate() < 10 ? `0${d.getUTCDate()}` : d.getUTCDate()}`}`
}

const productQuery = {
    product: async(parent, {id, userId}, {models}) => {
        let include = [];
        if(userId) {
            include = [
                {
                    model: models.Favourites,
                    required: false,
                    where: {
                        product_id: id,
                        user_id: userId
                    }
                }
            ];
        }
        const product = await models.Products.findOne({
            where: {
                id
            },
            include,
            nest: true,
            raw: true
        });
        let images = [];
        if(product) {
            images = await models.Images.findAll({
                where: {
                    product_id: product.id
                }
            })
        }
        product.images = images;
        return product;
    },
    products: async(parent, {filter}, {models}) => {
        const where = {};

        if(filter.name) {
            where.name = models.Sequelize.where(
                models.Sequelize.fn('lower', models.Sequelize.col('Products.name')),
                {
                  [models.Sequelize.Op.like]: `%${filter.name}%`
                }
            )
        }



        if(filter.category_id) {
            where.category_id = filter.category_id;
        }

        if(filter.is_featured) {
            where.is_featured = filter.is_featured
        }

        if(filter.discount) {

            where.old_price = {
                [models.Sequelize.Op.not]: null
            }
        }
        
        if(filter.is_new) {
            const d = new Date();
            d.setDate(d.getDate() - 31)
            console.log(formatDate1(d), formatDate1(new Date()))
            where.createdAt = {
                [models.Sequelize.Op.between]: [formatDate1(d), formatDate1(new Date())]
            }
        }

        where.price = {
            [models.Sequelize.Op.between]: [filter.min || 0, filter.max || 10000]
        }
        
        const products = await models.Products.findAll({
            where,
            raw: true,
            nest: true,
            limit: (filter.limit || 30),
            include: [
                {
                    model: models.Category,
                    required: false
                }
            ],
            offset: ((filter.page || 1) - 1) * (filter.limit || 30)
        })
        console.log(filter.limit || 30)
        const count = await models.Products.count({
            where
        })

        return {
            products,
            count
        }
    },
    cartItems: async(parent, {ids}, {models}) => {

        const products = await models.Products.findAll({
            where: {
                id: ids
            }
        })

        return products;
    },
    featuredProducts: async(parent, args, {models}) => {
        const products = await models.Products.findAll({
            raw: true,
            where: {
                is_featured: 1
            }
        })

        return products;
    }
}

module.exports = {
    productType,
    productQuery
}