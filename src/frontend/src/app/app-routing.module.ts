import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PesquisasComponent } from './pages/pesquisas/pesquisas.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { DistribuicoesComponent } from './pages/distribuicoes/distribuicoes.component';
import { UsuarioNpsComponent } from './pages/usuario-nps/usuario-nps.component'

const routes: Routes = [
  { path: 'pesquisas', component: PesquisasComponent, canActivate: [AuthGuard] },
  { path: 'distribuicoes/:idPesquisa', component: DistribuicoesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'pesquisanps', component: UsuarioNpsComponent}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
