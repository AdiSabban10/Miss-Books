const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'

import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from '../cmps/BookDetails.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'

export function BookIndex () {

    const [ books, setBooks ] = useState([])
    const [ selectedBook, setSelectedBook ] = useState(null)
    const [ filterBy, setFilterBy ] = useState(bookService.getDefaultFilter())

    // useEffect(() => {
    //     bookService.query()
    //         .then(books => setBooks(books))

    // }, [])

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

    function showBookDetails(book) {
        setSelectedBook(book)
    }

    return <section className="book-index">
        <h1>Books</h1>
        <button>Add a Book</button>

        <BookFilter filterBy={filterBy} onFilter={onSetFilterBy}/>
        {!selectedBook && <BookList books={books} onRemove={removeBook} onShowDetails={showBookDetails}/>}
        {selectedBook && <BookDetails book={selectedBook} onClose={() => setSelectedBook(null)} />}
        
    </section>
}