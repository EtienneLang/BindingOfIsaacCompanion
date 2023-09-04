import hashlib

from flask import Blueprint, render_template, request, redirect, session, current_app as app, jsonify, abort, json, Response
import re
bp_account = Blueprint('bp_account', __name__)
import database
reg_email = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')
reg_html = re.compile(r'<(.*)>.*?|<(.*) />')

def hacher_mdp(mdp_en_clair):
    """Prend un mot de passe en clair et lui applique une fonction de hachage"""
    return hashlib.sha512(mdp_en_clair.encode()).hexdigest()

@bp_account.route("/create_account", methods=["GET", "POST"])
def create_account():
    if request.method == "GET":
       return render_template("create_account.jinja", invalidation=None)

    invalidation = valider_creation_compte()
    if not invalidation["form_valide"]:
        return render_template("create_account.jinja",
                               invalidation=invalidation
                               )
    # utilisateur = invalidation
    database.create_user(invalidation["nom"], invalidation["courriel"], invalidation["mdp"])
    return render_template("index.jinja")
    # database.create_account(utilisateur["nom"], utilisateur["courriel"], utilisateur["mdp"])

@bp_account.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "GET":
        return render_template("login.jinja", invalidation=None)

    if request.method == "POST":
        email = request.form.get("courriel", default="")
        password = request.form.get("mdp", default="")
        user = database.login(email, hacher_mdp(password))
        if not user:
            return render_template("login.jinja", invalidation="Invalid email or password")
        session["user"] = user["_id"]

    return render_template("index.jinja")


def valider_creation_compte():
    """Permets de valider les champs de la création d'un compte"""
    # récupération des champs et création des classes et textes vide pour la validation
    nom = request.form.get("nom", default="")
    texte_nom = ""
    classe_nom = ""
    courriel = request.form.get("courriel", default="")
    texte_courriel = ""
    classe_courriel = ""
    mdp = request.form.get("mdp")
    texte_mdp = ""
    classe_mdp = ""
    mdp2 = request.form.get("mdp2")
    texte_mdp2 = ""
    classe_mdp2 = ""
    form_valide = True

    # validation du courriel
    if not courriel:
        classe_courriel = "is-invalid"
        texte_courriel = "Please enter your email address"
        form_valide = False
    elif len(courriel) > 50:
        classe_courriel = "is-invalid"
        texte_courriel = "Your email address must be less than 50 characters long"
        form_valide = False
    elif not reg_email.fullmatch(courriel):
        classe_courriel = "is-invalid"
        texte_courriel = "Please enter a valid email address and be sure there is no forbidden characters"
        form_valide = False
    else:
        email_existant = database.email_already_existing(courriel)
        if email_existant:
            classe_courriel = "is-invalid"
            texte_courriel = "This email address is already in use"
            form_valide = False

    # validation du nom
    if not nom:
        classe_nom = "is-invalid"
        texte_nom = "Please enter your name"
        form_valide = False
    elif len(nom) < 3 or len(nom) > 50:
        classe_nom = "is-invalid"
        texte_nom = "Your name must be between 3 and 50 characters long"
        form_valide = False
    elif reg_html.fullmatch(nom):
        classe_nom = "is-invalid"
        texte_nom = "Your name cannot contain forbidden characters"
        form_valide = False

    # validation du mot de passe
    mdp_valide = True
    if not mdp:
        classe_mdp = "is-invalid"
        texte_mdp = "Please enter a password"
        form_valide = False
        mdp_valide = False
    elif len(mdp) < 4:
        classe_mdp = "is-invalid"
        texte_mdp = "Your password must be at least 4 characters long"
        form_valide = False
        mdp_valide = False
    elif reg_html.fullmatch(mdp):
        classe_mdp = "is-invalid"
        texte_mdp = "Your password cannot contain forbidden characters"
        form_valide = False
        mdp_valide = False

    # validation des deux mots de passe
    if mdp_valide:
        if not mdp2:
            classe_mdp2 = "is-invalid"
            texte_mdp2 = "Please enter your password again"
            form_valide = False
        elif not mdp == mdp2:
            classe_mdp2 = "is-invalid"
            texte_mdp2 = "Your passwords do not match"
            form_valide = False

    if not form_valide:
        invalidation = {
            "form_valide": form_valide,
            "courriel": courriel,
            "classe_courriel": classe_courriel,
            "texte_courriel": texte_courriel,
            "nom": nom,
            "classe_nom": classe_nom,
            "texte_nom": texte_nom,
            "mdp": mdp,
            "classe_mdp": classe_mdp,
            "texte_mdp": texte_mdp,
            "mdp2": mdp2,
            "classe_mdp2": classe_mdp2,
            "texte_mdp2": texte_mdp2
        }
        return invalidation

    mdp = hacher_mdp(mdp)
    utilisateur = {
        "form_valide": form_valide,
        "courriel": courriel,
        "nom": nom,
        "mdp": mdp
    }
    return utilisateur
