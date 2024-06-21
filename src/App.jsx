import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from './styles/GlobalStyles';
import AppLayout from './ui/AppLayout';

function App() {
  return (
    <>
    <GlobalStyles/>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout/>}> 
          <Route index='dashboard' element={<Navigate replace to="dashboard"/>}/>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='bookings' element={<Bookings/>}/>
          <Route path='cabins' element={<Cabins/>}/>
          <Route path='users' element={<Users/>}/>
          <Route path='settings' element={<Settings/>}/>
          <Route path='account' element={<Account/>}/>
        </Route>
        <Route path='login' element={<Login/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

//setting up routes => react-router v6
  // 1. BrowserRouter 
  // 2. Routes 
  // 3. Route Element

//building Application Layout in UI
  // 4. Setup AppLayout Route
  // 5. Add children components inside AppLayout using <Outlet/>
  // 6. 