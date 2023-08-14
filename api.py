import json

from flask import Blueprint, render_template, request, redirect, session, current_app as app, jsonify, abort
import requests
import random


bp_api = Blueprint('bp_api', __name__)
steam_api_key = "6450F125515588614814C4A636002A51"
steam_api_achievement_player = "http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=250900&key=6450F125515588614814C4A636002A51&steamid=76561198173060286"
steam_api_all_achievement = "https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v0001/?appid=250900&key=6450F125515588614814C4A636002A51&steamid=76561198173060286"
steam_api_player_profile = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=6450F125515588614814C4A636002A51&steamids=76561198173060286"
steam_api_player_games = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=6450F125515588614814C4A636002A51&steamid=76561198173060286&format=json"

def get_steam_id(steamid):
    """Fonction pour renvoyer le dico des achievements du joueur"""
    link = f"http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=250900&key={steam_api_key}&steamid={steamid}"
    r = requests.get(link)
    return json.loads(r.text)


def get_player_information(steamid):
    """Fonction pour renvoyer le nom du joueur"""
    link = f"https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key={steam_api_key}&steamids={steamid}"
    r = requests.get(link)
    return json.loads(r.text)
def get_player_games(steamid):
    """Fonction pour renvoyer les jeux du joueur"""
    link = f"http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key={steam_api_key}&steamid={steamid}&format=json"
    r = requests.get(link)
    return json.loads(r.text)

def does_player_has_isaac(steamid):
    """Fonction pour savoir si le joueur à Isaac"""
    games = get_player_games(steamid)
    for game in games["response"]["games"]:
        if game["appid"] == 250900:
            return True
    return False

@bp_api.route("/<int:steamid>", methods=["POST", "GET"])
def get_all_steam_information(steamid):
    """Permets de récupérer le nombre d'achievements complétés"""
    achievements_completed = 0
    achievements = get_steam_id(steamid)
    player_information = get_player_information(steamid)
    player_has_isaac = does_player_has_isaac(steamid)
    if player_has_isaac == True:
        for achievement in achievements["playerstats"]["achievements"]:
            if achievement["achieved"] == 1:
                achievements_completed += 1

    return render_template("user_details.jinja", achievements_completed=achievements_completed, player_name = player_information["response"]["players"][0]["personaname"])

    
