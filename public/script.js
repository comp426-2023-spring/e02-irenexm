// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver

function showOptions() {
    shots = document.querySelector("#shot-options");
    if (document.getElementById("opponent").checked) {
        shots.className = "active";
    } else {
        shots.className = "inactive";
    }
}

function showRpsls() {
    let rpsShots = document.getElementsByName("rps-shot");
    rpsShots.forEach(rpsShot => {
        rpsShot.className = "active";
    })

    let rpslsShots = document.getElementsByName("rpsls-shot");
    if (document.getElementById("rpsls").checked) {
        rpslsShots.forEach(rpslsShot => {
            rpslsShot.className = "active";
        })
    } else {
        rpslsShots.forEach(rpslsShot => {
            rpslsShot.className = "inactive";
        })
    }
}

    

    
async function playGame() {
    const opponent = document.getElementById("opponent").checked;
    const mode = document.getElementById("rps").checked ? "rps" : "rpsls";
    
    document.querySelector("#mode-options").className = "inactive";
    document.querySelector("#shot-options").className = "inactive";
    document.querySelector("#game-output").className = "active";
    document.querySelector("#play-button").className = "inactive";

    let shot = "";
    if (opponent) {
        shot = document.querySelector('input[type="radio"][name*="-shot"]:checked').value;
    }

    const url = `/app/${mode}/play/${shot}`;;
    console.log(url);

    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result)

        const outputText = document.querySelector("#game-output")
        if (opponent) {
            outputText.innerHTML = `<p>you picked: ${result.player}</p>
            <p>your opponent picked: ${result.opponent}</p>
            <p>result: ${result.result}</p>`
        } else {
            outputText.innerHTML = `<p>you got ${result.player}!</p>`
        }
    } catch (error) {
        console.error("Error fetching game result:", error);
        alert("Error fetching game result. Please try again later.");
    }

}

function resetGame() {
    document.querySelector("#mode-options").className = "active";
    document.querySelector("#shot-options").className = "inactive";
    document.querySelector("#game-output").className = "inactive";
    document.querySelector("#play-button").className = "active";

    document.getElementById("rps").checked = true;
    document.getElementById("rpsls").checked = false;
    document.getElementById("opponent").checked = false;
    document.getElementById("rock").checked = false;
    document.getElementById("paper").checked = false;
    document.getElementById("scissors").checked = false;
    document.getElementById("lizard").checked = false;
    document.getElementById("spock").checked = false;
}
