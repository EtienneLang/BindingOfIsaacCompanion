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
            "background-size:300px;";
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
        divCompletion.classList.add("col-md-7");
        divCompletion.classList.add("col-6");

        divCompletion.style = "margin-right : 20px"

        for (let i = 0; i < 11; i++) {
            let caseIcone = document.createElement("div");
            caseIcone.classList.add("col-4");
            caseIcone.classList.add("text-center");
            divCompletion.append(caseIcone);
        }
        let idCard = document.getElementById(`CompletionSheet_${iteration}`);
        let idDelirium = document.getElementById(`CompletionSheet_Delirium${iteration}`);
        let satanBeaten = false;
        let isaacBeaten = false;
        let heartBeaten = false;
        for(let i=0; i < completedAchievementsList.length; i++) {
            //Si on a tous les achievements, on sort de la boucle
            if(completedAchievementsList[i] === dataAllAchievements[perso]["Satan"]) {
                placeCompletionMark("Satan", divCompletion.children[1]);
                satanBeaten = true;
            }
            if(completedAchievementsList[i] === dataAllAchievements[perso]["BlueBaby"]) {
                placeCompletionMark("BlueBaby", divCompletion.children[4]);
            }
            if(completedAchievementsList[i] === dataAllAchievements[perso]["BossRush"]) {
                placeCompletionMark("BossRush", divCompletion.children[3]);
            }
            if(completedAchievementsList[i] === dataAllAchievements[perso]["Isaac"]) {
                placeCompletionMark("Isaac", divCompletion.children[2]);
                isaacBeaten = true;
            }
            if(completedAchievementsList[i] === dataAllAchievements[perso]["TheLamb"]) {
                placeCompletionMark("TheLamb", divCompletion.children[5]);
            }
            if((isaacBeaten || satanBeaten) && heartBeaten === false) {
                heartBeaten = true;
                placeCompletionMark("Heart", divCompletion.children[0]);
            }
            if(completedAchievementsList[i] === dataAllAchievements[perso]["Hush"]) {
                placeCompletionMark("Hush", divCompletion.children[6]);
            }
            if(completedAchievementsList[i] === dataAllAchievements[perso]["Greedier"]) {
                placeCompletionMark("Greedier", divCompletion.children[7]);
            }
            if (completedAchievementsList[i] === dataAllAchievements[perso]["MegaSatan"]) {
                placeCompletionMark("MegaSatan", divCompletion.children[8]);
            }
            if (completedAchievementsList[i] === dataAllAchievements[perso]["Mother"]) {
                placeCompletionMark("Mother", divCompletion.children[9]);
            }
            if (completedAchievementsList[i] === dataAllAchievements[perso]["Beast"]) {
                placeCompletionMark("Beast", divCompletion.children[10]);
            }
            if (completedAchievementsList[i] === dataAllAchievements[perso]["Delirium"]) {
                 idDelirium.style = "background-image: url('/static/images/AchievementSheet/CompletionSheetDelirium.png'); " +
                "background-repeat: no-repeat; " +
                "background-position: center; " +
                "background-size:300px;";
            }
        }
        idCard.append(divCompletion);
        iteration++;
        isaacBeaten = false;
        satanBeaten = false;
        heartBeaten = false;
    }

}

function placeCompletionMark(CharacterName, caseAppend) {
    const img = document.createElement("img");
    img.src = `/static/images/AchievementSheet/Completion${CharacterName}.png`;
    caseAppend.append(img);
}

async function initialisation() {

}

window.addEventListener('load', initialisation)
window.addEventListener('load', creerAchievementCards);
window.addEventListener('load', afficherAchievements);