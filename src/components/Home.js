import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const Home = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(5); 

    const fetchData = async () => {
        try {
            const result = await axios.get("https://ajackusproject-backend.onrender.com/users");
            console.log(result.data);
            setUsers(result.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    const handleDelete = (id) => {
                axios.delete(`https://ajackusproject-backend.onrender.com/users/${id}`)
                    .then(res => {
                        setUsers(users.filter(user => user._id !== id));  
                        console.log("User deleted:", id); 
                    })
                    .catch(err => console.log(err));
            };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total number of pages
    const totalPages = Math.ceil(users.length / usersPerPage);

    return (
        <div className='d-flex vh-100 vw-75 justify-content-center align-items-center'>
            <div className='w-75 bg-white rounded p-3'>
                <h4 className='text-primary text-bold text-center'>AjackusProject</h4>
                <div className='d-flex justify-content-end mb-2'>
                    <Link to="/create" className="btn btn-success">Create</Link>
                </div>

                <table className="table table-hover table-striped p-3">
                    <thead className='table-dark pt-2'>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='table-group-divider'>
                        {users.length ? (
                            currentUsers.map((user) => {
                                return (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.department}</td>
                                        <td className='d-flex flex-row'>
                                    
                                            <Link to={`/edit/${user._id}`} className='btn bg-primary text-white me-2'>Edit</Link>
                                          
                                         
                                            <button onClick={() => handleDelete(user._id)} className='btn bg-danger m-2 text-white'>Delete</button>                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="6">No data found</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <nav>
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => paginate(currentPage - 1)}>&laquo;</button>
                        </li>

                        {[...Array(totalPages).keys()].map(number => (
                            <li key={number} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => paginate(number + 1)}>
                                    {number + 1}
                                </button>
                            </li>
                        ))}

                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => paginate(currentPage + 1)}>&raquo;</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Home;
