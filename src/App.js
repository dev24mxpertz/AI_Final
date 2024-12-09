import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Hero from './components/Hero'
import Layout from './components/Layout'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}/>
    </Routes>
  )
}

export default App