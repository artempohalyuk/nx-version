import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthHelperService {
    saveToken(token: string): void {
        localStorage.setItem('token', token);
    }
}