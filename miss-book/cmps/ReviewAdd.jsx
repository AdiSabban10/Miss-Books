const { useState, useEffect, useRef } = React

import { StarRating } from '../cmps/StarRating.jsx'

export function ReviewAdd({ onSaveReview, onToggleReviewModal }) {
    const inputRef = useRef()

    const [review, setReview] = useState({
        fullName: 'Books Reader',
        rating: 0,
        date: new Date().toISOString().slice(0, 10),
        txt: '',
    })

    // useEffect(() => {
    //     inputRef.current.focus()
    // }, [])

    function onAddReview(ev) {
        ev.preventDefault()
        onSaveReview(review)
        onToggleReviewModal()
    }
    
    function handleChange({ target }) {
        const { value, name: field } = target
        setReview((prevReview) => ({ ...prevReview, [field]: value }))
    }

    return (
        <section className='review-add'>
            <div className='review-modal'>
                <h1>Add review</h1>
                <button className='btn-toggle-modal' onClick={onToggleReviewModal}>x</button>

                <form onSubmit={onAddReview} className='review-form'>
                    <label htmlFor='fullname'>Full name:</label>
                    <input
                        autoFocus
                        ref={inputRef}
                        placeholder='Enter full name'
                        name='fullName'
                        type='text'
                        id='fullname'
                        value={review.fullName}
                        onChange={handleChange}
                        autoComplete='off'
                    />

                    <StarRating handleChange={handleChange} rating={review.rating} />
                    <label htmlFor='date'>Date:</label>
                    <input
                        type='date'
                        id='date'
                        name='date'
                        value={review.date}
                        onChange={handleChange}
                    />

                    <textarea
                        name='txt'
                        cols='30'
                        rows='10'
                        value={review.txt}
                        onChange={handleChange}
                    ></textarea>

                    <button>Add review</button>
                </form>
            </div>
        </section>
    )
}
