import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import UserList from '../pages/UserList';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/users" element={<UserList />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
