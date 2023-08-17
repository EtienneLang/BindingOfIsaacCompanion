from flask import Flask, redirect, request, Blueprint
from json import dumps
from urllib.parse import urlencode

steam_openid_url = 'https://steamcommunity.com/openid/login'
bp_steamAuth = Blueprint('bp_steamAuth', __name__)

@bp_steamAuth.route("/")
def hello():
   return '<a href="http://localhost:5000/steamAuth/auth">Login with steam</a>'

@bp_steamAuth.route("/auth")
def auth_with_steam():

  params = {
    'openid.ns': "http://specs.openid.net/auth/2.0",
    'openid.identity': "http://specs.openid.net/auth/2.0/identifier_select",
    'openid.claimed_id': "http://specs.openid.net/auth/2.0/identifier_select",
    'openid.mode': 'checkid_setup',
    'openid.return_to': 'http://127.0.0.1:5000/steamAuth/authorize',
    'openid.realm': 'http://127.0.0.1:5000'
  }

  query_string = urlencode(params)
  auth_url = steam_openid_url + "?" + query_string
  print(auth_url)
  return redirect(auth_url)

@bp_steamAuth.route("/authorize")
def authorize():
  print(request.args)
  return dumps(request.args) + '<br><br><a href="http://localhost:5000/auth">Login with steam</a>'
