import {request} from '../request';

/**
 * Login
 *
 * @param username User name
 * @param password Password
 */
export function fetchLogin(username: string, password: string) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/admin/login',
    method: 'post',
    data: {
      username,
      password
    }
  });
}

/** Get user info */
export function fetchGetUserInfo() {
  return request<Api.Auth.UserInfo>({ url: '/auth/user-info' });
}

/**
 * Refresh token
 *
 * @param refreshToken Refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/refresh',
    method: 'post',
    data: {
      refreshToken
    }
  });
}

/**
 * 退出登录
 */
export const handleLogout = async () => {
  return request<boolean>({
    url: '/auth/logout',
    method: 'post'
  })
}

/**
 * return custom backend error
 *
 * @param code error code
 * @param msg error message
 */
export function fetchCustomBackendError(code: string, msg: string) {
  return request({url: '/auth/error', params: {code, msg}});
}
