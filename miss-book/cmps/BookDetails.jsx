import { LongTxt } from "./LongTxt.jsx"


export function BookDetails({ book, onClose }) {

    function getReadingType(pageCount) {
        if (pageCount > 500) return 'Serious Reading'
        else if (pageCount > 200) return 'Decent Reading'
        else if (pageCount < 100) return 'Light Reading'
        // else return ''
    }
    
    function getPublicationStatus(publishedDate) {
        const currentYear = new Date().getFullYear()
        const publicationYear = parseInt(publishedDate)
        const yearsAgo = currentYear - publicationYear

        if (yearsAgo > 10) return 'Vintage'
        else if (yearsAgo < 1) return 'New'
        // else return ''
    }

    function getPriceColorClass(amount) {
        if (amount > 150) return 'red-price'
        else if (amount < 20) return 'green-price'
        // else return ''
    }

    return <section className="book-details">
        <h2>{book.title}</h2>
        <h3>{book.subtitle}</h3>
        <h4>Authors: {book.authors}</h4>
        {/* <span>Published Date: {book.publishedDate}</span> */}
        <span>Publication Status: {getPublicationStatus(book.publishedDate)}</span>
        {/* <p>Description: {book.description}</p> */}
        <LongTxt txt={book.description} />
        <img src={book.thumbnail} alt="" />
        {/* <span>Page Count: {book.pageCount}</span> */}
        <span>Reading Type: {getReadingType(book.pageCount)}</span>
        <span>Categories: {book.categories}</span>
        <span>Language: {book.language}</span>
        <span>
            Price: <span className={getPriceColorClass(book.listPrice.amount)}>
                {book.listPrice.amount} {book.listPrice.currencyCode}
                </span> 
                {book.listPrice.isOnSale && <span className="on-sale"> On Sale</span>}
        </span>
        {/* <span>{book.listPrice.isOnSale ? 'On sale' : ''}</span> */}
        <button onClick={onClose}>x</button>
    </section>
}