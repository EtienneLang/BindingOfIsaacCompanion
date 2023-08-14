import json

from flask import Blueprint, render_template, request, redirect, session, current_app as app, jsonify, abort
import requests
import random


bp_api = Blueprint('bp_api', __name__)
steam_api_key = "6450F125515588614814C4A636002A51"
steam_api_achievement_player = "http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=250900&key=6450F125515588614814C4A636002A51&steamid=76561198173060286"
steam_api_all_achievement = "https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v0001/?appid=250900&key=6450F125515588614814C4A636002A51&steamid=76561198173060286"



def get_steam_id(steamid):
    """Fonction pour renvoyer le dico des achievements du joueur"""
    link = f"http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=250900&key={steam_api_key}&steamid={steamid}"
    r = requests.get(link)
    steam = json.loads(r.text)
    return steam


@bp_api.route("/<int:steamid>", methods=["POST", "GET"])
def get_completed_achievements(steamid):
    """Permets de récupérer le nombre d'achievements complétés"""
    achievements_completed = 0
    achievements = get_steam_id(steamid)

    for achievement in achievements["playerstats"]["achievements"]:
        if achievement["achieved"] == 1:
            achievements_completed += 1
    return render_template("user_details.jinja", achievements_completed=achievements_completed)

    
