const hbs = require('hbs');
const express = require('express');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs');
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    const now = new Date().toString();
    console.log(`${now}: ${req.method} ${req.url}`);
    next();
});

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())

hbs.registerHelper('screamIt', (text) => text.toUpperCase())

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        user: 'Arnav' 
    })
})
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
})

app.get('/bad', (req, res) => {
    res.send({
        error: {
            errorMessage: 'Not a valid route'
        }
    })
})

app.listen(port, () => console.log(`server is up on ${port}`));