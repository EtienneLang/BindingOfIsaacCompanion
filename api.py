from steam import webapi, steamid
from flask import Blueprint, render_template, request, redirect, session, current_app as app, jsonify, abort

bp_api = Blueprint('bp_api', __name__)

steam_api_key = "6450F125515588614814C4A636002A51"
steam_api = webapi.WebAPI(steam_api_key)


def get_steam_id(profile_id):
    """Fonction pour renvoyer le steam_id du joueur"""
    base_url = "https://steamcommunity.com/id/"
    return steamid.from_url(base_url + profile_id)


def get_achievements(steam_id):
    """Fonction pour renvoyer le dico des achievements du joueur"""
    return steam_api.call("ISteamUserStats.GetPlayerAchievements", appid=250900, steamid=steam_id)


def get_player_information(steam_id):
    """Fonction pour renvoyer le nom du joueur"""
    return steam_api.call("ISteamUser.GetPlayerSummaries", steamids=steam_id)


def get_player_games(steam_id):
    """Fonction pour renvoyer les jeux du joueur"""
    return steam_api.call(
        method_path="IPlayerService.GetOwnedGames",
        steamid=steam_id,
        appids_filter=[250900],
        include_appinfo=True,
        include_extended_appinfo=False,
        include_free_sub=False,
        include_played_free_games=False,
        language="en"
    )


def does_player_has_isaac(steam_id):
    """Fonction pour savoir si le joueur à Isaac"""
    games = get_player_games(steam_id)
    for game in games["response"]["games"]:
        if game["appid"] == 250900:
            return True
    return False


@bp_api.route("/<profileid>")
def get_all_steam_information(profileid):
    """Permets de récupérer le nombre d'achievements complétés"""
    achievements_completed = 0
    steam_id = get_steam_id(profileid)
    achievements = get_achievements(steam_id)
    player_information = get_player_information(steam_id)
    player_has_isaac = does_player_has_isaac(steam_id)
    if player_has_isaac:
        for achievement in achievements["playerstats"]["achievements"]:
            if achievement["achieved"] == 1:
                achievements_completed += 1

    return render_template(
        "user_details.jinja",
        achievements_completed=achievements_completed,
        player_name=player_information["response"]["players"][0]["personaname"]
    )

    
