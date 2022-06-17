import 'intl';
import 'intl/locale-data/jsonp/en';

export const numberFormat = (value: number) => {
  return value > 0.01? value.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : `$${value}`
}
// export const percentageFormat = new Intl.NumberFormat('en-US', {style: 'percent'})
