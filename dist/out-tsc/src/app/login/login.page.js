import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
var LoginPage = /** @class */ (function () {
    function LoginPage(formBuilder) {
        this.formBuilder = formBuilder;
    }
    LoginPage.prototype.ngOnInit = function () {
        this.logoPath = '../../assets/images/logo-circle.png';
        this.loginForm = this.formBuilder.group({
            phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
            otp: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])]
        });
    };
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map