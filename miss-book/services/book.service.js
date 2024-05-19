import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    saveReview,
    removeReview,

}
// For Debug (easy access from console):
// window.bs = bookService

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }

            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount >= filterBy.price)
            }

            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => {
            book = _setNextPrevBookId(book)
            return book
        })
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    // if (book.id) {
    if (book.id !== '') {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', price = 0 ) {
    const book = {
        id: '',
        title: title,
        subtitle: '',
        authors: [],
        publishedDate: '',
        description: '',
        pageCount: '',
        categories: [],
        thumbnail: `./assets/img/not-available.jpg`,
        language: '',
        listPrice: {
            amount: price,
            currencyCode: '',
            isOnSale: '',
        },
        reviews: []
    }
    return book
}

function getDefaultFilter(filterBy = { title: '', price: 0 }) {
    return { title: filterBy.title, price: filterBy.price }
}

function removeReview(bookId, reviewId) {
    let books = utilService.loadFromStorage(BOOK_KEY)
    let book = books.find((book) => book.id === bookId)
    const newReviews = book.reviews.filter((review) => review.id !== reviewId)
    book.reviews = newReviews
    utilService.saveToStorage(BOOK_KEY, books)
    return Promise.resolve()
}

function saveReview(bookId, reviewToSave) {

    return get(bookId).then(book => {
        const review = _createReview(reviewToSave)
        book.reviews.unshift(review)
        return save(book).then(() => review)
    })
}
// function saveReview(bookId, reviewToSave) {
//     const books = utilService.loadFromStorage(BOOK_KEY)
//     const book = books.find((book) => book.id === bookId)
//     const review = _createReview(reviewToSave)
//     book.reviews.unshift(review)
//     utilService.saveToStorage(BOOK_KEY, books)
//     return Promise.resolve(review)
// }

function _createReview(reviewToSave) {
    return {
        id: utilService.makeId(),
        ...reviewToSave,
    }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    
    if (!books || !books.length) {
        books = []
        const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
        for (let i = 0; i < 20; i++) {
            const book = {
                id: utilService.makeId(),
                title: utilService.makeLorem(2),
                subtitle: utilService.makeLorem(4),
                authors: [
                    utilService.makeLorem(1)
                ],
                publishedDate: utilService.getRandomIntInclusive(1950, 2024),
                description: utilService.makeLorem(20),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `./assets/img/${i + 1}.jpg`,
                language: "en",
                listPrice: {
                    amount: utilService.getRandomIntInclusive(80, 500),
                    currencyCode: "EUR",
                    isOnSale: Math.random() > 0.7
                },
                reviews: [],
            }
            books.push(book)
        }
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _setNextPrevBookId(book) {
    return storageService.query(BOOK_KEY).then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}
