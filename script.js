const displayElem = document.querySelector(".display");
const btnElems = document.querySelectorAll(".btn");
const audio = new Audio("./prank.wav")

let strToDisplay = "";
const operators = ["+", "-", "*", "/", "%"];
let lastOperator = "";
// console.log(btnElems);

const display = (str) => {
    displayElem.innerText = str || "0.00";
};

const randomNumber = () => {
    return Math.round(Math.random()*10) + 1;
}
const getTotal = () => {
    const random = randomNumber();
    const lastChar = strToDisplay.slice(-1);
    if(operators.includes(lastChar)) {
        // remove the last char operator
        strToDisplay = strToDisplay.slice(0, -1)
    }
    // Eval will always give a number a back, converting number to string
    let totalNumber = eval(strToDisplay);
    // Prank Case
    if (random < 4) {
        displayElem.classList.add("prank");
        audio.play();
        totalNumber += random;
    }
    strToDisplay = totalNumber.toString();
    return display(strToDisplay);
}

btnElems.forEach((btn) => {
    btn.addEventListener("click", () => {
        const value = btn.innerText;
        displayElem?.classList.remove("prank");
        // clear screen
        // Add logic
        // AC should clear the display

        if(value === "AC") {
            strToDisplay = "";
            return display(strToDisplay);

            
        }

        // get total

        if(value === "=") {
            return getTotal();
        }

        // Define all the problems, negative secenarios
        // solve the problem one at a time

        // C should remove the char

        if(value === "C") {
            strToDisplay = strToDisplay.slice(0, -1);
            return display(strToDisplay);
        }

        // If operators is pressed in the begining

        if (operators.includes(value) && strToDisplay.length === 0) {
            return;

        }

        // Operator conditions
        if(operators.includes(value)) {
            lastOperator = value;
            const lastChar = strToDisplay.slice(-1);
            if (operators.includes(lastChar)) {
                return;
            }
            if (lastChar === ".") {
                strToDisplay += "0";
            }
        }

        // "." conditions

        if (value === ".") {
            // if anyone pressed . in the begining
            if(strToDisplay === "") {
                strToDisplay += "0."
                return display(strToDisplay);
            }
            // if anyone pressed "." multiple times in a row
            const lastChar = strToDisplay.slice(-1);
            if(lastChar === ".") {
                return;
            }
            // Do not allow ".", if there is already "." string

            if (!lastOperator) {
                if (strToDisplay.includes(".")) {
                    return;
                }
            }
            const lastOperatorIndex = strToDisplay.lastIndexOf(lastOperator);
            const lastNumberSet = strToDisplay.slice(lastOperatorIndex);
            if(lastNumberSet.includes(".")) {
                return;
            }
        }
        strToDisplay += value;
        display(strToDisplay);

        // if some click on something then do something.
    });
});

