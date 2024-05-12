const { useState, useEffect } = React

export function BookFilter({ filterBy, onFilter }) {
    const [ filterByToEdit, setFilterByToEdit ] = useState(filterBy)
    // const [ filterByToEdit, setFilterByToEdit ] = useState({ ...filterBy })
    
    useEffect(() => {
        onFilter(filterByToEdit)
        // onFilter({ ...filterByToEdit })
    }, [filterByToEdit])
    
    function handleChange({ target }) {
        const { name, type } = target
        const value = (type === 'number') ? +target.value : target.value

        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value }))
    }

    return <section className="book-filter">
        <h3>Filter</h3>

        <input onChange={handleChange} value={filterByToEdit.title} name="title" type="text" placeholder="title"/>
        <input onChange={handleChange} value={filterByToEdit.price} name="price" type="number" placeholder="price"/>
    </section>
}