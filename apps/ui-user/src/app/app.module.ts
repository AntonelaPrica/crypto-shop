/*
 * This RemoteEntryModule is imported here to allow TS to find the Module during
 * compilation, allowing it to be included in the built bundle. This is required
 * for the Module Federation Plugin to expose the Module correctly.
  import { RemoteEntryModule } from './remote-entry/entry.module';
 * */
import { RemoteEntryModule } from './remote-entry/entry.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import {
  JwtAuthGuard,
  JwtAuthInterceptor,
  UiLibSharedModule,
} from '@crypto-shop/ui-lib-shared';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './components/page-header/page-header.component';

@NgModule({
  declarations: [AppComponent, HomePageComponent, PageHeaderComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    UiLibSharedModule,
    RouterModule.forRoot(
      [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        {
          path: 'auth',
          loadChildren: () =>
            import('./remote-entry/entry.module').then(
              (m) => m.RemoteEntryModule
            ),
        },
        {
          path: 'home',
          component: HomePageComponent,
          canActivate: [JwtAuthGuard],
        },
      ],
      {
        initialNavigation: 'enabledBlocking',
      }
    ),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
