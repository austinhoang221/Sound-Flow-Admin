export interface IUser {
  id: string;
  applicationId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  name: string;
  phoneNumber: string;
  postalCode: string;
  avatarUrl: string;
  roles: [string];
  rights: [string];
  navigations: [string];
  userDetail: {
    firstName: string;
    lastName: string;
    fullName: string;
    title: string;
    gender: number;
    birthdate: string;
    country: string;
    city: string;
    address: string;
    postalCode: string;
    aboutMe: string;
  };
  isSuperUser: true;
  token: string;
}
