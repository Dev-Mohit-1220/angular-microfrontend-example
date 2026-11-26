import { withNativeFederation,shareAll } from '@angular-architects/native-federation/config';
export default withNativeFederation({
 name:'products',
 exposes:{'./Routes':'./apps/products/src/app/remote-entry/entry.routes.ts'},
 shared:{...shareAll({singleton:true,strictVersion:true,requiredVersion:'auto'})},
 skip:['rxjs/ajax','rxjs/fetch','rxjs/testing','rxjs/webSocket']
});
