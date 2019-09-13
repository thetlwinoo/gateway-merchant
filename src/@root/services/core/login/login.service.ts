import { Injectable } from '@angular/core';

import { AccountService } from '@root/services/core/auth/account.service';
import { AuthServerProvider } from '@root/services/core/auth/auth-jwt.service';
import { JhiTrackerService } from '@root/services/core/tracker/tracker.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor(
        private accountService: AccountService,
        private trackerService: JhiTrackerService,
        private authServerProvider: AuthServerProvider        
    ) {}

    login(credentials, callback?) {      
        console.log('credentials',credentials)  
        const cb = callback || function() {};

        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe(
                data => {                         
                    this.accountService.identity(true).then(account => {                                     
                        this.trackerService.sendActivity();
                        resolve(data);
                    });
                    return cb();
                },
                err => {
                    this.logout();
                    reject(err);
                    return cb(err);
                }
            );
        });
    }

    loginWithToken(jwt, rememberMe) {
        return this.authServerProvider.loginWithToken(jwt, rememberMe);
    }

    logout() {
        this.authServerProvider.logout().subscribe();
        this.accountService.authenticate(null);
    }
}
