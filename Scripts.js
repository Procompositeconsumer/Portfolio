const body = document.body;
const button = document.getElementById("glitchButton");
const background = document.querySelector(".background-glitch");

const BACKGROUND_DURATION = 10_000;
const SEVERE_GLITCH_DURATION = 650;
let vhsGlitchTimeout;
let backgroundPhaseTimeout;
let backgroundFlashTimeout;


// =========================================
// RANDOM VHS GLITCH
// =========================================

function triggerGlitch(duration = 150) {

    body.classList.add("vhs-glitching");

    clearTimeout(vhsGlitchTimeout);
    vhsGlitchTimeout = setTimeout(() => {
        body.classList.remove("vhs-glitching");

    }, duration);
}

function scheduleBackgroundFlash() {
    if (!background?.classList.contains("phase-one")) {
        return;
    }

    const delay = 1400 + Math.random() * 2200;
    backgroundFlashTimeout = setTimeout(() => {
        if (!background.classList.contains("phase-one")) {
            return;
        }

        const flash = Math.random() < 0.5 ? "flash-1" : "flash-2";
        background.classList.add(flash);

        setTimeout(() => {
            background.classList.remove(flash);
            scheduleBackgroundFlash();
        }, 900);
    }, delay);
}

function startBackgroundPhase(phase) {
    if (!background) {
        return;
    }

    clearTimeout(backgroundPhaseTimeout);
    clearTimeout(backgroundFlashTimeout);
    background.classList.remove(
        "phase-main",
        "phase-one",
        "severe-main",
        "severe-one",
        "flash-1",
        "flash-2"
    );
    background.classList.add(phase);

    if (phase === "phase-one") {
        scheduleBackgroundFlash();
    }

    backgroundPhaseTimeout = setTimeout(() => {
        const severeClass = phase === "phase-main" ? "severe-main" : "severe-one";
        background.classList.add(severeClass);

        setTimeout(() => {
            startBackgroundPhase(phase === "phase-main" ? "phase-one" : "phase-main");
        }, SEVERE_GLITCH_DURATION);
    }, BACKGROUND_DURATION);
}

if (background) {
    startBackgroundPhase("phase-main");
}


// =========================================
// RANDOM GLITCH LOOP
// =========================================

function randomGlitch() {

    // Random chance

    const chance = Math.random();


    // Only glitch sometimes

    if (chance > 0.65) {

        const duration =
            80 + Math.random() * 250;

        triggerGlitch(duration);

    }


    // Wait a random amount of time

    const nextGlitch =
        500 + Math.random() * 2500;


    setTimeout(randomGlitch, nextGlitch);
}


// Start the VHS

randomGlitch();



// MOUSE HOVER


if (button) {

    button.addEventListener("mouseenter", () => {

        triggerGlitch(180);

    });

}

// CLICK GLITCH


if (button) {

    button.addEventListener("click", () => {

        // Stronger glitch

        triggerGlitch(500);


        // You can put your page transition here

        setTimeout(() => {

            console.log("ENTER CLICKED");

        }, 500);

    });

}