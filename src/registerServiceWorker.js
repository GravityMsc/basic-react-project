const register = () => {
  if (/* process.env.NODE_ENV === 'production' && */'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      // 注册成功
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      navigator.serviceWorker.ready.then((ReadyRegistration) => {
        ReadyRegistration.pushManager.subscribe({
          userVisibleOnly: true,
        }).then((pushSubscription) => {
          console.log('ServiceWorker pushSubscription successful: ', pushSubscription);
        }, (err) => {
          console.log('ServiceWorker pushSubscription failed: ', err);
        });
      });
    }).catch((err) => {
      // 注册失败
      console.log('ServiceWorker registration failed: ', err);
    });
  }
};
export default register;
