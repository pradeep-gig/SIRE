import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(formBuilder, apiService) {
        this.formBuilder = formBuilder;
        this.apiService = apiService;
    }
    RegisterPage.prototype.ngOnInit = function () {
        this.logoPath = '../../assets/images/logo.png';
        this.apiService.getStates().subscribe(function (res) {
            console.log(res);
        });
        this.registerForm = this.formBuilder.group({
            phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
            firstname: ['', Validators.compose([])],
            lastname: ['', Validators.compose([])],
            state: ['', Validators.compose([])],
            city: ['', Validators.compose([])],
        });
    };
    RegisterPage = tslib_1.__decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.page.html',
            styleUrls: ['./register.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, ApiService])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.page.js.map