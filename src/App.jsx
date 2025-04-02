import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Container from './components/Container/Container';
import Loader from './components/Loader/Loader';
import { useState } from 'react';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import { fetchImages } from './api/images-api';
import { Toaster } from 'react-hot-toast';
import NotFoundImages from './components/NotFoundImages/NotFoundImages';

function App() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [loadMore, setLoadMore] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [notFoundMessage, setNotFoundMessage] = useState('');

    const handleSearch = async newQuery => {
        try {
            setImages([]);
            setError(false);
            setLoadMore(false);
            setLoading(true);
            setPage(1);
            setQuery(newQuery);
            setNotFoundMessage('');

            const data = await fetchImages(newQuery);

            if (data.results.length === 0) {
                setNotFoundMessage('No images found for your search. Try something else!');
            }

            setImages(data.results);
            setLoadMore(data.total > 12);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const loadMoreImages = async () => {
        try {
            setLoading(true);
            setLoadMore(false);

            const nextPage = page + 1;
            const data = await fetchImages(query, nextPage);

            setPage(nextPage);
            setImages(prevImages => [...prevImages, ...data.results]);
            setLoadMore(data.total > nextPage * 12);
        } catch (error) {
            setError(true);
            setLoadMore(false);
        } finally {
            setLoading(false);
        }
    };

    function openModal(image) {
        setSelectedImage(image);
        setModalIsOpen(true);
    }

    function closeModal() {
        setSelectedImage(null);
        setModalIsOpen(false);
    }

    return (
        <>
            <Container>
                <SearchBar onSearch={handleSearch} />
                <Toaster position='bottom-right' reverseOrder={false} />
                {notFoundMessage && <NotFoundImages message={notFoundMessage} />}
                {images.length > 0 && <ImageGallery images={images} openModal={openModal} />}
                {loading && <Loader loading={loading} />}
                {error && <ErrorMessage />}
                {loadMore && <LoadMoreBtn onClick={loadMoreImages} />}
                {modalIsOpen && <ImageModal image={selectedImage} closeModal={closeModal} />}
            </Container>
        </>
    );
}

export default App;
