import "reflect-metadata";
import "dotenv/config";
import {createConnection} from "typeorm";
import { ApolloServer } from 'apollo-server-express';
import * as express from "express";
import {typeDefs} from './typeDefs';
import {resolvers} from './resolvers';
import * as session from "express-session";
var cors = require('cors'); 

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}: any)=>({req})
});

await createConnection();

const app = express();

app.use(cors());


app.use(session({
    secret: "thissupersecretpassword",
    resave: false,
    saveUninitialized: false
}));
server.applyMiddleware({ app, cors:{
  credentials: true,
  origin: "http://localhost:3000"
} });



app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://165.22.188.205:4000${server.graphqlPath}`)
)
}
startServer();