from app import db
from faker import Faker
from app.models import  Game, Arm, Move
import random 
from flask import Blueprint



faker = Faker()
bp = Blueprint('mock_routes', __name__)


@bp.route('/')
def create_mock_data():
    for _ in range(10):
        arm = Arm(status=faker.random_element(['active', 'inactive']), games_played=faker.random_element([i for i in range(0,5)]), current_game_id=faker.random_element([0,1,2]))
        db.session.add(arm)
    for _ in range(10):
        game = Game(
            student_name=faker.name(),
            arm_id=faker.random_element([i for i in range(0,10)]),
            status=faker.random_element(['active', 'completed']),
            winner=faker.random_element([None, 'white', 'black'])
        )
        db.session.add(game)
    games = Game.query.all()
    for game in games:
        for move_num in range(1, random.randint(3, 6)):  # Create 3 to 5 moves for each game
            move = Move(
                game_id=game.id,
                move_number=move_num,
                white_move=faker.random_element(['e4', 'd4', 'Nf3', 'g3']),
                black_move=faker.random_element(['e5', 'd5', 'Nc6', 'f6']),
                fen_after_move=faker.random_element(['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1'])
            )
            db.session.add(move)
    db.session.commit()
    return 'Mock data created successfully!'