import { utilService } from '../services/util.service.js';

export function BookPreview({ book }) {
    const bookTitle = book.title.charAt(0).toUpperCase() + book.title.slice(1)
  const price = 'Price: ' + utilService.getCurrencySign(book.listPrice.currencyCode) + ' ' + book.listPrice.amount
    return <article className="book-preview">
        <img src={book.thumbnail} />
        <h3>{ bookTitle}</h3>
        <span>{price}</span>
        <span>{book.listPrice.isOnSale ? 'On sale' : ''}</span>
    </article>
}