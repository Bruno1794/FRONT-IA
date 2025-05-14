import styles from './modal.module.css'
import {ReactNode} from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}
export default function ModalModern({isOpen, onClose, children}: ModalProps) {
    if (!isOpen) return null;
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
}