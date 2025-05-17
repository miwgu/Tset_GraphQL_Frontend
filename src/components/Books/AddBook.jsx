import React, { useState } from 'react';
import './AddBook.css';
import { useDataFetch } from '../Data/DataFetchProvider';
import { GET_BOOKS } from '../Data/DataFetchProvider';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [category, setCategory] = useState('');
  const [sensitiveNotes, setSensitiveNotes] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const { useAddBook, useGetBooks } = useDataFetch();
  const [addBook, { loading, error }] = useAddBook();
  const { data: existingData } = useGetBooks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBook({
      variables: { 
        title, author,isbn, category, sensitiveNotes , thumbnailUrl
      },
      update(cache, { data: { createBook } }) {
        if (!existingData || !existingData.books) return;

        cache.writeQuery({
          query: GET_BOOKS, 
          data: {
            books: [...existingData.books, createBook],
          },
        });
      }
    });
    setTitle('');
    setAuthor('');
    setThumbnailUrl('');
    setIsbn('');
    setCategory('');
    setSensitiveNotes('');
  };

  return (
    <div className="add-book-form-container">
      <form className="add-book-form" onSubmit={handleSubmit}>
        <h3>Add New Book</h3>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>ISBN:</label>
          <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Sensitive Notes:</label>
          <textarea value={sensitiveNotes} onChange={(e) => setSensitiveNotes(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Thumbnail URL:</label>
          <input type="url" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Book'}
        </button>
        {error && <p className="error">Something went wrong. Please try again.</p>}
      </form>
    </div>
  );
}

export default AddBook;

