import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

const getBooksQuery = gql`
  {
      books{
          name
          genre
          author{
              name
          }
      }
  }
`

const addBookMutation = gql`
mutation {
    addBook(name:"", genre: "", authorId:""){
      name
      id
    }
}

`

export { getAuthorsQuery, getBooksQuery, addBookMutation } 