import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

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

class BookList extends Component {
    
    displayBooks() {
        var data = this.props.data;
        if (data.loading) {
            return (<div>Loading books...</div>);
        } else {
            return data.books.map((book,i) => {
                return (
                    <li key={i}>{book.name}</li>
                );
            })
        }
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <ul id="book-list">
                   {this.displayBooks()}
                </ul>
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);