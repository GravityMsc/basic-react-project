const myFetch = async (url, options, transform = res => (res.json())) => {
  let result = '';
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      result = await transform(response);
    }
  } catch (error) {
    console.error(error);
  }
  return result;
};

export default myFetch;
