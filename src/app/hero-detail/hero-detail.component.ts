import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero } from '../heroes';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  dataSendParent ="";
  // grab property from parent  
  @Input() selectedHero?:Hero;

// Send some data to parent
  @Output() newItemEvent = new EventEmitter<string>();



    onKey(val :any){
      this.dataSendParent +=val.key;
      debugger;    
    }


}
