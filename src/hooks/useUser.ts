import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import {
  changeField,
  checkUser,
  logIn,
  logOut,
  findMaskingUsername,
  findUsername,
  sendFindPasswordCode,
  verifyFindPasswordCode,
  findPassword,
  verifyUsername,
  sendSignUpCode,
  verifySignUpCode,
  signUp,
  getStudios,
  changeName,
  changePhone,
  changeProfile,
} from '../modules/user/actions';

function useUser() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleChangeField = useCallback(
    (key: string, value: any) => dispatch(changeField(key, value)),
    [dispatch],
  );

  const handleCheckUser = useCallback(() => dispatch(checkUser()), [dispatch]);

  const handleLogIn = useCallback(
    (username: string, password: string) => dispatch(logIn(username, password)),
    [dispatch],
  );

  const handleLogOut = useCallback(() => dispatch(logOut()), [dispatch]);

  const handleFindMaskingUsername = useCallback(
    (name: string) => dispatch(findMaskingUsername(name)),
    [dispatch],
  );

  const handleFindUsername = useCallback(
    (email: string) => dispatch(findUsername(email)),
    [dispatch],
  );

  const handleSendFindPasswordCode = useCallback(
    (email: string) => dispatch(sendFindPasswordCode(email)),
    [dispatch],
  );

  const handleVerifyFindPasswordCode = useCallback(
    (email: string, verifyCode: string) =>
      dispatch(verifyFindPasswordCode(email, verifyCode)),
    [dispatch],
  );

  const handleFindPassword = useCallback(
    (email: string, password: string, verifyCode: string) =>
      dispatch(findPassword(email, password, verifyCode)),
    [dispatch],
  );

  const handleGetStudios = useCallback(() => dispatch(getStudios()), [
    dispatch,
  ]);

  const handleVerifyUsername = useCallback(
    (username: string) => dispatch(verifyUsername(username)),
    [dispatch],
  );

  const handleSendSignUpCode = useCallback(
    (email: string) => dispatch(sendSignUpCode(email)),
    [dispatch],
  );

  const handleVerifySignUpCode = useCallback(
    (email: string, verifyCode: string) =>
      dispatch(verifySignUpCode(email, verifyCode)),
    [dispatch],
  );

  const handleSignUp = useCallback(
    (
      studioId: number,
      username: string,
      password: string,
      email: string,
      name: string,
      gender: string,
      birth: string,
      phone: string,
      profileUrl: string,
      verificationCode: string,
    ) =>
      dispatch(
        signUp(
          studioId,
          username,
          password,
          email,
          name,
          gender,
          birth,
          phone,
          profileUrl,
          verificationCode,
        ),
      ),
    [dispatch],
  );

  const handleChangeName = useCallback(
    (name: string) => dispatch(changeName(name)),
    [dispatch],
  );

  const handleChangePhone = useCallback(
    (phone: string) => dispatch(changePhone(phone)),
    [dispatch],
  );

  const handleChangeProfile = useCallback(
    (formData: FormData) => dispatch(changeProfile(formData)),
    [dispatch],
  );

  return {
    user,
    handleChangeField,
    handleCheckUser,
    handleLogIn,
    handleLogOut,
    handleFindMaskingUsername,
    handleFindUsername,
    handleSendFindPasswordCode,
    handleVerifyFindPasswordCode,
    handleFindPassword,
    handleGetStudios,
    handleVerifyUsername,
    handleSendSignUpCode,
    handleVerifySignUpCode,
    handleSignUp,
    handleChangeName,
    handleChangePhone,
    handleChangeProfile,
  };
}

export default useUser;
