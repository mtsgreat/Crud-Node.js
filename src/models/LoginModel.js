const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require('bcryptjs');


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


  async login(){
    this.valida();
    if (this.errors.length > 0) return;

    this.user = await LoginModel.findOne({ email: this.body.email }) 

    if(!this.user) {
     this.errors.push('Usuário não existe');
     return;
    };

    if(!bcryptjs.compareSync(this.body.senha, this.user.senha)){
      this.errors.push('Senha inválida');
      this.user = null;
      return;
    }

}

  async register() {
    this.valida();
    
    if (this.errors.length > 0) return;

    //checando se já existe o mesmo usuário cadastrado
    this.userExists();


    if (this.errors.length > 0) return;

     //inserindo hash na senha
     const salt = bcryptjs.genSaltSync();
     this.body.senha = bcryptjs.hashSync(this.body.senha, salt);

   
      this.users = await LoginModel.create(this.body);
    

   
  }

  async userExists(){
   this.user = await LoginModel.findOne({ email: this.body.email })

   if(this.user) this.errors.push('Usuário já cadastrado na base de dados.')

   
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
