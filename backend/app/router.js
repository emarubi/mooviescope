const express = require('express')
const router = express.Router()
const request = require('request')
const redis = require('redis')
const axios = require('axios')

let query

router.post("/", function (req, res) {
  //response.render("search");
  query = req.body.search.replaceAll(' ', '+');
  res.send({
    search: queryString
  });
  console.log('query', query)
});

router.get("/results", function (req, res) {
  var url = `https://www.omdbapi.com/?${query}&apikey=${process.env.OMDB_KEY}`;
  console.log('url', url)
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body)
      res.json(data);
    }
  });
});

module.exports = router