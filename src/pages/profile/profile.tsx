import { FC, SyntheticEvent, useEffect, useState } from 'react';

import { updateUser, clearUserError } from '../../services/slices/userSlice';

import { ProfileUI } from '@ui-pages';
import { Preloader } from '@ui';

import { useDispatch, useSelector } from '../../services/store';
import {
  selectAuthError,
  selectFetchingUser,
  selectUpdateLoading,
  selectUser
} from '../../services/selectors';

export const Profile: FC = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const fetchingUser = useSelector(selectFetchingUser);
  const updateLoading = useSelector(selectUpdateLoading);
  const authError = useSelector(selectAuthError);

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (!user) {
      return;
    }
    setFormValue((prev) => ({
      ...prev,
      name: user.name,
      email: user.email
    }));
  }, [user]);

  useEffect(() => () => void dispatch(clearUserError()), [dispatch]);

  const isFormChanged =
    !!user &&
    (formValue.name !== user.name ||
      formValue.email !== user.email ||
      !!formValue.password);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      await dispatch(
        updateUser({
          name: formValue.name,
          email: formValue.email,
          ...(formValue.password ? { password: formValue.password } : {})
        })
      ).unwrap();
      setFormValue((prev) => ({
        ...prev,
        password: ''
      }));
    } catch {}
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(clearUserError());
    if (!user) return;
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  if (fetchingUser || !user) {
    return <Preloader />;
  }

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserError={updateLoading ? '' : authError || ''}
    />
  );
};
