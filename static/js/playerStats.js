"use strict";

const buttonMainStats = document.getElementById("main-stats");
const buttonCharactersStats = document.getElementById("characters-stats");
const buttonItemsStats = document.getElementById("items-stats");
const divStatsAchievements = document.getElementById("stats-achievements");
const vectMainProgression = [];

let controleur = null;

function gererClickMenu(event) {
    if (event.target.id === "main-stats") {
        buttonMainStats.classList.add("active");
        buttonCharactersStats.classList.remove("active");
        buttonItemsStats.classList.remove("active");
    }
    else if (event.target.id === "characters-stats") {
        buttonMainStats.classList.remove("active");
        buttonCharactersStats.classList.add("active");
        buttonItemsStats.classList.remove("active");
    }
    else if (event.target.id === "items-stats") {
        buttonMainStats.classList.remove("active");
        buttonCharactersStats.classList.remove("active");
        buttonItemsStats.classList.add("active");
    }
}

async function createDicoMainStats() {
    const dataMainProgressionNotDone = dataMainProgression;
    const allGameAchievements = await getAllGameAchievement();
    const completedAchievementsList = await get_all_completed_achievements();
    for (const achievement in dataMainProgression) {
        for (let i=0; i < completedAchievementsList.length; i++){
            if(achievement === completedAchievementsList[i]){
                delete dataMainProgressionNotDone[achievement];
                break;
            }
        }
    }
    for (const achievement in dataMainProgressionNotDone) {
        dataMainProgressionNotDone[achievement][2] = allGameAchievements["game"]["availableGameStats"]["achievements"][achievement-1]["icon"];
    }
    return dataMainProgressionNotDone
}

async function afficherMainProgressionNotDone() {
    const dataMainProgressionNotDone = await createDicoMainStats();
    for (const achievement in dataMainProgressionNotDone) {
        const div = document.createElement("div");
        div.classList.add("col-6");
        div.classList.add("col-md-4");
        div.classList.add("col-lg-3");
        div.classList.add("col-xl-2");
        div.classList.add("text-center");
        div.classList.add("mb-4");
        const img = document.createElement("img");
        img.classList.add("img-fluid");
        img.src = dataMainProgressionNotDone[achievement][2];
        const p = document.createElement("p");
        p.innerHTML = dataMainProgressionNotDone[achievement][0];
        div.append(img);
        div.append(p);
        divStatsAchievements.append(div);
    }
}
async function initialisation() {
    buttonMainStats.addEventListener('click', gererClickMenu);
    buttonCharactersStats.addEventListener('click', gererClickMenu);
    buttonItemsStats.addEventListener('click', gererClickMenu);
}

window.addEventListener('load', initialisation);
window.addEventListener('load', afficherMainProgressionNotDone);