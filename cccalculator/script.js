const output = document.getElementById("output");
const form = document.getElementById("calc_form");
const operand_btns = document.querySelectorAll("button[data-type=operand]");

let is_operator = false;
operand_btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    remove_active();
    if (output.value == "0") {
      output.value = e.target.value;
    } else if (is_operator) {
      is_operator = false;
      output.value = e.target.value;
    } else if (output.value.includes(".")) {
      output.value = output.value + "" + e.target.value.replace(".", "");
    } else {
      output.value = output.value + "" + e.target.value;
    }
  })
});

const operator_btns = document.querySelectorAll("button[data-type=operator]"); // Fixed the attribute selector here

let equation = [];
operator_btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    remove_active();
    e.currentTarget.classList.add("active");

    switch (e.target.value) {
      case "%":
        output.value = parseFloat(output.value) / 100;
        break;
      case "invert":
        output.value = parseFloat(output.value) * -1;
        break;
      case "=":
        equation.push(output.value);
        output.value = eval(equation.join(""));
        equation = [];
        break;
      default:
        let last_item = equation[equation.length - 1];
        if (["/", "*", "+", "-"].includes(last_item) && is_operator) {
          equation.pop();
          equation.push(e.target.value);
        } else {
          equation.push(output.value);
          equation.push(e.target.value);
        }
        is_operator = true;
        break;
    }
  });
});

const remove_active = () => {
  operator_btns.forEach((btn) => {
    btn.classList.remove("active");
  });
};







/*
<!DOCTYPE html>
<html>
<head>
  <title>Calculator</title>
</head>
<body>
  <div id="calculator">
    <input id="output" type="text" value="0">
    <form id="calc_form">
      <div id="buttons">
        <button class="operand" data-value="7">7</button>
        <button class="operand" data-value="8">8</button>
        <button class="operand" data-value="9">9</button>
        <button class="operator" data-value="/">/</button>
        <button class="operand" data-value="4">4</button>
        <button class="operand" data-value="5">5</button>
        <button class="operand" data-value="6">6</button>
        <button class="operator" data-value="*">*</button>
        <button class="operand" data-value="1">1</button>
        <button class="operand" data-value="2">2</button>
        <button class="operand" data-value="3">3</button>
        <button class="operator" data-value="-">-</button>
        <button class="operand" data-value="0">0</button>
        <button class="operand" data-value=".">.</button>
        <button class="operator" data-value="=">=</button>
        <button class="operator" data-value="+">+</button>
      </div>
    </form>
  </div>

  <script>
    const output = document.getElementById("output");
    const operandButtons = document.querySelectorAll(".operand");
    const operatorButtons = document.querySelectorAll(".operator");

    let currentOperand = "";
    let currentOperator = "";
    let result = 0;

    operandButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const value = e.target.getAttribute("data-value");

        if (currentOperator === "=") {
          output.value = value;
          result = parseFloat(value);
          currentOperator = "";
        } else {
          if (output.value === "0" || currentOperator === "=") {
            output.value = value;
          } else {
            output.value += value;
          }

          currentOperand += value;
        }
      });
    });

    operatorButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const value = e.target.getAttribute("data-value");

        if (currentOperand !== "") {
          if (currentOperator === "") {
            result = parseFloat(currentOperand);
          } else {
            result = performOperation(result, parseFloat(currentOperand), currentOperator);
          }

          currentOperand = "";
          currentOperator = value;

          if (value === "=") {
            output.value = result;
          } else {
            output.value = value;
          }
        }
      });
    });

    function performOperation(a, b, operator) {
      switch (operator) {
        case "+":
          return a + b;
        case "-":
          return a - b;
        case "*":
          return a * b;
        case "/":
          if (b === 0) {
            return "Error";
          }
          return a / b;
        default:
          return b;
      }
    }
  </script>
</body>
</html>
*/