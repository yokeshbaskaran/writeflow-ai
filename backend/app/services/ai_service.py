# generating ai response
from models.content_model import GenerateContentRequest
from groq import Groq
from config import GROQ_API_KEY


# user prompt
def build_prompt(data: GenerateContentRequest):
    return f"""
Generate a {data.length} words with
{data.content_type} 

Style:
{data.style} 

Topic:
{data.topic}

Tone:
{data.tone}

Requirements for content:
- Use a compelling title
- Add introduction
- Add 3-5 headings
- Use paragraphs
- Include examples
- Add conclusion
- Return clean markdown

Additional Instructions:
{data.instructions}

Return ONLY valid JSON.

Format:

{{
  "title": "",
  "introduction": "",
  "sections": [
    {{
      "heading": "",
      "content": ""
    }}
  ],
  "conclusion": ""
}}
"""


client = Groq(api_key=GROQ_API_KEY)


# generate content
def generate_contents(prompt):
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile", messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content
