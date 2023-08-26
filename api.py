from steam import webapi, steamid
from flask import Blueprint, render_template, request, redirect, session, current_app as app, jsonify, abort, json, Response

bp_api = Blueprint('bp_api', __name__)

steam_api_key = "6450F125515588614814C4A636002A51"
steam_api = webapi.WebAPI(steam_api_key)


def get_steam_id(profile_id):
    """Fonction pour renvoyer le steam_id du joueur"""
    steam_id = steamid.SteamID(profile_id)
    if not steam_id.is_valid():
        base_url = "https://steamcommunity.com/id/"
        steam_id = steamid.from_url(base_url + profile_id)
    return steam_id

def get_achievements(steam_id):
    return steam_api.call("ISteamUserStats.GetPlayerAchievements", appid=250900, steamid=steam_id)


def get_player_information(steam_id):
    """Fonction pour renvoyer le nom du joueur"""
    return steam_api.call("ISteamUser.GetPlayerSummaries", steamids=steam_id)


@bp_api.route("/get_all_game_achievements", methods=["GET"])
def get_game_information():
    return steam_api.call("ISteamUserStats.GetSchemaForGame",
                         appid=250900,
                         l="en")




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
    session.clear()
    session["steam_id"] = steam_id
    player_information = get_player_information(steam_id)
    player_has_isaac = does_player_has_isaac(steam_id)
    all_game_achievements = get_game_information()

    if player_has_isaac:
        for achievement in achievements["playerstats"]["achievements"]:
            if achievement["achieved"] == 1:
                achievements_completed += 1

    latest_achievements = get_latest_achievements(achievements, all_game_achievements, 10)
    return render_template(
        "user_details.jinja",
        achievements_completed=achievements_completed,
        player_name=player_information["response"]["players"][0]["personaname"],
        profile_pic=player_information["response"]["players"][0]["avatarfull"],
        latest_achievements=latest_achievements
    )


@bp_api.route("/<profileid>/MyAchievements")
def load_all_player_achievements(profileid):
    steam_id = get_steam_id(profileid)
    achievements = get_achievements(steam_id)
    list_achievements = []
    for achievement in achievements["playerstats"]["achievements"]:
        if achievement["achieved"] == 1:
            list_achievements.append(achievement["apiname"])

    session["achievements"] = list_achievements
    return render_template("my_achievements.jinja")


@bp_api.route("/MyAchievements/get_all_completed_achievements", methods=["GET"])
def read_session():
    """Fonction pour lire la session à partir du JS"""
    if "achievements" in session:
        return session["achievements"]
    else:
        if "steam_id" in session:
            return load_all_player_achievements(session["steam_id"])


@bp_api.route("/guide")
def guide():
    return render_template("guide.jinja")


def get_latest_achievements(achievements, all_game_achievements, number_of_achievement_to_return):
    """Fonction pour récupérer les derniers achievements débloqués"""
    number_to_show = 0

    sorted_achievements_player = sorted(achievements["playerstats"]["achievements"], key=lambda k: k['unlocktime'], reverse=True)
    achievement_vector = []
    for x in range(number_of_achievement_to_return):
        if sorted_achievements_player[x]["achieved"] != 0:
            number_to_show += 1
    for x in range(number_to_show):
        for model_achievement in all_game_achievements["game"]["availableGameStats"]["achievements"]:
            if sorted_achievements_player[x]["apiname"] == model_achievement["name"]:
                achievement_vector.append(model_achievement["icon"])
                break

    return achievement_vector
