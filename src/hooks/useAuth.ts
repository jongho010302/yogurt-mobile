import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import {
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
} from '../modules/auth/actions';

function useAuth() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

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

  const handleFindUsername = useCallback((email: string) => dispatch(findUsername(email)), [
    dispatch,
  ]);

  const handleSendFindPasswordCode = useCallback(
    (email: string) => dispatch(sendFindPasswordCode(email)),
    [dispatch],
  );

  const handleVerifyFindPasswordCode = useCallback(
    (email: string, verifyCode: string) => dispatch(verifyFindPasswordCode(email, verifyCode)),
    [dispatch],
  );

  const handleFindPassword = useCallback(
    (email: string, password: string, verifyCode: string) =>
      dispatch(findPassword(email, password, verifyCode)),
    [dispatch],
  );

  const handleGetStudios = useCallback(() => dispatch(getStudios()), [dispatch]);

  const handleVerifyUsername = useCallback(
    (username: string) => dispatch(verifyUsername(username)),
    [dispatch],
  );

  const handleSendSignUpCode = useCallback((email: string) => dispatch(sendSignUpCode(email)), [
    dispatch,
  ]);

  const handleVerifySignUpCode = useCallback(
    (email: string, verifyCode: string) => dispatch(verifySignUpCode(email, verifyCode)),
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

  return {
    auth,
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
  };
}

export default useAuth;
