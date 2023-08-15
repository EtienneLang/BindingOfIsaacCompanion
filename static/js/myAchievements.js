"use strict";

const myAchievementsSection = document.getElementById("myAchievementsId");
let controleur = null;
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
        cardBody.style = "background-image: url('/static/images/AchievementSheet/CompletionSheet.png'); " +
            "background-repeat: no-repeat; " +
            "background-position: center; " +
            "background-size:225px;";
        const sheetDiv = document.createElement("div");
        sheetDiv.style = "height: 250px; border-style: none;"
        sheetDiv.classList.add("w-75");
        cardBody.append(sheetDiv);
        card.append(cardBody);

        myAchievementsSection.append(card);
    }
}


function afficherAchievements() {
    const achievementsList = get_all_completed_achievements();
    let i = 0;
    let content ="";
    let allAchievementsDone = false;
    //Je devrais faire un switch ici, à faire plus tard
    for(let perso in dataAllAchievements){
        if(achievementsList[i] === dataAllAchievements[perso]["AllAchievements"]) {
            content += "all achievements";
            allAchievementsDone = true;
        }
        else if(achievementsList[i] === dataAllAchievements[perso]["Satan"]) {
            content += "satan";
        }
        else if(achievementsList[i] === dataAllAchievements[perso]["BlueBaby"]) {
            content += "blue baby";
        }
        else if(achievementsList[i] === dataAllAchievements[perso]["BossRush"]) {
            content += "boss rush";
        }
        else if(achievementsList[i] === dataAllAchievements[perso]["Isaac"]) {
            content += "isaac";
        }
        else if(achievementsList[i] === dataAllAchievements[perso]["TheLamb"]) {
            content += "the lamb";
        }
        else if(achievementsList[i] === dataAllAchievements[perso]["Heart"]) {
            content += "heart";
        }
        else if(achievementsList[i] === dataAllAchievements[perso]["Hush"]) {
            content += "hush";
        }
        else if(achievementsList[i] === dataAllAchievements[perso]["UltraGreedier"]) {
            content += "ultra greedier";
        }
        else if (achievementsList[i] === dataAllAchievements[perso]["MegaSatan"]) {
            content += "mega satan";
        }
        else if (achievementsList[i] === dataAllAchievements[perso]["Delirium"]) {
            content += "delirium";
        }
        else if (achievementsList[i] === dataAllAchievements[perso]["Mother"]) {
            content += "mother";
        }
        else if (achievementsList[i] === dataAllAchievements[perso]["Beast"]) {
            content += "beast";
        }
    }
}

function placeCompletionMark() {

}

function get_all_completed_achievements() {
    controleur = new AbortController()
    try {
        const achievements = envoyerRequeteAjax(
            "/api/MyAchievements/get_all_completed_achievements",
            "GET",
            null,
            controleur);

        return achievements;
    } catch (error) {
        console.log(error);
    }
}
async function initialisation() {

}

window.addEventListener('load', initialisation)
window.addEventListener('load', creerAchievementCards);
window.addEventListener('load', afficherAchievements);