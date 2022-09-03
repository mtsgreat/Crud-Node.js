const mongoose = require("mongoose");
const validator = require("validator");
const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  senha: { type: String, required: true },
});

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.users = null;
  }

  async register() {
    this.valida();
    
    if (this.errors.length > 0) return;

    try {
      this.users = await LoginModel.create(this.body);
    } catch (error) {
      console.log(error);
    }
  }

  valida() {
    this.cleanUp();

    // Email precisa ser válido
    if (!validator.isEmail(this.body.email)) {
      this.errors.push("Email inválido");
    }

    // Senha precisa ter entre 3 e 50 caracteres
    if (this.body.senha.length < 3 || this.body.senha > 50) {
      this.errors.push("A senha precisa ter entre 3 e 50 caracteres.");
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      email: this.body.email,
      senha: this.body.senha,
    };
  }
}

module.exports = Login;
