const requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

export default async function fetchCurrencies(offset, limit = 10) {
  const res = await fetch(`https://api.coincap.io/v2/assets?limit=${limit}&offset=${offset * 10}`, requestOptions);
  const result = await res.json();
  return result.data;
}

export async function fetchCurrency(ids) {
  const res = await fetch(`https://api.coincap.io/v2/assets?ids=${ids}`, requestOptions);
  const result = await res.json();
  return result.data;
}
