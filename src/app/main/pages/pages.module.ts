import { NgModule } from '@angular/core';
import { LoginModule } from 'app/main/pages/authentication/login/login.module';
import { ForgotPasswordModule } from 'app/main/pages/authentication/forgot-password/forgot-password.module';
import { ResetPasswordModule } from 'app/main/pages/authentication/reset-password/reset-password.module';
import { LockModule } from 'app/main/pages/authentication/lock/lock.module';
import { MailConfirmModule } from 'app/main/pages/authentication/mail-confirm/mail-confirm.module';
import { ComingSoonModule } from 'app/main/pages/coming-soon/coming-soon.module';
import { Error404Module } from 'app/main/pages/errors/404/error-404.module';
import { Error500Module } from 'app/main/pages/errors/500/error-500.module';
import { MaintenanceModule } from 'app/main/pages/maintenance/maintenence.module';

@NgModule({
  declarations: [],
  imports: [
    LoginModule,
    ForgotPasswordModule,
    ResetPasswordModule,
    LockModule,
    MailConfirmModule,
    ComingSoonModule,
    Error404Module,
    Error500Module,
    MaintenanceModule
  ]
})
export class PagesModule { }
