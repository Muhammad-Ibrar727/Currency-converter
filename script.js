const apiKey = 'Enter your api here';

const apiUrl = `https://api.exchangerate-api.com/v4/latest/USD`;

const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const resultText = document.getElementById('resultText');

// Map of currency codes to country flag URLs
const currencyFlags = {
    'USD': 'https://flagcdn.com/us.svg', // United States Dollar
    'EUR': 'https://flagcdn.com/eu.svg', // Euro
    'GBP': 'https://flagcdn.com/gb.svg', // British Pound
    'JPY': 'https://flagcdn.com/jp.svg', // Japanese Yen
    'AUD': 'https://flagcdn.com/au.svg', // Australian Dollar
    'CAD': 'https://flagcdn.com/ca.svg', // Canadian Dollar
    'CNY': 'https://flagcdn.com/cn.svg', // Chinese Yuan
    'INR': 'https://flagcdn.com/in.svg', // Indian Rupee
    'CHF': 'https://flagcdn.com/ch.svg', // Swiss Franc
    'NZD': 'https://flagcdn.com/nz.svg', // New Zealand Dollar
    'ZAR': 'https://flagcdn.com/za.svg', // South African Rand
    'SGD': 'https://flagcdn.com/sg.svg', // Singapore Dollar
    'HKD': 'https://flagcdn.com/hk.svg', // Hong Kong Dollar
    'KRW': 'https://flagcdn.com/kr.svg', // South Korean Won
    'MXN': 'https://flagcdn.com/mx.svg', // Mexican Peso
    'BRL': 'https://flagcdn.com/br.svg', // Brazilian Real
    'RUB': 'https://flagcdn.com/ru.svg', // Russian Ruble
    'SEK': 'https://flagcdn.com/se.svg', // Swedish Krona
    'NOK': 'https://flagcdn.com/no.svg', // Norwegian Krone
    'DKK': 'https://flagcdn.com/dk.svg', // Danish Krone
    'PLN': 'https://flagcdn.com/pl.svg', // Polish Zloty
    'THB': 'https://flagcdn.com/th.svg', // Thai Baht
    'IDR': 'https://flagcdn.com/id.svg', // Indonesian Rupiah
    'TRY': 'https://flagcdn.com/tr.svg', // Turkish Lira
    'ILS': 'https://flagcdn.com/il.svg', // Israeli Shekel
    'SAR': 'https://flagcdn.com/sa.svg', // Saudi Riyal
    'MYR': 'https://flagcdn.com/my.svg', // Malaysian Ringgit
    'PHP': 'https://flagcdn.com/ph.svg', // Philippine Peso
    'VND': 'https://flagcdn.com/vn.svg', // Vietnamese Dong
    'NGN': 'https://flagcdn.com/ng.svg', // Nigerian Naira
    'EGP': 'https://flagcdn.com/eg.svg', // Egyptian Pound
    'BDT': 'https://flagcdn.com/bd.svg', // Bangladeshi Taka
    'PKR': 'https://flagcdn.com/pk.svg', // Pakistani Rupee
    'CLP': 'https://flagcdn.com/cl.svg', // Chilean Peso
    'COP': 'https://flagcdn.com/co.svg', // Colombian Peso
    'ARS': 'https://flagcdn.com/ar.svg', // Argentine Peso
    'PEN': 'https://flagcdn.com/pe.svg', // Peruvian Sol
    'UAH': 'https://flagcdn.com/ua.svg', // Ukrainian Hryvnia
    'AED': 'https://flagcdn.com/ae.svg', // UAE Dirham
    'QAR': 'https://flagcdn.com/qa.svg', // Qatari Riyal
    'KWD': 'https://flagcdn.com/kw.svg', // Kuwaiti Dinar
    'BHD': 'https://flagcdn.com/bh.svg', // Bahraini Dinar
    'OMR': 'https://flagcdn.com/om.svg', // Omani Rial
    'MAD': 'https://flagcdn.com/ma.svg', // Moroccan Dirham
    'TND': 'https://flagcdn.com/tn.svg', // Tunisian Dinar
    'JOD': 'https://flagcdn.com/jo.svg', // Jordanian Dinar
    'LBP': 'https://flagcdn.com/lb.svg', // Lebanese Pound
    'IRR': 'https://flagcdn.com/ir.svg', // Iranian Rial
    'DZD': 'https://flagcdn.com/dz.svg', // Algerian Dinar
    'KES': 'https://flagcdn.com/ke.svg', // Kenyan Shilling
    'TZS': 'https://flagcdn.com/tz.svg', // Tanzanian Shilling
    'UGX': 'https://flagcdn.com/ug.svg', // Ugandan Shilling
    'GHS': 'https://flagcdn.com/gh.svg', // Ghanaian Cedi
    'ZMW': 'https://flagcdn.com/zm.svg', // Zambian Kwacha
    'XOF': 'https://flagcdn.com/sn.svg', // West African CFA Franc (using Senegal's flag)
    'XAF': 'https://flagcdn.com/cm.svg', // Central African CFA Franc (using Cameroon’s flag)
    'MZN': 'https://flagcdn.com/mz.svg', // Mozambican Metical
    'AOA': 'https://flagcdn.com/ao.svg', // Angolan Kwanza
    'ETB': 'https://flagcdn.com/et.svg', // Ethiopian Birr
    'RWF': 'https://flagcdn.com/rw.svg', // Rwandan Franc
    'MWK': 'https://flagcdn.com/mw.svg', // Malawian Kwacha
    'ZWL': 'https://flagcdn.com/zw.svg', // Zimbabwean Dollar
    'SYP': 'https://flagcdn.com/sy.svg', // Syrian Pound
    'IQD': 'https://flagcdn.com/iq.svg', // Iraqi Dinar
};


