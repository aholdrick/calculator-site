const screenDisplay = document.getElementById('screen');
const allButtons = document.querySelectorAll('class', '.buttons');
let formulaArray = [0];
let formulaArray2;

function operate() {  
    formulaArray2 = formulaArray.join("").split("+").join(",+,").split("-").join(",-,").split("/").join(",/,").split("*").join(",*,").split(",");
    function multiplyAndDivide() {
        for(i = 0; i < formulaArray2.length; i++) {
            if(formulaArray2[i] == '*') {
                result = formulaArray2[i-1]*formulaArray2[i+1];
                formulaArray2.splice(i-1, 3, result);
                i = 0;
            } else if(formulaArray2[i] == "/" && formulaArray2[i+1] === '0') {          
                screenDisplay.textContent = "ERROR";
                return                                                                  
            } else if(formulaArray2[i] == "/") {                                        
                result = formulaArray2[i-1] / formulaArray2[i+1];
                formulaArray2.splice(i-1, 3, result);
                i = 0;
            }
        }
    }
    function addAndSubtract() {
        for(i = 0; i < formulaArray2.length; i++) {
            if(formulaArray2[i] == '+') {
                result = Number(formulaArray2[i-1]) + Number(formulaArray2[i+1]);
                formulaArray2.splice(i-1, 3, result);                                  
                i = 0;
            } else if (formulaArray2[i] == '-') {
                result = formulaArray2[i-1] - formulaArray2[i+1];
                formulaArray2.splice(i-1, 3, result);
                i = 0;
            }
        }
    }
    if(formulaArray2.length > 9) {
        formulaArray2.length = 9;
    }
    if(formulaArray2.includes('*') || formulaArray2.includes('/')) {
        multiplyAndDivide();
        if(screenDisplay.textContent != "ERROR") {
            screenDisplay.textContent = `${formulaArray2.join("")}`; 
        }
    }
    if(formulaArray2.includes('+') || formulaArray2.includes('-')) {
        addAndSubtract();
        if(screenDisplay.textContent != "ERROR") {
            screenDisplay.textContent = `${formulaArray2.join("")}`; 
        }
    }
    formulaArray.length = 0;
    formulaArray.push(0);
} 
function inputToDisplay(value) {
    if(formulaArray.length > 10) {
        return;
    }
    if(screenDisplay.textContent == "ERROR") {
        clearDisplay();
    }
    if(value == 0) {
        if(formulaArray.length == 1 && formulaArray[0] == 0) {       
            return;                                             
        } else {                                                  
            formulaArray.push(value)          
            screenDisplay.textContent = `${formulaArray.join("")}`                  
        }
        return;
    } else if(value == '.') {
        if(formulaArray.includes('.', 0)) {
            return;
        } else {                                                
            formulaArray.push(value);
            screenDisplay.textContent = `${formulaArray.join("")}`
        }
        return
    } else if(value == '+' || value == '-' || value == '*' || value == '/') {
        
        let i = formulaArray.length-1;
            if(value == '+' && formulaArray.length == 1 && formulaArray[0] == 0|| value == '-' && formulaArray.length == 1 && formulaArray[0] == 0) {
                return;
            } else if(typeof formulaArray[i] != 'number'){
                formulaArray.pop();
                formulaArray.push(value);           
                screenDisplay.textContent = `${formulaArray.join("")}`      
            } else {                                                       
                formulaArray.push(value);
                screenDisplay.textContent = `${formulaArray.join("")}`
            }
        return;                                                      
    }else if(formulaArray.length === 1 && formulaArray[0] == 0) {     
        formulaArray.splice(0, 1);                                             
        formulaArray.push(value)          
        screenDisplay.textContent = `${formulaArray.join("")}`                  
    } 
    else {
        formulaArray.push(value);
        screenDisplay.textContent = `${formulaArray.join("")}`
    }
}   

function clearDisplay() {
    formulaArray.length = 0;
    formulaArray.push(0);
    screenDisplay.textContent = `${formulaArray.join("")}`;
}
function clearEntry() {
    if(formulaArray.length == 1) {
        formulaArray.pop();
        formulaArray.push(0);
    } else {
        formulaArray.pop();
    }
    screenDisplay.textContent = `${formulaArray.join("")}`;
}
window.addEventListener('keypress', function(e) {
    let numberCheck = "0 1 2 3 4 5 6 7 8 9 + - / * . Enter";
    if(numberCheck.includes(e.key)) {
        if(e.key == "Enter") {
            operate();
        } else if(e.key == "+" || e.key == "-" || e.key == "/" || e.key == "*" || e.key == ".") {
            inputToDisplay(e.key);
        } else {
            inputToDisplay(Number(e.key));
        }
    } else {
        return;
    }
})