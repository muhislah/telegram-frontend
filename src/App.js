import './App.css';
import {BrowserRouter, Routes , Route, Navigate, useNavigate} from 'react-router-dom'
import Login from './page/Login';
import Register from './page/Register';
import Home from './page';
import Profile from './page/Profile';
import WithAuth from './components/module/Withauth';


function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<WithAuth> <Home /> </WithAuth> } >
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={
            <div>Page not Found</div>
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
