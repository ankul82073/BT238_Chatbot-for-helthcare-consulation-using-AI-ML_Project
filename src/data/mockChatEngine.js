// =============================================================
// MOCK CHAT RESPONSE ENGINE — keyword-based demo responses
// =============================================================

const responses = [
  {
    keywords: ['headache', 'head pain', 'migraine', 'sir dard', 'sir mein dard'],
    response: `**Headache — General Information**\n\nHeadaches are one of the most common health complaints. They can be caused by:\n- **Tension** — stress, poor posture, eye strain\n- **Dehydration** — not drinking enough water\n- **Lack of sleep** — irregular sleep patterns\n- **Sinus pressure** — during cold or allergy season\n\n**General self-care tips:**\n• Rest in a quiet, dark room\n• Stay well-hydrated (8–10 glasses of water/day)\n• Apply a cold or warm compress\n• Avoid screens for 30–60 minutes\n\n> ⚕️ If your headache is severe, sudden, or accompanied by vision changes or neck stiffness, **please consult a doctor immediately**.`,
    followUp: ['Is it throbbing or dull?', 'How long have you had it?', 'Any nausea or light sensitivity?'],
  },
  {
    keywords: ['cough', 'khansi', 'cold', 'sore throat', 'throat pain', 'gale mein dard'],
    response: `**Cough & Sore Throat — General Information**\n\nA cough or sore throat is often associated with:\n- **Upper respiratory infections** (common cold, flu)\n- **Allergies** or environmental irritants\n- **Dry air** or low humidity\n- **Acid reflux** in some cases\n\n**General self-care tips:**\n• Stay hydrated — warm water, herbal teas\n• Gargle with warm salt water\n• Use a humidifier if the air is dry\n• Rest your voice and avoid irritants\n• Honey can soothe throat irritation\n\n> ⚕️ If your cough lasts more than 2 weeks, produces blood, or is accompanied by high fever, **see a doctor promptly**.`,
    followUp: ['Is it a dry or wet cough?', 'Do you have fever?', 'How long has this been going on?'],
  },
  {
    keywords: ['fever', 'bukhar', 'temperature', 'hot', 'chills'],
    response: `**Fever — General Information**\n\nA fever (temperature above 38°C / 100.4°F) is usually a sign that your body is fighting an infection.\n\n**Common causes:**\n- Viral infections (cold, flu, COVID-19)\n- Bacterial infections\n- Inflammatory conditions\n\n**General self-care tips:**\n• Stay hydrated — drink plenty of fluids\n• Rest adequately\n• Use a cool, damp cloth on your forehead\n• Light, breathable clothing\n• Monitor temperature regularly\n\n> ⚕️ **Seek immediate medical attention** if:\n> - Fever exceeds 39.5°C (103°F)\n> - Fever lasts more than 3 days\n> - Accompanied by stiff neck, rash, confusion, or difficulty breathing`,
    followUp: ['What is your approximate temperature?', 'Any other symptoms?', 'How long have you had the fever?'],
  },
  {
    keywords: ['fatigue', 'tired', 'thakan', 'exhausted', 'weak', 'no energy', 'kamzori'],
    response: `**Fatigue & Tiredness — General Information**\n\nFeeling persistently tired can have many causes:\n- **Poor sleep** — quantity and quality\n- **Nutritional deficiencies** — iron, B12, Vitamin D\n- **Dehydration**\n- **Stress or anxiety**\n- **Underlying health conditions** (thyroid issues, anaemia)\n\n**General self-care tips:**\n• Aim for 7–9 hours of quality sleep\n• Stay hydrated and eat balanced meals\n• Limit caffeine, especially after noon\n• Short 20-minute walks can boost energy\n• Manage stress with breathing exercises or meditation\n\n> ⚕️ If fatigue is severe, persistent (more than 2 weeks), or interfering with daily life, **consult a healthcare professional** to rule out underlying conditions.`,
    followUp: ['How long have you felt this way?', 'Are you sleeping well?', 'Any other symptoms like weight change?'],
  },
  {
    keywords: ['nausea', 'vomit', 'stomach', 'ulatna', 'upset stomach', 'acidity', 'pet mein dard'],
    response: `**Nausea & Stomach Discomfort — General Information**\n\nNausea can be caused by:\n- Indigestion or overeating\n- Food poisoning\n- Motion sickness\n- Stress or anxiety\n- Medications\n\n**General self-care tips:**\n• Eat small, bland meals (rice, toast, banana)\n• Stay hydrated with sips of water or oral rehydration solution\n• Avoid greasy, spicy, or heavy foods\n• Rest in an upright position\n• Ginger tea may help settle the stomach\n\n> ⚕️ **Seek medical care** if vomiting is persistent, contains blood, or is accompanied by severe abdominal pain, high fever, or signs of dehydration.`,
    followUp: ['Have you eaten anything unusual?', 'Any diarrhoea or fever?', 'How long has this been happening?'],
  },
  {
    keywords: ['rash', 'skin', 'itch', 'allergy', 'khujli'],
    response: `**Skin Rash & Itching — General Information**\n\nSkin reactions can stem from:\n- Contact dermatitis (reaction to soaps, plants, metals)\n- Allergic reactions (food, medication, insect bites)\n- Eczema or psoriasis\n- Heat rash\n- Fungal infections\n\n**General self-care tips:**\n• Avoid scratching — it can worsen the rash\n• Apply a cool compress to relieve itching\n• Use mild, fragrance-free soap\n• Keep the area clean and dry\n• Avoid known allergens\n\n> ⚕️ **See a doctor if** the rash is spreading rapidly, blistering, accompanied by breathing difficulty, or you suspect a severe allergic reaction.`,
    followUp: ['Where is the rash located?', 'Is it spreading?', 'Did you use any new products recently?'],
  },
  {
    keywords: ['dizzy', 'dizziness', 'chakkar', 'vertigo', 'lightheaded', 'faint'],
    response: `**Dizziness — General Information**\n\nDizziness can feel like lightheadedness, spinning (vertigo), or imbalance.\n\n**Common causes:**\n- Dehydration or low blood sugar\n- Standing up too quickly (postural hypotension)\n- Inner ear issues\n- Low blood pressure or anaemia\n\n**General self-care tips:**\n• Sit or lie down until the feeling passes\n• Drink water and eat something if you haven't recently\n• Avoid sudden position changes\n• Hold onto something stable when moving\n\n> ⚕️ **Emergency: Call emergency services** if dizziness is accompanied by chest pain, severe headache, difficulty speaking, or weakness on one side of the body.`,
    followUp: ['Does the room seem to spin?', 'Does it happen when you stand up?', 'Any chest pain or hearing changes?'],
  },
  {
    keywords: ['back pain', 'kamar dard', 'back', 'spine', 'lower back'],
    response: `**Back Pain — General Information**\n\nBack pain is extremely common and usually not serious.\n\n**Common causes:**\n- Poor posture (especially sitting long hours)\n- Muscle strain or sprain\n- Sedentary lifestyle\n- Heavy lifting without proper technique\n\n**General self-care tips:**\n• Apply ice for first 48 hours, then warm compress\n• Gentle stretching and movement (avoid complete bed rest)\n• Maintain good posture while sitting\n• Consider ergonomic adjustments to your workspace\n• Core strengthening exercises over time\n\n> ⚕️ **Consult a doctor** if pain radiates down your leg, is accompanied by numbness/tingling, or follows an injury or accident.`,
    followUp: ['Is it sharp or dull pain?', 'Does it radiate to your legs?', 'Did it start after an activity?'],
  },
]

