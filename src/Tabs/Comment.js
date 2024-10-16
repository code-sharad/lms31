import React, { useState } from 'react';

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <div className='max-w-lg mx-auto p-4 bg-gray-100 rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold mb-4'>Comments</h1>
      <form onSubmit={handleSubmit} className='mb-4'>
        <textarea
          value={newComment}
          onChange={handleInputChange}
          className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
          placeholder='Add a comment...'
          rows='4'
        ></textarea>
        <button type='submit' className='mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
          Submit
        </button>
      </form>
      <ul className='space-y-4'>
        {comments.map((comment, index) => (
          <li key={index} className='p-4 bg-white rounded-lg shadow-md'>
            {comment}

            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comment;
