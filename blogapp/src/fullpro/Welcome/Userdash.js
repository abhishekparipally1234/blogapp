import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Styles.css';
import './Welcome.css';

function Userdash() {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/posts')
      .then(res => setPosts(res.data));

    if (user.role === 'admin') {
      axios.get('http://localhost:4000/admin/users', {
        headers: { Authorization: token }
      }).then(res => setUsers(res.data));
    }
  }, [user.role, token]);

  return (
    <div className="container mt-4">
      <h2 className="text-center">
        Welcome, <span className="text-primary">{user.name}</span>
      </h2>
      <p className="text-center">{user.email}</p>

      {/* USER POSTS */}
      <h3 className="mt-4">Your Posts</h3>
      {posts
        .filter(p => p.authorId === user._id || user.role === 'admin')
        .map(post => (
          <div key={post._id} className="card mb-3">
            <div className="card-body">
              <h5>{post.title}</h5>
              <p>{post.content}</p>
            </div>
          </div>
        ))}

      {/* ADMIN SECTION */}
      {user.role === 'admin' && (
        <>
          <h3 className="mt-4 text-danger">Admin Panel</h3>
          <table className="table table-bordered mt-2">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Userdash;
