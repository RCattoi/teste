import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';
import express from 'express';

dotenv.config();

const app = express();
const PORT = 8080;

app.use(
  cors({
    origin: '*',
  })
);

app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));

app.get('/bingImgAPI', (req, response) => {
  const handleBingImgData = async () => {
    const resp = await fetch(
      'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=pt-US'
    );
    const respJson = await resp.json();
    const { url, startdate } = respJson.images[0];
    return response.status(200).json({
      imgUrl: url,
      imgStartDate: startdate,
    });
  };
  handleBingImgData();
});
