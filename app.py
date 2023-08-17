from flask import Flask, render_template
from api import bp_api
from steamAuthOpenId import bp_steamAuth


app = Flask(__name__)
app.register_blueprint(bp_api, url_prefix="/api")
app.register_blueprint(bp_steamAuth, url_prefix="/steamAuth")
app.secret_key = "464b2822f3de9cee02fa8a451e18c46ff3db4a0893253c0a54a527c8aa24be93"


@app.route('/')
def index():
    """Affiche l'accueil"""
    app.logger.info("L'utilisateur va à l'accueil du site")
    return render_template('index.jinja')

