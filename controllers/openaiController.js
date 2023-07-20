const dotenv = require("dotenv");
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
exports.summaryController = async (req, res) => {
  try {
    //destructuring data
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      /*  model: "gpt-3.5-turbo",
      messages: ["summarize this \n" + text + "\n\n\n"],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,*/

      model: "text-davinci-003",
      prompt: `summarize this \n${text}`,
      max_tokens: 500, //for more word   I write  500
      temperature: 0.5,
    });
    console.log(data, "data from openai api");
    // const { data } = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: `summarize this \n${text}`,
    //   max_tokens: 250, //for more word   I write  500
    //   temperature: 0.5,
    // });
    if (data) {
      //if we got  data then
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log("i am here", err.message);
    return res.status(404).json({
      message: err.message,
    });
  }
};
exports.paragraphController = async (req, res) => {
  try {
    //destructuring data
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `write a detail about paragraph \n${text}`,
      max_tokens: 250, //for more word   I write  500
      temperature: 0.5,
    });
    console.log(data, "data from openai api");

    if (data) {
      //if we got  data then
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log("i am here", err.message);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.chatbotController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Answer question similar to how yoda from star war would.
      Me: 'what is your name?'
      yoda: 'yoda is my name'
      Me: ${text}`,
      max_tokens: 300,
      temperature: 0.7,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
exports.jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `/* convert these instruction into javascript code \n${text}`,
      max_tokens: 400,
      temperature: 0.25,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
exports.scifiImageController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createImage({
      prompt: `generate a scifi image of ${text}`,
      n: 1,
      size: "512x512",
    });
    if (data) {
      if (data.data[0].url) {
        return res.status(200).json(data.data[0].url);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
