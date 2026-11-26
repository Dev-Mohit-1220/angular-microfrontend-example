import { initFederation,type NativeFederationResult } from '@angular-architects/native-federation';
initFederation('/federation.manifest.json').then((nf:NativeFederationResult)=>import('./bootstrap').then(module=>module.bootstrap(nf))).catch((error:unknown)=>console.error('ShopSphere shell startup failed.',error));
