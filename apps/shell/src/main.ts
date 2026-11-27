import { initFederation, type NativeFederationResult } from '@angular-architects/native-federation';

const startApplication = async (): Promise<void> => {
  const federation: NativeFederationResult = await initFederation('/federation.manifest.json');
  const { bootstrap } = await import('./bootstrap');
  await bootstrap(federation);
};

void startApplication().catch((error: unknown) => {
  console.error('ShopSphere shell startup failed.', error);
});
