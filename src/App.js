import { Routes, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useContext } from 'react';
import AuthContext from './store/auth-context';

function App() {
  const authctx=useContext(AuthContext)
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/auth' element={<AuthPage />}/>
        <Route path='/profile' element={authctx.isLoggedIn ? <UserProfile /> : <AuthPage/>}/>
        <Route path='*' element={<HomePage/>}/> 
      </Routes>
    </Layout>
  );
}

export default App;