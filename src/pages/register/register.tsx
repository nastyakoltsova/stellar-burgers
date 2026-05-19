import { FC, SyntheticEvent, useEffect, useState } from 'react';

import { registerUser, clearUserError } from '../../services/slices/userSlice';

import { RegisterUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';
import {
  selectAuthError,
  selectRegisterLoading
} from '../../services/selectors';

export const Register: FC = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectRegisterLoading);
  const authError = useSelector(selectAuthError);

  useEffect(() => () => void dispatch(clearUserError()), [dispatch]);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        registerUser({ name: userName, email, password })
      ).unwrap();
    } catch {}
  };

  return (
    <RegisterUI
      errorText={loading ? '' : authError || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
