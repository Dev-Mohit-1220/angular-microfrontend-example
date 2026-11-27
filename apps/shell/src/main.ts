import { initFederation, type NativeFederationResult } from '@angular-architects/native-federation';
import { showStartupError } from './startup-error';

const startApplication = async (): Promise<void> => {
  const federation: NativeFederationResult = await initFederation('/federation.manifest.json');
  const { bootstrap } = await import('./bootstrap');
  await bootstrap(federation);
};

void startApplication().catch(showStartupError);
