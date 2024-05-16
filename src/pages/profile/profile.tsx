import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { updateUserApi } from '@api';
import { setUser } from '../../slices/userSlice';
import { getUserApi } from '@api';
import { Preloader } from '@ui';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const [updateUserError, setUpdateUserError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /** TODO: взять переменную из стора */
  const user = useSelector((state: RootState) => state.user);

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserApi();
        dispatch(setUser(response.user));
        setFormValue({
          name: response.user.name,
          email: response.user.email,
          password: ''
        });
      } catch (error) {
        console.error('Ошибка загрузки данных пользователя:', error);
        setUpdateUserError(
          'Ошибка загрузки данных. Пожалуйста, попробуйте снова.'
        );
      } finally {
        setLoading(false); // Устанавливаем загрузку в false после завершения запроса
      }
    };

    fetchUserData();
  }, [dispatch]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setUpdateUserError(null);
    try {
      const updatedUser = await updateUserApi({
        name: formValue.name,
        email: formValue.email,
        password: formValue.password
      });

      console.log(formValue.password); //del

      dispatch(setUser(updatedUser.user));
      setFormValue((prevState) => ({
        ...prevState,
        password: ''
      }));
    } catch (error) {
      console.error('Ошибка обновления пользователя:', error);
      setUpdateUserError(
        'Ошибка обновления данных. Пожалуйста, попробуйте снова.'
      );
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
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

  if (loading) {
    return <Preloader />;
  }

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
