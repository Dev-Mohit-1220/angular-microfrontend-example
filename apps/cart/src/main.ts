import { initFederation } from '@angular-architects/native-federation';

const startApplication = async (): Promise<void> => {
  await initFederation();
  await import('./bootstrap');
};

void startApplication().catch((error: unknown) => {
  console.error('Cart remote initialization failed.', error);
});
