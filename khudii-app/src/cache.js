// src/setupAxiosCache.js
import axios from "axios";
const cache={}
// Helper functions
const getCache = (key) => {
  try {
    // const cached = sessionStorage.getItem(key);
    const cached = cache[key];
    // return cached ? JSON.parse(cached) : null;
        return cached ? cached : null;
  } catch {
    return null;
  }
};

const setCache = (key, data) => {
  try {
    // sessionStorage.setItem(key, JSON.stringify(data));
    cache[key]=data
  } catch {}
};

// Request interceptor: check cache
axios.interceptors.request.use((config) => {
  const key = config.url + JSON.stringify(config.params || {});
  const cachedData = getCache(key);
  if (cachedData) {
    config.adapter = () => {
      return Promise.resolve({
        data: cachedData,
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      });
    };
  }
  return config;
});

// Response interceptor: store response in cache
axios.interceptors.response.use((response) => {
  const key = response.config.url + JSON.stringify(response.config.params || {});
  setCache(key, response.data);
  return response;
});
