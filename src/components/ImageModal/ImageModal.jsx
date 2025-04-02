import styles from './ImageModal.module.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ImageModal = ({ closeModal, image }) => {
    if (!image) return null;

    const handleBackdropClick = e => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <Modal
            isOpen={image}
            onRequestClose={closeModal}
            overlayClassName={styles.overlay}
            className={styles.modal}
        >
            <div className={styles.overlay} onClick={handleBackdropClick}>
                <img
                    className={styles.image}
                    src={image.urls.regular}
                    alt={image.alt_description}
                />
            </div>
        </Modal>
    );
};

export default ImageModal;
