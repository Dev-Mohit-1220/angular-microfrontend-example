import { Routes } from '@angular/router';
import { NativeFederationResult } from '@angular-architects/native-federation';
import { RemoteUnavailableComponent } from './remote-unavailable.component';
interface RemoteRoutes { readonly REMOTE_ROUTES:Routes; }
export const routes=(nf:NativeFederationResult):Routes=>{
 const loader=nf.as<RemoteRoutes>();
 const remoteRoutes=(name:string):Promise<Routes>=>loader.loadRemoteModule(name,'./Routes').then(remote=>remote.REMOTE_ROUTES).catch((error:unknown)=>{
  console.error(`Remote ${name} failed to load.`,error);
  return [{path:'',component:RemoteUnavailableComponent}];
 });
 return [{path:'',pathMatch:'full',redirectTo:'products'},{path:'products',loadChildren:()=>remoteRoutes('products')},{path:'cart',loadChildren:()=>remoteRoutes('cart')},{path:'checkout',loadChildren:()=>remoteRoutes('checkout')},{path:'profile',loadChildren:()=>remoteRoutes('profile')},{path:'**',redirectTo:'products'}];
};
