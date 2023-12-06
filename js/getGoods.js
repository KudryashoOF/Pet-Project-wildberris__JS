const getGoods = () =>{
    const links = document.querySelectorAll('.navigation-link')
    
    const getData = (data) => {
    // Получаем данные с сервера и обрабаттываем их спомощью цепочки методов then
    // Метод then отрабатывает только тогда, когда мы точно уверены что данные от серевера получены
    // этот ответ будет ввиде обьекта response
    // и для того что бы из него извлечь данные мы используем метод json
    fetch('https://wilberes-d97cc-default-rtdb.firebaseio.com/db.json').then((res)=> res.json())
    .then((data)=> {
        localStorage.setItem('goods', JSON.stringify(data))
    })
  }

    links.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault()
        getData()
    })
    

    // // вызываем глобальный метод localStorage для записи 
    // // передаем два аргумента 1-названгие сущности которую будет сохранять 2-значения
    // localStorage.setItem('goods', JSON.stringify({name: 'all'}))

    // // получаем данные с localStorage
    // console.log(JSON.parse(localStorage.getItem('goods')));
})
    
}

getGoods()