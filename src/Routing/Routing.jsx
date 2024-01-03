import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from "../Components/Dashboard"
import TableData from '../Components/TableData'

const Routing = () => {
  return (
    <>
     <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/tabledata" element={<TableData/>}/>
     </Routes> 
    </>
  )
}

export default Routing
