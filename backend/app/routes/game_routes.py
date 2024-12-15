from flask import Blueprint, jsonify, request
from app.models import Game
from app import db

bp = Blueprint('game_routes', __name__)

@bp.route('/<int:game_id>', methods=['GET'])
def get_game_details(game_id):
    """
    Fetch details of a specific game by its ID.
    """
    try:
        game = Game.query.get(game_id)
        if not game:
            return jsonify({"error": "Game not found"}), 404
        
        game_data = {
            "id": game.id,
            "fen": game.current_fen,
            "student_name": game.student_name,
            "moves": [
                {"number": move.move_number, "white": move.white_move, "black": move.black_move}
                for move in game.moves
            ],
            "arm_id": game.arm_id,
            "status":game.status,
        }

        return jsonify(game_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@bp.route('updateName/<int:game_id>', methods=['PATCH'])
def update_student_name(game_id):
    try:
        game = Game.query.get(game_id)

        if not game: 
            return jsonify({"error": "Game not found"}), 404
        
        data = request.get_json()
        student_name = data.get('student_name')

        if not student_name:
            return jsonify({"error": "Student name not specified"})
        
        game.student_name = student_name

        db.session.commit()
        game_data = {
            "id": game.id,
            "fen": game.current_fen,
            "student_name": game.student_name,
            "moves": [
                {"number": move.move_number, "white": move.white_move, "black": move.black_move}
                for move in game.moves
            ],
            "arm_id": game.arm_id,
        }

        return jsonify(game_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

