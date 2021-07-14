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
      calories = parseInt(calories);
      newItem = new Item(ID, name, calories);
      data.items.push(newItem);

      return newItem;
    },
    getTotalCalories: function() {
      let total = 0;

      // Loop through items and sum up calories
      data.items.forEach(function(item) {
        total += item.calories;
      });
      
      // Set total calories in data structure
      data.totalCalories = total;

      // Return total calories
      return data.totalCalories;
    },
    getItemById: function(itemId) {
      let found = null;
      const itemData = data.items.forEach(function(item) {
        if(item.id === itemId) {
          found = item;
        }
      })
      return found;
    },
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    getCurrentItem: function() {
      return data.currentItem;
    }
  }
})();



// UI Controller
const UICtrl = (function() {
  const UISelectors = {
      itemList: '#item-list',
      addBtn: '.add-btn',
      updateBtn: '.update-btn',
      deleteBtn: '.delete-btn',
      backBtn: '.back-btn',
      editBtn: '.edit-item',
      itemNameInput: '#item-name',
      itemCaloriesInput: '#item-calories',
      totalCaloriesOutput: '#total-calories'
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
    },
    showNewItem: function(item) {
      // Create a new li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Add ID
      li.id = `item-${item.id}`
      // Add HTML
      li.innerHTML = `
        <strong>${item.name}: </strong><em>${item.calories} calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil-alt"></i></a>
      `;
      // Insert new li element to ul parent element
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
      document.querySelector(UISelectors.itemList).style.display = 'block';
    },
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories: function(totalCalories) {
      document.querySelector(UISelectors.totalCaloriesOutput).textContent = totalCalories;
    },
    clearEditState: function() {
      UICtrl.clearInput();
      //Hiding update, delete & back buttons from UI
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    showEditItemInInput: function() {
      // Show edit item name and calories in input fields
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;

      // Set edit state to show update, delete & back buttons in UI
      UICtrl.showEditState();
    },
    showEditState: function() {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    }
  }
})();



// App Controller
const App = (function(ItemCtrl, UICtrl) {
  // Load event listeners
  const loadEventListeners = function() {
    // Get UI selectors from UI controller module
    const UISelectors = UICtrl.getUISelectors();

    // Add meal event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    
    // Edit item icon click
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
    
  }

  const itemAddSubmit = function(e) {
    // Get input data from UI controller module
    const input = UICtrl.getItemInput();

    // Check whether input data is null
    if(input.name !== '' && input.calories !== '') {
      // Add new item to data through Item controller module
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Show Item to UI through UI controller module
      UICtrl.showNewItem(newItem);

      // Get total calories from Item controller module
      const totalCalories = ItemCtrl.getTotalCalories();

      // Show total calories in UI through UI controller module
      UICtrl.showTotalCalories(totalCalories);

      // Clear Input fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  }

  const itemEditClick = function(e) {
    if(e.target.classList.contains('edit-item')) {
        
      // Get list item ID (e.g. item-2)
      const editListItemId = e.target.parentNode.parentNode.id;

      // Split the id string to get id
      const editListItemIdArr = editListItemId.split('-');

      // Get the actual id
      const editItemId = parseInt(editListItemIdArr[1]);

      // Get the edit item data
      const editItemData = ItemCtrl.getItemById(editItemId);

      // Set edit item to current item in Item controller module
      ItemCtrl.setCurrentItem(editItemData);

      // Show current item in edit state
      UICtrl.showEditItemInInput();


    }

    e.preventDefault();
  }

  // Public methods
  return {
    init: function() {
      // Set clear edit state or set intitial state
      UICtrl.clearEditState();

      // Fetch items from data structure in Item controller module
      const items = ItemCtrl.getItems();

      // Check if any items
      if(items.length === 0) {
        UICtrl.hideList();
      } else {
        // Display list items in UI through UI controller module
        UICtrl.populateItemList(items);
      }

      // Get total calories from Item controller module
      const totalCalories = ItemCtrl.getTotalCalories();

      // Show total calories in UI through UI controller module
      UICtrl.showTotalCalories(totalCalories);

      // Load Event Listeners
      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl);

// Initialize App
App.init();
