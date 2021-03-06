const express = require("express");
const app = express();
const api = express.Router()
const request = require("request");
const path = require('path');
const m3u8stream = require('m3u8stream')


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
const { HOME_URL, IMAGE_URL, AUTO_URL, STREAM_URL, SEARCH_URL } = process.env
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '../app/dist')));

api.get("/languages/:language", (req, res) => {
  let info = {};
  const language = req.params.language.toLowerCase();
  try {
    request(`${HOME_URL}/${language}`, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        info = JSON.parse(body).result.data;
      }
      res.send(info);
    });
  }
  catch(err){
    console.log(err);
    res.sendStatus(500);
  }
  // res.send(home.result.data);
});
api.get("/instant/:query", (req, res) => {
  let info = {};
  const query = req.params.query;
  // console.log(query);
  request(`${AUTO_URL}/${query}`, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      info = JSON.parse(body).result.data;
    }
    res.send(info);
  });
});
api.get("/search/:title/:language", (req, res) => {
  let info = {};
  const {title , language} = req.params;
  // console.log(query);
  request(`${SEARCH_URL}/${title}/${language}`, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      info = JSON.parse(body).result.data;
    }
    res.send(info);
  });
});
// api.get("/images/*.jpg",(req,res)=>{
//   const imagePath=req.path;
//   let requestSettings={
//     url:IMAGE_URL+imagePath,
//     method: 'GET',
//     encoding: null
//   };
//   request(requestSettings, (error, response, body) => {
//     if (!error && response.statusCode == 200) {
//       res.set('Content-Type', 'image/jpeg');
//       res.send(body);
//     }
//     // res.send("error");
//   });
//   // res.sendFile(path.resolve(__dirname,'../OFFLINEDATA/200x200.jpeg'));
// })
// api.get("/stream/:song/:album/:smil/chunklist_b128000_ao.m3u8",(req,res)=>{
//   const {song, album, smil}=req.params;
//   // console.log(req.params);
//   // console.log(`${CHUNKLIST_URL}/${song}/${album}/${smil}/chunklist_b128000_ao.m3u8`);
//   request(`${STREAM_URL}/${song}/${album}/${smil}/chunklist_b128000_ao.m3u8`, (error, response, body) => {
//     if (!error && response.statusCode == 200) {
//       res.send(body);
//     }
//     // res.sendStatus(404);
//   });
// })
api.get("/images/*", (req, res) => {
  let url = IMAGE_URL + req.url;
  // console.log(url);
  req.pipe(request(url)).pipe(res);
  // res.sendFile(path.resolve(__dirname,'../OFFLINEDATA/200x200.jpeg'));
})
api.get("/stream/*", (req, res) => {
  let url = STREAM_URL + req.url.slice(7);
  // console.log(url);
  req.pipe(request(url)).pipe(res);
})
api.get("/download/*", (req, res) => {
  let url = STREAM_URL + req.url.slice(9);
  // console.log(url);
  res.set('Content-Type', 'audio/mpeg3');
  res.set('Content-Disposition', 'attachment; filename="audio.MP3"')
  m3u8stream(url).pipe(res);
})
app.use("/api", api)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../app/dist/index.html'));
});
app.listen(PORT, () => {
  console.log("Running on ", PORT);
});
