const search = () =>{
    const input = document.querySelector('.search-block > input')
    const searchBtn = document.querySelector('.search-block > button')


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

    const getData = (value) => {
    // Получаем данные с сервера и обрабаттываем их спомощью цепочки методов then
    // Метод then отрабатывает только тогда, когда мы точно уверены что данные от серевера получены
    // этот ответ будет ввиде обьекта response
    // и для того что бы из него извлечь данные мы используем метод json
    fetch('https://wilberes-d97cc-default-rtdb.firebaseio.com/db.json').then((res)=> res.json())
    .then((data)=> {
        const array = data.filter((good) => {
            // Настраиваем фильтрацию поиска по сайту
            // метод incliudes ищшет в одной строке другую подстроку
            return good.name.toLowerCase().includes(value.toLowerCase())
        })
        localStorage.setItem('goods', JSON.stringify(array))

        if (window.location.pathname !== '/goods.html') {
            window.location.href = '/goods.html' 
        } else {
            renderGoods(array)
        }
    })
  }

    // так удобно обрабатывать ошибки, все ошибки будут выводиться в console
    try { searchBtn.addEventListener('click', () => {
        getData(input.value)
        })
    } catch (e) {
        console.error(e.message);
    }

}

search()