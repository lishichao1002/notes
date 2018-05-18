import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {delay, repeat, toArray} from "rxjs/operators";

@Injectable()
export class AppService {

    getFoods(): Observable<any> {
        return Observable.create((observer) => {
            setTimeout(() => {
                observer.next([
                    {value: 'steak-0', viewValue: 'Steak'},
                    {value: 'pizza-1', viewValue: 'Pizza'},
                    {value: 'tacos-2', viewValue: 'Tacos'}
                ]);
                observer.complete();
            }, 500);
        });
    }

    getFoods2(times: number): Observable<any> {
        return of({value: `steak-${times}`, viewValue: 'Steak'})
            .pipe(
                repeat(times),
                toArray(),
                delay(times * 1000)
            )
    }

}