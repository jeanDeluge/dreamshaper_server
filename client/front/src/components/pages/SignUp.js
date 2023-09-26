'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function SignUp() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [passwordNotMatchMessage, setpasswordNotMatchMessage] = useState("");
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  useEffect(()=>{
    readTocken()
    const token=sessionStorage.getItem("token")
    if(token){
      navigate('/')
    }
  })

  const [auth, setAuth] = useState(false)
  const [token, setToken] = useState("")

  const readTocken = () => {
    let token = sessionStorage.getItem("token");
    if (token) {
        setAuth(true);
        setToken(token);
    }
  };
  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("일치하는 비밀번호입니다");
      setIsPasswordConfirm(true);
    }
  };

  const handleUsernamechange = (e) => {
    setUsername(e.target.value)
  }
  const handleEmailchange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordchange = (e) => {
    setPassword(e.target.value)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== passwordConfirm){
        setpasswordNotMatchMessage("비밀번호를 확인해주세요")
        return
    }
    try {
      setUser(user.username = username, user.email = email, user.password = password)
      const token = await axios.post('http://localhost:8000/register', user);

      sessionStorage.setItem('token', token)
      window.location.href = '/'; // 홈으로 이동
      window.location.reload();
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
     <>
        
    <form className='w-96 m-auto my-48' onSubmit={handleSubmit}>
        <div className="mb-6">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input type="text" id="username" value={username} name='username' onChange={handleUsernamechange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john doe" required />
        </div> 
        <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
            <input type="email" id="email" name='email' value={email} onChange={handleEmailchange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
        </div> 
        <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" id="password" name='password' value={password} onChange={handlePasswordchange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
        </div> 
        <div className="mb-6">
            <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
            <input type="password" id="confirm_password" name='confirm_password' value={passwordConfirm} onChange={onChangePasswordConfirm} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
            
            <p className="message">{passwordConfirmMessage}</p>

        </div> 
        <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
            </div>
            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

        <p className="message">{passwordNotMatchMessage}</p>
    </form>

     </>
  )
}

export default SignUp