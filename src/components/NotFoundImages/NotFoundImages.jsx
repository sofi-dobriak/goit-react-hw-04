import styles from './NotFoundImages.module.css';

const NotFoundImages = ({ message }) => {
    return <p className={styles.notFoundImages}>{message}</p>;
};

export default NotFoundImages;
