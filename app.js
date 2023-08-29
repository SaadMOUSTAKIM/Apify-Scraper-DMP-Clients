import { gotScraping } from 'got-scraping';
import * as cheerio from 'cheerio';

const storeUrl = 'https://www.dmpublishing.cz/en/references';

const response = await gotScraping(storeUrl);
const html = response.body;

const $ = cheerio.load(html);

const clients = [];

const products = $('.list-wrapper');

for (const product of products) {
    const name = $(product).find('.list-item-heading');
    const anotation = $(product).find('.list-item-anotation');
    const content = $(product).find('.overlay-txt');
    
    name.each((index, element) => {
        const title = $(element).text().trim();
        const annotation = $(anotation[index]).text().trim();
        const contentt = $(content[index]).text().trim();
        const link = $(product).find('.overlay-link a').eq(index); 
        const linkk = link.attr('href'); 
        const image = $(product).find('.list-item-image').eq(index); 
        const imagee = image.data('src');
        
        clients.push({ Title: title, Annotation : annotation , Content: contentt, Link: linkk, Image: imagee});
    });

}

const totalItems = clients.length;

const json = {
    TotalItems: totalItems,
    Clients: clients
};

console.log(JSON.stringify(json, null, 2));





