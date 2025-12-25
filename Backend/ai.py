import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def generate_flashcards(text: str):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Generate flashcards."},
            {"role": "user", "content": text},
        ],
        temperature=0.3,
    )

    return response.choices[0].message.content
