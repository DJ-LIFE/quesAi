import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/newProject/Home'
import { Projects } from './pages/newProject/Projects'

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Auth />} />
        <Route path='/home' element = {<Home />} />
        <Route path='/projects' element={<Projects />} />
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
