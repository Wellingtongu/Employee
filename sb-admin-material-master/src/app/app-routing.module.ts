import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CadastroFuncionarioComponent } from './cadastro-funcionario/cadastro-funcionario.component';
import { ListaFuncionarioComponent } from './lista-funcionario/lista-funcionario.component';

const routes: Routes = [

    {
        path: '',
        loadChildren: './login/login.module#LoginModule'
    },
    {
        path: 'dashboard', component: DashboardComponent },
    { path: 'cadastro', component: CadastroFuncionarioComponent, canActivate: [AuthGuard]},
    { path: 'lista', component: ListaFuncionarioComponent}
    // {
    //     path: '',
    //     loadChildren: './layout/layout.modu  le#LayoutModule',
    //     canActivate: [AuthGuard]
    // },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}