const generalResponses = [
  `Thank you for sharing that. While I can provide general health information, I'm not able to diagnose conditions. \n\nCould you tell me more about your specific symptoms? For example:\n- When did it start?\n- How severe is it on a scale of 1–10?\n- Any other accompanying symptoms?\n\n> ⚕️ For accurate diagnosis and treatment, always consult a qualified healthcare professional.`,
  `I understand you're concerned about your health. It's important to monitor your symptoms carefully.\n\n**General wellness reminders:**\n• Stay well hydrated (8+ glasses of water daily)\n• Get adequate sleep (7–9 hours)\n• Eat a balanced diet with fruits and vegetables\n• Manage stress through relaxation techniques\n\nCould you describe your symptoms in more detail so I can provide more relevant information?\n\n> ⚕️ This is educational information only — please see a doctor for medical advice.`,
  `I'm here to help with general health information. Based on what you've shared, here are some things to consider:\n\n1. **Monitor your symptoms** — Note when they occur, duration, and severity\n2. **Basic self-care** — Rest, hydration, and nutrition are foundational\n3. **When to seek help** — If symptoms persist beyond 3–5 days or worsen\n\n> ⚕️ Remember: I'm a demo assistant. For accurate medical advice, consult a licensed healthcare professional.`,
]

export function getMockResponse(userMessage) {
  const lowerMsg = userMessage.toLowerCase()

  for (const item of responses) {
    const matched = item.keywords.some(kw => lowerMsg.includes(kw))
    if (matched) {
      return {
        text: item.response,
        followUp: item.followUp,
      }
    }
  }

  // Random general response
  const randomIndex = Math.floor(Math.random() * generalResponses.length)
  return {
    text: generalResponses[randomIndex],
    followUp: ['Can you describe your symptoms?', 'When did this start?', 'Any other symptoms?'],
  }
}
