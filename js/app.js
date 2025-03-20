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

    cryptoCurrenciesSelect.addEventListener('change', readValue);

    coinSelect.addEventListener('change', readValue);
    
})

async function consultCryptocurrencies() {
    const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

    // fetch( url )
    //     .then( res => res.json() )
    //     .then( res => obtainCryptoCurrency( res.Data ))
    //     .then( res => selectCryptoCurrency( res ))

    try {
        const responde = await fetch( url );
        const result = await responde.json();
        const cryptocurrency = await obtainCryptoCurrency( result.Data );
        selectCryptoCurrency( cryptocurrency )
    } catch (error) {
        throw new Error( error );
    }
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

async function consultApi() {
    const { coin, cryptocurrency } = objSearch;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ cryptocurrency }&tsyms=${ coin }`;

    showSpinner();
    
    // fetch( url )
    //     .then( res => res.json() )
    //     .then( res => showQuotation( res.DISPLAY[cryptocurrency][coin] ) )

    try {
        const response = await fetch( url );
        const result = await response.json();
        showQuotation( result.DISPLAY[cryptocurrency][coin] )
    } catch (error) {
        throw new Error( error );
    }

}


function showQuotation( quotation ) {
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = quotation;

    cleanHTML();
    
    console.log( PRICE )
    
    const price = document.createElement('P');
    price.classList.add('precio');
    price.innerHTML = `El precio es de: <span>${ PRICE }</span>`;
    
    const priceHigh = document.createElement('P');
    priceHigh.innerHTML = `El precio mas alto del día es: <span>${ HIGHDAY }</span>`;
    
    const priceLow = document.createElement('P');
    priceLow.innerHTML = `El precio mas bajo del día es: <span>${ LOWDAY }</span>`;
    
    const priceChange = document.createElement('P');
    priceChange.innerHTML = `La variacion del día es: <span>${ CHANGEPCT24HOUR }</span>`;
    
    const priceUpdated = document.createElement('P');
    priceUpdated.innerHTML = `La ultima acutalización de su precio es: <span>${ LASTUPDATE }</span>`;


    result.append( price, priceHigh, priceLow, priceChange, priceUpdated );

}

function cleanHTML() {
    while( result.firstChild ) {
        result.removeChild( result.firstChild );
    }
}

function showSpinner() {
    cleanHTML();

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');

    spinner.innerHTML = `
        <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
    `;

    result.appendChild( spinner );
}