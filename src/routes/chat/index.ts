import axios from "axios";

import { properties } from "../../appResources/applicationProperties";
import { errorCodes, errorMessages, responseHandler, router, successCodes } from "../../appResources/resources";

router.post("/chatbot", (req, res) => {
  const { messages } = req.body;

  const headers = {
    Authorization: `Bearer ${properties.OPENAI_KEY}`,
    "Content-Type": "application/json",
  };

  // impliment async await
  // also verify logic
  try {
    const openAIResponse = axios.post(
      `https://api.openai.com/v1/chat/completions`,
      {
        model: "gpt-3.5-turbo",
        temperature: 0.2,
        // max_tokens: 150,
        top_p: 0.7,
        messages: [
          ...messages.map((message) => ({
            role: "user",
            content: `${message.text}`,
          })),
        ],
      },
      { headers }
    );
    if (openAIResponse.status === 202) {
      console.log("Prompt was successfully sent");
      const dbResp = {
        statusCode: successCodes.SERVER_SUCCESS,
        message: {
          description: openAIResponse.data.choices[0].message.content,
        },
      };

      const resp = responseHandler(dbResp);
      res.status(resp.statusCode).json(resp);
    }
  } catch (error) {
    console.log(error);
    const dbResp = {
      statusCode: errorCodes.INTERNAL_SERVER_ERROR,
      message: errorMessages.INTERNAL_SERVER_ERROR,
    };
    const resp = responseHandler(dbResp);

    res.status(500).json(resp);
  }
});

module.exports = router;
