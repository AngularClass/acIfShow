# AngularClass IfShow
Angular 1.x directive that uses ng-if then ng-show afterwards. You would normally use ng-if for perf reasons if you have a lot of bindings and ng-show for dom perf. This allows you to get the benefits of both as `ac-if-show="hasValue"` 

## Installing
Use either one of these
* npm: `npm install ac-if-show`
* bower: `bower install acIfShow`
* cdn: `https://cdn.rawgit.com/angular-class/acIfShow/v1.0.0/acIfShow.js`
 

Then include the angular.module('app', [`acIfShow`])
