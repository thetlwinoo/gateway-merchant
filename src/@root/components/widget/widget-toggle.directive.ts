import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[rootWidgetToggle]'
})
export class RootWidgetToggleDirective
{
    /**
     * Constructor
     *
     * @param {ElementRef} elementRef
     */
    constructor(
        public elementRef: ElementRef
    )
    {
    }
}
