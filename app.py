from flask import Flask, render_template, session, redirect
from api import bp_api
from steamAuthOpenId import bp_steamAuth


app = Flask(__name__)
app.register_blueprint(bp_api, url_prefix="/api")
app.register_blueprint(bp_steamAuth, url_prefix="/steamAuth")
app.secret_key = "464b2822f3de9cee02fa8a451e18c46ff3db4a0893253c0a54a527c8aa24be93"


@app.route("/logout")
def clear_session():
    session.clear()
    return redirect("/")


@app.route('/')
def index():
    """Affiche l'accueil"""
    app.logger.info("L'utilisateur va à l'accueil du site")
    return render_template('index.jinja')


@app.errorhandler(500)
def server_error(e):
    """Affiche une page d'erreur 500"""
    app.logger.error("Erreur 500 : %s", e)
    message = "The server has encoutered an error. Please refresh the page or try again later."
    return render_template('index.jinja', error=True), 500


@app.errorhandler(400)
def bad_request(e):
    """Affiche une page d'erreur 400"""
    app.logger.error("Erreur 400 : %s", e)
    message = "Bad request. Please enter a valid steam ID."
    return render_template('erreur.jinja', error = message), 400



