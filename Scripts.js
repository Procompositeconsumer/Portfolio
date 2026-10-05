const body = document.body;
const button = document.getElementById("glitchButton");


// =========================================
// RANDOM VHS GLITCH
// =========================================

function triggerGlitch(duration = 150) {

    body.classList.add("glitching");

    setTimeout(() => {

        body.classList.remove("glitching");

    }, duration);
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


// =========================================
// MOUSE HOVER
// =========================================

button.addEventListener("mouseenter", () => {

    triggerGlitch(180);

});


// =========================================
// CLICK GLITCH
// =========================================

button.addEventListener("click", () => {

    // Stronger glitch

    triggerGlitch(500);


    // You can put your page transition here

    setTimeout(() => {

        console.log("ENTER CLICKED");

    }, 500);

});