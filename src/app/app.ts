import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Signup } from './signup/signup';
import { Signin } from './signin/signin';
import { Home } from './home/home';

@Component({
  imports: [RouterOutlet, Home],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Angular-app');

}
