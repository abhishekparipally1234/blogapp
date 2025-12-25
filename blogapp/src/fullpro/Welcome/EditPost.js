import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/posts')
      .then(res => {
        const post = res.data.find(p => p._id === id);
        setTitle(post.title);
        setContent(post.content);
      });
  }, [id]);

  const updatePost = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:4000/posts/${id}`, { title, content });
    navigate('/posts');
  };

  return (
    <form onSubmit={updatePost} className="container">
      <h2>Edit Post</h2>
      <input className="form-control" value={title}
        onChange={e => setTitle(e.target.value)} />
      <textarea className="form-control mt-2" value={content}
        onChange={e => setContent(e.target.value)} />
      <button className="btn btn-primary mt-3">Update</button>
    </form>
  );
}

export default EditPost;
