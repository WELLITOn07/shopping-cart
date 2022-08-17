import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialControlComponent } from './features/home/components/pages/financial-control/financial-control.component';
import { ShoppingCartComponent } from './features/home/components/shopping-cart/shopping-cart.component';
import { LoginComponent } from './features/login/components/login/login.component';
import { UserRegistrationComponent } from './features/login/components/pages/user-registration/user-registration.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {path: '', component: ShoppingCartComponent, canActivate: [AuthGuard]},
  {path: 'home', component: ShoppingCartComponent, canActivate: [AuthGuard]},
  {path: 'controleDeGastos', component: FinancialControlComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: UserRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
