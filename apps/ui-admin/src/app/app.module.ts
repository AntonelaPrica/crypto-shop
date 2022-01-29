import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomePageHostComponent } from './components/home-page-host/home-page-host.component';
import { JwtAuthGuard } from '@crypto-shop/ui-lib-shared';

@NgModule({
  declarations: [AppComponent, HomePageHostComponent],
  imports: [
    BrowserModule,
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
