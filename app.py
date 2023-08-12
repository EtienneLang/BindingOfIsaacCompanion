from flask import Flask, render_template

import dotenv
import os
app = Flask(__name__)
@app.route('/')
def index():
    """Affiche l'accueil"""
    app.logger.info("L'utilisateur va à l'accueil du site")
    return render_template('index.jinja')