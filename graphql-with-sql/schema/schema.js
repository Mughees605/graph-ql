const graphql = require('graphql');
const _ = require('lodash');
const { Client } = require('pg');

const connectionString = ''
const client = new Client({
    connectionString,
})

client.connect((err) => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected')
    }
})

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        user_id: { type: GraphQLID },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },
        workspace: {
            type: WorkspaceType,
            resolve(parent, args) {
                const queryText = `SELECT * FROM public."Workspace" WHERE user_id = '${parent.user_id}'`;
                return client.query(queryText).then((d) => {
                    return d.rows[0]
                })
            }
        }
    })
})

const WorkspaceType = new GraphQLObjectType({
    name: 'WorkspaceType',
    fields: () => ({
        user_id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                const userQuery = `SELECT * FROM users WHERE user_id = '${args.id}'`
                return client.query(userQuery).then((d) => {
                    return d.rows[0]
                })
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                const queryText = `SELECT * FROM users`;
                return client.query(queryText).then((d) => {
                    return d.rows
                })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})