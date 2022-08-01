import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/schema";
import connectDB from "./db";
import { authenticate } from "./middlewares/auth";

connectDB();
const app = express();
const PORT = 3000;

app.use(authenticate);

app.get('/', (_req, res) => {
    res.send('Hello world! Welcome to my first page')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(PORT);

console.log(`Serving on port ${PORT}`);