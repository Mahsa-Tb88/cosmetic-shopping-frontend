globalThis.getNewSearchParams = (oldParams, key, value) => {
  if (!oldParams.get) {
    oldParams = new URLSearchParams(oldParams);
  }
  const keys = Array.from(oldParams.keys());
  const params = {};
  for (let i = 0; i < keys.length; i++) {
    params[keys[i]] = oldParams.get(keys[i]);
  }
  if (value) {
    params[key] = value;
  } else {
    delete params[key];
  }
  return params;
};
