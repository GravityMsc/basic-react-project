const register = () => {
  if (/* process.env.NODE_ENV === 'production' && */'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/PWA/service-worker.js').then((registration) => {
      // 注册成功
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch((err) => {
      // 注册失败 :(
      console.log('ServiceWorker registration failed: ', err);
    });
  }
};
export default register;
