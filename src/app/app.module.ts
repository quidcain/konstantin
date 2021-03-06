import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { TestComponent } from './main/test/test.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from 'app/main/login/login.module';
import { RegisterModule } from 'app/main/register/register.module';
import { AuthService } from './main/auth.service';
import { TokenStorage } from './main/token.storage';
import { JwtInterceptor } from './main/jwt.interceptor';
import { ErrorHandlerImpl } from './main/error.handler';
import { FakeBackendInterceptor } from './main/fake-backend.interceptor';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login';

export function getAuthServiceConfigs(): AuthServiceConfig {
  const config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('Your-Facebook-app-id')
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('Your-Google-Client-Id')
        }
      ]
  );
  return config;
}

@NgModule({
    declarations: [
        AppComponent,
        TestComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,
        AppRoutingModule,
        LoginModule,
        RegisterModule,
        SocialLoginModule
    ],
    bootstrap   : [
        AppComponent
    ],
    providers: [
        AuthService,
        TokenStorage,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: ErrorHandler, useClass: ErrorHandlerImpl},
        { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
        { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs }
    ]
})
export class AppModule
{
}
