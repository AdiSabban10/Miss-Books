import { BookIndex } from "./pages/BookIndex.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { HomePage } from "./pages/HomePage.jsx"

const { useState } = React

export function RootCmp() {
    const [ route, setRoute ] = useState('Books')

    return (
        <React.Fragment>
            <header>
                <h1>Miss Books</h1>
                <nav>
                    <a onClick={() => setRoute('Home')} href="#">Home</a>
                    <a onClick={() => setRoute('About')} href="#">About</a>
                    <a onClick={() => setRoute('Books')} href="#">Books</a>
                </nav>
            </header>
            
            <main className="content-grid">
                {route === 'Home' && <HomePage />}
                {route === 'About' && <AboutUs />}
                {route === 'Books' && <BookIndex />}
            </main>
        </React.Fragment>
    )
}