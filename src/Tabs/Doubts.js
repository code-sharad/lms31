import React, { useState } from 'react';

const Doubts = () => {
  const [doubts, setDoubts] = useState([]);
  const [newDoubt, setNewDoubt] = useState('');
  const [newSolution, setNewSolution] = useState({});
  const [newReply, setNewReply] = useState({});

  const handleDoubtChange = (e) => {
    setNewDoubt(e.target.value);
  };

  const handleSolutionChange = (e, index) => {
    setNewSolution({ ...newSolution, [index]: e.target.value });
  };

  const handleReplyChange = (e, doubtIndex, solIndex) => {
    setNewReply({ ...newReply, [`${doubtIndex}-${solIndex}`]: e.target.value });
  };

  const handleDoubtSubmit = (e) => {
    e.preventDefault();
    if (newDoubt.trim() !== '') {
      setDoubts([...doubts, { doubt: newDoubt, solutions: [] }]);
      setNewDoubt('');
    }
  };

  const handleSolutionSubmit = (e, index) => {
    e.preventDefault();
    if (newSolution[index] && newSolution[index].trim() !== '') {
      const updatedDoubts = doubts.map((doubt, i) => 
        i === index ? { ...doubt, solutions: [...doubt.solutions, { text: newSolution[index], replies: [] }] } : doubt
      );
      setDoubts(updatedDoubts);
      setNewSolution({ ...newSolution, [index]: '' });
    }
  };

  const handleReplySubmit = (e, doubtIndex, solIndex) => {
    e.preventDefault();
    const replyKey = `${doubtIndex}-${solIndex}`;
    if (newReply[replyKey] && newReply[replyKey].trim() !== '') {
      const updatedDoubts = doubts.map((doubt, i) => {
        if (i === doubtIndex) {
          const updatedSolutions = doubt.solutions.map((solution, j) => 
            j === solIndex ? { ...solution, replies: [...solution.replies, newReply[replyKey]] } : solution
          );
          return { ...doubt, solutions: updatedSolutions };
        }
        return doubt;
      });
      setDoubts(updatedDoubts);
      setNewReply({ ...newReply, [replyKey]: '' });
    }
  };

  return (
    <div className='max-w-3xl max-h-50 mx-auto p-6 bg-gray-100 rounded-lg shadow-md overflow-scroll '>
      <h1 className='text-2xl font-bold mb-4'>Doubts</h1>
      <form onSubmit={handleDoubtSubmit} className='mb-4'>
        <textarea
          value={newDoubt}
          onChange={handleDoubtChange}
          className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
          placeholder='Ask a doubt...'
          rows='4'
        ></textarea>
        <button type='submit' className='mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
          Submit Doubt
        </button>
      </form>
      <ul className='space-y-4'>
        {doubts.map((doubt, index) => (
          <li key={index} className='p-4 bg-slate-400 rounded-lg shadow-md'>
            <p className='text-gray-900 mb-2'>{doubt.doubt}</p>
            <form onSubmit={(e) => handleSolutionSubmit(e, index)} className='mb-4'>
              <textarea
                value={newSolution[index] || ''}
                onChange={(e) => handleSolutionChange(e, index)}
                className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600'
                placeholder='Provide a solution...'
                rows='2'
              ></textarea>
              <button type='submit' className='mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700'>
                Submit Solution
              </button>
            </form>
            <ul className='space-y-2'>
              {doubt.solutions.map((solution, solIndex) => (
                <li key={solIndex} className='p-2 bg-gray-200 rounded-lg'>
                  <p>{solution.text}</p>
                  <ul className='ml-4 mt-2 space-y-1'>
                    {solution.replies.map((reply, replyIndex) => (
                      <li key={replyIndex} className='p-2 bg-gray-300 rounded-lg'>
                        {reply}
                      </li>
                    ))}
                  </ul>
                  <form onSubmit={(e) => handleReplySubmit(e, index, solIndex)} className='mt-2'>
                    <textarea
                      value={newReply[`${index}-${solIndex}`] || ''}
                      onChange={(e) => handleReplyChange(e, index, solIndex)}
                      className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600'
                      placeholder='Reply to this solution...'
                      rows='1'
                    ></textarea>
                    <button type='submit' className='mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700'>
                      Submit Reply
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Doubts;
