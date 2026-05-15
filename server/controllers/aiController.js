const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chatWithAI = async (req, res) => {
  try {
    const { message, doctors } = req.body;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

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
      concise and helpful. If no doctors match perfectly suggest the closest 
      options and explain why.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.json({ message: response });

  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { chatWithAI };