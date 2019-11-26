import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaFuncionarioComponent } from './lista-funcionario.component';
import { LoginModule } from '../login/login.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [ListaFuncionarioComponent],
  imports: [
    CommonModule,
    LoginModule,
    NgxMaskModule,
  ]
})
export class ListaFuncionarioModule { }
