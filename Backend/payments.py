import razorpay
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from models import User

router = APIRouter(prefix="/payments", tags=["Payments"])

client = razorpay.Client(
    auth=("RAZORPAY_KEY_ID", "RAZORPAY_KEY_SECRET")
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/create-order")
def create_order():
    order = client.order.create({
        "amount": 19900,  # ₹199
        "currency": "INR",
        "payment_capture": 1,
    })
    return order


@router.post("/verify")
def verify_payment(db: Session = Depends(get_db)):
    # TEMP USER
    user = db.query(User).get(1)
    if user:
        user.is_premium = True
        db.commit()
    return {"status": "premium_activated"}
