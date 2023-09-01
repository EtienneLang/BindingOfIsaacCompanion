from flask import Blueprint, render_template, request, redirect, session, current_app as app, jsonify, abort, json, Response
import re

import database

bp_account = Blueprint('bp_account', __name__)

reg_email = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')
reg_html = re.compile(r'<(.*)>.*?|<(.*) />')


@bp_account.route("/create_account", methods=["GET", "POST"])
def create_account():
    if request.method == "GET":
        invalidation = valider_creation_compte()
        if not invalidation["form_valide"]:
            return render_template("create_account.jinja",
                                   invalidation=invalidation
                                   )
        utilisateur = invalidation
        database.create_account(utilisateur["nom"], utilisateur["courriel"], utilisateur["mdp"])


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
        texte_courriel = "Veuillez entrer votre adresse courriel"
        form_valide = False
    elif len(courriel) > 50:
        classe_courriel = "is-invalid"
        texte_courriel = "L'adresse courriel ne peut pas contenir plus de 50 caractères"
        form_valide = False
    elif not reg_email.fullmatch(courriel):
        classe_courriel = "is-invalid"
        texte_courriel = "L'adresse courriel ne doit pas contenir de champs interdits et doit être une adresse valide"
        form_valide = False
    else:
        email_existant = database.email_already_existing(courriel)
        if email_existant:
            classe_courriel = "is-invalid"
            texte_courriel = "L'adresse courriel est déjà utilisée"
            form_valide = False

    # validation du nom
    if not nom:
        classe_nom = "is-invalid"
        texte_nom = "Veuillez entrer votre nom"
        form_valide = False
    elif len(nom) < 3 or len(nom) > 50:
        classe_nom = "is-invalid"
        texte_nom = "Votre nom nom doit contenir entre 3 et 50 caractères"
        form_valide = False
    elif reg_html.fullmatch(nom):
        classe_nom = "is-invalid"
        texte_nom = "Votre nom nom ne peut pas contenir de caractères interdits"
        form_valide = False

    # validation du mot de passe
    mdp_valide = True
    if not mdp:
        classe_mdp = "is-invalid"
        texte_mdp = "Veuillez entrer un mot de passe"
        form_valide = False
        mdp_valide = False
    elif len(mdp) < 4:
        classe_mdp = "is-invalid"
        texte_mdp = "Votre mot de passe doit contenir au moins 4 caractères"
        form_valide = False
        mdp_valide = False
    elif reg_html.fullmatch(mdp):
        classe_mdp = "is-invalid"
        texte_mdp = "Votre mot de passe ne peut pas contenir de caractères interdits"
        form_valide = False
        mdp_valide = False

    # validation des deux mots de passe
    if mdp_valide:
        if not mdp2:
            classe_mdp2 = "is-invalid"
            texte_mdp2 = "Veuillez confirmer votre mot de passe"
            form_valide = False
        elif not mdp == mdp2:
            classe_mdp2 = "is-invalid"
            texte_mdp2 = "Les mots de passe ne concordent pas"
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
            "classe_mdp": classe_mdp,
            "texte_mdp": texte_mdp,
            "classe_mdp2": classe_mdp2,
            "texte_mdp2": texte_mdp2
        }
        return invalidation

    # mdp = hacher_mdp(mdp)
    utilisateur = {
        "form_valide": form_valide,
        "courriel": courriel,
        "nom": nom,
        "mdp": mdp
    }
    return utilisateur
