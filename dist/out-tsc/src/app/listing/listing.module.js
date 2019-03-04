import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ListingPage } from './listing.page';
var routes = [
    {
        path: '',
        component: ListingPage
    }
];
var ListingPageModule = /** @class */ (function () {
    function ListingPageModule() {
    }
    ListingPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ListingPage]
        })
    ], ListingPageModule);
    return ListingPageModule;
}());
export { ListingPageModule };
//# sourceMappingURL=listing.module.js.map