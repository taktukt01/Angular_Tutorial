import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './heroes';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

// @Injectable allows us to have our services also inject other services
// Purpose of HeroService is to grab Heroes[] from backend 
@Injectable({ providedIn: 'root' })
export class HeroService {

  constructor(private messageService: MessageService,
    private http: HttpClient) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  private heroesUrl = 'api/heroes';  // URL to web api

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };




  // What does pipe do?
  // What does tap do?
  // how does http.get work?

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  putHero(hero: Hero): Observable<Hero> {
    // const url = `${this.heroesUrl}/${id}`;
    return this.http.put<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ =>
          this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );

  }

  // we have input (Hero name)
  // we want to add to data store


  // addHero(hero: Hero): Observable<Hero> {
  //   return this.http.post(<Hero>(this.heroesUrl, hero, this.httpOptions)
  //     .pipe(
  //       tap(_ =>
  //         this.log(`added hero id=${hero.id}`)),
  //       catchError(this.handleError<any>('updateHero'))
  //     );
  // }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }


  // implement delete on own
  deleteHero(id:Number):Observable<Hero>{
    const url =  `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      catchError(this.handleError<Hero>('deleteHero'))
    );
  
  }
  

  // implement searching by hero name
}