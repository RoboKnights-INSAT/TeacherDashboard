from flask import Blueprint, jsonify
from app.models import  Game, Arm
from app import db

bp = Blueprint('dashboard_routes', __name__)

@bp.route('/', methods=['GET'])
def dashboard():
    """
    Dashboard endpoint to display the following:
    - Total number of completed games
    - Number of active games
    - Total number of games
    - List of active games
    - List of robotic arms
    """
    try:
        # Fetch data
        total_completed_games = Game.query.filter_by(status='completed').count()
        active_games = Game.query.filter_by(status='active').all()
        active_games_count = len(active_games)
        total_games = Game.query.count()
        robotic_arms = Arm.query.all()
        all_games = Game.query.all()

        # Format data
        active_games_list = [
            {
                "id": g.id,
                "n_moves": g.n_moves,
                "student_name": g.student_name,
                "current_fen": g.current_fen,
                "status": g.status
            } for g in active_games
        ]

        all_games_list = [
            {
                "id": g.id,
                "n_moves": g.n_moves,
                "student_name": g.student_name,
                "current_fen": g.current_fen,
                "status": g.status
            } for g in all_games
        ]

        robotic_arms_list = [
            {
                "id": arm.id,
                "status": arm.status,
                "games_played": arm.games_played
            } for arm in robotic_arms
        ]


        # Construct the response
        dashboard_data = {
            "total_completed_games": total_completed_games,
            "active_games_count": active_games_count,
            "total_games": total_games,
            "active_games": active_games_list,
            "all_games": all_games_list,
            "robotic_arms": robotic_arms_list,
        }

        return jsonify(dashboard_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
