import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, delay, merge, of, Subject, switchMap } from 'rxjs';
import { JokeService } from './jokes.service';
import { Joke } from './models/joke.model';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.css'],
  animations:[trigger('fadeAnimation', [
    transition(':enter', [
      style({ opacity: 0 }), animate('500ms', style({ opacity: 1 }))]
    ),
    transition(':leave',
      [style({ opacity: 1 }), animate('0ms', style({ opacity: 0 }))]
    )
  ])]
})
export class JokesComponent {

  constructor(private jokeService: JokeService) { }
  optionsToExclude = ['nsfw','religious','political','racist','sexist','explicit'];
  optionsMap:  {
    [key: string]: boolean,
   } = {
    nsfw: false,
    religious: false,
    political: false,
    racist: false,
    sexist: false,
    explicit: false
 };

  public getNextJokeSubject = new BehaviorSubject<string[]>([]);
  public getTopRatedJokeSubject = new BehaviorSubject<Joke[]>(this.jokeService.getTopRatedJokes());

  public jokeChanges = merge(
  this.getNextJokeSubject.pipe(switchMap(()=> of(null))),
  this.getNextJokeSubject.pipe(
  switchMap((options)=> this.jokeService.getJoke(options))
  ));
  public jokeRate: number = 0; 
  
  applyFilters(){
    this.getNextJokeSubject.next(Object.keys(this.optionsMap).filter((key) => {
      return this.optionsMap[key]
    }));
  }

  submit(joke: Joke){
    this.jokeService.saveJokeRate({...joke, rate: this.jokeRate});
    this.applyFilters();
    this.jokeRate = 0;
    this.getTopRatedJokeSubject.next(this.jokeService.getTopRatedJokes());
  }

  updateCheckedOptions(option: string, event: any) {
    this.optionsMap[option] = event.target.checked;
 }
}
