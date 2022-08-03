import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Joke } from './models/joke.model';
import { ApiJokeModel } from './models/joke-api.model';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class JokeService {
  public url = "https://v2.jokeapi.dev/joke/Any";

  constructor(private http: HttpClient, private _localStorageService: LocalStorageService) { }

  public getJoke(options:  string[]):Observable<Joke>{
    let params;
    if(options.length){
     params = new HttpParams()
    .set('type', 'single')
    .set('blacklistFlags', options.join(','))
    }else{
      params = new HttpParams()
      .set('type', 'single')
    }
 
    return this.http.get(this.url, {params}).pipe(map((jokeResponse)=> Joke.deserialize(jokeResponse as ApiJokeModel)));
  }

  public saveJokeRate (joke: Joke) {
    const jokes: Joke[] = this._localStorageService.get('ratedJokes');
    if(jokes){
      this._localStorageService.set('ratedJokes', [...jokes, joke]);

    }else{
      this._localStorageService.set('ratedJokes', [joke]);
    }
  }
  public getTopRatedJokes () {
    const jokes: Joke[] = this._localStorageService.get('ratedJokes');
    if(jokes){
      jokes.sort((a, b) => (b.rate || 0) - (a.rate || 0));
    }
    return jokes.slice(0, 10) || [];
  }
}