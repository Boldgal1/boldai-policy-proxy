const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/bills", async (req, res) => {
  const { query, sponsor, introduced_date, sort } = req.query;

  try {
    const response = await axios.get("https://www.govtrack.us/api/v2/bill", {
      params: {
        q: query,
        sponsor,
        introduced_date,
        order_by: sort || "-introduced_date"
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching bills:", error);
    res.status(500).json({ error: "Failed to fetch policy data." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Policy Proxy running on port ${PORT}`));
