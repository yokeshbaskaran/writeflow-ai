from fastapi import FastAPI
from groq import Groq
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

# creating app
app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Groq API testing
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

topic = "write a blog post about benefits of using ai in daily life"
tone = "professional"
length = "medium"
instructions = "Include examples and conclusion"

prompt = f"""
You are an expert content writer.

Write a professional blog post.

Topic:
{topic}

Tone:
{tone}

Length:
{length}

Requirements:
- Use a compelling title
- Add introduction
- Add 3-5 headings
- Use paragraphs
- Include examples
- Add conclusion
- Return clean markdown

Additional Instructions:
{instructions}

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


aireponse = []


# routes
@app.get("/")
def home():
    return {"message": "Hello from Backend"}


@app.get("/new")
def generate():
    # response
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are a professional content writer."},
            {"role": "user", "content": prompt},
        ],
        temperature=0.7,
        max_tokens=2000,
    )

    content = response.choices[0].message.content

    print("AI reponse:", content)
    return content
