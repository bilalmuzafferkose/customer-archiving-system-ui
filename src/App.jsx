import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import NoMatch from './components/NoMatch';
import AddCustomer from './components/customer/AddCustomer';
import UpdateCustomer from './components/customer/UpdateCustomer';
import FileComponent from './components/file/FileComponent';
import AddFileComponent from './components/file/AddFileComponent';
import RegisterForm from './components/register/RegisterForm';
import LoginForm from './components/login/LoginForm';
import PrivateRoute from './components/PrivateRoute';
import Unauthorized from './components/Unauthorize';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-customer" element={
          <PrivateRoute roles={['ADMIN']}>
            <AddCustomer />
          </PrivateRoute>
        } />
        <Route path="/customer/:citizenshipNumber" element={
          <PrivateRoute roles={['ADMIN']}>
            <UpdateCustomer />
          </PrivateRoute>
        } />
        <Route path="/files" element={
          <PrivateRoute roles={['ADMIN']}>
            <FileComponent />
          </PrivateRoute>
        } />
        <Route path="/add-file" element={
          <PrivateRoute roles={['ADMIN']}>
            <AddFileComponent />
          </PrivateRoute>
        } />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;