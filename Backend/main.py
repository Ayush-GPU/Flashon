from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine, Base
from models import Deck, Flashcard, User
from ai import generate_flashcards
from payments import router as payments_router

Base.metadata.create_all(bind=engine)





app = FastAPI(title="FlashOn API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
from auth import router as auth_router
app.include_router(auth_router)

@app.get("/")
def root():
    return {"status": "ok"}


class GenerateRequest(BaseModel):
    deck_title: str
    content: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {"message": "FlashOn API running"}


@app.post("/generate")
def generate(data: GenerateRequest, db: Session = Depends(get_db)):
    # TEMP USER (until auth)
    user = db.query(User).get(1)

    if not user:
        user = User(email="temp@flashon.com", is_premium=False)
        db.add(user)
        db.commit()
        db.refresh(user)

    deck = Deck(title=data.deck_title, user_id=user.id)
    db.add(deck)
    db.commit()
    db.refresh(deck)

    cards = generate_flashcards(data.content)

    # 🔒 PREMIUM LIMIT
    if not user.is_premium:
        cards = cards[:20]

    for c in cards:
        db.add(
            Flashcard(
                question=c["question"],
                answer=c["answer"],
                difficulty=c["difficulty"],
                deck_id=deck.id,
            )
        )

    db.commit()

    return {
        "deck_id": deck.id,
        "cards_created": len(cards),
        "premium": user.is_premium,
    }


@app.get("/deck/{deck_id}")
def get_deck(deck_id: int, db: Session = Depends(get_db)):
    return db.query(Flashcard).filter(Flashcard.deck_id == deck_id).all()

app.include_router(auth_router)
