export interface UserInterface {
  id?: string;
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  status: boolean;
  publishers: Object[];
  country: string;
  resetPasswordToken: string;
  resetPasswordTokenExpirationTime: number;
  permissions: string[];
}

export class UserEntity {

  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  status: boolean;
  publishers: Object[];
  country: string;
  resetPasswordToken: string;
  resetPasswordTokenExpirationTime: number;
  permissions: string[];

  constructor(model?: UserInterface) {

    this.username = model && model.username || '';
    this.email = model && model.email || '';
    this.password = model && model.password || '';
    this.name = model && model.name || '';
    this.surname = model && model.surname || '';
    this.status = model && model.status || false;
    this.publishers = model && model.publishers || [];
    this.country = model && model.country || '';
    this.resetPasswordToken = model && model.resetPasswordToken || '';
    this.resetPasswordTokenExpirationTime =
      model && model.resetPasswordTokenExpirationTime || new Date().getTime();
    this.permissions = model && model.permissions || [];

  }

  isValid() {
    return this.name &&
      this.surname &&
      this.username &&
      this.validateEmail(this.email) &&
      this.country &&
      this.password;
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  getUsersCountries() {
    return ['es', 'fr', 'it'];
  }
  getUsersStatus() {
    return [
      { state: 'all', value: -1 },
      { state: 'active', value: true },
      { state: 'disabled', value: false }
    ];
  }
  getUsersPermissions() {
    return ['admin', 'studio', 'backoffice', 'panel'];
  }

}
