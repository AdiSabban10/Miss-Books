const { useState, useEffect } = React
// const { useParams, useNavigate } = ReactRouter
const { useNavigate, useParams } = ReactRouterDOM

import { bookService } from '../services/book.service.js'

export function BookEdit() {
    const [ book, setBook ] = useState(null)
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    // const [bookToEdit, setBookToEdit] = useState(null)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(!params.bookId) return

        bookService.get(params.bookId)
            .then((book) => {
            const bookToEdit = { title: book.title, price: book.listPrice.amount }
            setBook(book)
            setBookToEdit(bookToEdit)
        })
    }, [])
    // }, [params.bookId])
    

    function onSave(ev) {
        ev.preventDefault()
        if (!bookToEdit.title || !bookToEdit.price) return
        
        let bookToSave

        if (book && book.id !== '') {
            const updatedBook = {
                ...book,
                title: bookToEdit.title,
                listPrice: { ...book.listPrice, amount: bookToEdit.price }
            }
            bookToSave = updatedBook
        } else {
            const newBook = {
                ...bookService.getEmptyBook(),
                title: bookToEdit.title,
                listPrice: { ...bookService.getEmptyBook().listPrice, amount: bookToEdit.price }
            }
            bookToSave = newBook
        }
        
        bookService.save(bookToSave)
            .then(() => navigate('/book'))
            .catch(() => {
                alert("Couldn't save")
                navigate('/book')
            })
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        
        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;
        
            case 'checkbox':
                value = target.checked
                break;
        }
        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }

    // if (!bookToEdit) return <div>Loading...</div>
    return (
        <section className="book-edit">
            <h1>{params.bookId ? 'Edit book' : 'Add book'}</h1>

            <form onSubmit={onSave}>
                <label htmlFor="title">Title</label>
                <input 
                    onChange={handleChange} value={bookToEdit.title} 
                    id="title" name="title"
                    type="text" placeholder="title" />

                <label htmlFor="price">Price</label>
                <input   
                    onChange={handleChange} value={bookToEdit.price}  
                    id="price" name="price"
                    type="number" placeholder="price" />
                
                <button>Save</button>
            </form>
        </section>
    )
}