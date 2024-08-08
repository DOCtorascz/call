const btnStart = document.getElementById('fetch-data');

const fetchNewCompanies = async () => {
    const url = 'http://77.222.42.27:3000/proxy';

    const params = {
        key: '66cb84e2bc25a2f',
    };

    const queryString = new URLSearchParams(params).toString();
    const requestUrl = `${url}?${queryString}`;

    try {
        const response = await fetch(requestUrl);
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.statusText}`);
        }
        const data = await response.json();
        companySee(data)
    } catch (error) {
        console.error('Ошибка:', error);
    }
};

btnStart.addEventListener('click', fetchNewCompanies)

const companySee = (data) => {
    data.companies_data.forEach(element => {
        contactAdd(element)
    });
}

const contactAdd = (element) => {
    const formData = new FormData();
    formData.append('public_key', '34c599b4bbff31c7d17a283ef823a91a');
    formData.append('phone', element.mobile_phone);
    formData.append('legal_name', element.legal_name);
    formData.append('campaign_id', '360579384');
    formData.append('text', 'Здравствуйте! Нажмите 1 для получения информации о продукте, 2 для связи с оператором.');
    formData.append('speaker', 'male');

    fetch('https://zvonok.com/manager/cabapi_external/api/v1/phones/call/', {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Успешный ответ от сервера:', data);
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
        });
}