from app import db
from enum import Enum

class WinnerEnum(Enum):
    ARM = "arm"
    PLAYER = "player"
    DRAW = "draw"

class StatusEnum(Enum):
    ACTIVE = "active"
    COMPLETED = "completed"

class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_name = db.Column(db.String(30), nullable=True)
    arm_id = db.Column(db.Integer, db.ForeignKey('arm.id'), nullable=False)
    current_fen = db.Column(db.String(100), nullable=False, default='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')    
    status = db.Column(db.Enum(StatusEnum), nullable=False)
    winner = db.Column(db.Enum(WinnerEnum), nullable=True)
    moves = db.relationship('Move', back_populates='game', order_by='Move.move_number')
    

