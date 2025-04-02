import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, openModal }) => {
    return (
        <ul className={styles.imageList}>
            {images.map(image => (
                <ImageCard key={image.id} image={image} onClick={() => openModal(image)} />
            ))}
        </ul>
    );
};

export default ImageGallery;
