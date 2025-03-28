import { useState, useEffect } from 'react';
import { apiClient } from '@/api/apiClient';
import { RentalResponse } from '@/api/generated';

export function useRentals() {
    const [rentals, setRentals] = useState<RentalResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [skip, setSkip] = useState(0);

    const loadNextBatch = async () => {
        try {
            setIsLoading(true);
            const newRentals = await apiClient.getNextRentals(skip);
            setRentals(prev => [...prev, ...newRentals.rentals]);
            setSkip(prev => prev + newRentals.rentals.length);
        } catch (error) {
            console.error('Error loading rentals:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Load initial batch
    useEffect(() => {
        loadNextBatch();
    }, []);

    return {
        rentals,
        isLoading,
        loadNextBatch
    };
} 