import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroFuncionarioComponent } from './cadastro-funcionario.component';
import { MatInputModule, MatCheckboxModule, MatButtonModule } from '@angular/material';
import { LoginModule } from '../login/login.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [CadastroFuncionarioComponent,

  ],
  imports: [
    CommonModule,
    LoginModule,
    NgxMaskModule,

  ]
})
export class CadastroFuncionarioModule { }
