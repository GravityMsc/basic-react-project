const debounce = (fn, wait, immediate) => {
  let timer = null;

  return function transportFn(...params) {
    const context = this;
    if (immediate && !timer) {
      fn.apply(context, params);
    }

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, params);
    }, wait);
  };
};

const throttle = (fn, wait, immediate) => {
  let timer = null;
  let callNow = immediate;

  return function transportFn(...params) {
    const context = this;

    if (callNow) {
      fn.apply(context, params);
      callNow = false;
    }

    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, params);
        timer = null;
      }, wait);
    }
  };
};
export {
  debounce,
  throttle,
};
