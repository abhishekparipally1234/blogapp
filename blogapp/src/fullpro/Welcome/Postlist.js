import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles.css';
import './Welcome.css';

const Postlist = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/posts`)
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container mt-4">
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <div key={post._id} className="card mb-4">
          <div className="card-body">
            <h2 className="card-title">{post.title}</h2>
            <p className="card-text">{post.content}</p>
            <p className="card-text"><small className="text-muted">Author: {post.author}</small></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Postlist;
