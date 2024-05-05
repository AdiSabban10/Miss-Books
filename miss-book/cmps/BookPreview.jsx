export function BookPreview({ book }) {
    return <article className="book-preview">
        <h3>{book.title}</h3>
        <span>{book.listPrice.amount} {book.listPrice.currencyCode}</span>
        <span>{book.listPrice.isOnSale ? 'On sale' : ''}</span>
    </article>
}