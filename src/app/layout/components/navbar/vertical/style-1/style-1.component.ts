import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';

import { RootConfigService } from '@root/services/config.service';
import { RootNavigationService } from '@root/components/navigation/navigation.service';
import { RootPerfectScrollbarDirective } from '@root/directives/root-perfect-scrollbar/root-perfect-scrollbar.directive';
import { RootSidebarService } from '@root/components/sidebar/sidebar.service';
import { Account } from '@root/models';
import { AccountService } from '@root/services/core';

@Component({
    selector: 'navbar-vertical-style-1',
    templateUrl: './style-1.component.html',
    styleUrls: ['./style-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle1Component implements OnInit, OnDestroy {
    rootConfig: any;
    navigation: any;
    account: Account;
    // Private
    private _rootPerfectScrollbar: RootPerfectScrollbarDirective;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {RootConfigService} _rootConfigService
     * @param {RootNavigationService} _rootNavigationService
     * @param {RootSidebarService} _rootSidebarService
     * @param {Router} _router
     */
    constructor(
        private _rootConfigService: RootConfigService,
        private _rootNavigationService: RootNavigationService,
        private _rootSidebarService: RootSidebarService,
        private _router: Router,
        private accountService: AccountService,
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Directive
    @ViewChild(RootPerfectScrollbarDirective, { static: true })
    set directive(theDirective: RootPerfectScrollbarDirective) {
        if (!theDirective) {
            return;
        }

        this._rootPerfectScrollbar = theDirective;

        // Update the scrollbar on collapsable item toggle
        this._rootNavigationService.onItemCollapseToggled
            .pipe(
                delay(500),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this._rootPerfectScrollbar.update();
            });

        // Scroll to the active item position
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                setTimeout(() => {
                    this._rootPerfectScrollbar.scrollToElement('navbar .nav-link.active', -120);
                });
            }
            );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                if (this._rootSidebarService.getSidebar('navbar')) {
                    this._rootSidebarService.getSidebar('navbar').close();
                }
            }
            );
        this.accountService.identity().then((account: Account) => {
            this.account = account;
        });
        // Subscribe to the config changes
        this._rootConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.rootConfig = config;
            });

        // Get current navigation
        this._rootNavigationService.onNavigationChanged
            .pipe(
                filter(value => value !== null),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this.navigation = this._rootNavigationService.getCurrentNavigation();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar opened status
     */
    toggleSidebarOpened(): void {
        this._rootSidebarService.getSidebar('navbar').toggleOpen();
    }

    /**
     * Toggle sidebar folded status
     */
    toggleSidebarFolded(): void {
        this._rootSidebarService.getSidebar('navbar').toggleFold();
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
}
