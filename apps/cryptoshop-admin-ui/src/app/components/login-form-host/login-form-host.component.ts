import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
  selector: 'crypto-shop-login-form-host',
  templateUrl: './login-form-host.component.html',
  styleUrls: ['./login-form-host.component.scss'],
})
export class LoginFormHostComponent implements OnInit {
  constructor(
    private cfr: ComponentFactoryResolver,
    private vcref: ViewContainerRef,
    private injector: Injector
  ) {}

  async ngOnInit() {
    // const { LoginFormComponent } = await loadRemoteModule({
    //   remoteEntry: 'http://localhost:4201/remoteEntry.js',
    //   remoteName: 'cryptoshopui',
    //   exposedModule: 'LoginComponent',
    // });
    // this.vcref.createComponent(
    //   this.cfr.resolveComponentFactory(LoginFormComponent),
    //   undefined,
    //   this.injector
    // );
  }
}
