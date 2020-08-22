import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { changeName, changePhone, changeProfile } from '../modules/user/actions';

function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleChangeName = useCallback((name: string) => dispatch(changeName(name)), [dispatch]);

  const handleChangePhone = useCallback((phone: string) => dispatch(changePhone(phone)), [
    dispatch,
  ]);

  const handleChangeProfile = useCallback(
    (formData: FormData) => dispatch(changeProfile(formData)),
    [dispatch],
  );

  return {
    user,
    handleChangeName,
    handleChangePhone,
    handleChangeProfile,
  };
}

export default useAuth;
