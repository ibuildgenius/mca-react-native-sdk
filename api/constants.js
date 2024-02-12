export const initiatePurchase = '/v1/sdk/initialize';
export let TOKEN = 'MCAPUBK_TEST|1acf339a-d36f-47e7-8e1b-fd0b76b61b0c';
export const isNull = value => {
  return [undefined, null, 'null'].includes(value);
};

export const currencify = (value, op = ',') => {
  if (isNull(value)) {
    return value;
  }
  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + op);
};
