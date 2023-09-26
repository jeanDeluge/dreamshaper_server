'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function SignIn() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [auth, setAuth] = useState(false)
  const navigate = useNavigate()
  const [token, setToken] = useState("")

  useEffect(()=>{
    const token=sessionStorage.getItem("token")
    if(token){
      navigate('/')
      window.location.reload()
    }
  })
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("")
  const handleEmailchange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordchange = (e) => {
    setPassword(e.target.value)
  }

  const location = useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password.replace(" ", "") === ""){
        setPasswordMessage("비밀번호를 확인해주세요")
        return
    }
    try {
      setUser(user.email = email, user.password = password)

      const formData = new FormData()
      formData.append("username", user.email)
      formData.append("password", user.password)

      await axios.post('http://43.201.20.85:8000/login', formData, { withCredentials: true })
                        .then(response =>{
                            sessionStorage.setItem('token', response.data["access_token"])
                            sessionStorage.setItem('name', response.data["name"])
                            sessionStorage.setItem('email', response.data["email"])
                        })
        setAuth(true)
      console.log('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
     <>
        
    <form className='w-96 m-auto my-48' onSubmit={handleSubmit}>
        <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
            <input type="email" id="email" name='email' value={email} onChange={handleEmailchange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
        </div>
        <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" id="password" name='password' value={password} onChange={handlePasswordchange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
        </div>
    
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

        {passwordMessage && <div>{passwordMessage}</div>}
    </form>
    </>
  )
};

export default SignIn