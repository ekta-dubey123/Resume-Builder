import OPENAI from "openai";
const openai = new OPENAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_URL,
});

export default openai;