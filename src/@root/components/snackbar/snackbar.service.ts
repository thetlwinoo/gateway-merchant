import { Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { RootSnackbarComponent } from './snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class RootSnackbarService {
    private _value: BehaviorSubject<string>;
    private _visible: BehaviorSubject<boolean>;
    private _duration: BehaviorSubject<number>;
    durationInSeconds = 5;

    constructor(
        private _snackBar: MatSnackBar
    ) {
        // Initialize the service
        this._init();
    }

    get value(): Observable<any> {
        return this._value.asObservable();
    }

    setValue(value: string): void {
        this._value.next(value);
    }

    get visible(): Observable<any> {
        return this._visible.asObservable();
    }

    get duration(): Observable<any> {
        return this._duration.asObservable();
    }

    setDurantion(value: number): void {
        this._duration.next(value);
    }

    private _init(): void {
        this._value = new BehaviorSubject('');
        this._duration = new BehaviorSubject(5);
        this._visible = new BehaviorSubject(false);
    }

    show(): void {
        this._visible.next(true);
    }

    hide(): void {
        this._visible.next(false);
    }

    open(value: string): void {
        this.setValue(value);
        this.openSnackBar();
    }

    openSnackBar() {
        this._snackBar.openFromComponent(RootSnackbarComponent, {
            duration: this.durationInSeconds * 1000,
        });
    }
}