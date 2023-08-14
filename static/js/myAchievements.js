"use strict";


const dicoTetePerso = {
        "HeadIsaac": "/static/images/CharactersHeads/HeadIsaac.png",
        "HeadMagdalene": "/static/images/CharactersHeads/HeadMagdalene.png",
        "HeadCain": "/static/images/CharactersHeads/HeadCain.png",
        "HeadJudas": "/static/images/CharactersHeads/HeadJudas.png",
        "HeadBlueBaby": "/static/images/CharactersHeads/HeadBlueBaby.png",
        "HeadEve": "/static/images/CharactersHeads/HeadEve.png",
        "HeadSamson": "/static/images/CharactersHeads/HeadSamson.png",
        "HeadAzazel": "/static/images/CharactersHeads/HeadAzazel.png",
        "HeadLazarus": "/static/images/CharactersHeads/HeadLazarus.png",
        "HeadEden": "/static/images/CharactersHeads/HeadEden.png",
        "HeadLost": "/static/images/CharactersHeads/HeadLost.png",
        "HeadLilith": "/static/images/CharactersHeads/HeadLilith.png",
        "HeadKeeper": "/static/images/CharactersHeads/HeadKeeper.png",
        "HeadApollyon": "/static/images/CharactersHeads/HeadApollyon.png",
        "HeadForgotten": "/static/images/CharactersHeads/HeadForgotten.png",
        "HeadJacob": "/static/images/CharactersHeads/HeadJacob.png",
        "HeadTaintedIsaac": "/static/images/CharactersHeads/HeadTaintedIsaac.png",
        "HeadTaintedMagdalene": "/static/images/CharactersHeads/HeadTaintedMagdalene.png",
        "HeadTaintedCain": "/static/images/CharactersHeads/HeadTaintedCain.png",
        "HeadTaintedJudas": "/static/images/CharactersHeads/HeadTaintedJudas.png",
        "HeadTaintedBlueBaby": "/static/images/CharactersHeads/HeadTaintedBlueBaby.png",
        "HeadTaintedEve": "/static/images/CharactersHeads/HeadTaintedEve.png",
        "HeadTaintedSamson": "/static/images/CharactersHeads/HeadTaintedSamson.png",
        "HeadTaintedAzazel": "/static/images/CharactersHeads/HeadTaintedAzazel.png",
        "HeadTaintedLazarus": "/static/images/CharactersHeads/HeadTaintedLazarus.png",
        "HeadTaintedEden": "/static/images/CharactersHeads/HeadTaintedEden.png",
        "HeadTaintedLost": "/static/images/CharactersHeads/HeadTaintedLost.png",
        "HeadTaintedLilith": "/static/images/CharactersHeads/HeadTaintedLilith.png",
        "HeadTaintedKeeper": "/static/images/CharactersHeads/HeadTaintedKeeper.png",
        "HeadTaintedApollyon": "/static/images/CharactersHeads/HeadTaintedApollyon.png",
        "HeadTaintedForgotten": "/static/images/CharactersHeads/HeadTaintedForgotten.png",
        "HeadTaintedJacob": "/static/images/CharactersHeads/HeadTaintedJacob.png",
    }
const myAchievementsSection = document.getElementById("myAchievementsId");

/**
 * Permets de creer les cartes d'achievements
 */
function creerAchievementCards() {
    for (let perso in dicoTetePerso)
    {
        const card = document.createElement("div");
        card.classList.add("col-xl-3");
        card.classList.add("col-lg-4");
        card.classList.add("col-md-6");

        // Entête de la carte
        const icone = document.createElement("div");
        icone.classList.add("text-center");
        icone.classList.add("card-header")
        const image = document.createElement("img");
        image.src = dicoTetePerso[perso];
        image.classList.add("w-25");
        icone.append(image);
        card.append(icone);

        // Corps de la carte
        const cardBody = document.createElement("div");
        cardBody.classList.add("text-center");
        cardBody.classList.add("card-body");
        const sheetImg = document.createElement("img");
        sheetImg.src = "/static/images/AchievementSheet/CompletionSheet.png";
        sheetImg.classList.add("w-75");
        cardBody.append(sheetImg);
        card.append(cardBody);

        myAchievementsSection.append(card);
    }
}

async function initialisation() {

}

window.addEventListener('load', initialisation)
window.addEventListener('load', creerAchievementCards);