const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const form = document.querySelector(".form");


let formStepsNum = 0;

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
  });
});

function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active");
  });

  formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressbar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < formStepsNum + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });

  const progressActive = document.querySelectorAll(".progress-step-active");

  progress.style.width =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}


form.addEventListener("submit", function (e) {
  e.preventDefault(); 

  const username = document.getElementById("username").value;
  const documentValue = document.getElementById("document").value;
  const email = document.getElementById("email").value;
  const tipo_garantia = document.querySelector('input[name="radio-step-1"]:checked').value;
  const value = document.getElementById("value").value;
  const finalidade_credito = document.querySelector('input[name="radio-step-2"]:checked').value;
  const credit = document.getElementById("credit").value;

  const userData = `
    Nome: ${username}
    CPF: ${documentValue}
    Email: ${email}
    Tipo de Garantia: ${tipo_garantia}
    Valor da Garantia: ${value}
    Finalizade do crédito: ${finalidade_credito}
    Quantidade de Crédito: ${credit}
  `;

  alert(userData);
});


