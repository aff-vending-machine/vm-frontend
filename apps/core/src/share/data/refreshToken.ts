import mem from 'mem';

import { publicClient } from './public';
import { LOCAL_ACCESS_TOKEN, LOCAL_REFRESH_TOKEN } from '../constants';
import { Auth } from '~/core/domain';

const refreshTokenFn = async () => {
  const refreshToken = localStorage.getItem(LOCAL_REFRESH_TOKEN);

  try {
    const response = await publicClient.get<APIProtocol<Auth>>('/auth/token', {
      headers: {
        authorization: `Bearer ${refreshToken}`,
      },
    });
    const { status, data } = response.data;

    if (status == 'done') {
      localStorage.setItem(LOCAL_ACCESS_TOKEN, data!.access_token);
      localStorage.setItem(LOCAL_REFRESH_TOKEN, data!.refresh_token);
    }

    return data!.access_token;
  } catch (error) {
    // console.log(error);
  }
};

const maxAge = 10000;

export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
});
