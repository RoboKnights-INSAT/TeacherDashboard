from app import db
from enum import Enum

class ArmStatusEnum(Enum):
    ACTIVE = "active"
    IDLE = "idle"

class Arm(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.Enum(ArmStatusEnum), nullable=False)
    games_played = db.Column(db.Integer, default=0)
    current_game_id = db.Column(db.Integer, db.ForeignKey('game.id'), nullable=True)
