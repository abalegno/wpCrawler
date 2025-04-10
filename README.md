# WordPress Crawler

This project utilizes Node.js, Express, and EJS to perform crawling on a WordPress site and extract metadata (title, description, and keywords) from each page of the site.

## Purpose

The purpose of this application is to provide a simple tool for analyzing a WordPress site and extracting relevant information from each page.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/abalegno/wpCrawler.git

2. Navigate to the project directory:
   
   ```bash
   cd yourproject

3. Install the dependencies:
   
   ```bash
   npm install

### Usage

1. Start the application:
   
   ```bash
   npm start
   
2. Open your browser and visit http://localhost:3333.

3. Enter the URL of the WordPress site you want to analyze in the form and click "Crawl."

4. The application will perform crawling and display the results in a table.


## Docker Example

If you prefer to run the application in a Docker container, follow these steps:

1. Build the container image:
   
   ```bash
   docker build -t wordpress-crawler .

2. Run the container:
   
   ```bash
   docker run -p 3333:3333 -d wordpress-crawler

3. Visit http://localhost:3333 in your browser.


## Contributions
Contributions are welcome! If you encounter issues or have improvements, create an issue or submit a pull request.


## License
This project is licensed under the GNU General Public License v3.0.
