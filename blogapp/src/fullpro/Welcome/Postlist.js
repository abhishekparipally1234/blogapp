import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Postlist() {
  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.get('http://localhost:4000/posts')
      .then(res => setPosts(res.data));
  }, []);

  const deletePost = async (id) => {
    await axios.delete(`http://localhost:4000/posts/${id}`);
    setPosts(posts.filter(p => p._id !== id));
  };

  return (
    <div className="container">
      <h2>Posts</h2>

      {posts.map(post => (
        <div key={post._id} className="card mb-3">
          <div className="card-body">
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            <small>Author: {post.author}</small>

            {(user.role === 'admin' || post.authorId === user._id) && (
              <>
                <Link
                  to={`/edit-post/${post._id}`}
                  className="btn btn-warning me-2"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deletePost(post._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Postlist;
