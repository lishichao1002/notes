import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AppService {

    getFoods() {
        return Observable.create((observer) => {
            observer.next([
                {value: 'steak-0', viewValue: 'Steak'},
                {value: 'pizza-1', viewValue: 'Pizza'},
                {value: 'tacos-2', viewValue: 'Tacos'}
            ]);
            observer.complete();
        });
    }

}