import { Component, OnInit } from '@angular/core';
import { DadosUsuario } from '../cadastro-funcionario/cadastro-funcionario.component';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-lista-funcionario',
  templateUrl: './lista-funcionario.component.html',
  styleUrls: ['./lista-funcionario.component.scss']
})
export class ListaFuncionarioComponent implements OnInit {
  public message_required = "Campo obrigatório";
  public email_invalid = "Email Invalido";
  public message_minLength = "digite no minimo 3 caracteres";
  public message_maxlength = "maximo de 30 caracteres";
  errors: any = [];

  public dado_usuario = new DadosUsuario;
  public dado_edit = new DadosUsuarioEdit;
  show_Edit: boolean = false;
  FormEdit: FormGroup;

  constructor(private Http: Http,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngAfterViewInit() {
  
    this.load();
    this.Http.get("https://localhost:44358/api/tbl_employees/Gettbl_employees")
    .subscribe(
      data => {
        const response = (data as any);
        const resposta = JSON.parse(response._body);
        this.dado_usuario = resposta;

        console.log('resposta', resposta);
      }, error => {
        console.log(error);
      }

    )


  }


  cadastrar() {
    // this.router.navigate(['cadastro']);
    this.router.navigateByUrl('/cadastro')
  }


  ngOnInit() {

    this.Http.get("https://localhost:44358/api/tbl_employees/Gettbl_employees")
      .subscribe(
        data => {
          const response = (data as any);
          const resposta = JSON.parse(response._body);
          this.dado_usuario = resposta;

          console.log('resposta', resposta);
        }, error => {
          console.log(error);
        }

      )

    this.Formfuncionario();

  }

  Edit(dado) {

    this.Http.get("https://localhost:44358/api/tbl_employees/Gettbl_employees/?id=" + dado.id)
      .subscribe(data => {
        const response = (data as any);
        const resposta = JSON.parse(response._body);
        this.dado_edit = resposta;
        console.log(`valor get por id => ${this.dado_edit}`);
        this.show_Edit = true;
      });

  }


  Atualizar() {
   

    return new Promise((resolve, reject) => {

      this.Http.put("https://localhost:44358/api/tbl_employees/Puttbl_employees/?id=" + this.dado_edit.id, this.dado_edit)
        .subscribe((result: any) => {
          resolve(result.json());
          this.show_Edit = false;
          this.ngOnInit();
        },
          (error) => {
            reject(error.json());
          });
    
    })
    
  }


  Delete(dado) {

    return new Promise((resolve, reject) => {

      this.Http.delete("https://localhost:44358/api/tbl_employees/Deletetbl_employees/?id=" + dado.id)
        .subscribe((result: any) => {
          resolve(result.json());
          this.ngOnInit();
        },
          (error) => {
            reject(error.json());
          });
          this.ngOnInit();
    });

  }



  Cancel() {
    this.show_Edit = false;
  }


  Formfuncionario() {
    // demo message to show
    this.FormEdit = this.fb.group({

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
    const control = this.FormEdit.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }



  load() {
    //Session storage salva os dados como string
    (sessionStorage.refresh == 'true' || !sessionStorage.refresh) && location.reload();
    sessionStorage.refresh = false;
  }




}



export class DadosUsuarioEdit {
  id: number;
  nome: string;
  data_ad: string;
  codigo: string;
  cpf: string;
  cargo: string;
  filial: string;


}