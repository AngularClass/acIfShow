!function() {

  /*
   * @AngularClass
   */

  function $IfHideDirective($animate) {
    var NG_HIDE_CLASS = 'ng-hide';
    var NG_HIDE_IN_PROGRESS_CLASS = 'ng-hide-animate';
    return {
      transclude: 'element',
      priority: 600,
      terminal: true,
      restrict: 'A',
      $$tlb: true,
      multiElement: true,
      link: function($scope, $element, $attr, ctrl, $transclude) {
          var block, childScope, previousElements, once;

          ngIfHideWatchAction(value) {
            if (once) {
              ngHideWatchAction(value);
            } else {
              ngIfWatchAction(value);
            }
          }

          function ngHideWatchAction(value) {
            $animate[value ? 'addClass' : 'removeClass'](previousElements || $element, NG_HIDE_CLASS, {
              tempClasses: NG_HIDE_IN_PROGRESS_CLASS
            });
          }

          function ngIfWatchAction(value) {

            if (value) {
              if (!childScope) {
                $transclude(function(clone, newScope) {
                  childScope = newScope;
                  clone[clone.length++] = document.createComment(' end ngIf: ' + $attr.ngIf + ' ');
                  // Note: We only need the first/last node of the cloned nodes.
                  // However, we need to keep the reference to the jqlite wrapper as it might be changed later
                  // by a directive with templateUrl when its template arrives.
                  block = {
                    clone: clone
                  };
                  $animate.enter(clone, $element.parent(), $element).then(function(val) {
                    once = true;
                    return val;
                  });
                });
              }
            } else {
              if (previousElements) {
                previousElements.remove();
                previousElements = null;
              }
              if (childScope) {
                childScope.$destroy();
                childScope = null;
              }
              if (block) {
                previousElements = getBlockNodes(block.clone);
                $animate.leave(previousElements).then(function() {
                  previousElements = null;
                });
                block = null;
              }
            }
          }

          $scope.$watch($attr.ngIfHide, ngIfHideWatchAction);
      }
    };
  }];

  angular.module('acIfHide', [])
  .directive('acIfHide',  ['$animate', $IfHideDirective])


  angular.module('angularclass-if-hide', ['acIfHide']);
  angular.module('angular-class-if-hide', ['acIfHide']);
  angular.module('AngularClass.IfHide', ['acIfHide']);

  if (typeof module === 'object' && typeof define !== 'function') {
    module.exports = angular.module('acIfHide');
  }

}();
