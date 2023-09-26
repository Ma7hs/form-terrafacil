const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const form = document.querySelector(".form");
let formStepsNum = 0;

function isValidCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf === '') return false;
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  let add = 0;
  for (let i = 0; i < 9; i++) {
    add += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;
  add = 0;
  for (let i = 0; i < 10; i++) {
    add += parseInt(cpf.charAt(i)) * (11 - i);
  }
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return false;
  return true;
}

function isValidCNPJ(cnpj) {
  
  const cnpjRegex = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}\-?\d{2}$/;

  if (!cnpjRegex.test(cnpj)) {
    return false;
  }

  cnpj = cnpj.replace(/[^\d]+/g, '');

  return true;
}


function validateDocument(documentValue) {
  const cleanDocument = documentValue.replace(/\D/g, '');

  if (cleanDocument.length === 11) {
    if (!isValidCPF(cleanDocument)) {
      alert("CPF inválido!");
      return false;
    }
  } else if (cleanDocument.length === 14) {
    console.log(cleanDocument)
    if (!isValidCNPJ(cleanDocument)) {
      alert("CNPJ inválido!");
      return false;
    }
  } else {
    alert("Documento inválido!");
    return false;
  }

  return true;
}

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentProgress = formSteps[formStepsNum];
    if (currentProgress.classList.contains("form-step-active")) {
      if (!validateCurrentProgress(currentProgress)) {
        return;
      }
    }
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

function validateCurrentProgress(currentProgress) {
  const inputsToValidate = currentProgress.querySelectorAll('input[type="text"]');
  const radiosToValidate = currentProgress.querySelectorAll('input[type="radio"]');
  const documentValue = document.getElementById("document_number").value;

  for (let i = 0; i < inputsToValidate.length; i++) {
    const input = inputsToValidate[i];
    const value = input.value;

    if (input.id === "email") {
      if (!isValidEmail(value)) {
        alert("E-mail inválido!");
        return false;
      }
    }
  }

  for (let i = 0; i < radiosToValidate.length; i++) {
    const radio = radiosToValidate[i];
    const name = radio.getAttribute("name");

    if (!document.querySelector(`input[name="${name}"]:checked`)) {
      alert("Selecione uma opção para " + name);
      return false;
    }
  }

  if (currentProgress.querySelector("#document_number")) {
    if (!validateDocument(documentValue)) {
      alert("Documento inválido!");
      return false;
    }
  }

  return true;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

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
  const documentValue = document.getElementById("document_number").value;
  const email = document.getElementById("email").value;
  const tipo_garantia = document.querySelector('input[name="radio-step-1"]:checked').value;
  const value = document.getElementById("value").value;
  const finalidade_credito = document.querySelector('input[name="radio-step-2"]:checked').value;
  const credit = document.getElementById("credit").value;

  if (validateCurrentProgress(formSteps[formStepsNum])) {
    const userData = `
      Nome: ${username}
      CPF/CNPJ: ${documentValue}
      Email: ${email}
      Tipo de Garantia: ${tipo_garantia}
      Valor da Garantia: ${value}
      Finalidade do crédito: ${finalidade_credito}
      Quantidade de Crédito: ${credit}
    `;

    alert(userData);
  }
});
