const search = () =>{
    const input = document.querySelector('.search-block > input')
    const btn = document.querySelector('.search-block > button')

    input.addEventListener('input', (event) =>{
        const e = event.target.value
        console.log(e);
    })

}

search()