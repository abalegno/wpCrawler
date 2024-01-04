const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.set('view engine', 'ejs'); // Configura el motor de plantillas
app.use(express.static('views')); // Configuración para servir archivos estáticos
app.use(express.urlencoded({ extended: true }));

app.post('/getWordPressMetadataWithCustom', async (req, res) => {
  const wordpressSiteUrl = req.body.url; // Extrae la URL del formulario
  console.log('wordpressSiteUrl', wordpressSiteUrl)
  try {
    // Obtén la página principal
    const response = await axios.get(wordpressSiteUrl);
    const $ = cheerio.load(response.data);

    // Encuentra todas las URL en la página principal
    const urls = [];
    $('a').each((index, element) => {
      const href = $(element).attr('href');
      if (href && href.startsWith(wordpressSiteUrl)) {
        urls.push(href);
      }
    });

    // Realiza el crawling de cada URL y obtén los datos
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

    // Espera a que todas las promesas se resuelvan
    const pageDataArray = await Promise.all(dataPromises);

    // Renderiza la página ejs con los datos de todas las URLs
    res.render('crawlResults', { pageDataArray });

  } catch (error) {
    console.error('Error fetching WordPress site information:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/', async (req, res) => {
  const wordpressSiteUrl = 'https://www.google.com/';

  try {
    // Obtén la página principal
    const response = await axios.get(wordpressSiteUrl);
    const $ = cheerio.load(response.data);

    // Encuentra todas las URL en la página principal
    const urls = [];
    $('a').each((index, element) => {
      const href = $(element).attr('href');
      if (href && href.startsWith(wordpressSiteUrl)) {
        urls.push(href);
      }
    });

    // Realiza el crawling de cada URL y obtén los datos
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

    // Espera a que todas las promesas se resuelvan
    const pageDataArray = await Promise.all(dataPromises);

    // Renderiza la página ejs con los datos de todas las URLs
    res.render('crawlResults', { pageDataArray });
  } catch (error) {
    console.error('Error fetching WordPress site information:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

function extractDataFromHtml(html) {
  // Agrega aquí la lógica para extraer los datos de la página según tus necesidades
  const $ = cheerio.load(html);
  const title = $('title').text().trim();
  const description = $('meta[name="description"]').attr('content');
  const keywords = $('meta[name="keywords"]').attr('content');
  return { title, description, keywords };
}
