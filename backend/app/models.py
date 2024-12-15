from app import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

class Move(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'), nullable=False)
    move_number = db.Column(db.Integer, nullable=False)
    white_move = db.Column(db.String(10))
    black_move = db.Column(db.String(10))
    fen_after_move = db.Column(db.String(100), nullable=False)
    game = db.relationship('Game', back_populates='moves')



class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_name = db.Column(db.String(30), nullable=True)
    arm_id = db.Column(db.Integer, db.ForeignKey('arm.id'), nullable=False)
    current_fen = db.Column(db.String(100), nullable=False, default='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')    
    status = db.Column(db.String(10), nullable=False)
    winner = db.Column(db.String(10), nullable=True)
    moves = db.relationship('Move', back_populates='game', order_by='Move.move_number')
    @property
    def n_moves(self):
        return len(self.moves)



class Arm(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(10), nullable=False)
    games_played = db.Column(db.Integer, default=0)
    current_game_id = db.Column(db.Integer, db.ForeignKey('game.id'), nullable=True)
