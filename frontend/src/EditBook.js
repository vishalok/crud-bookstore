import React, { useEffect, useState } from 'react';

const EditBook = ({ bookId }) => {
  const [book, setBook] = useState({});
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await fetch(`http://localhost:4500/books/${bookId}`);
      const data = await response.json();
      setBook(data);
      setTitle(data.title);
      setAuthor(data.author);
      setDescription(data.description);
      setPrice(data.price);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleCancel = () => {
    window.location.href = '/';
  };


  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:4500/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author, description, price }),
      });
      if (response.ok) {
        // Update was successful, redirect to main page
        window.location.href = '/';
      } else {
        console.log('Update failed');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div>
      <h2>Edit Book</h2>
      <form>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleUpdate}>
          Update
        </button>
        <button type="button" onClick={handleCancel} className="btn btn-danger">
            Cancel
          </button>

      </form>
    </div>
  );
};

export default EditBook;
