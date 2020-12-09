require("dotenv/config");
const express = require("express");
const {ApolloServer} = require("apollo-server-express");
const models = require("./models");
const {typeDefs, resolvers} = require("./graphql");
const cors = require("cors");

const products = require("./data/Lubo/products.json");
const images = require("./data/Lubo/images.json");

async function connectDB(){
    await models.sequelize.authenticate();
    await models.sequelize.sync();
}

connectDB();


const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use("/public", express.static("./public"));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        return {
            models
        };
    }
})

app.get("/", async (req, res) => {
    try {
        await models.Products.bulkCreate(products);
        await models.Images.bulkCreate(images);
    }
 
    catch(e) {
        console.log(e.message);
    }
    // const images = products.map(item => ({
    //     url: item.image,
    //     product_id: item.id
    // }))


    return res.send("a")
})

server.applyMiddleware({app})


app.listen(PORT, () => {
    console.log("server listening...");
})