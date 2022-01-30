import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomePageHostComponent } from './components/home-page-host/home-page-host.component';
import {
  JwtAuthGuard,
  JwtAuthInterceptor,
  UiLibSharedModule,
} from '@crypto-shop/ui-lib-shared';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, HomePageHostComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    UiLibSharedModule,
    RouterModule.forRoot(
      [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        {
          path: 'auth',
          loadChildren: () =>
            import('ui-user/Module').then((m) => m.RemoteEntryModule),
        },
        {
          path: 'home',
          component: HomePageHostComponent,
          canActivate: [JwtAuthGuard],
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
