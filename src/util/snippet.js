/* eslint-disable */
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

/** custom function call & apply */
Function.prototype.call = function (context) {
  if (!context) {
    context = window || global;
  }
  context.fn = this;
  let fnParams = [...arguments].slice(1);
  let result = context.fn(...fnParams);
  delete context.fn;
  return result;
};
Function.prototype.apply = function (context, paramArray) {
  if (!context) {
    context = window || global;
  }
  context.fn = this;
  let result;
  if (paramArray === undefined || paramArray === null) {
    result = context.fn(rest);
  } else if (typeof (paramArray) === 'object') {
    result = context.fn(...paramArray);
  }
  delete context.fn;
  return result;
}

function extend() {
  function superClass(name) {
    this.name = name;
  }
  superClass.prototype.sayName = function () {
    console.log(this.name);
  }

  function subClass(name, age) {
    superClass.call(this, name);
    this.age = age;
  }
  subClass.prototype = new superClass();
  subClass.prototype.constructor = subClass;
  subClass.prototype.sayAge = function () {
    console.log(this.age);
  }
}

export {
  debounce,
  throttle,
};
