const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const ejs = require('ejs');

const app = express();
const port = 3333;

app.set('view engine', 'ejs'); // Configura el motor de plantillas
app.use(express.static('views')); // Configuración para servir archivos estáticos
app.use(express.urlencoded({ extended: true }));

// Regular expression for basic URL validation
const urlRegex = /^(https?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

const maxUrlsToCrawl = 3333; // Limit the number of URLs to crawl for efficiency

// Function to crawl a website and extract data
async function crawlAndExtractData(baseUrl) {
    try {
        // Fetch the initial page
        const response = await axios.get(baseUrl);
        const $ = cheerio.load(response.data);

        const urls = [];
        // Find all links on the page and filter those starting with the base URL
        $('a').each((index, element) => {
            if (urls.length >= maxUrlsToCrawl) {
                return false; // Stop crawling after reaching the limit
            }
            const href = $(element).attr('href');
            if (href && href.startsWith(baseUrl)) {
                urls.push(href);
            }
        });

        // Crawl each URL and extract data
        const dataPromises = urls.map(async (url) => {
            try {
                const pageResponse = await axios.get(url);
                const pageHtml = pageResponse.data;
                const pageData = extractDataFromHtml(pageHtml);
                return { url, ...pageData };
            } catch (error) {
                console.error(`Error fetching data from ${url}:`, error.message);
                return { url, error: 'Error fetching data' };
            }
        });

        // Wait for all promises to resolve and return the results
        return await Promise.all(dataPromises);
    } catch (error) {
        console.error('Error during crawling:', error.message);
        // Provide a more specific error message based on the cause
        throw new Error(`Failed to fetch initial page: ${error.message}`);
    }
}

app.post('/getWordPressMetadataWithCustom', async (req, res) => {
    const wordpressSiteUrl = req.body.url;
    // Validate the provided URL
    if (!wordpressSiteUrl || !urlRegex.test(wordpressSiteUrl)) {
        return res.status(400).send('Invalid URL');
    }
    try {
        // Crawl the provided URL and render the results
        const pageDataArray = await crawlAndExtractData(wordpressSiteUrl);
        res.render('crawlResults', { pageDataArray });
    } catch (error) {
        console.error('Error fetching WordPress site information:', error.message);
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Default route to crawl Google's homepage (for demonstration)
app.get('/', async (req, res) => {
    try {
        // Crawl Google's homepage and render the results
        const pageDataArray = await crawlAndExtractData('https://www.google.com/');
        res.render('crawlResults', { pageDataArray });
    } catch (error) {
        console.error('Error fetching site information:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Function to extract data (title, description, keywords, headings) from HTML
function extractDataFromHtml(html) {    
        const $ = cheerio.load(html);
        const title = $('title').text().trim();
        // Use optional chaining and nullish coalescing operator to handle missing meta tags
        const description = $('meta[name="description"]').attr('content') ?? null;
        const keywords = $('meta[name="keywords"]').attr('content') ?? null;

        // Extract all headings (h1 to h6)
        const headings = [];
        $('h1, h2, h3, h4, h5, h6').each((index, element) => {
            headings.push($(element).text().trim());
        });

        return {
            title,
            description,
            keywords,
            headings // Return the array of headings
        };
}
