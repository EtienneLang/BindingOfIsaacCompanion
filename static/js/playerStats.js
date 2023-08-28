"use strict";

const buttonMainStats = document.getElementById("main-stats");
const buttonCharactersStats = document.getElementById("characters-stats");
const buttonItemsStats = document.getElementById("items-stats");
const divStatsAchievements = document.getElementById("stats-achievements");
const divNextAchievement = document.getElementById("next-unlock");

let controleur = null;

async function gererClickMenu(event) {
    divStatsAchievements.innerHTML = "";
    if (event.target.id === "main-stats") {
        await afficherMainProgressionNotDone();
    }
    else if (event.target.id === "characters-stats") {
        await afficherCharactersProgressionNotDone();
    }
    else if (event.target.id === "items-stats") {
        await afficherGoodItemsProgressionNotDone();
    }
}


async function createDicoStats(dataProgression) {
    //Load à partir de la session, va falloir faire un truc pour que quand on met le steam
    //id dans la barre de recherche, ça mette à jour la session
    const dataMainProgressionNotDone = dataProgression;
    const allGameAchievements = await getAllGameAchievement();
    const completedAchievementsList = await get_all_completed_achievements();
    for (const achievement in dataProgression) {
        for (let i = 0; i < completedAchievementsList.length; i++) {
            if (achievement === completedAchievementsList[i]) {
                delete dataMainProgressionNotDone[achievement];
                break;
            }
        }
    }
    for (const achievement in dataMainProgressionNotDone) {
        for (let i in allGameAchievements["game"]["availableGameStats"]["achievements"]) {
            if (achievement === allGameAchievements["game"]["availableGameStats"]["achievements"][i]["name"]){
                dataMainProgressionNotDone[achievement][2] = allGameAchievements["game"]["availableGameStats"]["achievements"][i]["icon"];
            }
        }

    }
    return dataMainProgressionNotDone;
}
// On peut faire juste une fonction qui prend en paramètre le dico à afficher
async function afficherMainProgressionNotDone() {
    const dataMainProgressionNotDone = await createDicoStats(dataMainProgression);
    afficherCardsAchievementProgression(dataMainProgressionNotDone);
}
async function afficherCharactersProgressionNotDone() {
        const dataCharactersProgressionNotDone = await createDicoStats(dataCharactersProgression);
        afficherCardsAchievementProgression(dataCharactersProgressionNotDone);
}

async function afficherGoodItemsProgressionNotDone() {
    const dataGoodItemsProgressionNotDone = await createDicoStats(dataGoodItemsProgression);
    afficherCardsAchievementProgression(dataGoodItemsProgressionNotDone);

}


//NE MARCHE PAS, A REGLER
async function afficherNextAchievement() {
    const dataMainProgressionNotDone = await createDicoStats(dataMainProgression);
    const div1 = document.createElement("div");
    div1.classList.add("rounded-2")
    div1.classList.add("cardAchievement");
    div1.classList.add("card");
    div1.classList.add("text-white");
    div1.classList.add("bg-primary");
    div1.classList.add("m-3");
    div1.classList.add("text-center");
    const div2 = document.createElement("div");
    const pTitle = document.createElement("p");
    pTitle.innerHTML = dataMainProgressionNotDone[0][1];
    div2.append(pTitle);
    div2.classList.add("card-header");
    div1.append(div2);
    const div3 = document.createElement("div");
    div3.classList.add("card-body");
    const img = document.createElement("img");
    img.classList.add("rounded-3");
    img.classList.add("img-fluid");
    img.src = dataMainProgressionNotDone[0][2];
    const p = document.createElement("p");
    p.classList.add("mt-2");
    p.innerHTML = dataMainProgressionNotDone[0][0];
    const pHref = document.createElement("a");
    pHref.href = window.href + "/api/guide";
    pHref.innerHTML = "How?";
    div3.append(img);
    div3.append(p);
    div3.append(pHref);
    div1.append(div3);
    divNextAchievement.append(div1);
}

function afficherCardsAchievementProgression(dataProgression) {
    if (Object.entries(dataProgression).length === 0) {
        const div = document.createElement("div");
        div.classList.add("text-center");
        const h3 = document.createElement("h3");
        h3.innerHTML = "You have completed all of the achievements of this category, nice job!";
        const img = document.createElement("img");
        img.src="/static/images/isaacDanceFiles.gif";
        div.append(h3);
        div.append(img);
        divStatsAchievements.append(div);
        return;
    }
    if (dataProgression === dataMainProgression) {
        let h5 = document.createElement("h5");
        h5.classList.add("text-center");
        h5.classList.add("w-75");
        h5.innerHTML = "Here, you will see all the achievements you need to unlock all of the areas and complete the main game content."
        divStatsAchievements.append(h5);
    }
    else if (dataProgression === dataCharactersProgression) {
        let h5 = document.createElement("h5");
        h5.classList.add("text-center");
        h5.classList.add("w-75");
        h5.innerHTML = "Here, you will see all the achievements you need to unlock all of the characters. " +
            "When you have to unlock one with a specific character, you will see the character's name in the achievement's description."
        divStatsAchievements.append(h5);
    }
    else if (dataProgression === dataGoodItemsProgression) {
    let h5 = document.createElement("h5");
    h5.classList.add("text-center");
    h5.classList.add("w-75");
    h5.innerHTML = "Here, you will see all the achievements you need to unlock all of the good items in the game."
    divStatsAchievements.append(h5);
    }
    for (const achievement in dataProgression) {

        const div1 = document.createElement("div");
        div1.classList.add("rounded-2")
        div1.classList.add("col-xl-3");
        div1.classList.add("col-lg-4");
        div1.classList.add("col-md-6");
        div1.classList.add("col-6");
        div1.classList.add("cardAchievement");
        div1.classList.add("card");
        div1.classList.add("text-white");
        div1.classList.add("bg-primary");
        div1.classList.add("m-3");
        div1.classList.add("text-center");
        const div2 = document.createElement("div");
        const pTitle = document.createElement("p");
        pTitle.innerHTML = dataProgression[achievement][1];
        div2.append(pTitle);
        div2.classList.add("card-header");
        div1.append(div2);
        const div3 = document.createElement("div");
        div3.classList.add("card-body");
        const img = document.createElement("img");
        img.classList.add("rounded-3");
        img.classList.add("img-fluid");
        img.alt = "Achievement icon" + dataProgression[achievement][1];
        img.src = dataProgression[achievement][2];
        const p = document.createElement("p");
        p.classList.add("mt-2");
        p.innerHTML = dataProgression[achievement][0];
        const pHref = document.createElement("a");
        //On doit faire une condition selon le type de l'achievement, le how ne va pas toujours etre la
        div3.append(img);
        div3.append(p);
        div3.append(pHref);
        div1.append(div3);
        divStatsAchievements.append(div1);
    }
}
async function initialisation() {
    buttonMainStats.addEventListener('click', gererClickMenu);
    buttonCharactersStats.addEventListener('click', gererClickMenu);
    buttonItemsStats.addEventListener('click', gererClickMenu);
}

window.addEventListener('load', initialisation);
window.addEventListener('load', afficherNextAchievement)