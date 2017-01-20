function searchTermOptionCtrl(PopupSelection, Search) {
   var $ctrl = this;

   $ctrl.open = open;
   $ctrl.formatted = formatted;
   $ctrl.clearSelection = clearSelection;

   function formatted(item) {
      return $ctrl.format ? Format[$ctrl.format](item) : item;
   }   

   function open() {
      if ($ctrl.option.values) {
         PopupSelection.open($ctrl.option.title, $ctrl.option.values, $ctrl.option.format, onSelectCallback);    
      }
   }

   function onSelectCallback(selection) {

      if ($ctrl.option.title == "Make" && $ctrl.option.selection != selection) {
          Search.setModels(selection);
      }

      $ctrl.option.selection = selection;
      Search.doSearch();
   }

   function clearSelection() {

      if ($ctrl.option.title == "Make") {
          Search.clearModels();
      }

      $ctrl.option.selection = undefined;
      Search.doSearch();
   }

}

function searchTermSelectedCtrl() {
   var $ctrl = this;
}

function searchResultsListCtrl(Search) {
   var $ctrl = this;

   $ctrl.res = Search.results;
}

function searchResultsItemCtrl(Config, Photos) {
   var $ctrl = this;

   $ctrl.photoIndex = 0;
   $ctrl.photoRoot = Config.photoRoot;

   $ctrl.viewCarPics = viewCarPics;

   function viewCarPics() {
      Photos.viewCarPics($ctrl.car);
   }
}

angular.module('autoz')

.component('searchTermOption', {
  templateUrl: 'app/components/search/search-term-option.html',
  controller: searchTermOptionCtrl,
  bindings: {
    option: '<'
  }
})

.component('searchTermSelected', {
  templateUrl: 'app/components/search/search-term-selected.html',
  controller: searchTermSelectedCtrl,
  bindings: {
    term: '<',
  }
})

.component('searchResultsList', {
  templateUrl: 'app/components/search/search-results-list.html',
  controller: searchResultsListCtrl,
  bindings: {
    results: '<',
  }
})

.component('searchResultsItem', {
  templateUrl: 'app/components/search/search-results-item.html',
  controller: searchResultsItemCtrl,
  bindings: {
    car: '<'
  }
});