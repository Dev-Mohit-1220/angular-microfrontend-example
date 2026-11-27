export function showStartupError(error: unknown): void {
  console.error('ShopSphere could not start.', error);

  const container = document.createElement('main');
  container.setAttribute('role', 'alert');
  container.style.cssText =
    'max-width:640px;margin:12vh auto;padding:32px;font-family:Arial,sans-serif;color:#182230;line-height:1.6';

  const heading = document.createElement('h1');
  heading.textContent = 'ShopSphere could not start';

  const message = document.createElement('p');
  message.textContent =
    'The application could not initialize its microfrontend configuration. Check your connection and deployment settings, then retry.';

  const retry = document.createElement('button');
  retry.type = 'button';
  retry.textContent = 'Retry';
  retry.style.cssText =
    'padding:10px 16px;border:0;border-radius:8px;background:#2458d3;color:#fff;cursor:pointer';
  retry.addEventListener('click', () => window.location.reload());

  container.append(heading, message, retry);
  document.body.replaceChildren(container);
}
