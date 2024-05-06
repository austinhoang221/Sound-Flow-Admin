export interface IUser {
  id: string;
  isActive: true;
  createdByUserId: string;
  lastModifiedByUserId: string;
  lastModifiedOnDate: string;
  createdOnDate: string;
  applicationId: string;
  userName: string;
  name: string;
  phoneNumber: string;
  email: string;
  avatarUrl: string;
  password: string;
  passwordSalt: string;
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
  userDetailJson: string;
  isSuperUser: true;
  typeObj: number;
  type: number;
}
