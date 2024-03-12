const fs = require('fs').promises;

export async function parseLRC(filePath: string) {
    const content = await fs.readFile(filePath, 'utf-8');
    const lines = content.split('\n');
    const lyrics = lines
        .map((line: string) => {
            const match = line.match(/\[(\d{2}:\d{2}.\d{2})\](.*)/);
            if (match) {
                return {
                    timestamp: convertToMilliseconds(match[1]),
                    content: match[2],
                };
            }
        })
        .filter(Boolean);
    return lyrics;
}

function convertToMilliseconds(time: string): number {
    const parts = time.split(':');
    const minutes = parseInt(parts[0], 10);
    const secondsAndMilliseconds = parts[1].split('.');
    const seconds = parseInt(secondsAndMilliseconds[0], 10);
    const milliseconds = parseInt(secondsAndMilliseconds[1], 10);
    return minutes * 60 * 1000 + seconds * 1000 + milliseconds * 10;
}
