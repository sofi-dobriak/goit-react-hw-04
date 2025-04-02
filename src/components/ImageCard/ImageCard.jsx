import styles from './ImageCard.module.css';

const ImageCard = ({ image, onClick }) => {
    return (
        <li onClick={onClick} className={styles.imageItem}>
            <img className={styles.image} src={image.urls.small} alt={image.alt_description} />
        </li>
    );
};

export default ImageCard;
