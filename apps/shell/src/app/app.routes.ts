import type { Routes } from '@angular/router';
import type { NativeFederationResult } from '@angular-architects/native-federation';
import { RemoteUnavailableComponent } from './remote-unavailable.component';

interface RemoteRoutes {
  readonly REMOTE_ROUTES: Routes;
}

export const routes = (federation: NativeFederationResult): Routes => {
  const loader = federation.as<RemoteRoutes>();

  const loadRemoteRoutes = async (name: string): Promise<Routes> => {
    try {
      const remote = await loader.loadRemoteModule(name, './Routes');
      return remote.REMOTE_ROUTES;
    } catch (error: unknown) {
      console.error(`Remote ${name} failed to load.`, error);
      return [{ path: '', component: RemoteUnavailableComponent }];
    }
  };

  return [
    { path: '', pathMatch: 'full', redirectTo: 'products' },
    { path: 'products', loadChildren: () => loadRemoteRoutes('products') },
    { path: 'cart', loadChildren: () => loadRemoteRoutes('cart') },
    { path: 'checkout', loadChildren: () => loadRemoteRoutes('checkout') },
    { path: 'profile', loadChildren: () => loadRemoteRoutes('profile') },
    { path: '**', redirectTo: 'products' },
  ];
};
