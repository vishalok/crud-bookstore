import React, { useState } from 'react';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
 

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleCancel = () => {
    window.location.href = '/';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const bookData = {
      title,
      author,
      description,
      price: parseFloat(price),
    };

    try {
      const response = await fetch('http://localhost:4500/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        // Book added successfully, handle the response or redirect to another page
        window.location.href = '/';
        console.log('Book added successfully');
      } else {
        // Handle error response
        console.log('Failed to add book');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4">Add Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={author}
            onChange={handleAuthorChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={handlePriceChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Book
        </button>
        <button type="button" onClick={handleCancel} className="btn btn-danger">
            Cancel
          </button>
      </form>
    </div>
  );
}

export default AddBook;
