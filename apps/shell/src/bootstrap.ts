import { bootstrapApplication } from '@angular/platform-browser';
import { NativeFederationResult } from '@angular-architects/native-federation';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
export const bootstrap=(nf:NativeFederationResult)=>bootstrapApplication(AppComponent,appConfig(nf)).catch((error:unknown)=>console.error('ShopSphere shell bootstrap failed.',error));
