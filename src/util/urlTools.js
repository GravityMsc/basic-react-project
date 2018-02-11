const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce((a, v) => {
    const obj = a;
    obj[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1);
    return obj;
  }, {});
export default getURLParameters;
