import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthHelperService {
    saveToken(token: string): void {
        localStorage.setItem('token', token);
    }
}