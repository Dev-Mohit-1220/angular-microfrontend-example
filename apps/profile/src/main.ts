import { initFederation } from '@angular-architects/native-federation';
initFederation().then(()=>import('./bootstrap')).catch((error:unknown)=>console.error('Profile remote initialization failed.',error));
