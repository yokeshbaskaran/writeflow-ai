# User Routes API

from fastapi import APIRouter, Depends, HTTPException
from dependencies.auth_dependency import get_current_user
from models.content_model import GenerateContentRequest, SavedResponseRequest
from services.ai_service import build_prompt, generate_contents
from datetime import datetime
from db.database import users_collection, contents_collection

router = APIRouter()


#   user profile check - testing
@router.get("/me")
def profile(current_user=Depends(get_current_user)):
    return {
        # "id": str(current_user["_id"]),
        "username": current_user["username"],
        "email": current_user["email"],
        "credits": current_user.get("credits", 20),
    }


# generate ai response
@router.post("/generate")
def generate_content_route(
    data: GenerateContentRequest, current_user=Depends(get_current_user)
):
    # check user credits
    if current_user["credits"] <= 0:
        raise HTTPException(status_code=403, detail="No credits remaining")

    # sends prompt with user data
    prompt = build_prompt(data)

    # generates ai response from prompt
    ai_response = generate_contents(prompt)

    # users_email = current_user["sub"]
    users_email = current_user.get("email")
    users_collection.update_one({"email": users_email}, {"$inc": {"credits": -1}})

    # updated_user after deduct credits
    updated_user = users_collection.find_one({"email": current_user["email"]})

    return {
        "success": True,
        "content": ai_response,
        "credits_left": updated_user["credits"],
    }


# saves ai response
@router.post("/save")
def save_content(
    data: SavedResponseRequest, current_user: dict = Depends(get_current_user)
):
    # users_email = current_user["sub"]
    users_email = current_user.get("email")

    content_document = {
        "user_email": users_email,
        "content_type": data.content_type,
        "content": {
            "title": data.title,
            "introduction": data.introduction,
            "sections": data.sections,
            "conclusion": data.conclusion,
        },
        "words_created": data.words_created,
        "created_at": datetime.utcnow(),
    }

    result = contents_collection.insert_one(content_document)

    return {"success": True, "id": str(result.inserted_id)}


@router.get("/responses")
def get_all_responses(current_user: dict = Depends(get_current_user)):

    # users_email = current_user["sub"]
    users_email = current_user.get("email")
    result = contents_collection.find({"user_email": users_email})

    # print("result:", result)

    responses = []

    for item in result:
        item["_id"] = str(item["_id"])
        responses.append(item)

    return responses
