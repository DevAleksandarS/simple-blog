from typing import TypedDict, Optional


class ResponseType(TypedDict):
    message: str
    error: Optional[str]
