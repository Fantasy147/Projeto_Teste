function pressKey(num) {
    const screen = document.getElementById("screen");
    if (screen.innerText === "Digite...") {
        screen.innerText = num;
    } else {
        screen.innerText += num;
    }
}
function clearScreen() {
    document.getElementById("screen").innerText = "Digite...";
}
function callNumber() {
    const number = document.getElementById("screen").innerText;
    if (number === "Digite..." || number.trim() === "") {
        alert("Digite um número antes de ligar!");
    } else {
        alert(`Ligando para ${number}... 📞`);
    }
}
