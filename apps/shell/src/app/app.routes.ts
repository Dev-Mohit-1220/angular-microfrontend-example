import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { RemoteUnavailableComponent } from './remote-unavailable.component';
interface RemoteRoutes { readonly REMOTE_ROUTES:Routes; }
function remoteRoutes(name:string):Promise<Routes> {
  return loadRemoteModule<RemoteRoutes>(name,'./Routes').then(remote=>remote.REMOTE_ROUTES).catch((error:unknown)=>{
    console.error(`Remote ${name} failed to load.`,error);
    return [{path:'',component:RemoteUnavailableComponent}];
  });
}
export const routes:Routes=[{path:'',pathMatch:'full',redirectTo:'products'},{path:'products',loadChildren:()=>remoteRoutes('products')},{path:'cart',loadChildren:()=>remoteRoutes('cart')},{path:'checkout',loadChildren:()=>remoteRoutes('checkout')},{path:'profile',loadChildren:()=>remoteRoutes('profile')},{path:'**',redirectTo:'products'}];
