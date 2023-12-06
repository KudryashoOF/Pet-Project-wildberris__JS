const cart = () => {
    const cartBtn =  document.querySelector('.button-cart')
    const cartModal = document.getElementById('modal-cart')
    const modalClose = cartModal.querySelector('.modal-close')

    cartBtn.addEventListener('click', ()=> {
        cartModal.style.display = 'flex'
    })

    modalClose.addEventListener('click', () => {
        cartModal.style.display = ''
    })
}

cart()