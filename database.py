from flask_pymongo import PyMongo

mongo = PyMongo()


def create_user(name, email, password, console):
    mongo.dbusers.insert_many(
        {'name': name},
        {'email': email},
        {'password': password},
        {'console': console}
    )

def email_already_existing(email):
    if mongo.dbusers.find({'email': email}):
        return True
    return False

