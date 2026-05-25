from pydantic import BaseModel


# ai response model
class GenerateContentRequest(BaseModel):
    content_type: str
    style: str | None = None
    topic: str
    tone: str
    length: str
    instructions: str | None = None


class SavedResponseRequest(BaseModel):
    title: str
    introduction: str
    sections: list[dict]
    conclusion: str
