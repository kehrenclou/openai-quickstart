/* --------------------------------- import --------------------------------- */
import { Configuration, OpenAIApi } from "openai";

/* -------------------------- set up openai config -------------------------- */
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/* --------------------------- function to connect -------------------------- */
export default async function (req, res) {
  //if no configureation error
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  /* --------------------- //define subject from req.body --------------------- */
  const subject = req.body.subject || "";

  /* ------- //- check subject is not 0, then return and try to connect ------- */
  if (subject.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid subject",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(subject),
      temperature: 0.7,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    // res.status(200).json({ result: completion.data });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

/* --------------------- //generates prompt with subject -------------------- */
function generatePrompt(subject) {
  const capitalizedSubject =
    subject[0].toUpperCase() + subject.slice(1).toLowerCase();

  return ` write a "haiku" about  "${capitalizedSubject}".
  with the first line has 5 syllables, the second line has 7 syllables, the third line has 5 syllables.
next, write three lines of guitar chords to accompany the haiku.

`;
}

