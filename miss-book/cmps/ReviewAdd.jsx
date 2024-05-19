const { useState, useEffect, useRef } = React

import { StarRating } from '../cmps/StarRating.jsx'
import { SelectRating } from './dynamic-inputs/SelectRating.jsx'
import { NumInputRating } from './dynamic-inputs/NumInputRating.jsx'

export function ReviewAdd({ onSaveReview, onToggleReviewModal }) {
    const inputRef = useRef()

    const [review, setReview] = useState({
        fullName: 'Books Reader',
        rating: 0,
        date: new Date().toISOString().slice(0, 10),
        txt: '',
        selected: 0,
    })

    const { fullName, date, txt, rating } = review

    const [cmpType, setCmpType] = useState('stars')

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    function onAddReview(ev) {
        ev.preventDefault()
        onSaveReview(review)
        onToggleReviewModal()
    }
    
    function handleChange({ target }) {
        const { value, name: field } = target
        setReview((prevReview) => ({ ...prevReview, [field]: value }))
    }

    function onChangeCmpType(selectedType) {
        setCmpType(selectedType)
    }

    return (
        <section className='review-add'>
            <form onSubmit={onAddReview} className='review-form'>
                <div className='review-modal'>
                    <h1>Add review</h1>
                    <button className='btn-toggle-modal' 
                        onClick={onToggleReviewModal}>x
                    </button>

                    <label htmlFor='fullname'>Full name:</label>
                    <input
                        autoFocus
                        ref={inputRef}
                        placeholder='Enter full name'
                        name='fullName'
                        type='text'
                        id='fullname'
                        value={fullName}
                        onChange={handleChange}
                        autoComplete='off'
                    />

                    <label htmlFor='date'>Date:</label>
                    <input
                        type='date'
                        id='date'
                        name='date'
                        value={date}
                        onChange={handleChange}
                    />
                    
                    <div className='rate-by-choice'>
                        <p>Select rating type:</p>
                        <input name='rating'
                            onChange={(ev) => onChangeCmpType(ev.target.value)}
                            id='select'
                            type="radio"
                            value='select' />
                        <label htmlFor="select">Select</label>

                        <input name='rating'
                            onChange={(ev) => onChangeCmpType(ev.target.value)}
                            id='numInput'
                            type="radio"
                            value='numInput' />
                        <label htmlFor="numInput">Number Input</label>

                        <input name='rating'
                            onChange={(ev) => onChangeCmpType(ev.target.value)}
                            id='stars'
                            type="radio"
                            value='stars' />
                        <label htmlFor="stars">Stars</label>
                    </div>
                    <DynamicCmp type={cmpType} handleChange={handleChange} rating={rating} />
                    
                    <textarea
                        name='txt'
                        cols='30'
                        rows='10'
                        value={txt}
                        onChange={handleChange}
                    ></textarea>

                    <button>Add review</button>
                </div>
            </form>
        </section>
    )
}

function DynamicCmp(props) {
    switch (props.type) {
        case 'select':
            return <SelectRating {...props} />
        case 'numInput':
            return <NumInputRating {...props} />
        case 'stars':
            return <StarRating {...props} />

    }
}