import { useState } from 'react'
import styles from './styles.module.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Login = () =>{
    const [data,setData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState("")
    const[showPassword, setshowPassword] = useState(false)

    const handleChange =({currentTarget: input}) => {
        setData({...data, [input.name]: input.value})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
            const url = "https://car-rental-y1mj.onrender.com/api/auth"
            const {data: res} = await axios.post(url, data)
            localStorage.setItem("token", res.token)
            window.location="/"
        } catch (error) {
            if(error.response && error.response.status>=400 && error.response.status<=500){
                setError(error.response.data.message)
            }
        }
    }
    return(
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Login to your Account</h1>
                        <input 
                        type="email"
                        placeholder='Email'
                        name='email'
                        onChange={handleChange}
                        value={data.email}
                        required
                        className={styles.input}
                        />
                        <input 
                        type={showPassword? "text":"password"}
                        placeholder='Password'
                        name='password'
                        onChange={handleChange}
                        value={data.password}
                        required
                        className={styles.input}
                        />
                        <button 
                        type='button'
                        className="eye-button"
                        onMouseDown={() => setshowPassword(true)}
                        onMouseUp={() => setshowPassword(false)}
                        onMouseLeave={() => setshowPassword(false)}>
                            👁️
                        </button>
                        {error && <div className={styles.error_msg}>{error}</div> }
                        <button type='submit' className={styles.green_btn}>
                            Sign In
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                <h1>New Here ?</h1>
                    <Link to="/signup">
                    <button type='button' className={styles.white_btn}>
                        Sign Up
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login