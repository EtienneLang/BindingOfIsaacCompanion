from flask import session
from flask_pymongo import PyMongo, MongoClient

def get_database():
    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb+srv://etiennelanglois007:269Mongo6880823@dbusers.0l4pngm.mongodb.net/dbUsers"

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    return MongoClient(CONNECTION_STRING)


def create_user(name, email, password, console = True):
    client = get_database()
    client.dbUsers.Users.insert_one({
        'name': name,
        'email': email,
        'password': password,
        'console': console,
        'achievements': []
    }
    )


def login(email, password):
    client = get_database()
    user = client.dbUsers.Users.find_one({'email': email})
    if user:
        if user['password'] == password:
            return user["_id"]
    return None


def get_user(id):
    client = get_database()
    return client.dbUsers.Users.find_one({'_id': id})


def add_steam_id(steam_id):
    client = get_database()
    client.dbUsers.Users.add_one(
        #Trouver l'utilisateur avec le email
        {'_id': session["user"]["_id"]},
        #Ajouter ou modifier le steam_id
        {set: {'steam_id': steam_id}}
    )


def email_already_existing(email):
    client = get_database()
    client.dbUsers.Users.find_one({'email': email})
    if client.dbUsers.Users.find_one({'email': email}):
        return True
    return False
