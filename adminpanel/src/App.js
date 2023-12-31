import React, { useState } from 'react';
import DataTables from './Components/Products/AddProducts';
import Grouping from './Components/Category/ProductCategory';
import Dashboard from './Components/Dashboard';
import User from './Components/UserInfo/UserInformation';
import AddUser from './Components/UserInfo/CreateUser'
import Logins from './Components/Login';
import AddCategory from './Components/Category/AddCategory';
import UserDetails from './Components/UserInfo/UserDetails';
import AddAdmin from './Components/Admin/AddAdmin'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { UseContextProvider } from './Contexts/StepperContext';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UseContextProvider>
      <BrowserRouter>

            <Routes>
              {isLoggedIn ? (
                <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/دسته بندی محصولات" element={<Grouping />} />
              <Route path="/FormWizard" element={<DataTables />} />
              <Route path="/Users" element={<User />} />
              <Route path="/AddUser" element={<AddUser />} />
              <Route path="/AddAdmin" element={<AddAdmin />} />
              <Route path="/AddCategory" element={<AddCategory />} />
              <Route path="user/:userId" element={<UserDetails />} />
              <Route path="/datatable" />
              <Route path="/dashboard2" />
              <Route path="/Logout" />
                </>
              ) : (
                <>
                <Route path="/" element={<Logins onLogin={() => setIsLoggedIn(true)} />}/>
                </>
              )}

            </Routes>
          </BrowserRouter>
    </UseContextProvider>
    
  );
}
