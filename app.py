from flask import Flask, render_template, session, redirect,send_from_directory
from api import bp_api
from steamAuthOpenId import bp_steamAuth
from account import bp_account
import database
from flask_pymongo import PyMongo



app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://etiennelanglois007:269Mongo6880823@dbusers.0l4pngm.mongodb.net/dbUsers"
db = PyMongo(app).db
app.register_blueprint(bp_api, url_prefix="/api")
app.register_blueprint(bp_steamAuth, url_prefix="/steamAuth")
app.register_blueprint(bp_account, url_prefix="/account")
app.secret_key = "464b2822f3de9cee02fa8a451e18c46ff3db4a0893253c0a54a527c8aa24be93"


@app.route("/logout")
def clear_session():
    session.clear()
    return redirect("/")


@app.route('/feedback')
def feedback():
    """Affiche la page de feedback"""
    database.create_user()
    return render_template('feedback.jinja')

@app.route('/')
def index():
    """Affiche l'accueil"""
    app.logger.info("L'utilisateur va à l'accueil du site")
    return render_template('index.jinja')

@app.route('/ads.txt')
def ads():
    return send_from_directory('./', 'ads.txt')


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


@app.errorhandler(404)
def bad_request(e):
    """Affiche une page d'erreur 400"""
    app.logger.error("Erreur 404 : %s", e)
    message = "Bad request."
    return render_template('erreur.jinja', error=message), 404


