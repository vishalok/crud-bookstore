import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function EditBook({ match }) {
  const [book, setBook] = useState({});
  const history = useHistory();

  useEffect(() => {
    fetchBook(match.params.id);
  }, [match.params.id]);

  const fetchBook = async (id) => {
    try {
      const response = await fetch(`http://localhost:4500/books/${id}`);
      const data = await response.json();
      setBook(data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:4500/books/${book._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });
      if (response.ok) {
        console.log('Book updated successfully');
        history.push('/'); // Redirect to the main page after update
      } else {
        console.log('Failed to update book');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="container">
      <h1>Edit Book</h1>
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={book.title || ''}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={book.author || ''}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={book.description || ''}
            onChange={(e) => setBook({ ...book, description: e.target.value })}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={book.price || ''}
            onChange={(e) => setBook({ ...book, price: e.target.value })}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </div>
  );
}

export default EditBook;
