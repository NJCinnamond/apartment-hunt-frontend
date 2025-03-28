import { generate } from 'openapi-typescript-codegen';

(async () => {
    try {
        await generate({
            input: 'http://localhost:8000/openapi.json',
            output: './src/api/generated',
            //client: 'fetch',
            httpClient: 'fetch',
        });
        console.log('✨ API client generated successfully!');
    } catch (error) {
        console.error('Failed to generate API client:', error);
        process.exit(1);
    }
})(); 