const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'

import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from '../cmps/BookDetails.jsx'

export function BookIndex () {

    const [ books, setBooks ] = useState([])
    const [ selectedBook, setSelectedBook ] = useState(null)

    useEffect(() => {
        bookService.query()
            .then(books => setBooks(books))

    }, [])

    function removeBook(bookId) {
        bookService.remove(bookId)
            .then(() => setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId)))
    }

    function showBookDetails(book) {
        setSelectedBook(book)
    }

    return <section className="book-index">
        <h1>Books</h1>
        <button>Add a Book</button>
        {!selectedBook && <BookList books={books} onRemove={removeBook} onShowDetails={showBookDetails}/>}
        {selectedBook && <BookDetails book={selectedBook} onClose={() => setSelectedBook(null)} />}
        
    </section>
}