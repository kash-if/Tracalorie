// Storage Controller

// Item Controller
const ItemCtrl = (function() {
  // Item constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }
  
  // Data structure / State
  const data = {
    items: [
      {id: 1, name: 'Steak Dinner', calories: 1200},
      {id: 2, name: 'Burger', calories: 450},
      {id: 3, name: 'Ice Cream', calories: 150}
    ],
    currentItem: null,
    totalCalories: 0
  }
  
  // Public methods
  return {
    logData: function() {
      return data;
    }
  }
})();


// UI Controller
const UICtrl = (function() {
  
  // Public methods
  return {
    
  }
})();



// App Controller
const App = (function(ItemCtrl, UICtrl) {
  
  // Public methods
  return {
    init: function() {
      // Log Data in console log (debug mode)
      console.log(ItemCtrl.logData());
    }
  }
})(ItemCtrl, UICtrl);

// Initialize App
App.init();