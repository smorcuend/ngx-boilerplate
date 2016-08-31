import { Api, ApiFactory } from './api';
import { UserInfoService } from './userinfo';
import { GAnalyticsService } from './g-analytics';

export const API_PROVIDERS: any[] = [
  Api,
  ApiFactory,
  UserInfoService,

  GAnalyticsService
];
