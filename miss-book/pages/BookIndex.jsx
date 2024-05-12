const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { bookService } from '../services/book.service.js'

import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'

export function BookIndex () {

    const [ books, setBooks ] = useState([])
    const [ filterBy, setFilterBy ] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        bookService.query(filterBy)
            .then(books => setBooks(books))
    }, [filterBy])

    function removeBook(bookId) {
        bookService.remove(bookId)
            .then(() => setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId)))
    }

    function onSetFilterBy(newFilter) {
        setFilterBy(newFilter)
    }

    if (!books) return <div>Loading...</div>
    return <section className="book-index">
        <h1>Books</h1>
        <Link to="/book/edit"><button>Add a Book</button></Link>

        <BookFilter filterBy={filterBy} onFilter={onSetFilterBy}/>
        {books.length && <BookList books={books} onRemove={removeBook}/>}
        {!books.length && <div> No Books found...</div>}
        
    </section>
}