async function populateCurrencyOptions(selectElement) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const currencies = Object.keys(data.rates);

        const selected = document.createElement('div');
        selected.classList.add('select-selected');
        selected.innerHTML = `<img src="${currencyFlags['USD']}" alt="" /> USD`;
        selectElement.appendChild(selected);

        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('select-items');

        currencies.forEach(currency => {
            const option = document.createElement('div');
            option.innerHTML = `<img src="${currencyFlags[currency] || ''}" alt="S" /> ${currency}`;
            option.addEventListener('click', function() {
                selected.innerHTML = this.innerHTML;
                closeAllSelect();
                selectElement.dataset.value = currency;
            });
            optionsContainer.appendChild(option);
        });

        selectElement.appendChild(optionsContainer);

        selected.addEventListener('click', function(e) {
            e.stopPropagation();
            closeAllSelect(this);
            optionsContainer.style.display = optionsContainer.style.display === 'none' || !optionsContainer.style.display ? 'block' : 'none';
            this.classList.toggle('select-arrow-active');
        });
    } catch (error) {
        console.error('Error fetching currencies:', error);
    }
}

function closeAllSelect(el) {
    const items = document.querySelectorAll('.select-items');
    const selectedItems = document.querySelectorAll('.select-selected');

    for (let i = 0; i < selectedItems.length; i++) {
        if (el !== selectedItems[i]) {
            selectedItems[i].classList.remove('select-arrow-active');
        }
    }

    for (let i = 0; i < items.length; i++) {
        items[i].style.display = 'none';
    }
}

document.addEventListener('click', closeAllSelect);

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const from = fromCurrency.dataset.value;
    const to = toCurrency.dataset.value;

    if (amount === '' || isNaN(amount)) {
        alert('Please enter a valid amount');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}`);
        const data = await response.json();

        const rate = data.rates[to] / data.rates[from];
        const convertedAmount = (amount * rate).toFixed(2);

        resultText.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
    } catch (error) {
        console.error('Error fetching conversion rate:', error);
    }
}

populateCurrencyOptions(fromCurrency);
populateCurrencyOptions(toCurrency);

convertBtn.addEventListener('click', convertCurrency);
