import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FlgServiceService {

private isLoginSubject = new BehaviorSubject<boolean>(false);

loginFlags$ = this.isLoginSubject.asObservable();

  constructor() { }


setLoginFlag(flag: boolean): void{
  this.isLoginSubject.next(flag);
}


}
