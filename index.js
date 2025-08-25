const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/", async (req, res) => {
  try {
    console.log("1");
    const url =
      "https://www.minhchinh.com/truc-tiep-xo-so-tu-chon-mega-645.html";
    console.log("1.1");
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const result = [];
    console.log("2");

    $(".mega-645:has(.table-mini-result) tbody tr").each((index, element) => {
      const date = $(element).find("td").eq(0).text().trim();

      const numbers = $(element)
        .find(".balls .mini-ball")
        .map((i, el) => $(el).text().trim())
        .get();

      const jackpot = $(element)
        .find("td")
        .eq(2)
        .text()
        .replace(/\s+/g, " ")
        .trim();

      if (!date) return false;

      result.push({
        date,
        numbers,
        jackpot,
      });
    });

    console.log("3");

    res.json(result);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error.message);
    res.status(500).json({ error: "Không thể lấy dữ liệu." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
