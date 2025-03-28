/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NextRentalsResponse } from '../models/NextRentalsResponse';
import type { SwipeRequest } from '../models/SwipeRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Root
     * @returns any Successful Response
     * @throws ApiError
     */
    public static rootGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }
    /**
     * Swipe Rental
     * Record a swipe for a rental.
     * @param listingId
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static swipeRentalRentalListingIdSwipePost(
        listingId: string,
        requestBody: SwipeRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/rental/{listing_id}/swipe',
            path: {
                'listing_id': listingId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Next Rentals
     * @param skip
     * @returns NextRentalsResponse Successful Response
     * @throws ApiError
     */
    public static getNextRentalsRentalNextGet(
        skip?: number,
    ): CancelablePromise<NextRentalsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rental/next',
            query: {
                'skip': skip,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Test
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testTestGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test',
        });
    }
    /**
     * Get Swipes
     * Debug endpoint to view all swipes.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getSwipesDebugSwipesGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/debug/swipes',
        });
    }
    /**
     * Get Rental Raw
     * Debug endpoint to view raw rental data before conversion.
     * @param listingId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getRentalRawDebugRentalRawListingIdGet(
        listingId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/debug/rental-raw/{listing_id}',
            path: {
                'listing_id': listingId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Health Check
     * @returns any Successful Response
     * @throws ApiError
     */
    public static healthCheckHealthGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/health',
        });
    }
}
