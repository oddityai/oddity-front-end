import { Configuration, OpenAI } from 'openai'

const openai = new OpenAI({
  organization: "org-l09p9JfE3uWqDFtE2kFlpMqJ",
});

export default async function (req, res) {

  const animal = req.body.animal || ''
  const history = req.body.history || []

  try {
    const prompt = `${animal}`;
    history.push({role: 'user', content: prompt})
    console.log({history})
  const completion = await openai.chat.completions.create({
    messages: history,
    model: "gpt-3.5-turbo-1106",
  });

  res
      .status(200)
      .json({ result: completion.choices[0].message.content });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data)
      res.status(error.response.status).json(error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      })
    }
  }
}

