from app import db

class Move(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'), nullable=False)
    move_number = db.Column(db.Integer, nullable=False)
    white_move = db.Column(db.String(10))
    black_move = db.Column(db.String(10))
    fen_after_move = db.Column(db.String(100), nullable=False)
    game = db.relationship('Game', back_populates='moves')