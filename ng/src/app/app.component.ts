import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {fromEvent} from "rxjs/observable/fromEvent";
import {
    bufferCount,
    bufferTime,
    concatMap,
    debounceTime,
    distinctUntilChanged,
    map,
    pluck,
    reduce,
    takeWhile,
    tap
} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {AppService} from "./app.service";
import {fromPromise} from "rxjs/observable/fromPromise";
import {from} from "rxjs/observable/from";
import {of} from "rxjs/observable/of";
import {range} from "rxjs/observable/range";
import {timer} from "rxjs/observable/timer";
import {interval} from "rxjs/observable/interval";

@Component({
    selector: 'app-root',
    template: `
        <mat-toolbar color="primary">
            <mat-toolbar-row>
                <span>Custom Toolbar</span>
            </mat-toolbar-row>
        </mat-toolbar>

        <mat-grid-list cols="6" rowHeight="2:1">
            <mat-grid-tile>
                <mat-form-field class="example-full-width">
                    <input #input matInput placeholder="Favorite food" value="Sushi">
                </mat-form-field>
            </mat-grid-tile>
            <mat-grid-tile>
                <mat-form-field class="example-full-width">
                    <input matInput placeholder="Leave a comment" (keyup)="input2$.next($event)"/>
                </mat-form-field>
            </mat-grid-tile>
            <mat-grid-tile>
                <mat-select placeholder="Favorite food">
                    <mat-option *ngFor="let food of (foods$ | async)" [value]="food.value">
                        {{ food.viewValue }}
                    </mat-option>
                </mat-select>
            </mat-grid-tile>
            <mat-grid-tile>
                <button mat-raised-button> {{(timer$ | async)}} s</button>
            </mat-grid-tile>
        </mat-grid-list>

        <form class="example-form">


        </form>
    `
})
export class AppComponent implements OnInit {

    @ViewChild('input')
    inputRef: ElementRef;

    input1$: Observable<any>;
    input2$: Subject<any> = new Subject();
    foods$: Observable<{ value, viewValue }[]>;
    timer$: Observable<number>;

    constructor(private service: AppService) {
    }

    ngOnInit() {
        this.createOperate();
        this.otherOperate();
    }

    createOperate() {
        let foods = [
            {value: 'steak-0', viewValue: 'Steak'},
            {value: 'pizza-1', viewValue: 'Pizza'},
            {value: 'tacos-2', viewValue: 'Tacos'}
        ];

        //fromEvent
        this.input1$ = fromEvent(this.inputRef.nativeElement, 'input');

        //create
        this.foods$ = Observable.create((observer) => {
            observer.next(foods);
            observer.complete();
        });

        //fromPromise
        this.foods$ = fromPromise(new Promise((resolve) => {
            resolve(foods);
        }));

        //bindCallback
        // this.foods$ = bindCallback((callback: (foods: { value, viewValue }[]) => { value, viewValue }[]) => callback(foods))();

        //from
        this.foods$ = from([foods]);

        //of
        this.foods$ = of(foods);

        //range
        this.foods$ = range(1, 10).pipe(
            map(num => ({value: num, viewValue: `index: ${num}`})),
            bufferCount(10)
        );

        //interval
        this.foods$ = interval(1000).pipe(
            map(num => ({value: num, viewValue: `index: ${num}`})),
            bufferTime(10000)
        );

        //timer
        this.timer$ = timer(0, 1000).pipe(
            map(val => 60 - val),
            takeWhile(val => val >= 0)
        );

        from([3, 5, 4]).pipe(
            concatMap((num) => this.service.getFoods2(num))
        ).subscribe((val) => {
            console.warn('xxx', val);
        })


        //https://medium.com/upday-devs/rxjava-subscribeon-vs-observeon-9af518ded53a
    }

    otherOperate() {
        this.input1$
            .pipe(
                debounceTime(1000),
                // map((event: any) => event.target.value),
                pluck('target', 'value'),
                distinctUntilChanged()
            )
            .subscribe((val) => {
                console.log(val);
            });

        this.input2$
            .pipe(
                debounceTime(1000),
                map((event: any) => event.target.value),
                distinctUntilChanged()
            )
            .subscribe((val) => {
                console.log(val);
            });
    }

}
