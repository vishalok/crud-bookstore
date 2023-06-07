
import React, { useEffect, useState } from 'react';
import AddBook from './AddBook';

function App() {
  const [books, setBooks] = useState([]);
  const [showAddBookForm, setShowAddBookForm] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:4500/books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  // const handleAddBook = () => {
  //   // Handle logic to add a book
  //   console.log('Add Book button clicked');
  // };
  const handleEditBook = (bookId) => {
    // Handle logic to edit a book
    console.log('Edit Book:', bookId);
  };

  const handleDeleteBook = (bookId) => {
    // Handle logic to delete a book
    console.log('Delete Book:', bookId);
  };
  
  const handleAddBook = () => {
    setShowAddBookForm(true);
  };

  return (
    <div className="container">
      <h1 className="mt-4">Bookstore</h1>
      {!showAddBookForm && (
        <button className="btn btn-primary mt-3 mb-2" onClick={handleAddBook}>
          Add Book
        </button>
      )}
      {showAddBookForm ? (
        <AddBook />
      ) : (
        <div>
          <h2 className="mt-4">All Books</h2>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.description}</td>
                  <td>{book.price}</td>
                  <td>
                    <button
                      className="btn btn-primary mr-2"
                      onClick={() => handleEditBook(book._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteBook(book._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


export default App;
