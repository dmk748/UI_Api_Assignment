import fs from 'fs';

export function saveBookDetails(data: any) {
  fs.mkdirSync('output', { recursive: true });

  fs.writeFileSync(
    'output/book-details.json',
    JSON.stringify(data, null, 2)
  );
}