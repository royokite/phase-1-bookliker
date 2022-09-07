document.addEventListener("DOMContentLoaded", bookLiker());

function bookLiker() {
    const booksURL = 'http://localhost:3000/books'

    fetch(booksURL)
    .then(response => response.json())
    .then(allBooks => {
        const bookList = document.querySelector('#list')
        allBooks.map(book => {
            const li = document.createElement('li')
            li.innerHTML = `${book.title}`
            
            bookList.appendChild(li)
        })
        bookList.addEventListener('click', e => {
            const selectedBook = e.target.textContent
            const targetBook = allBooks.filter(findBook => findBook.title === selectedBook)
            const bookDetails = document.querySelector('#show-panel')
            bookDetails.innerHTML = ''

            targetBook.map(thisDetails => {
                const card = document.createElement('article')
                card.innerHTML = `
                    <img src="${thisDetails.img_url}" />
                    <h2>${thisDetails.title}</h2>
                    <h3>${thisDetails.subtitle}</h3>
                    <h3>${thisDetails.author}</h3>
                    <p>${thisDetails.description}</p>
                    <ul><li>${thisDetails.users.map(eachUser => eachUser.username)}</li></ul>
                    <button>Like</button>
                `
            bookDetails.appendChild(card)

                const likeBtn = document.querySelector('button')
                likeBtn.addEventListener('click', () => {
                    const userLikes = targetBook[0].users
                    const newUserLikes = {"id":1, "username":"pouros"}
                    fetch(`http://localhost:3000/books/${targetBook[0].id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json'
                        },
                        body: JSON.stringify({
                            "users": [
                                [...userLikes, newUserLikes],
                              ]
                        })
                    })              
                })
            })            
        })        
    })
}