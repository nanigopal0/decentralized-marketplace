import './App.css'
import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import Login from './pages/mainpages/login'
import Home from './pages/mainpages/Home'
import Register from './pages/mainpages/Register'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
