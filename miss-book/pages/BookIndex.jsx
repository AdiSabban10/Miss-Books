const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'

export function BookIndex () {

    const [ books, setBooks ] = useState([])

    useEffect(() => {
        bookService.query()
            .then(books => setBooks(books))

    }, [])

    return <section className="book-index">
        <h1>Books</h1>
        <pre>{JSON.stringify(books, null, 2)}</pre>
    </section>
}