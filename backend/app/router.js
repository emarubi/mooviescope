const express = require('express')
const router = express.Router()
const request = require('request')
const Redis = require('redis')
const axios = require('axios')

const DEFAULT_EXPIRATION = 86400
const redisClient = Redis.createClient()
redisClient.connect()

let queryString

router.post("/", function (req, res) {
  queryString = req.body.search.replaceAll(' ', '+');
  res.send({
    search: queryString
  });
  console.log('queryString?', queryString)
});


router.get("/movies", async (req, res) => {
  queryString=`s=${queryString}`
  const { data } = await axios.get(
    `https://www.omdbapi.com/?${queryString}&apikey=${process.env.OMDB_KEY}`
    )
res.json(data)
  // var url = `https://www.omdbapi.com/?${queryString}&apikey=${process.env.OMDB_KEY}`;
  // console.log('url', url)
  // request(url, function (error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     var data = JSON.parse(body)
  //     res.json(data);
  //   }
  // });
});

router.get("/movies/:id", async (req, res) => {
    console.log('req.params.id', req.params.id)
    const { data } = await axios.get(
      `https://www.omdbapi.com/?i=${req.params.id}&apikey=${process.env.OMDB_KEY}`
      )
  res.json(data)
})

// router.get("/results", async (req, res) => {
//   // const movies = await getOrSetCache("results", async () => {
//   //  const { data } = await axios.get(
//   //    `https://www.omdbapi.com/?${queryString}&apikey=${process.env.OMDB_KEY}`
//   //    )
//   //    return data
//   // })
//   // redisClient.get('results', async (error, results) => {
//   //   if (error) console.log(error)
//   //   if (results != null) {
//   //     console.log("Cache hit")
//   //     return res.json(JSON.parse(results))
//   //   } else {
//   //     console.log("Cache miss")
//   //     const { data } = await axios.get(
//   //       `https://www.omdbapi.com/?${queryString}&apikey=${process.env.OMDB_KEY}`
//   //       )
//   //     redisClient.setEx('results', DEFAULT_EXPIRATION, JSON.stringify(data))
//   //   }
//     res.json(movies)
//   })
  
//   //request(url, function (error, response, body) {
    
//     // if (!error && response.statusCode == 200) {
//     //   var data = JSON.parse(body)
//     //   res.json(data);
//     // }
//   // });

  router.get("/results/:id", async (req, res) => {
    const movie = await getOrSetCache(`results:${req.params.id}`, async () => {
      console.log('req.params.id', req.params.id)
      const { data } = await axios.get(
        `https://www.omdbapi.com/?i=${req.params.id}&apikey=${process.env.OMDB_KEY}`
        )
        return data
    })
    res.json(movie)
  })

function getOrSetCache(key, callback) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (error, data) => {
      if (error) return reject(error)
      if (data !=null) return resolve(JSON.parse(data))
      const freshData = await callback()
      redisClient.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(freshData))
      resolve(freshData)
    })
  })
 }

module.exports = router