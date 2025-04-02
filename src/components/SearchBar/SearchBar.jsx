import styles from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.error('Please enter your request');

const SearchBar = ({ onSearch }) => {
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const query = form.elements.query.value.trim();

        if (!query) {
            notify();
            return;
        }

        onSearch(query);
        form.reset();
    };

    return (
        <header className={styles.header}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    className={styles.input}
                    name='query'
                    type='text'
                    autoComplete='off'
                    autoFocus
                    placeholder='Search images and photos'
                />
                <button type='submit'>Search</button>
            </form>
        </header>
    );
};

export default SearchBar;
