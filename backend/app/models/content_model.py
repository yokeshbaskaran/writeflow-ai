from pydantic import BaseModel


# ai response model
class GenerateContentRequest(BaseModel):
    content_type: str
    style: str | None = None
    topic: str
    tone: str
    length: str
    instructions: str | None = None
