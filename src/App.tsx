import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import InDevelopment from './components/InDevelopment';
import AccountPage from './pages/AccountPage';
import { Fragment, useCallback, useEffect } from 'react';
import { BackdropLoading } from './components/Loading';
import { useDispatch } from 'react-redux';
import { fetchProfile } from './slices/auth.slice';

function App() {
  const dispatch = useDispatch();


  const fetchProfileAtStart = useCallback(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    fetchProfileAtStart();
  }, [fetchProfileAtStart]);

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            {/* <Route index path="/" element={<Navigate to={history ? history.length > 0 ? `/${history}` : "/course" : "/course"} />} /> */}
            <Route path="/" element={<AccountPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<InDevelopment />} />

        </Routes>
        <BackdropLoading />
      </BrowserRouter>

    </Fragment>

  )
}

export default App
