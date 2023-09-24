import React from "react";
import { RouteList } from "../../constant"
import { Route, Routes } from "react-router-dom";
import { MyMenu, Sign } from ".";


function Navigation(props){

    return(
        <>
        <div className="bg-blue-700">
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href={RouteList.Main.path} className="flex items-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold font_acumin whitespace-nowrap dark:text-white">Dream Shaper</span>
                    </a>
                    { props.is_signed_in ? < MyMenu /> : <Sign /> }

                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
                        </li>
                        <li>
                            <a href={RouteList.Test.path} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Pricing</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                        </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="bg-white m-auto max-w-screen-xl h-full">
                <div className="bg-white m-auto max-w-screen-xl h-[90%] w-full overflow-y-auto no-scrollbar">
                    <Routes>
                        <Route index path={RouteList.Main.path} element={<RouteList.Main.Component/>} />
                        <Route>
                            <Route path={RouteList.Test.path} element={<RouteList.Test.Component/>} />
                            <Route path={RouteList.Voice.path} element={<RouteList.Voice.Component/>}/>
                            <Route path={RouteList.Draw.path} element={<RouteList.Draw.Component />} />
                            <Route path={RouteList.Result.path} element={<RouteList.Result.Component/>}/>
                        </Route>
                        <Route path={RouteList.SignUp.path} element={<RouteList.SignUp.Component />} />
                        <Route path={RouteList.SignIn.path} element={<RouteList.SignIn.Component />} />
                    </Routes>
                </div>
            </div>
        </div>
        </>
    )
    
}
export default Navigation;