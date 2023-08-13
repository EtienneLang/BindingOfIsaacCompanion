from flask import Flask, render_template
from api import bp_api
import os
app = Flask(__name__)
app.register_blueprint(bp_api, url_prefix="/api")

@app.route('/')
def index():
    """Affiche l'accueil"""
    app.logger.info("L'utilisateur va à l'accueil du site")
    return render_template('index.jinja')

