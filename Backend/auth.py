from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import jwt
from database import SessionLocal
from models import User

router = APIRouter(prefix="/auth", tags=["auth"])

# 🔐 JWT config
SECRET_KEY = "flashon-secret"
ALGORITHM = "HS256"

# 🔐 Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 📦 DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 🔑 Password helpers
def hash_pw(password: str) -> str:
    return pwd_context.hash(password)

def verify_pw(password: str, hashed: str) -> bool:
    return pwd_context.verify(password, hashed)

# 🔑 Token helper
def create_token(user: User) -> str:
    return jwt.encode({"user_id": user.id}, SECRET_KEY, algorithm=ALGORITHM)


# ✅ LOGIN
@router.post("/login")
def login(data: dict, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data["email"]).first()

    if not user or not verify_pw(data["password"], user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token(user)

    return {
        "token": token,
        "is_premium": user.is_premium,
    }

# ✅ SIGNUP
@router.post("/signup")
def signup(data: dict, db: Session = Depends(get_db)):
    print("SIGNUP HIT", data)

    if db.query(User).filter(User.email == data["email"]).first():
        raise HTTPException(status_code=400, detail="User already exists")

    user = User(
        email=data["email"],
        password=hash_pw(data["password"]),
        is_premium=False,
    )

    db.add(user)
    db.commit()

    print("USER CREATED")

    return {"success": True}
