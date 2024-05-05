export function BookDetails({ book, onClose }) {
    return <section className="book-details">
        <h2>{book.title}</h2>
        <h3>{book.subtitle}</h3>
        <h4>Authors: {book.authors}</h4>
        <span>Published Date: {book.publishedDate}</span>
        <p>Description: {book.description}</p>
        <img src={book.thumbnail} alt="" />
        <span>Page Count: {book.pageCount}</span>
        <span>Categories: {book.categories}</span>
        <span>Language: {book.language}</span>
        <span>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</span>
        <span>{book.listPrice.isOnSale ? 'On sale' : ''}</span>
        <button onClick={onClose}>x</button>
    </section>
}