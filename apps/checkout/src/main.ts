import { initFederation } from '@angular-architects/native-federation';
initFederation().then(()=>import('./bootstrap')).catch((error:unknown)=>console.error('Checkout remote initialization failed.',error));
