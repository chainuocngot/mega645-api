const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const PORT = 3000;

app.get("/api/mega645", async (req, res) => {
  try {
    const url =
      "https://www.minhchinh.com/truc-tiep-xo-so-tu-chon-mega-645.html";
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const result = [];

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

    res.json(result);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error.message);
    res.status(500).json({ error: "Không thể lấy dữ liệu." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
