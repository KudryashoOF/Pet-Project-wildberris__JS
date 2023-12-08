const getGoods = () =>{
    const links = document.querySelectorAll('.navigation-link')
    
    const renderGoods = (goods)=>{
        const goodsContainer = document.querySelector('.long-goods-list')

        goodsContainer.innerHTML = ''
        goods.forEach(({img,label, name, offer, price, description, gender, id})=> {
            const goodBlock = document.createElement('div')
            goodBlock.classList.add('col-lg-3')
            goodBlock.classList.add('col-sm-6')

            goodBlock.innerHTML = `
                <div class="goods-card">
                    <span class="label ${label ? null : 'd-none'}">${label}</span>
                    <img src="db/${img}" alt="${name}: Faded Beach Trousers"
                        class="goods-image">
                    <h3 class="goods-title">${name}</h3>
                    <p class="goods-description">${description}</p>
                    <button class="button goods-card-btn add-to-cart" data-id="${id}">
                        <span class="button-price">$${price}</span>
                    </button>
                </div>
            `

            goodsContainer.append(goodBlock)
        })
    }

    const getData = (value, category) => {
    // Получаем данные с сервера и обрабаттываем их спомощью цепочки методов then
    // Метод then отрабатывает только тогда, когда мы точно уверены что данные от серевера получены
    // этот ответ будет ввиде обьекта response
    // и для того что бы из него извлечь данные мы используем метод json
    fetch('https://wilberes-d97cc-default-rtdb.firebaseio.com/db.json').then((res)=> res.json())
    .then((data)=> {
        const array = category ? data.filter((item) => item[category] === value) : data
        localStorage.setItem('goods', JSON.stringify(array))

        if (window.location.pathname !== '/goods.html') {
            window.location.href = '/goods.html' 
        } else {
            renderGoods(array)
        }
    })
  }

    links.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault()

        const linkVlaue = link.textContent
        const category = link.dataset.field

        getData(linkVlaue, category)
    })


    // Если у нас есть что-то в localSorrage с ключем goods и страница является goods.html
    if(localStorage.getItem('goods') && window.location.pathname  === '/goods.html') {
        renderGoods(JSON.parse(localStorage.getItem('goods')))
    }
    

    // // вызываем глобальный метод localStorage для записи 
    // // передаем два аргумента 1-названгие сущности которую будет сохранять 2-значения
    // localStorage.setItem('goods', JSON.stringify({name: 'all'}))

    // // получаем данные с localStorage
    // console.log(JSON.parse(localStorage.getItem('goods')));
})
    
}

getGoods()