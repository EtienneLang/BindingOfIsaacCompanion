from flask_pymongo import PyMongo

mongo = PyMongo()


def create_user(name, email, password, console):
    mongo.dbusers.insert_many(
        {'name': name},
        {'email': email},
        {'password': password},
        {'console': console},
        {'achievements': create_empty_achievement_dictionnary()}
    )


def email_already_existing(email):
    if mongo.dbusers.find({'email': email}):
        return True
    return False

def create_empty_achievement_dictionnary():
    dico = {}
    for i in range(637):
        dico[i] = False
    return dico