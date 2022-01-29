import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomePageHostComponent } from './components/home-page-host/home-page-host.component';
import { JwtAuthGuard } from '@crypto-shop/ui-lib-shared';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('cryptoshop-ui/Module').then((m) => {
        console.log(m);
        return m.AuthModule;
      }),
  },
  {
    path: 'home',
    component: HomePageHostComponent,
    canActivate: [JwtAuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
