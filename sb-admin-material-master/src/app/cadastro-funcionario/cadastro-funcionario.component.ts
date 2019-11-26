import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { resolve } from 'url';
import { reject } from 'q';
import { Http, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-cadastro-funcionario',
  templateUrl: './cadastro-funcionario.component.html',
  styleUrls: ['./cadastro-funcionario.component.scss']
})
export class CadastroFuncionarioComponent implements OnInit {
  public dado_usuario = new DadosUsuario;

  Form: FormGroup;
  public message_required = "Campo obrigatório";
  public email_invalid = "Email Invalido";
  public message_minLength = "digite no minimo 3 caracteres";
  public message_maxlength = "maximo de 30 caracteres";
  errors: any = [];

  constructor(private fb: FormBuilder,
    private Http: Http,
      private router: Router
    ) { }

  ngOnInit() {
    this.Formfuncionario();
  }


  Formfuncionario() {
    // demo message to show
    this.Form = this.fb.group({

      nome: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ])
      ],
      data_ad: ['', Validators.required],
      codigo: ['', Validators.required],
      cpf: ['', Validators.required],
      cargo: ['', Validators.required],
      filial: ['', Validators.required]




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

  onSubmit(data) {
console.log(data);

    return new Promise((resolve, reject) => {

      this.Http.post("https://localhost:44358/api/tbl_employees/Posttbl_employees", this.dado_usuario)
        .subscribe((result: any) => {
          resolve(result.json());

        },
          (error) => {
            reject(error.json());
         
          });

          this.router.navigateByUrl('/lista')
    });

   // this.router.navigate(['cadastro']);


  }



}



export class DadosUsuario {
  id: number;
  nome: string;
  data_ad: string;
  codigo: string;
  cpf: string;
  cargo: string;
  filial: string;


}