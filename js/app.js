const cryptoCurrenciesSelect = document.querySelector('#criptomonedas');

// create Promise
const obtainCryptoCurrency = cryptoCurrencies => new Promise( resolve => {
    resolve( cryptoCurrencies )
})

document.addEventListener('DOMContentLoaded', () => {
    consultCryptocurrencies();
})

function consultCryptocurrencies() {
    const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

    fetch( url )
        .then( res => res.json() )
        .then( res => obtainCryptoCurrency( res.Data ))
        .then( res => selectCryptoCurrency( res ))
}

function selectCryptoCurrency( cryptoCurrencies ) {
    cryptoCurrencies.forEach( crypto => {
        const { FullName, Name } = crypto.CoinInfo;

        const option = document.createElement('OPTION');
        option.value = Name;
        option.textContent = FullName;
        cryptoCurrenciesSelect.appendChild( option )
    });
}