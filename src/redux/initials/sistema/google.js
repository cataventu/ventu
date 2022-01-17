import avatar from '../../../assets/img/avatars/sem-avatar.jpg';
import { login } from '.';

export const gmailClientID = '461526449179-tc8t1pplo0m26vk1s6urfi9gc9ollf95.apps.googleusercontent.com';
export const gmailClientSecret = 'SC5dRof5utUmBeNftYTPU3LhSC5dRof5utUmBeNftYTPU3Lh';

export const googleUserData = {
  logIn: login,
  googleId: 0,
  imageUrl: avatar,
  email: '',
  name: '',
  givenName: '',
  familyName: '',
};
