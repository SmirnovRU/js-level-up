const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (obj) => {
    return `<div class="product-item">
                <img src="./img/vector.svg" alt="img">
                <h3>${obj.title}</h3>
                <p>${obj.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};

const renderPage = list => {
        const productsList = list.map(item => renderProduct(item));
        document.querySelector('.products').innerHTML = productsList.join('');
    };
    
    renderPage(products);


    //3 метод map возвращает результат массив, поэтому после каждого элемента массива ставится запятая. 
    // Исправил я это, применив метод join, который объединяет все элементы массива в строку.

