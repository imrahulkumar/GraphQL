import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import axios from 'axios';

const server = new ApolloServer({
  typeDefs: `


        type User {
          id: ID!
          name: String!
          username: String!
          email: String!
          phone: String!
          website: String!
        }

          type Todo {
          id: ID!
          title: String!
          completed: Boolean
          user: User
        }
        
        type Query {
            getTodos: [Todo]
            getAllUsers: [User]
            getAllUsersById(id: ID!): User

        }

        `,
  resolvers: {
    Todo: {
      user: async (todo) => (await (axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`))).data,
    },
    Query: {
      getTodos: async () => (await (axios.get('https://jsonplaceholder.typicode.com/todos'))).data,
      getAllUsers: async () => (await (axios.get('https://jsonplaceholder.typicode.com/users'))).data,
      getAllUsersById: async (parent, { id }) => (await (axios.get(`https://jsonplaceholder.typicode.com/users/${id}`))).data,

    }
  }
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);