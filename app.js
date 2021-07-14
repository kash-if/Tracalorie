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
    items: [],
    currentItem: null,
    totalCalories: 0
  }

  // Public methods
  return {
    logData: function() {
      return data;
    },
    getItems: function() {
      return data.items;
    },
    addItem: function(name, calories) {
      let ID;
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      newItem = new Item(ID, name, calories);
      data.items.push(newItem);
    }
  }
})();



// UI Controller
const UICtrl = (function() {
  const UISelectors = {
      itemList: '#item-list',
      addBtn: '.add-btn',
      itemNameInput: '#item-name',
      itemCaloriesInput: '#item-calories'
  }

  // Function to display data collection in UI list items
  const populateItems = function(items) {
    let html = '';

    // Looping through items 
    items.forEach(function(item) {
      html += `
      <li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong><em>${item.calories} calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil-alt"></i></a>
      </li>
      `;
    });

    // Display list items in UI
    document.querySelector(UISelectors.itemList).innerHTML = html;
  }
  
  // Public methods
  return {
    // Function to return (variables - UI selectors) pair
    getUISelectors: function() {
      return UISelectors;
    },
    populateItemList: function(items) {
      populateItems(items);
    },
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    }
  }
})();



// App Controller
const App = (function(ItemCtrl, UICtrl) {
  // Load event listeners
  const loadEventListeners = function() {
    // Get UI selectors from UI controller module
    const UISelectors = UICtrl.getUISelectors();

    // Add input event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

  }

  const itemAddSubmit = function(e) {
    // Get input data from UI controller
    const input = UICtrl.getItemInput();

    // Check whether input data is null
    if(input.name !== '' && input.calories !== '') {
      // Add new item to data through Item controller
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      UICtrl.clearInput();
    }

    e.preventDefault();
  }

  // Public methods
  return {
    init: function() {
      // Log Data in console log (debug mode)
      console.log(ItemCtrl.logData());
      // Fetch data from data structure in Item controller module
      const items = ItemCtrl.getItems();
      // Display list items in UI through UI controller module
      UICtrl.populateItemList(items);
      // Load Event Listeners
      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl);

// Initialize App
App.init();
