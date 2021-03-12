import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../heroes';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private message: MessageService
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  // get hero by ID
  getHero(): void {
    // the + operator will convert string to Number
    if (this.route.snapshot.paramMap.get("id")) {
      // /detail/11 
      // grabbing the :id  OR  11.
      const id = +this.route.snapshot.params.id;
      this.heroService.getHero(id)
        .subscribe(hero => this.hero = hero);
    }
  }

  deleteHero(): void {
    this.heroService.deleteHero(this.hero.id)
      .subscribe()
      this.message.add(`Hero ${this.hero.name} deleted!`)
      this.location.back();
  }

  goBack(): void {
    // post new hero.name 
    // this.heroService.putHero(this.hero.id,this.hero.name);
    // this.heroService.putHero(this.hero);
    // if we forgot to call .subscribe 
    // no changes will be made

    this.heroService.putHero(this.hero).subscribe(
      hero => this.hero = hero
    );

    ``
    this.location.back();
  }
}