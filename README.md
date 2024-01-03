# WordPress Crawl Tool

This project is a simple Node.js tool for crawling a WordPress website and retrieving metadata such as title, description, and keywords for each page.

## Usage

1. **Installation:**
   - Ensure you have Node.js installed on your machine.
   - Clone this repository: `git clone https://github.com/abalegno/getWordpressMetaData.git`
   - Navigate to the project directory: `cd getWordpressMetaData`
   - Install dependencies: `npm install`

2. **Configuration:**
   - Open the `crawlResults.ejs` file and adjust the CSS file path if needed.
   - Verify that the Express server is correctly configured to serve static files.

3. **Execution:**
   - Start the server: `node index.js`
   - Open your browser and visit [http://localhost:3000](http://localhost:3000)

4. **Usage:**
   - On the home page, enter the URL of the WordPress site you want to crawl.
   - Click the "Crawl" button to initiate the crawl.
   - Results will be displayed in a list with clickable links that open the pages in new tabs.

5. **Export to CSV:**
   - You can export the results to a CSV file by clicking the "Export to CSV" button.

## Project Structure

- **views:** Contains EJS templates and the CSS file.
- **index.js:** Main file for the Express server.
- **metadata-scraper.js:** Module for retrieving metadata from a WordPress page.
- **test.js:** Test script for getting metadata from a specific URL.

## Dependencies

- [Express](https://expressjs.com/): For the web server.
- [Cheerio](https://cheerio.js.org/): For parsing and manipulating HTML.
- [axios](https://axios-http.com/): For making HTTP requests.

## Contributions

Contributions are welcome! If you find bugs or have improvements, please create an issue or send a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
