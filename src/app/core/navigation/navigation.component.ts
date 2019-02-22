import browser from 'browser-detect';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from '../auth/store/auth.action';
import {
  routeAnimations,
  AppState,
  LocalStorageService,
} from '@app/core';
import { environment as env } from '@env/environment';

import {
  ActionSettingsChangeLanguage,
  ActionSettingsChangeAnimationsPageDisabled,
  selectEffectiveTheme,
  selectSettingsLanguage,
  selectSettingsStickyHeader
} from '../settings';
import { selectIsAuthenticated } from '../auth/store/auth.selectors';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [routeAnimations]
})
export class NavigationComponent implements OnInit {

  isProd = env.production;
  envName = env.envName;
  year = new Date().getFullYear();
  logo = require('../../../assets/logo.png');
  languages = ['en', 'de', 'fr', 'es', 'pt-br'];
  navigation = [
    { link: 'home', label: 'menu.home' },
    { link: 'pets', label: 'menu.pets' },
    { link: 'features', label: 'menu.features' }
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'menu.settings' }
  ];

  isAuthenticated$: Observable<boolean>;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;

  constructor(
    private store: Store<AppState>,
    private storageService: LocalStorageService
  ) { }

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {
    this.storageService.testLocalStorage();
    if (NavigationComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        new ActionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.stickyHeader$ = this.store.pipe(select(selectSettingsStickyHeader));
    this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(new ActionSettingsChangeLanguage({ language }));
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

}
