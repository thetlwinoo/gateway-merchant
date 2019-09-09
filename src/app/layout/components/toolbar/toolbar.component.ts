import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { RootConfigService } from '@root/services/config.service';
import { RootSidebarService } from '@root/components/sidebar/sidebar.service';
import { Account } from '@root/models';
import { navigation } from 'app/navigation/navigation';

import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { AccountService, LoginService } from '@root/services/core';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];
    account: Account;
    // Private
    private _unsubscribeAll: Subject<any>;
    private subscriptions: Subscription[] = [];
    /**
     * Constructor
     *
     * @param {RootConfigService} _rootConfigService
     * @param {RootSidebarService} _rootSidebarService
     * @param {TranslateService} _translateService
     */
    constructor(
        private _rootConfigService: RootConfigService,
        private _rootSidebarService: RootSidebarService,
        private _translateService: TranslateService,
        private accountService: AccountService,
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private router: Router,
    ) {
        // Set the defaults
        this.userStatusOptions = [
            {
                title: 'Online',
                icon: 'icon-checkbox-marked-circle',
                color: '#4CAF50'
            },
            {
                title: 'Away',
                icon: 'icon-clock',
                color: '#FFC107'
            },
            {
                title: 'Do not Disturb',
                icon: 'icon-minus-circle',
                color: '#F44336'
            },
            {
                title: 'Invisible',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#BDBDBD'
            },
            {
                title: 'Offline',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#616161'
            }
        ];

        this.languages = [
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            },
            {
                id: 'mm',
                title: 'Myanmar',
                flag: 'tr'
            }
        ];

        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.accountService.identity().then((account: Account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        // Subscribe to the config changes
        this._rootConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, { id: this._translateService.currentLang });
    }

    registerAuthenticationSuccess() {
        const eventSubscription = this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                if (account) {
                    this.account = account;
                }
            });
        });
        this.subscriptions.push(eventSubscription);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

        this.subscriptions.forEach(el => {
            if (el) el.unsubscribe();
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._rootSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void {
        // Do your search here...
        console.log(value);
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    logonName() {
        if (this.account) {
            const _firstName = this.account.firstName;
            const _lastName = this.account.lastName;
            return _firstName == _lastName ? _firstName : _firstName + ' ' + _lastName;
        }
    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['/pages/auth/login']);
    }
}
