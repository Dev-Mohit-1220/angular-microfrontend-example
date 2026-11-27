import { bootstrapApplication } from '@angular/platform-browser';
import type { NativeFederationResult } from '@angular-architects/native-federation';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

export const bootstrap = (
  federation: NativeFederationResult,
): Promise<void> =>
  bootstrapApplication(AppComponent, appConfig(federation)).catch(
    (error: unknown) => {
      console.error('ShopSphere shell bootstrap failed.', error);
      throw error;
    },
  );
