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
      "https://www.vietlott.vn/vi/trung-thuong/ket-qua-trung-thuong/winning-number-645";
    console.log("1.1");
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:128.0) Gecko/20100101 Firefox/128.0",
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "text/plain; charset=utf-8",
        "X-AjaxPro-Method": "ServerSideDrawResult",
        "X-Requested-With": "XMLHttpRequest",
        Origin: "https://vietlott.vn",
        Connection: "keep-alive",
        Referer:
          "https://vietlott.vn/vi/trung-thuong/ket-qua-trung-thuong/winning-number-645",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
      },
    });
    const $ = cheerio.load(response.data);
    const result = [];
    console.log("2");

    // $(".mega-645:has(.table-mini-result) tbody tr").each((index, element) => {
    //   const date = $(element).find("td").eq(0).text().trim();

    //   const numbers = $(element)
    //     .find(".balls .mini-ball")
    //     .map((i, el) => $(el).text().trim())
    //     .get();

    //   const jackpot = $(element)
    //     .find("td")
    //     .eq(2)
    //     .text()
    //     .replace(/\s+/g, " ")
    //     .trim();

    //   if (!date) return false;

    //   result.push({
    //     date,
    //     numbers,
    //     jackpot,
    //   });
    // });

    // console.log("3");

    // res.json(result);
    res.json(result);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error.message);
    res.status(500).json({ error: "Không thể lấy dữ liệu." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
