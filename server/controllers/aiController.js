const Anthropic = require('@anthropic-ai/sdk');

console.log('API Key loaded:', process.env.ANTHROPIC_API_KEY ? 'YES' : 'NO');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

const chatWithAI = async (req, res) => {
  try {
    const { message, doctors } = req.body;

    const prompt = `
      You are a helpful assistant for MelanMed, a platform that connects 
      Black patients with Black doctors in the DFW area of Texas.
      
      A patient is looking for a doctor and has sent this message:
      "${message}"
      
      Here are the available doctors on our platform:
      ${JSON.stringify(doctors, null, 2)}
      
      Based on the patient's message please recommend the most suitable 
      doctor or doctors from the list above. Explain why they are a good 
      match. Be warm, friendly and culturally sensitive. Keep your response 
      concise and helpful.
    `;

    const response = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 1024,
      messages: [
        { role: 'user', content: prompt }
      ]
    });

    const aiMessage = response.content[0].text;
    res.json({ message: aiMessage });

  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { chatWithAI };