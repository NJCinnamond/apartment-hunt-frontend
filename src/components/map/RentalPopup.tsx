'use client';

import React from 'react';
import { motion, MotionValue, useMotionValue, useTransform } from 'framer-motion';
import styles from './RentalPopup.module.css';
import { PanInfo } from 'framer-motion';
import { RentalResponse } from '@/api/generated';

interface RentalPopupProps {
    rental: RentalResponse;
    onSwipe: (direction: 'left' | 'right') => Promise<void>;
    onClose: () => void;
}

const SwipeFeedback = ({ x }: { x: MotionValue<number> }) => {
    const leftOpacity = useTransform(x, [-100, -50], [1, 0]);
    const rightOpacity = useTransform(x, [50, 100], [0, 1]);

    return (
        <>
            {/* Left (Reject) Indicator */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '40px',
                    transform: 'translateY(-50%)',
                    opacity: leftOpacity,
                    color: '#ff4444',
                    fontSize: '120px',
                    zIndex: 100,
                    pointerEvents: 'none',
                }}
            >
                😞
            </motion.div>

            {/* Right (Accept) Indicator */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: '40px',
                    transform: 'translateY(-50%)',
                    opacity: rightOpacity,
                    color: '#44dd44',
                    fontSize: '120px',
                    zIndex: 100,
                    pointerEvents: 'none',
                }}
            >
                😊
            </motion.div>
        </>
    );
};

export const RentalPopup: React.FC<RentalPopupProps> = ({ rental, onSwipe, onClose }) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-10, 10]);

    const handleDragEnd = async (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (Math.abs(info.offset.x) > 100) {
            const direction = info.offset.x > 0 ? 'right' : 'left';
            await onSwipe(direction);
        } else {
            // Return to center if not swiped far enough
            x.set(0);
        }
    };

    return (
        <motion.div 
            className={styles.popupContainer}
            style={{
                x,
                rotate,
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ 
                x: x.get(),
                opacity: 0,
                transition: { duration: 0.2 }
            }}
        >
            <SwipeFeedback x={x} />
            
            <div className={styles.content}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <div className={styles.imageContainer}>
                    <img src={rental.image_url} alt={rental.address} />
                </div>
                <div className={styles.contentDetails}>
                    <h2>{rental.address}</h2>
                    <div className={styles.priceRow}>
                        <span className={styles.price}>${rental.price.toLocaleString()}</span>
                        {rental.net_effective_rent && (
                            <span className={styles.netPrice}>
                                ${rental.net_effective_rent.toLocaleString()} net effective
                            </span>
                        )}
                    </div>
                    <div className={styles.details}>
                        <span>{rental.beds} beds</span>
                        <span>•</span>
                        <span>{rental.baths} baths</span>
                    </div>
                    {rental.concession && (
                        <div className={styles.concession}>
                            {rental.concession}
                        </div>
                    )}
                    <div className={styles.agency}>
                        Listed by {rental.listing_agency}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}; 