import { Routes } from '@angular/router';
import { Signup } from './signup/signup';
import { Signin } from './signin/signin';
import { Home } from './home/home';

export const routes: Routes = [
  { path: "", redirectTo: "/home", component:Home},
  { path: "sign-up", component: Signup },
  { path: "sign-in", component: Signin }


];
