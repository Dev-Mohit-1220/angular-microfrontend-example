import { ChangeDetectionStrategy,Component } from '@angular/core';
@Component({selector:'shop-root',standalone:true,changeDetection:ChangeDetectionStrategy.OnPush,template:'<main><h1>ShopSphere remote</h1><p>Open this application through the Shell host to load its federated routes.</p></main>'})
export class RemoteRootComponent {}
