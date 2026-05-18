import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate, Location } from 'react-router-dom';

import { loginUser, clearUserError } from '../../services/slices/userSlice';

import { LoginUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';
import { selectAuthError, selectLoginLoading } from '../../services/selectors';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const loading = useSelector(selectLoginLoading);
  const authError = useSelector(selectAuthError);

  useEffect(() => () => void dispatch(clearUserError()), [dispatch]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirectPath =
    (location.state as { from?: Location })?.from?.pathname || '/';

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate(redirectPath, { replace: true });
    } catch {}
  };

  return (
    <LoginUI
      errorText={loading ? '' : authError || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
