"use strict";

const myAchievementsSection = document.getElementById("myAchievementsId");
let controleur = null;
/**
 * Permets de creer les cartes d'achievements
 */
function creerAchievementCards() {
    let i = 0;
    for (let perso in dicoTetePerso)
    {
        const card = document.createElement("div");
        card.classList.add("col-lg-4");
        card.classList.add("col-md-6");

        // Entête de la carte
        const icone = document.createElement("div");
        icone.classList.add("text-center");
        const image = document.createElement("img");
        image.src = dicoTetePerso[perso];
        image.classList.add("w-25");
        icone.append(image);
        card.append(icone);

        // Corps de la carte
        const cardBody = document.createElement("div");
        cardBody.classList.add("p-4");
        cardBody.classList.add("row");
        cardBody.classList.add("justify-content-center");
        cardBody.classList.add("align-items-center");
        cardBody.id = `CompletionSheet_Delirium${i}`;

        cardBody.style = "background-image: url('/static/images/AchievementSheet/CompletionSheet.png'); " +
            "background-repeat: no-repeat; " +
            "background-position: center; " +
            "background-size:250px;";
        const sheetDiv = document.createElement("div");
        sheetDiv.style = "height: 250px; border-style: none;"
        sheetDiv.id = `CompletionSheet_${i}`;
        sheetDiv.classList.add("d-flex");
        sheetDiv.classList.add("align-items-center");
        sheetDiv.classList.add("justify-content-center");
        cardBody.append(sheetDiv);
        card.append(cardBody);
        myAchievementsSection.append(card);
        i++;
    }
}


async function afficherAchievements() {
    const completedAchievementsList = await get_all_completed_achievements();

    //Je devrais faire un switch ici, à faire plus tard
    let iteration = 0;
    for(let perso in dataAllAchievements){
        const divCompletion = document.createElement("div");
        divCompletion.classList.add("row");
        divCompletion.classList.add("justify-content-center");
        divCompletion.classList.add("align-items-center");
        divCompletion.classList.add("col-xl-6");
        divCompletion.classList.add("col-lg-9");
        divCompletion.classList.add("col-md-7");
        divCompletion.classList.add("col-5");
        let idCard = document.getElementById(`CompletionSheet_${iteration}`);
        let idDelirium = document.getElementById(`CompletionSheet_Delirium${iteration}`);
        let satanBeaten = false;
        let isaacBeaten = false;
        let heartBeaten = false;
        for(let i=0; i < completedAchievementsList.length; i++) {
            //Si on a tous les achievements, on sort de la boucle
            // if(completedAchievementsList[i] === dataAllAchievements[perso]["AllAchievements"]) {
            //     break;
            // }
            if(completedAchievementsList[i] === dataAllAchievements[perso]["Satan"]) {
                placeCompletionMark("Satan", divCompletion);
                satanBeaten = true;
            }
            if(completedAchievementsList[i] === dataAllAchievements[perso]["BlueBaby"]) {
                placeCompletionMark("BlueBaby", divCompletion);
            }
            if(completedAchievementsList[i] === dataAllAchievements[perso]["BossRush"]) {
                placeCompletionMark("BossRush", divCompletion);
            }
            if(completedAchievementsList[i] === dataAllAchievements[perso]["Isaac"]) {
                placeCompletionMark("Isaac", divCompletion);
                isaacBeaten = true;
            }
            if(completedAchievementsList[i] === dataAllAchievements[perso]["TheLamb"]) {
                placeCompletionMark("TheLamb", divCompletion);
            }
            if((isaacBeaten || satanBeaten) && heartBeaten === false) {
                heartBeaten = true;
                placeCompletionMark("Heart", divCompletion);
            }
            if(completedAchievementsList[i] === dataAllAchievements[perso]["Hush"]) {
                placeCompletionMark("Hush", divCompletion);
            }
            if(completedAchievementsList[i] === dataAllAchievements[perso]["Greedier"]) {
                placeCompletionMark("Greedier", divCompletion);
            }
            if (completedAchievementsList[i] === dataAllAchievements[perso]["MegaSatan"]) {
                placeCompletionMark("MegaSatan", divCompletion);
            }
            if (completedAchievementsList[i] === dataAllAchievements[perso]["Mother"]) {
                placeCompletionMark("Mother", divCompletion);
            }
            if (completedAchievementsList[i] === dataAllAchievements[perso]["Beast"]) {
                placeCompletionMark("Beast", divCompletion);
            }
            if (completedAchievementsList[i] === dataAllAchievements[perso]["Delirium"]) {
                 idDelirium.style = "background-image: url('/static/images/AchievementSheet/CompletionSheetDelirium.png'); " +
                "background-repeat: no-repeat; " +
                "background-position: center; " +
                "background-size:250px;";
            }
        }
        idCard.append(divCompletion);
        iteration++;
        isaacBeaten = false;
        satanBeaten = false;
        heartBeaten = false;
    }

}

function placeCompletionMark(CharacterName, DivCompletion) {
    const img = document.createElement("img");
    img.src = `/static/images/AchievementSheet/Completion${CharacterName}.png`;
    img.classList.add("col-4");
    img.classList.add("h-100");
    DivCompletion.append(img);
}

async function initialisation() {

}

window.addEventListener('load', initialisation)
window.addEventListener('load', creerAchievementCards);
window.addEventListener('load', afficherAchievements);