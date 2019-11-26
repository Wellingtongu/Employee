import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public message_required = "Campo obrigatório";

    public dado_usuario = new DadosUsuarioRh;
    Form: FormGroup;

    constructor(private router: Router,
        private Http: Http,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.FormLogin();
     }

    onLogin(dado) {
        // alert(dado.usuario + ' ====== ' + dado.senha)
        this.Http.get("https://localhost:44358/api/tbl_rh/Gettbl_rh")
            .subscribe(
                data => {
                    const response = (data as any);
                    const resposta = JSON.parse(response._body);
                    // this.dado_usuario = resposta;
                  for (let index = 0; index < resposta.length; index++) {
                      const element = resposta[index];
                    //   alert(element.usuario)
                    if(dado.usuario === element.usuario && dado.senha === element.senha){
                        // alert('SUCESSO => ' + dado.usuario +' == ' + element.usuario +' == ' + dado.senha +' == ' + element.senha)
                    this.router.navigate(['/dashboard']);
                    }
                  }
                    alert(this.dado_usuario[0].usuario)
                    console.log('resposta', resposta);
                }, error => {
                    console.log(error);
                }

            )



        // localStorage.setItem('isLoggedin', 'true');
        // this.router.navigate(['/dashboard']);
    }


    FormLogin() {
        // demo message to show
        this.Form = this.fb.group({
            usuario: ['', Validators.required],
            senha: ['', Validators.required],
            codigo: ['', Validators.required],

        });
    }


    
  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.Form.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }


}



export class DadosUsuarioRh {
    id: number;
    usuario: string;
    senha: string;
    codigo: string;


}