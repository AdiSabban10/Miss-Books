const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { eventBusService, showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'

export function BookIndex () {

    const [ books, setBooks ] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [ filterBy, setFilterBy ] = useState(bookService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        setSearchParams(filterBy)
        bookService.query(filterBy)
            .then(books => setBooks(books))
    }, [filterBy])

    function removeBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
                showSuccessMsg(`Book (${bookId}) removed successfully!`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('There was a problem')
            })
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