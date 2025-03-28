//import { Configuration, RentalsApi } from '@/api/generated';
// or try the relative path:


import { OpenAPI } from './generated';
import { DefaultService } from './generated';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

class ApiClient {
    constructor() {
        OpenAPI.BASE = BASE_URL;
    }

    async swipeRental(listingId: string, direction: 'left' | 'right') {
        return DefaultService.swipeRentalRentalListingIdSwipePost(listingId, { direction: direction });
    }

    async getNextRentals(skip: number = 0) {
        return DefaultService.getNextRentalsRentalNextGet(skip);
    }
}

export const apiClient = new ApiClient(); 