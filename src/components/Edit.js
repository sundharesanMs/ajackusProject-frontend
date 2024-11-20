import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
function Edit() {

  const { id } = useParams();
  const [student, setStudent] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/users/' + id) 
      .then(res => {
        console.log(res);
        setStudent({ ...values, firstName: res.data[0].firstName, lastName: res.data[0].lastName, email: res.data[0].email, department:res.data[0].department });
      })
      .catch(err => console.log(err));
  }, []);
  const [values, setvalues] = useState({
    firstName: '',
    lastName: '', 
    email: '', 
    department: "", 
  })
  const navigate = useNavigate();
  const handleupdate = (event) => {
    event.preventDefault();
    axios.put('https://ajackusproject-backend.onrender.com/users/' + id, values)
      .then(res => {
        console.log(res)
        navigate('/')
      })
  }
  return (

    <div className='d-flex vh-100 vw-100  justify-content-center align-items-center'>
      <div className="w-50 bg-white rounded p-3">
        <h4 className='text-primary text-bold text-center'>Update student </h4>
        <form onSubmit={handleupdate}>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">firstName</label>
            <input type="text" className="form-control"
              onChange={(e) => setvalues({ ...values, firstName: e.target.value })} id="exampleFormControlInput1" placeholder="Enter your firstName" />

          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">lastName</label>
            <input type="text" className="form-control"
              onChange={(e) => setvalues({ ...values, lastName: e.target.value })} id="exampleFormControlInput1" placeholder="Enter your LastName" />

          </div>
          
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">Email</label>
            <input type="email" class="form-control"
              onChange={(e) => setvalues({ ...values, email: e.target.value })} id="exampleFormControlInput1" placeholder="Enter your email" />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">Department</label>
            <input type="text" className="form-control"
              onChange={(e) => setvalues({ ...values, department: e.target.value })} id="exampleFormControlInput1" placeholder="Enter your department" />

          </div>


          <button className='btn btn-success'>submit</button>
          <Link to="/" className="btn btn-primary p -3 m-2">Back</Link>

        </form>
      </div>
    </div>

  )
}

export default Edit