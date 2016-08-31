import { Component, OnInit } from '@angular/core';

import { AppState } from '../../app.service';

import { UserInfoService } from '../../services/api/userinfo';
import { UserEntity } from '../../services/api/users/user.entity';

declare const loginUrl: string;

@Component({
  selector: 'profile',
  templateUrl: './profile.template.html'
})
export class ProfileComponent implements OnInit {

  user: any;

  userCountries: string[];
  userPermissions: string[];

  constructor(
    private appState: AppState,
    private userInfoService: UserInfoService
  ) {

    this.user = {
      id: '',
      country: '',
      email: '',
      name: '',
      permissions: [],
      username: '',
      surname: ''
    };

    this.fetchUser();

  }

  ngOnInit() {
    this.appState.appStateObservable.subscribe(appData => {
      if (appData.user) {
        this.user = appData.user;
      }
    });
    this.user = new UserEntity();
    this.userCountries = this.user.getUsersCountries();
    this.userPermissions = this.user.getUsersPermissions();
  }

  setDropdownValue(property, value) {
    this.user[property] = value;
  }

  fetchUser() {
    this.userInfoService.get().subscribe(data => {
      this.user = data;
    });
  }

  updateUser() {

  }

}
