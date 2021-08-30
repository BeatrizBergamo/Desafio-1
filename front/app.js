function app() {
  const button = document.querySelector(".submit");
  
  button.addEventListener("click", handleSubmit)

}

function handleSubmit() {
  const name = document.querySelector(".nome input").value
  const job = document.querySelector(".cargo input").value
  const day = document.querySelector(".dia").value
  const month = document.querySelector(".data-nascimento select").value
  const year = document.querySelector(".ano").value
  const maritalStatus = document.querySelector(".estado-civil select").value
  const gender = document.querySelector(".genero select").value
  const street = document.querySelector(".rua input").value
  const streetNumber = document.querySelector(".numero input").value
  const complement = document.querySelector(".complemento input").value
  const neighborhood = document.querySelector(".bairro input").value
  const city = document.querySelector(".cidade input").value
  const state = document.querySelector(".estado input").value
  const cep = document.querySelector(".cep input").value
  const celphone = document.querySelector(".celular input").value
  const telphone = document.querySelector(".telefone input").value
  const email = document.querySelector(".email input").value
  const rg = document.querySelector(".identidade input").value
  const cpf = document.querySelector(".CPF input").value
  const vehicle = document.querySelector(".veiculo select").value
  const licence = document.querySelector(".habilitacao select").value

  const validName = isNotNull(name)
  const validStreet = isNotNull(street)
  const validNeighborhood = isNotNull(neighborhood)
  const validNumber = isNotNull(streetNumber)
  const validCity = isNotNull(city)
  const validState = isNotNull(state)
  const validJob = isNotNull(job)

  const validCelphoneNumber = validateCelphoneNumber(telphone)
  const validTelphoneNumber = validateTelphoneNumber(celphone)

  const validCpf = validateCpf(cpf)
  const validRg = validateRg(rg)

  const validZipCode = validateCep(cep)

  const validEmail = validateEmail(email)
  const validBirthDate = validateBirthDate(day, month, year)

  if (validBirthDate && validEmail && validZipCode && validCelphoneNumber && validCpf && validRg && validTelphoneNumber && validJob && validState && validCity && validNumber && validNeighborhood && validStreet && validName) {
  const body = {
    name,
    email,
    cpf,
    rg,
    birthDate: `${day}-${month}-${year}`,
    telphone,
    celphone,
    vehicle: vehicle === "Sim",
    licence: licence === "Sim",
    maritalStatus: maritalStatus !== "" ? maritalStatus : null,
    gender: gender !== "" ? gender : null,
    job,
    address: {
      cep,
      street,
      city,
      neighborhood,
      complement,
      streetNumber,
      state,
    }
  }
  axios.post('http://localhost:4000/cadastro', { body }).then(() => alert('Cadastro realizado com sucesso')).catch(console.error);
  } else {
    alert(`Os campos são inválidos. Verificar preenchimento.`)
  }
}

function isNotNull(input) {
  return input !== "" && input !== null && input !== undefined;
}

function validateCelphoneNumber(phone) {
  console.log(phone)
  if(isNotNull(phone)) {
    return phone.length === 13 
      && phone.split(" ")[0].length === 2
      && phone.split(" ")[1].length === 10 
      && phone.split(" ")[1].split("-")[0].length === 5 
      && phone.split(" ")[1].split("-")[0].length === 4;
  }
}

function validateTelphoneNumber(phone) {
  if(isNotNull(phone)) {
    return phone.length === 12
      && phone.split(" ")[0].length === 2
      && phone.split(" ")[1].length === 9 
      && phone.split(" ")[1].split("-")[0].length === 4 
      && phone.split(" ")[1].split("-")[0].length === 4;
  }
}

function validateCpf(cpf) {
  return isNotNull(cpf) && cpf.length === 11;
}

function validateRg(rg) {
  return isNotNull(rg) && rg.length === 9;
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const mapMonth = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
function validateBirthDate(day, month, year) {
  var dateReg = /^\d{2}([./-])\d{2}\1\d{4}$/
  let monthNumber = mapMonth.map((m, index) => {
    if (m === month) {
      return index + 1;
    } else {
      return;
    }
  }).filter((number) => {if (number) { return number }})[0];

  monthNumber = monthNumber < 10 ? '0' + monthNumber : monthNumber;
  day = day < 10 ? '0' + day : day;

  const birthDate = `${day}-${monthNumber}-${year}`;

  return dateReg.test(birthDate);
}

function validateCep(cep) {
  return cep.length === 8;
}

app()