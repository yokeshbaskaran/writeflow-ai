# generating ai response
from models.content_model import GenerateContentRequest
from groq import Groq
from config import GROQ_API_KEY


# user prompt
def build_prompt(data: GenerateContentRequest):
    return f"""
Generate a {data.length} words with
{data.content_type} 

Topic:
{data.topic}

Tone:
{data.tone}

Requirements:
- Create a compelling title
- Write an introduction paragraph
- Create 3 to 5 sections
- Each section must contain:
  - a plain text heading (NO markdown syntax like #, ##, ###)
  - paragraph content
- Include examples where relevant
- Add a conclusion
- Do NOT use markdown formatting
- Do NOT include headings like ### Heading
- Do NOT return formatted text
- Return ONLY valid JSON

Additional Instructions:
{data.instructions}

Return ONLY valid JSON.

Format:

{{
  "content_type": "{data.content_type}",
  "title": "string",
  "introduction": "string",
  "sections": [
    {{
      "heading": "plain text heading only",
      "content": "paragraph content"
    }}
  ],
  "conclusion": "string"
}}
"""


client = Groq(api_key=GROQ_API_KEY)


# generate content
def generate_contents(prompt):
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile", messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content
