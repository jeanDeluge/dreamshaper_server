'use client'
import React from 'react';
import { Link } from 'react-router-dom';
import { RouteList } from '../../constant';


function Main() {

  return (
     <>
        <div className="flex items-center md:order-2">
          <Link to={RouteList.SignUp.path}>
            <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Sign Up</button>
          </Link>
          <Link to={RouteList.SignIn.path}>
          <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Sign In</button>
          </Link>
        </div>
     </>
  )
}

export default Main