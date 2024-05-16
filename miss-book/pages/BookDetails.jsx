const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
// const { useNavigate, useParams } = ReactRouterDOM

const { Link } = ReactRouterDOM

import { utilService } from '../services/util.service.js'
import { bookService } from "../services/book.service.js"

import { LongTxt } from "../cmps/LongTxt.jsx"
import { ReviewAdd } from '../cmps/ReviewAdd.jsx'
import { ReviewList } from '../cmps/ReviewList.jsx'


export function BookDetails() {
    const [book, setBook] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isShowReviewModal, setIsShowReviewModal] = useState(null)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        bookService.get(params.bookId)
            .then(book => {
                setBook(book)
            })
            .catch(() => {
                alert('Couldnt get book...')
                navigate('/book')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [params.bookId])

    function onSaveReview(reviewToAdd) {
        bookService.saveReview(book.id, reviewToAdd)
            .then((review) => {
                const reviews = [review, ...book.reviews]
                setBook({ ...book, reviews })
            })
            .catch(() => {
                showErrorMsg(`Review to ${book.title} Failed!`, params.bookId)
            })
    }

    function onRemoveReview(reviewId) {
        bookService.removeReview(book.id, reviewId)
            .then(() => {
                const filteredReviews = book.reviews.filter(review => review.id !== reviewId)
                setBook({ ...book, reviews: filteredReviews })
            })
    }

    function onToggleReviewModal() {
        setIsShowReviewModal((prevIsShowReviewModal) => !prevIsShowReviewModal)
    }

    function getReadingDuration(pageCount) {
        if (pageCount > 500) return 'Serious Reading'
        else if (pageCount > 200) return 'Decent Reading'
        return 'Light Reading'
    }

    function getPublicationStatus(publishedDate) {
        const currentYear = new Date().getFullYear()
        const publicationYear = parseInt(publishedDate)
        const yearsAgo = currentYear - publicationYear

        if (yearsAgo > 10) return 'Vintage'
        return 'New'
    }

    function getPriceColorClass(amount) {
        if (amount > 150) return 'red-price'
        else if (amount < 20) return 'green-price'
        else return ''
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }


    if (isLoading) return <h3>Loading...</h3>
    return (
        <section>
            <div className="book-details">
                <div className='img-container'>
                    <img src={book.thumbnail} />
                </div>
                <div className='details-container'>
                    <h2>{capitalize(book.title)}</h2>
                    <h3>{book.subtitle}</h3>
                    <h4>Authors: {book.authors.join(', ')}</h4>
                    <h4>Categories: {book.categories.join(', ')}</h4>
                    <h4>Language: {book.language.toUpperCase()}</h4>
                    <h4 className={getPriceColorClass(book.listPrice.amount)}>
                        Price: {utilService.getCurrencySign(book.listPrice.currencyCode)}
                        {book.listPrice.amount}
                    </h4>
                    <h4>Is the book on sale? {book.listPrice.isOnSale ? 'Yes!' : 'no'}</h4>
                    <h4>
                        Page count: {book.pageCount} , Reading duration: {getReadingDuration(book.pageCount)}
                    </h4>
                    <h4>
                        Published Year: {book.publishedDate} ,
                        this book is: {getPublicationStatus(book.publishedDate)}
                    </h4>

                    <LongTxt txt={book.description} />
                    <button onClick={onToggleReviewModal}>Add review</button>

                    {isShowReviewModal && (
                        <ReviewAdd
                            onToggleReviewModal={onToggleReviewModal}
                            onSaveReview={onSaveReview}
                        />
                    )}

                <section className="actions">
                    <Link to={`/book/${book.prevBookId}`}><button>Prev</button></Link>
                    <Link to={`/book/${book.nextBookId}`}><button>Next</button></Link>
                    <Link to="/book"><button>x</button></Link>
                </section>
                </div>
            </div>
            <div className='review-container'>
                    <ReviewList
                        reviews={book.reviews}
                        onRemoveReview={onRemoveReview}
                    />
            </div>   
        </section >
    )
}