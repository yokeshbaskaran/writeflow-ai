# User Routes API

from fastapi import APIRouter, Depends
from dependencies.auth_dependency import get_current_user
from models.content_model import GenerateContentRequest
from services.ai_service import build_prompt, generate_contents

router = APIRouter()

# @router.get("/tests")
# def test(current_user=Depends(get_current_user)):
#     return {"print": "tests", "user": current_user}


#  user profile check
@router.get("/profile")
def profile(current_user=Depends(get_current_user)):
    return current_user


@router.post("/generate")
def generate_content_route(
    data: GenerateContentRequest, _: dict = Depends(get_current_user)
):

    # sends prompt with user data
    prompt = build_prompt(data)

    # generates ai response from prompt
    ai_response = generate_contents(prompt)

    return {"success": True, "content": ai_response}
