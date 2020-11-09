"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var collections_1 = require("@angular/cdk/collections");
var SubListDataSource = /** @class */ (function (_super) {
    __extends(SubListDataSource, _super);
    function SubListDataSource(maintService) {
        var _this = _super.call(this) || this;
        _this.maintService = maintService;
        return _this;
    }
    SubListDataSource.prototype.connect = function (collectionViewer) {
        return this.maintService.subscribersObservable;
    };
    SubListDataSource.prototype.disconnect = function (collectionViewer) {
    };
    return SubListDataSource;
}(collections_1.DataSource));
exports.SubListDataSource = SubListDataSource;
//# sourceMappingURL=sub-list.datasource.js.map