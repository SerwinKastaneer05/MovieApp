const express = require("express");
const app = express();
const cors=require('cors')
app.use(cors());

//for proxy
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({extended:false}))

const port = process.env.PORT;
const apikey = process.env.API_KEYS;

app.use('/', require("./routes/routes"))

// Proxing the Search Query request that we are getting from frontend 
app.use(`/SearchTitle/:apikey/:query`, createProxyMiddleware({ 
    target: 'https://imdb-api.com/en/API/',  //original url where we are routing 
    changeOrigin: true, 
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
       proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));

// Proxing the TOP 250 Movies API request that we are getting from frontend 
app.use('/Top250Movies/:apikey', createProxyMiddleware({ 
    target: 'https://imdb-api.com/en/API/',  //original url where we are routing 
    changeOrigin: true, 
    onProxyRes: function (proxyRes, req, res) {
       proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));

// Proxing the images api request that we are getting from frontend 
app.use(`/Images/:apikey/:id/Short`, createProxyMiddleware({ 
    target: 'https://imdb-api.com/en/API/',  //original url where we are routing 
    changeOrigin: true, 
    onProxyRes: function (proxyRes, req, res) {
       proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));

// Proxing the title details request that we are getting from frontend 
app.use(`/Title/:apikey/:id`, createProxyMiddleware({ 
    target: 'https://imdb-api.com/en/API/', 
    changeOrigin: true, 
    onProxyRes: function (proxyRes, req, res) {
       proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));


//Proxing Reviews API - NEWS CATEGORY -BONUS
app.use(`/MetacriticReviews/:apikey/:id`, createProxyMiddleware({ 
    target: 'https://imdb-api.com/en/API/', 
    changeOrigin: true, 
    onProxyRes: function (proxyRes, req, res) {
       proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));


app.listen(port,()=>{
    console.log("connected");
})