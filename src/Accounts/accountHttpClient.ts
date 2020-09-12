import httpClient from '../Shared/httpClient/httpClient';
import {
  ApiSignInRequest,
  ApiUserResponse,
  ApiSignUpRequest,
  ApiAccountResetRequest,
  ApiAccountRecoveryRequest,
  ApiAccountResponse,
  ApiFacebookSignUpRequest
} from '../Shared/httpClient/apiTypes';
import {
  SignInEntity,
  SignUpEntity,
  AccountResetEntity,
  AccountRecoveryEntity,
  FacebookSignUpEntity
} from './entity';
import { mapFacebookSignUpEntityToApiFacebookSignUpPostRequest } from './dataMappers';

const ACCOUNT_API = `${process.env.REACT_APP_API_HOST}v1/accounts`;
const USER_API = `${process.env.REACT_APP_API_HOST}v1/users`;

export const getAccount = async (username: string) =>
  await httpClient.get<ApiAccountResponse>(`${USER_API}/${username}`);

const reset = async (user: AccountResetEntity): Promise<void> => {
  const url = `${ACCOUNT_API}/reset`;

  return await httpClient.post<ApiAccountResetRequest, void>(url, {
    user: {
      username: user.username,
      password: user.password,
      recaptcha: user.recaptcha,
      recovery_token: user.recoveryToken
    }
  });
};

const recovery = async (user: AccountRecoveryEntity): Promise<void> => {
  const url = `${ACCOUNT_API}/recovery`;

  return await httpClient.post<ApiAccountRecoveryRequest, void>(url, user);
};

const signIn = async (user: SignInEntity): Promise<ApiUserResponse> => {
  const url = `${ACCOUNT_API}/signin`;

  return await httpClient.post<ApiSignInRequest, ApiUserResponse>(url, user);
};

const signUp = async (user: SignUpEntity): Promise<ApiUserResponse> => {
  const url = `${ACCOUNT_API}/signup`;

  return await httpClient.post<ApiSignUpRequest, ApiUserResponse>(url, {
    user
  });
};

const facebookSignUp = async (
  facebookUser: FacebookSignUpEntity
): Promise<ApiUserResponse> => {
  const url = `${ACCOUNT_API}/facebook-signup`;
  const body = mapFacebookSignUpEntityToApiFacebookSignUpPostRequest(
    facebookUser
  );

  return await httpClient.post<ApiFacebookSignUpRequest, ApiUserResponse>(
    url,
    body
  );
};

export default {
  facebookSignUp,
  getAccount,
  recovery,
  reset,
  signIn,
  signUp
};
