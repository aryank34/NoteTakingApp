// import {Route, Routes} from 'react-router-dom';
// import Add from './modules/notes/components/Add';
// import View from './modules/notes/components/View';

import { Outlet } from "react-router-dom"

export const Main = () => {
  return (
    <>
        {/* <p>Main Content</p> */}
        <Outlet/>
        
    </>
  )
}
