
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// export interface Todo {
//   userId: number;
//   id: number;
//   title: string;
//   completed: boolean;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class TodoService {
//   private apiUrl = 'https://jsonplaceholder.typicode.com/todos';
//   private cache: Map<string, any> = new Map();

//   constructor(private http: HttpClient) { }

//   getTodos(): Observable<Todo[]> {
//     return this.http.get<Todo[]>(this.apiUrl).pipe(
//       map(todos => todos.slice(0, 20))
//     );
//   }
// }

//////////////////////////////////////////
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  private cache: Map<string, any> = new Map(); // Cache to store the response

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
   
    if (this.cache.has(this.apiUrl)) {
      console.log('Returning cached data');
      return new Observable(observer => {
        observer.next(this.cache.get(this.apiUrl)); // Return cached data
        observer.complete();
      });
    } else {
      // If data is not cached, fetch from API
      return this.http.get<Todo[]>(this.apiUrl).pipe(
        map(todos => todos.slice(0, 20)),
        tap(todos => {
          console.log('Caching new data');
          this.cache.set(this.apiUrl, todos); 
        })
      );
    }
  }
}
