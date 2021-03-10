import { Component, OnInit } from '@angular/core';
import {Hero} from '../heroes';
import {HEROES} from "../mock-heroes";
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})




export class HeroesComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }

  title = "Heroes";

  hero:Hero = {
    id:1 ,
    name:"Windstorm"
  }

  HeroEmpty = this.hero.name == "";
 
  heroes:Hero[] = HEROES;
  
  selectedHero?: Hero;
  

  onSelect(selectedHero:Hero){
    this.selectedHero = selectedHero;
  }


}
