import validator from "validator";

export default class Login {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validade(e);
    });
  }

  validade(e) {
    const el = e.target;
    const emailInput = el.querySelector('input[name="email"]');
    const senhalInput = el.querySelector('input[name="senha"]');

    let error = false;

    if (!validator.isEmail(emailInput.value)) {
      let p = document.createElement("p");
      let errorMsg = "Email inválido";
      p.innerHTML = errorMsg;
      p.classList.add("text-danger");
      emailInput.after(p);
      error = true;
    }

    if (senhalInput.value.length < 3 || senhalInput.value.length > 50) {
      let p = document.createElement("p");
      let errorMsg = "Senha precisa ter entre 3 e 50 caracteres";
      p.innerHTML = errorMsg;
      p.classList.add("text-danger");
      senhalInput.after(p);
      error = true;
    }

    if (!error) el.submit();

  }
}
