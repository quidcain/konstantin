import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { fuseAnimations } from '@fuse/animations';
import { AuthService } from '../auth.service';
import { TokenStorage } from '../token.storage';
import { AuthService as SocialAuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login';

@Component({
    selector   : 'login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss'],
    animations : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _formBuilder: FormBuilder,
        private authService: AuthService,
        private socialAuthService: SocialAuthService,
        private tokenStorage: TokenStorage
    ) { }

    login(): void {
      if (this.loginForm.dirty && this.loginForm.valid) {
        this.authService.attemptLogin(this.loginForm.value.email, this.loginForm.value.password).subscribe(
          data => {
            if (data && data.token) {
              this.tokenStorage.saveToken(data.token);
            }
            alert('Successfuly logged in!');
          }
        );
      }
    }

    socialLogin(socialPlatform: string): void {
      const socialPlatformProvider = socialPlatform === 'google' ? GoogleLoginProvider.PROVIDER_ID 
        : FacebookLoginProvider.PROVIDER_ID;
      this.socialAuthService.signIn(socialPlatformProvider)
        .then( socialUser => console.log(socialUser));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
}
