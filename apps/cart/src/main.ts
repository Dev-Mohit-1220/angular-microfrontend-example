import { bootstrapApplication } from '@angular/platform-browser';
import { initFederation } from '@angular-architects/native-federation';
import { RemoteRootComponent } from '../../shared/remote-root.component';
initFederation().then(()=>bootstrapApplication(RemoteRootComponent)).catch((error:unknown)=>console.error('Cart remote startup failed.',error));
