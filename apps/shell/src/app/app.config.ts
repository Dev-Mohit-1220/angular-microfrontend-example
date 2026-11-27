import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';
import type { NativeFederationResult } from '@angular-architects/native-federation';
import { routes } from './app.routes';

export const MODULE_LOADER = new InjectionToken<NativeFederationResult>('NATIVE_FEDERATION_RESULT');

export const appConfig = (nf: NativeFederationResult): ApplicationConfig => ({
  providers: [{ provide: MODULE_LOADER, useValue: nf }, provideRouter(routes(nf))],
});
