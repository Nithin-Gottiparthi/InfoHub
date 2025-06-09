import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000') 
        .then(res => setUsers(res.data))  
        .catch(err => console.error("Error fetching users:", err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/deleteUser/${id}`) 
        .then(res => {
            console.log("User deleted successfully:", res.data);
            setUsers(users.filter(user => user._id !== id)); // Efficient state update
        })
        .catch(err => console.error("Error deleting user:", err));
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <h1>APP</h1>
                <Link to='/create' className='btn btn-success'>Add +</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>
                                    <Link to={`/update/${user._id}`} className='btn btn-primary' style={{ marginRight: '8px' }}>Edit</Link>
                                    <button className='btn btn-danger' onClick={() => handleDelete(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
