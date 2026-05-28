from pydantic import BaseModel


# ai response model
class GenerateContentRequest(BaseModel):
    content_type: str
    topic: str
    tone: str | None = None
    length: str
    instructions: str | None = None


class SavedResponseRequest(BaseModel):
    title: str
    content_type: str
    introduction: str
    sections: list[dict]
    conclusion: str
    words_created: int
