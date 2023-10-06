import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration)

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    })
    return
  }

  const animal = req.body.animal || ''
  const history = req.body.history || []
  const chatHistory = history.map((item) => {
    if (item.type === 'chat') {
      return { role: 'user', content: item.input }
    }
    // You can add logic here to handle other message types like 'system'
  })
  try {
    const prompt = `${animal} {}`
    const messages = [
      { role: 'user', content: prompt },
      // , ...chatHistory
    ]
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      // messages: chatHistory,
      messages: messages,
    })
    res.status(200).json({ result: completion.data.choices[0].message.content })
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
