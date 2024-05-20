import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { registerUserApi } from '@api';
import { login } from '../../slices/authSlice';
import { setUser } from '../../slices/userSlice';
import { setCookie } from '../../utils/cookie';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorText('');
    try {
      const response = await registerUserApi({
        email,
        password,
        name: userName
      });
      if (response.success) {
        setCookie('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        dispatch(setUser(response.user));
        dispatch(login());
        navigate('/');
      } else {
        setErrorText(
          'Ошибка регистрации. Проверьте данные и попробуйте снова.'
        );
      }
    } catch (error) {
      setErrorText('Ошибка регистрации. Проверьте данные и попробуйте снова.');
    }
  };

  return (
    <RegisterUI
      errorText=''
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
