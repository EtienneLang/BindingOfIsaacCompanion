from api import get_steam_id

print("Début des tests")
assert get_steam_id("MathouQC").is_valid()
assert get_steam_id("76561198094207899").is_valid()
print("Tests réussis")
