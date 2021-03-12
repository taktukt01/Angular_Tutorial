import { Component, OnInit } from '@angular/core';
import { Hero } from '../heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  // what is ngOnInit
  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));

    /* 
    Observables provide support for passing messages between parts of your application. They are used frequently in Angular and are a technique for 
    event handling, asynchronous programming, and handling multiple values.
*/
    // Observables are declarative—that is, you define a function for publishing values, 
    // but it is not executed until a consumer subscribes to it. 
  }


}