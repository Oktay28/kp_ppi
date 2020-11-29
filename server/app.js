require("dotenv/config");
const express = require("express");
const {ApolloServer} = require("apollo-server-express");
const models = require("./models");
const {typeDefs, resolvers} = require("./graphql");
const cors = require("cors");

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

app.get("/", (req, res) => {
    return res.send("asd")
})

server.applyMiddleware({app})

app.listen(PORT, () => {
    console.log("server listening...");
})