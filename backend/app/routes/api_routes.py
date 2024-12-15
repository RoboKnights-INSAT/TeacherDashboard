from flask import Blueprint, request, jsonify
from app.models import Game, Move, Arm
from app import db
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)

bp = Blueprint('api_routes', __name__)

@bp.route('/api/game-update', methods=['POST'])
def game_update():
    """
    Endpoint to receive updates from the robotic arm.
    Expected payload:
    {
        "arm_id": 1,
        "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w",
        "move_number": 1,
        "move": "e2e4",
    }
    """
    data = request.json

    # Validate the incoming data
    required_fields = ["arm_id","fen", "move","move_number"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    logging.info(f"Received data: {data}")  # Log the data

    try:
        # Fetch the game
        arm = Arm.query.get(data['arm_id'])            
        if arm and arm.status == "active":  
            game_id = arm.current_game_id
            if game_id:
                current_game = Game.query.get(game_id)
            else:
                return jsonify({"error": "Game not found"}), 404
        else :
            return jsonify({"error": "Arm is not active"}), 400

        # Update the game's current FEN and status
        current_game.current_fen = data['fen']
        current_game.status = "active"
        # Add the new move to the move table
        existing_move = Move.query.filter_by(game_id=game_id, move_number=data['move_number']).first()  # Check for existing move
        if existing_move:
            existing_move.black_move = data['move']  # Update black move if it exists
            existing_move.fen_after_move=data['fen']
        else:
            new_move = Move(
                game_id=game_id,
                move_number=data['move_number'],
                white_move=data['move'],  # Add white move for new move
                fen_after_move= data['fen'],
                black_move=None,  # Initialize black move as None
            )
            db.session.add(new_move)  # Add new move to the session
        db.session.commit()

        return jsonify({"message": "Game updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bp.route('/api/initialize-game', methods=['POST'])
def initialize_game():
    """
    Endpoint to initialize a new game.
    Expected payload:
    {
        "arm_id": 1,
        "initial_fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    }
    """
    data = request.json
    
   
    required_fields = ["arm_id", "initial_fen"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    logging.info(f"Received data: {data}")  # Log the data

    try:
       
        new_game = Game(
            arm_id=data['arm_id'],
            current_fen=data['initial_fen'],
            status="active",
        )
        db.session.add(new_game)
        db.session.flush()
    
        arm = Arm.query.get(data["arm_id"])  
        
        if not arm:
            arm = Arm(
                id=data["arm_id"],
                status="active",
                current_game_id=new_game.id
            )
            db.session.add(arm)
        else :
            arm.status = "active" 
            arm.current_game_id = new_game.id  
        db.session.commit()
        return jsonify({"message": "Game initialized successfully", "game_id": new_game.id}), 201

    except Exception as e:
        db.session.rollback() 
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500
    

@bp.route('/api/end-game', methods=['POST'])
def end_game():
    """
    Endpoint to end a game.
    Expected payload:
    {
        "arm_id": 1
        "result": "checkmate",  # "checkmate", "stalemate"
        "winner": "player"      # Optional, "arm" or "player", required for "checkmate" 
    }
    """
    data = request.json

    if 'result' not in data or 'arm_id' not in data:
        return jsonify({"error": "Missing 'arm_id' or 'result' field"}), 400

    logging.info(f"Received data: {data}")  # Log the data

    try:
        arm = Arm.query.get(data['arm_id'])
        if arm:
            game_id = arm.current_game_id
            if game_id:
                current_game = Game.query.get(game_id)
            else:
                return jsonify({"error": "Game not found"}), 404

        if current_game.status == "completed":
            return jsonify({"error": "Game is already completed"}), 400

        result = data['result'].lower()
        if result not in ["checkmate", "stalemate"]:
            return jsonify({"error": "Invalid result. Must be 'checkmate', 'stalemate', or 'resignation'"}), 400

        if result == "checkmate":
            if 'winner' not in data or data['winner'] not in ["arm", "player"]:
                return jsonify({"error": "Winner must be 'arm' or 'player' for 'checkmate' or 'resignation'"}), 400
            current_game.winner = data['winner']
        if result == "stalemate":
            current_game.winner = "draw"

        current_game.status = "completed"

        if current_game.arm_id:
            arm = Arm.query.get(current_game.arm_id)
            if arm:
                arm.status = "idle"
                arm.current_game_id = None
                arm.games_played += 1

        db.session.commit()

        return jsonify({"message": "Game ended successfully", "game_id": current_game.id}), 200

    except Exception as e:
        db.session.rollback()  # Rollback in case of an error
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500
