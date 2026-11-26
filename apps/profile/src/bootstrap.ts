import { bootstrapApplication } from '@angular/platform-browser';
import { RemoteRootComponent } from '../../shared/remote-root.component';
bootstrapApplication(RemoteRootComponent).catch((error:unknown)=>console.error('Profile remote bootstrap failed.',error));
