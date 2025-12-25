import React, { useState } from 'react';
import axios from 'axios';

function Createpost() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const submitPost = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:4000/posts', {
      title,
      content,
      author: user.name
    });

    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={submitPost} className="container">
      <h2>Create Post</h2>

      <input className="form-control"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title" />

      <textarea className="form-control mt-2"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Content" />

      <button className="btn btn-primary mt-3">Submit</button>
    </form>
  );
}

export default Createpost;
