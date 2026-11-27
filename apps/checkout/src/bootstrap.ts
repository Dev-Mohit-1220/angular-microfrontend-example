import { bootstrapApplication } from '@angular/platform-browser';
import { RemoteRootComponent } from '../../shared/remote-root.component';

void bootstrapApplication(RemoteRootComponent).catch((error: unknown) => {
  console.error('Checkout remote bootstrap failed.', error);
});
