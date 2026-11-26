import { bootstrapApplication } from '@angular/platform-browser';
import { initFederation } from '@angular-architects/native-federation';
import { RemoteRootComponent } from '../../shared/remote-root.component';
initFederation().then(()=>bootstrapApplication(RemoteRootComponent)).catch((error:unknown)=>console.error('Products remote startup failed.',error));
