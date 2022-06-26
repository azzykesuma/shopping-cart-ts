import React from 'react'
const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency : 'USD', 
    style : 'currency'
})

const CurrencyFormatter = (number : number) => {
  return CURRENCY_FORMATTER.format(number)
}

export default CurrencyFormatter