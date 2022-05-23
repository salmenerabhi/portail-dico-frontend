import { AccountService } from './../../services/account.service';
import { TokenService } from './../services/token.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AfterAuthGuard implements CanActivate {

    constructor(
        private tokenService: TokenService,
        private router: Router
    ) {

    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        if (this.tokenService.loggedIn()) {
            if (this.tokenService.getUserRole() == 'RD') {
                this.router.navigateByUrl('/firstpageRD');
                return false;
            }
            else if (this.tokenService.getUserRole() === 'RC') {

                this.router.navigateByUrl('/firstpageRC');
                return false;
            }
            else if (this.tokenService.getUserRole() === 'TL') {
                this.router.navigateByUrl('/homeTL');
                return false;
            }
            else if (this.tokenService.getUserRole() === 'Client') {
                this.router.navigateByUrl('/homeAT');
                return false;
            }
        }
            return true;
        
    }
}