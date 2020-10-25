import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import {
  changeField,
  checkUser,
  login,
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
  sendVerificationCode,
  changeEmail,
  changePassword,
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
    (username: string, password: string) => dispatch(login(username, password)),
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
    (email: string, verificationCode: string) =>
      dispatch(verifyFindPasswordCode(email, verificationCode)),
    [dispatch],
  );

  const handleFindPassword = useCallback(
    (email: string, password: string, verificationCode: string) =>
      dispatch(findPassword(email, password, verificationCode)),
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
    (email: string, verificationCode: string) =>
      dispatch(verifySignUpCode(email, verificationCode)),
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

  // api in settings

  const handleChangeName = useCallback(
    (name: string) => dispatch(changeName(name)),
    [dispatch],
  );

  const handleChangeProfile = useCallback(
    (formData: FormData) => dispatch(changeProfile(formData)),
    [dispatch],
  );

  const handleChangePhone = useCallback(
    (phone: string) => dispatch(changePhone(phone)),
    [dispatch],
  );
  const handleSendVerificationCode = useCallback(
    (email: string) => dispatch(sendVerificationCode(email)),
    [dispatch],
  );

  const handleChangeEmail = useCallback(
    (email: string, verificationCode: string) =>
      dispatch(changeEmail(email, verificationCode)),
    [dispatch],
  );

  const handleChangePassword = useCallback(
    (password: string) => dispatch(changePassword(password)),
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
    handleChangeProfile,
    handleChangePhone,
    handleSendVerificationCode,
    handleChangeEmail,
    handleChangePassword,
  };
}

export default useUser;
