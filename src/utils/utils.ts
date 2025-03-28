import { parse } from 'csv-parse/sync';

export interface RentalListing {
    listing_id: string;
    full_url: string;
    address: string;
    price: number;
    net_effective_rent: number;
    concession: string;
    lease_length: string;
    beds: number | 'N/A';
    baths: number | 'N/A';
    listing_agency: string;
    image_url: string;
}

export function parseRentalsCsv(csvContent: string): RentalListing[] {
    // Parse CSV content
    const records = parse(csvContent, {
        columns: true, // Use first row as headers
        skip_empty_lines: true,
        cast: (value, context) => {
            // Handle type conversions
            if (context.column === 'price' || context.column === 'net_effective_rent') {
                // Remove '$' and ',' then convert to number
                return value ? Number(value.replace(/[$,]/g, '')) : 0;
            }
            if (context.column === 'beds' || context.column === 'baths') {
                // Convert to number if possible, otherwise keep as 'N/A'
                return value === 'N/A' ? value : Number(value);
            }
            return value;
        }
    });

    return records as RentalListing[];
}

// Example usage:
/*
import { readFileSync } from 'fs';

const csvContent = readFileSync('streeteasy_rentals.csv', 'utf-8');
const listings = parseRentalsCsv(csvContent);
console.log(listings[0]); // First listing with proper types
*/
