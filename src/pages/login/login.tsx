import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { loginUserApi } from '@api'; // Импортируем функцию для авторизации
import { login } from '../../slices/authSlice/authSlice'; // Импортируем действие для изменения состояния аутентификации
import { setCookie } from '../../utils/cookie';
import { setUser } from '../../slices/userSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorText('');
    try {
      const response = await loginUserApi({ email, password });
      if (response.success) {
        setCookie('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        dispatch(setUser(response.user));
        dispatch(login());
        navigate('/');
      } else {
        setErrorText(
          'Неверный email или пароль. Проверьте данные и попробуйте снова.'
        );
      }
    } catch (error) {
      setErrorText('Ошибка авторизации. Проверьте данные и попробуйте снова.');
    }
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
