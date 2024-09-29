const BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = "CG-3GC83jHz2vCW8VR2ZZf7wBqp";

const getCoinList = () => {
  return `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=2&x_cg_demo_api_key=${API_KEY}`;
};
export { getCoinList };
