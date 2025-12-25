from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    password = Column(String)
    is_premium = Column(Boolean, default=False)

class Deck(Base):
    __tablename__ = "decks"
    id = Column(Integer, primary_key=True)
    title = Column(String)
    user_id = Column(Integer)

class Flashcard(Base):
    __tablename__ = "flashcards"
    id = Column(Integer, primary_key=True)
    question = Column(Text)
    answer = Column(Text)
    difficulty = Column(String)
    interval = Column(Integer, default=1)
    deck_id = Column(Integer, ForeignKey("decks.id"))
