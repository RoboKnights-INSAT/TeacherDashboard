from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config  # Ensure this line is present

# Initialize extensions
db = SQLAlchemy()

def create_app():
    # Create the Flask application
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(Config)  # Use the imported Config class
    
    # Initialize extensions
    db.init_app(app)
    CORS(app)  # Enable Cross-Origin Resource Sharing
    
    # Register blueprints/routes
    from app.routes import api_routes, dashboard_routes
    app.register_blueprint(api_routes.bp, url_prefix='/api')
    app.register_blueprint(dashboard_routes.bp, url_prefix='/dashboard')
    
    # Handle database migrations
    with app.app_context():
        db.create_all()  # Creates database tables (avoid in production, use migrations instead)
    
    return app
