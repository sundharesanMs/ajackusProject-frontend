import {useState} from 'react'
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
function AddTask() {
    const [values, setvalues] = useState({
        firstName: '',
        lastName: '', 
        email: '',
        department: '', 
    
      }); 
      const navigate = useNavigate(); 
      const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://ajackusproject-backend.onrender.com/users", values)
          .then((res)=>{
            console.log(res.data)
            setvalues(res.data); 
            navigate('/')
          })
          .catch((err) => console.log(err));
      }
    return (

        <div className='d-flex vh-100 vw-100 justify-content-center align-items-center'>
            <div className="w-50 bg-white rounded p-3">
                <h3 className='text-success text-center text-bold'>create Student</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label">firstName</label>
                        <input type="text" className="form-control" onChange={(e) => setvalues({ ...values, firstName: e.target.value })} id="exampleFormControlInput1" placeholder="enter your firstName" />

                    </div>
                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label">LastName</label>
                        <input type="text" className="form-control" onChange={(e) => setvalues({ ...values, lastName: e.target.value })} id="exampleFormControlInput1" placeholder="enter your lastName" />

                    </div>
                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label">Email</label>
                        <input type="email" class="form-control"
                            onChange={(e) => setvalues({ ...values, email: e.target.value })} id="exampleFormControlInput1" placeholder="enter your Email" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label">department</label>
                        <input type="text" class="form-control"
                            onChange={(e) => setvalues({ ...values, department: e.target.value })} id="exampleFormControlInput1" placeholder="enter your department" />
                    </div>
                    <button className='btn btn-success'>submit</button>
                </form>
            </div>
        </div>

    )
}

export default AddTask