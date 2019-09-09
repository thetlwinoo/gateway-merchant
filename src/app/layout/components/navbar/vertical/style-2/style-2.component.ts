import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';

import { RootConfigService } from '@root/services/config.service';
import { RootNavigationService } from '@root/components/navigation/navigation.service';
import { RootPerfectScrollbarDirective } from '@root/directives/root-perfect-scrollbar/root-perfect-scrollbar.directive';
import { RootSidebarService } from '@root/components/sidebar/sidebar.service';

@Component({
    selector     : 'navbar-vertical-style-2',
    templateUrl  : './style-2.component.html',
    styleUrls    : ['./style-2.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle2Component implements OnInit, OnDestroy
{
    rootConfig: any;
    navigation: any;

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
        private _router: Router
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Directive
    @ViewChild(RootPerfectScrollbarDirective, {static: true})
    set directive(theDirective: RootPerfectScrollbarDirective)
    {
        if ( !theDirective )
        {
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
    ngOnInit(): void
    {
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                    if ( this._rootSidebarService.getSidebar('navbar') )
                    {
                        this._rootSidebarService.getSidebar('navbar').close();
                    }
                }
            );

        // Get current navigation
        this._rootNavigationService.onNavigationChanged
            .pipe(
                filter(value => value !== null),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this.navigation = this._rootNavigationService.getCurrentNavigation();
            });

        // Subscribe to the config changes
        this._rootConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.rootConfig = config;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
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
    toggleSidebarOpened(): void
    {
        this._rootSidebarService.getSidebar('navbar').toggleOpen();
    }

    /**
     * Toggle sidebar folded status
     */
    toggleSidebarFolded(): void
    {
        this._rootSidebarService.getSidebar('navbar').toggleFold();
    }
}
