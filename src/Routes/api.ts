import axios from "axios";

export function fetchCoins() {
  return axios
    .get("https://api.coinpaprika.com/v1/coins")
    .then((res) => res.data);
}

export function fetchCoinInfo(coinId: string) {
  return axios
    .get(`https://api.coinpaprika.com/v1/coins/${coinId}`)
    .then((res) => res.data);
}

export function fetchCoinPrice(coinId: string) {
  return axios
    .get(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
    .then((res) => res.data);
}

export function fetchCoinTimePrice(coinId: string) {
  return axios
    .get(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
    .then((res) => res.data);
}
