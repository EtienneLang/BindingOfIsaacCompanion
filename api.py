from flask import Blueprint, render_template, request, redirect, session, current_app as app, jsonify, abort
import requests
import random


bp_api = Blueprint('bp_api', __name__)
steam_api_key = "6450F125515588614814C4A636002A51"
steam_api_link_example = "http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=250900&key=6450F125515588614814C4A636002A51&steamid=76561198173060286"
@bp_api.route("/test")
def get_steam_id():
    """link = f"http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=250900&key={steam_api_key}&steamid={steam_id}"""
    link = steam_api_link_example
    r = requests.get(link)
    steam = jsonify(r.json())
    print(steam)
    return steam