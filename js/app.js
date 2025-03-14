const cryptoCurrenciesSelect = document.querySelector('#criptomonedas');
const coinSelect = document.querySelector('#moneda');
const form = document.querySelector('#formulario');
const result = document.querySelector('#resultado');


const objSearch = {
    coin: '',
    cryptocurrency: '',
}

// create Promise
const obtainCryptoCurrency = cryptoCurrencies => new Promise( resolve => {
    resolve( cryptoCurrencies )
})

document.addEventListener('DOMContentLoaded', () => {
    consultCryptocurrencies();

    form.addEventListener('submit', submitForm);

    cryptoCurrenciesSelect.addEventListener('change', readValue)

    coinSelect.addEventListener('change', readValue)
    
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

function readValue( e ) {
    objSearch[e.target.name] = e.target.value;

    console.log( objSearch )
}

function submitForm( e ) {
    e.preventDefault();

    const { coin, cryptocurrency } = objSearch;
    
    if ( coin.trim() === '' || cryptocurrency.trim() === '') {
        showAlert('Ambos campos son obligatorios');
        return;
    }
    // query the API to get the result
    consultApi();
}

function showAlert( message ) {
    
    const existMessage = document.querySelector('.error');
    if( existMessage ) return;
    
    const divMessage = document.createElement('P');
    divMessage.classList.add('error');
    divMessage.textContent = message;
    
    form.appendChild(divMessage)
    
    setTimeout(() => {
        divMessage.remove();
    }, 3000)
    
    
}

function consultApi() {
    const { coin, cryptocurrency } = objSearch;
    
}