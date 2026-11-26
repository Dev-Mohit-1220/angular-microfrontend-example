import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { initFederation } from '@angular-architects/native-federation';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
initFederation('/assets/federation.manifest.json').then(()=>bootstrapApplication(AppComponent,{providers:[provideRouter(routes)]})).catch((error:unknown)=>console.error('ShopSphere shell startup failed.',error));
