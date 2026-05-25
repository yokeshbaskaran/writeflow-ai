# User Routes API

from fastapi import APIRouter, Depends
from dependencies.auth_dependency import get_current_user
from models.content_model import GenerateContentRequest, SavedResponseRequest
from services.ai_service import build_prompt, generate_contents
from datetime import datetime
from db.database import contents_collection

router = APIRouter()


#   user profile check
@router.get("/profile")
def profile(current_user=Depends(get_current_user)):
    return current_user


# generate ai response
@router.post("/generate")
def generate_content_route(
    data: GenerateContentRequest, _: dict = Depends(get_current_user)
):
    # sends prompt with user data
    prompt = build_prompt(data)

    # generates ai response from prompt
    ai_response = generate_contents(prompt)

    return {"success": True, "content": ai_response}


# saves ai response
@router.post("/save")
def save_content(
    data: GenerateContentRequest, current_user: dict = Depends(get_current_user)
):

    content_document = {
        "user_email": current_user["sub"],
        "content_type": data.content_type,
        "style": data.style,
        "topic": data.topic,
        "tone": data.tone,
        "length": data.length,
        "instructions": data.instructions,
        "content": {
            "title": data.title,
            "introduction": data.introduction,
            "sections": data.sections,
            "conclusion": data.conclusion,
        },
        "created_at": datetime.utcnow(),
    }

    result = contents_collection.insert_one(content_document)

    return {"success": True, "id": str(result.inserted_id)}
