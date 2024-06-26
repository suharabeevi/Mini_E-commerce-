import styles from './signup.module.css'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
const Signup =()=>{
    const [data,setData] =useState({
        username:"",
        email:"",
        password:""
    });
    const [error,setError] = useState("")
    const navigate = useNavigate()
    const handleChange =({currentTarget:input})=>{
setData({...data,[input.name]:input.value})
    }
    const handleSubmit =async(e)=>{
        console.log(e);
        e.preventDefault()
        try{
          const url= "http://localhost:5000/api/user";
          const {data:res} =await axios.post(url,data)
          
          navigate("/login")
          console.log(res.message);
        }catch(error){
if(error.response && error.response.status>=400 && error.response.status<=500){
    setError(error.response.data.message)
}
        }
    }
    return(
<div className={styles.signup_container}>
    <div className={styles.signup_form_container}>
    <div className="visme_d" data-title="Untitled Project" data-url="319eojj4-untitled-project?fullPage=true" data-domain="forms" data-full-page="true" data-min-height="100vh" data-form-id="30359"></div>
        <div className={styles.left}>
<h1>welcome back</h1>
<Link to='/login'>
    <button type='button' className={styles.white_btn}>
        sign in
    </button>
</Link>
        </div>
        <div className={styles.right}>
            <form className={styles.form_container}>
                <h1>Create Account</h1>
<input type="text" placeholder='username' name='username' onChange ={handleChange} value={data.username} required className={styles.input}/>
<input type="email" placeholder='Email' name='email' onChange ={handleChange}  value={data.email} required className={styles.input}/>
<input type="password" placeholder='Password' name='password' onChange ={handleChange} value={data.password} required className={styles.input}/>
{error && <div className={styles.error_msg}>{error}</div>}
<button type='submit' className={styles.green_btn} onClick={handleSubmit}>
    Sign Up
</button>
            </form>
        </div>
    </div>
</div>
    )
};
export default Signup