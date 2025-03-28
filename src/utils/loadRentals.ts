import { readFileSync } from 'fs';
import path from 'path';
import { parseRentalsCsv, RentalListing } from './utils';

export function loadRentals(): RentalListing[] {
    try {
        // Adjust this path to point to your CSV file
        const csvPath = path.join(process.cwd(), '../../backend/jobs/streeteasy_rentals.csv');
        const csvContent = readFileSync(csvPath, 'utf-8');
        return parseRentalsCsv(csvContent);
    } catch (error) {
        console.error('Error loading rentals:', error);
        return [];
    }
} 