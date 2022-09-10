import validator  from "validator";


export default class Contato {
    constructor(formClass){
        this.form = document.querySelector(formClass);
    }

    init(){
     this.events();
    }

    events(){
        if(!this.form) return;
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validade(e);
        })
    }

    validade(e){
        const el = e.target;
        const nomeInput = el.querySelector('input[name="nome"]');
        const emailInput = el.querySelector('input[name="email"]');
        const telefoneInput = el.querySelector('input[name="telefone"]');

        let error = false;

        if(!nomeInput.value) {
            let p = document.createElement('p')
            let errorMsg = 'O nome campo é obrigatorio';
            p.innerHTML = errorMsg;
            p.classList.add('text-danger');
            nomeInput.after(p);
            error = true;
        }

        if(!error) el.submit();

    }
};