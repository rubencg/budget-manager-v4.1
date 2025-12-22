import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    const overlayRef = useRef<HTMLDivElement>(null);

    const contentRef = useRef<HTMLDivElement>(null);
    const previousFocus = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            previousFocus.current = document.activeElement as HTMLElement;
            document.addEventListener('keydown', handleEscape);

            // Focus the modal content to trap focus, but prevent scrolling
            setTimeout(() => {
                contentRef.current?.focus({ preventScroll: true });
            }, 0);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            previousFocus.current?.focus({ preventScroll: true });
        };
    }, [isOpen, onClose]);

    const isMouseDownOnOverlay = useRef(false);

    const handleOverlayMouseDown = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) {
            isMouseDownOnOverlay.current = true;
        } else {
            isMouseDownOnOverlay.current = false;
        }
    };

    const handleOverlayMouseUp = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current && isMouseDownOnOverlay.current) {
            onClose();
        }
        isMouseDownOnOverlay.current = false;
    };

    if (!isOpen) return null;

    return createPortal(
        <div
            className="modal-overlay"
            ref={overlayRef}
            onMouseDown={handleOverlayMouseDown}
            onMouseUp={handleOverlayMouseUp}
        >
            <div className="modal-content" ref={contentRef} tabIndex={-1} style={{ outline: 'none' }}>
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="modal-close" onClick={onClose}>
                        &times;
                    </button>
                </div>
                {children}
            </div>
        </div>,
        document.body
    );
};
