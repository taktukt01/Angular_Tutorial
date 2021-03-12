import { Component, OnInit } from '@angular/core';

import { Hero } from '../heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  hero: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.hero = heroes);
  }

  add(name: string): void {
    name = name.trim(); // removes whitespace
    this.heroService.addHero({ name } as Hero)
      .subscribe(heroes => this.hero.push(heroes));

  }

 
}