function selectionPopupCtrl($uibModal) {
   var $ctrl = this;

  $ctrl.animationsEnabled = true;

  $ctrl.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'selection-popup.html',
      controller: 'selectionPopupInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
      resolve: {
        items: function () {
          return $ctrl.items;
        }
      }
    });
  }

}

function selectionPopupInstanceCtrl() {

}



angular.module('autoz')

.component('selectionPopup', {
  templateUrl: 'app/components/shared/selection-popup.html',
  controller: selectionPopupCtrl,
  bindings: {
    items: '<'
  }
})

.controller('selectionPopupInstanceCtrl', selectionPopupInstanceCtrl);