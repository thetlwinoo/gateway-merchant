import { NgModule } from '@angular/core';

import { RootIfOnDomDirective } from '@root/directives/root-if-on-dom/root-if-on-dom.directive';
import { RootInnerScrollDirective } from '@root/directives/root-inner-scroll/root-inner-scroll.directive';
import { RootPerfectScrollbarDirective } from '@root/directives/root-perfect-scrollbar/root-perfect-scrollbar.directive';
import { RootMatSidenavHelperDirective, RootMatSidenavTogglerDirective } from '@root/directives/root-mat-sidenav/root-mat-sidenav.directive';
import { HasAnyAuthorityDirective } from '@root/directives/auth/has-any-authority.directive';

@NgModule({
    declarations: [
        RootIfOnDomDirective,
        RootInnerScrollDirective,
        RootMatSidenavHelperDirective,
        RootMatSidenavTogglerDirective,
        RootPerfectScrollbarDirective,
        HasAnyAuthorityDirective
    ],
    imports: [],
    exports: [
        RootIfOnDomDirective,
        RootInnerScrollDirective,
        RootMatSidenavHelperDirective,
        RootMatSidenavTogglerDirective,
        RootPerfectScrollbarDirective,
        HasAnyAuthorityDirective
    ]
})
export class RootDirectivesModule {
}
