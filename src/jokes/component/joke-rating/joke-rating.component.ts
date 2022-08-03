import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-joke-rating',
  templateUrl: './joke-rating.component.html',
  styleUrls: ['./joke-rating.component.css']
})
export class JokesRatingComponent {
  @Input()
  public joke!: string;
  @Input()
  public rate!: number;
  @Output()
  public rateEvent = new EventEmitter<number>();

  public ratingNumber = Array(101).fill(101).map((x,i)=>i); 

  onSelectRate(event: any){
    this.rateEvent.emit(Number(event.target?.value));
  }
}
