import { Component, OnInit, ViewEncapsulation, Renderer, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RootConfigService } from '@root/services/config.service';
import { rootAnimations } from '@root/animations';
import { JhiEventManager } from 'ng-jhipster';

import { LoginService } from '@root/services/core/login/login.service';
import { StateStorageService } from '@root/services/core/auth/state-storage.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;

  authenticationError: boolean;
  password: string;
  rememberMe: boolean;
  username: string;
  credentials: any;
  /**
   * Constructor
   *
   * @param {RootConfigService} _rootConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _rootConfigService: RootConfigService,
    private _formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private eventManager: JhiEventManager,
    private loginService: LoginService,
    private stateStorageService: StateStorageService,
    private router: Router,
  ) {
    // Configure the layout
    this._rootConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []), 0);
  }

  login() {
    const loginData = this.loginForm.getRawValue();
    this.loginService
      .login({
        username: loginData.username,
        password: loginData.password,
        rememberMe: loginData.rememberMe
      })
      .then(() => {
        this.authenticationError = false;

        this.eventManager.broadcast({
          name: 'authenticationSuccess',
          content: 'Sending Authentication Success'
        });

        const redirect = this.stateStorageService.getUrl();
        if (redirect) {
          this.stateStorageService.storeUrl(null);
          this.router.navigate([redirect]);
        }
        this.router.navigate(['']);
      })
      .catch(() => {
        this.authenticationError = true;
      });
  }
}
