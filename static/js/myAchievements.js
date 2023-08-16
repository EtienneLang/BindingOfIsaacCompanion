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


async function afficherAchievements() {
    const completedAchievementsList = await get_all_completed_achievements();
    console.log(completedAchievementsList);
    const arrayTest = Array.isArray(completedAchievementsList);
    let i = 0;
    let content ="";
    let allAchievementsDone = false;
    const divCompletion = document.createElement("div");
    //Je devrais faire un switch ici, à faire plus tard
    for(let perso in dataAllAchievements){
        let allo = completedAchievementsList.length;
        let allo2 = [1,2,3];
        for(let i=0; i < completedAchievementsList; i++) {

            //Si on a tous les achievements, on sort de la boucle
            if(completedAchievementsList[i] === dataAllAchievements[perso]["AllAchievements"]) {
                content += "all achievements";
                allAchievementsDone = true;
                break;
            }
            else if(completedAchievementsList[i] === dataAllAchievements[perso]["Satan"]) {
                placeCompletionMark("Satan", divCompletion);
            }
            else if(completedAchievementsList[i] === dataAllAchievements[perso]["BlueBaby"]) {
                placeCompletionMark("BlueBaby", divCompletion);
            }
            else if(completedAchievementsList[i] === dataAllAchievements[perso]["BossRush"]) {
                placeCompletionMark("BossRush", divCompletion);
            }
            else if(completedAchievementsList[i] === dataAllAchievements[perso]["Isaac"]) {
                placeCompletionMark("Isaac", divCompletion);
            }
            else if(completedAchievementsList[i] === dataAllAchievements[perso]["TheLamb"]) {
                placeCompletionMark("TheLamb", divCompletion);
            }
            else if(completedAchievementsList[i] === dataAllAchievements[perso]["Heart"]) {
                placeCompletionMark("Heart", divCompletion);
            }
            else if(completedAchievementsList[i] === dataAllAchievements[perso]["Hush"]) {
                placeCompletionMark("Hush", divCompletion);
            }
            else if(completedAchievementsList[i] === dataAllAchievements[perso]["Greedier"]) {
                placeCompletionMark("Greedier", divCompletion);
            }
            else if (completedAchievementsList[i] === dataAllAchievements[perso]["MegaSatan"]) {
                placeCompletionMark("MegaSatan", divCompletion);
            }
            else if (completedAchievementsList[i] === dataAllAchievements[perso]["Delirium"]) {
                placeCompletionMark("Delirium", divCompletion);
            }
            else if (completedAchievementsList[i] === dataAllAchievements[perso]["Mother"]) {
                placeCompletionMark("Mother", divCompletion);
            }
            else if (completedAchievementsList[i] === dataAllAchievements[perso]["Beast"]) {
                placeCompletionMark("Beast", divCompletion);
            }
        }
    }

}

function placeCompletionMark(CharacterName, DivCompletion) {
    const img = document.createElement("img");
    img.src = `/static/images/AchievementSheet/Completion${CharacterName}.png`;
    DivCompletion.append(img);
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