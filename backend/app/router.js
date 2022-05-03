const express = require('express')
const router = express.Router()
const request = require('request')
const redis = require('redis')
const axios = require('axios')

let title

router.post("/", function (req, res) {
  //response.render("search");
  title = req.body.search.replaceAll(' ', '+');
  res.send({
    search: title
  });
  console.log('title', title)
});


router.get("/results", function (req, res) {
  // var query = req.query;
  var query = title
  console.log('query', query)
  var url = `https://www.omdbapi.com/?s=${query}&apikey=${process.env.OMDB_KEY}`;
  console.log('url', url)
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body)
      res.json(data);
      //res.render("results", {data: data});
    }
  });
});

module.exports = router