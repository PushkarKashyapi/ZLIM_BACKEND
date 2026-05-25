const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend running");
});

// MAIN AI ORCHESTRATOR ROUTE
app.post("/orchestrate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    console.log("User Prompt:", prompt);

    // SEND REQUEST TO OPENAI
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are an intelligent workflow orchestrator assistant.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    // EXTRACT AI RESPONSE
    const aiResponse = data.choices?.[0]?.message?.content;

    // SEND BACK TO FRONTEND
    res.json({
      success: true,
      response: aiResponse,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});