/**
 * Global variables and constants
 */
let changedStates, currentDependencies, currentNewDerives, alwaysConnectedDom = {isConnected: 1}, garbageCollectionCycleInMs = 1000, statesToGarbageCollect, propertySetterCache = {}
const objectPrototype = Object.getPrototypeOf(alwaysConnectedDom), functionPrototype = Object.getPrototypeOf(Object.getPrototypeOf)

/**
 * Adds a state to a set and schedules a function to run after a delay
 * @param {Set} set - The set to add the state to
 * @param {Object} state - The state to add
 * @param {Function} fn - The function to schedule
 * @param {number} waitMs - The delay before the function is run
 * @returns {Set} The updated set
 */
let addAndScheduleOnFirst = (set, state, fn, waitMs) => {
  // In a reactive UI library, scheduling is used to delay the execution of a function until after the current call stack has cleared.
  // This allows the UI to remain responsive while heavy computations are being performed.
  // Here, if the set is not defined, we schedule the function to run after a delay (waitMs) and initialize the set.
  // This is particularly useful when we want to batch updates to the UI, rather than performing them one at a time.
  // By scheduling, we ensure that the function will only be run once, after all state changes have been made.
  if (!set) {
    setTimeout(fn, waitMs);
    set = new Set();
  }
  set.add(state);
  return set;
}

/**
 * Runs a function and captures its dependencies
 * @param {Function} fn - The function to run
 * @param {Set} dependencies - The dependencies to capture
 * @param argument - The argument to pass to the function
 * @returns The result of the function
 */
let runAndCaptureDependencies = (fn, dependencies, argument) => {
  // Save the current dependencies to a temporary variable
  let previousDependencies = currentDependencies

  // Set the current dependencies to the dependencies passed to the function
  // This is done because we want to capture the dependencies of the function we are about to run
  // In a reactive UI library, dependencies are the states that a function relies on
  // When a state changes, all functions that depend on it need to be re-run
  // By capturing the dependencies, we can efficiently re-run only the necessary functions when a state changes
  currentDependencies = dependencies

  let result = argument
  // Try to run the function and capture any errors
  try {
    // Run the function with the argument and capture the result
    // While the function is running, any states that it accesses will be added to the current dependencies
    result = fn(argument)
  } catch (error) {
    // If an error occurs while running the function, log it to the console
    console.error(error)
  }

  // Restore the original current dependencies
  // This is done because this function could be called recursively
  // We want to ensure that the outer function's dependencies are not affected by the inner function's dependencies
  currentDependencies = previousDependencies

  // Return the result of the function
  // This could be a new state value, a DOM element, or any other value the function produces
  return result
}

/**
 * Filters a list to only include connected bindings
 * @param {Array} list - The list to filter
 * @returns {Array} The filtered list
 */
let keepConnected = list => {
  // In a reactive UI library, bindings are the connections between the state and the UI.
  // When a state changes, the UI updates automatically. This is done through bindings.
  // However, not all bindings are always needed. For example, if a UI element is removed from the DOM,
  // its bindings become unnecessary and keeping them can lead to memory leaks and incorrect behavior.
  // Therefore, we need to "keep bindings connected", which means we only keep the bindings that are still connected to the DOM.
  // This function filters a list of bindings and returns a new list that only includes the bindings that are still connected to the DOM.
  let connectedList = [];
  // Iterate over the list and add connected bindings to the connectedList
  for (let binding of list) {
    // Check if the binding's DOM element is still connected to the DOM
    if (binding._dom?.isConnected) {
      // If it is, add it to the connectedList
      connectedList.push(binding);
    }
  }
  // Return the list of connected bindings
  return connectedList;
}

/**
 * Adds a state to the garbage collection set
 * @param {Object} derive - The state to add
 *
 * @description
 * Keeping unnecessary states can lead to memory leaks and incorrect behavior. Therefore, we need to "add states to the garbage collector".
 * The garbage collector is a mechanism that periodically checks for unnecessary states and removes them, freeing up memory.
 * This function is a helper function that adds a state to the garbage collection set. The garbage collector will later check this set and remove any unnecessary states.
 */
let addStatesToGarbageCollect = (derive) => {
  statesToGarbageCollect = addAndScheduleOnFirst(statesToGarbageCollect, derive, garbageCollect, garbageCollectionCycleInMs);
}

/**
 * Performs garbage collection on the states in the garbage collection set
 *
 * Garbage collection is a crucial process in a reactive UI library. It helps manage memory by identifying and disposing of states that are no longer needed.
 * This function is a helper function that performs garbage collection on the states in the garbage collection set.
 * It iterates over the states in the garbage collection set, updates their bindings and listeners, and then clears the garbage collection set.
 */
let garbageCollect = () => {
  // Iterate over the states and update their bindings and listeners
  statesToGarbageCollect.forEach(state => {
    state._bindings = keepConnected(state._bindings);
    state._listeners = keepConnected(state._listeners);
  });
  // Clear the garbage collection set
  statesToGarbageCollect = undefined;
}

/**
 * @typedef {Object} StatePrototype
 * @property {function} val - Getter for the state value. If `currentDependencies` is defined, adds the state to it.
 * @property {function} oldVal - Getter for the old state value. If `currentDependencies` is defined, adds the state to it.
 * @property {function} val - Setter for the state value. If the new value is different from the current value, updates the state value, keeps only the connected listeners, derives the listeners, and schedules an update if there are bindings.
 *
 * @description
 * The prototype for state objects in a reactive UI library.
 * State objects are used to manage and track the state of the UI.
 * These state objects need to have certain properties and methods that allow them to interact with the rest of the library.
 * Instead of creating these properties and methods every time a new state object is created, we define them once in a prototype object.
 * This prototype object, `statePrototype`, is then used as the prototype for all state objects.
 * This approach has several benefits:
 * 1. It's more efficient: The properties and methods are stored in one place and are not duplicated for each state object.
 * 2. It's more maintainable: If we need to change the behavior of all state objects, we can do so by changing the prototype.
 * 3. It's more flexible: We can easily add new properties or methods to all state objects by adding them to the prototype.
 */
let statePrototype = {
  get val() {
    if (currentDependencies) {
      currentDependencies.add(this);
    }
    return this._val;
  },

  get oldVal() {
    if (currentDependencies) {
      currentDependencies.add(this);
    }
    return this._oldVal;
  },

  set val(value) {
    // If the value is the same as the current value, do nothing
    if (value === this._val) {
      return;
    }
    this._val = value;
    // Keep only the listeners that are still connected
    this._listeners = keepConnected(this._listeners);
    let listeners = [...this._listeners];
    // Iterate over the listeners and derive them
    for (let listener of listeners) {
      derive(listener.f, listener.s, listener._dom);
      listener._dom = undefined;
    }
    // If there are bindings, schedule an update, otherwise set the old value to the current value
    if (this._bindings.length) {
      changedStates = addAndScheduleOnFirst(changedStates, this, updateDoms);
    } else {
      this._oldVal = value;
    }
  },
}

/**
 * Creates a new state object
 * @param initialValue - The initial value of the state
 * @returns {Object} The new state object
 */
let state = (initialValue) => {
  let newState = Object.create(statePrototype);
  newState._val = initialValue;
  newState._oldVal = initialValue;
  newState._bindings = [];
  newState._listeners = [];
  return newState;
}

/**
 * Checks if an object is a state
 * @param {Object} state - The object to check
 * @returns {boolean} True if the object is a state, false otherwise
 */
let isState = state => {
  const prototypeOfState = Object.getPrototypeOf(state ?? 0);
  return prototypeOfState === statePrototype;
}

/**
 * Gets the value of a state
 * @param {Object} state - The state to get the value of
 * @returns The value of the state
 */
let val = state => {
  const stateValue = isState(state) ? state.val : state;
  return stateValue;
}

/**
 * Gets the old value of a state
 * @param {Object} state - The state to get the old value of
 * @returns The old value of the state
 */
let oldVal = state => {
  const oldStateValue = isState(state) ? state.oldVal : state;
  return oldStateValue;
}

/**
 * Binds a function to a DOM element
 * @param {Function} fn - The function to bind
 * @param {Object} dom - The DOM element to bind the function to
 * @returns The new DOM element
 */
let bind = (fn, dom) => {
  let dependencies = new Set();
  // Create a new binding object that holds the function to be bound
  let binding = {f: fn};
  let previousNewDerives = currentNewDerives;

  // Reset the current new derives
  currentNewDerives = [];
  // Run the function and capture its dependencies, passing the DOM element as an argument
  let newDom = runAndCaptureDependencies(fn, dependencies, dom);

  // If the new DOM is not defined or is not a node, create a new text node
  // We create a text node because it's the simplest form of a node that can hold text content.
  // This is useful in cases where the function does not return a valid DOM node, but returns a string or a number instead.
  // By creating a text node, we ensure that the returned value can be inserted into the DOM tree.
  newDom = (newDom ?? document).nodeType ? newDom : new Text(newDom);

  // For each dependency, add it to the garbage collection set and add the binding to its bindings
  dependencies.forEach(derive => {
    addStatesToGarbageCollect(derive);
    derive._bindings.push(binding);
  });

  // If there are new derives, set their DOM to the new DOM
  currentNewDerives.forEach(listener => {
    listener._dom = newDom;
  });

  currentNewDerives = previousNewDerives;

  return binding._dom = newDom;
}

/**
 * Creates a new derived state
 * @param {Function} fn - The function to derive the state from
 * @param {Object} state - The state to derive from
 * @returns {Object} The new derived state
 */
let derive = (fn, _state= state(), dom) => {
  let dependencies = new Set();
  let listener = {f: fn, s: _state};

  // If the DOM element is not defined, add the listener to the currentNewDerives array and set the DOM element to alwaysConnectedDom
  // Otherwise, set the DOM element to the provided DOM element
  listener._dom = dom ?? (currentNewDerives?.push(listener), alwaysConnectedDom);

  // Run the function to derive the state and capture its dependencies
  _state.val = runAndCaptureDependencies(fn, dependencies);

  // For each dependency, add it to the garbage collection set and add the listener to its listeners
  // The garbage collection set is used to keep track of states that are no longer needed and can be removed
  // Each derive has a list of listeners that are notified when the derive's state changes
  dependencies.forEach(derive => {
    addStatesToGarbageCollect(derive);
    derive._listeners.push(listener);
  });

  return _state;
}

/**
 * Adds children to a DOM element
 * @param {Object} dom - The DOM element to add children to
 * @param {...Object} children - The children to add
 * @returns {Object} The DOM element with the children added
 */
let add = (dom, ...children) => {
  // Flatten the children and iterate over them
  children.flat(Infinity).forEach(child => {
    let childNode;
    let prototypeOfChild = Object.getPrototypeOf(child ?? 0);

    // If the child is a state, bind it to a function that returns its value
    // If the child is a function, bind it to the function
    // Otherwise, the child is a node
    if (prototypeOfChild === statePrototype) {
      childNode = bind(() => child.val);
    } else if (prototypeOfChild === functionPrototype) {
      childNode = bind(child);
    } else {
      childNode = child;
    }

    // If the child node is defined, append it to the DOM
    if (childNode != undefined) {
      dom.append(childNode);
    }
  });
  return dom;
}

/**
 * Marks a function as a binding function. This is particularly useful when declaring a State-derived property for an on... event handler.
 * Without this, the provided function would be considered as the event handler itself, rather than the binding function for the State-derived property.
 * To avoid this, wrap the binding function with van._(...).
 * @param {Function} fn - The function to mark
 * @returns {Function} The marked function
 */
let _ = fn => {
  fn._isBindingfn = 1;
  return fn;
}

/**
 * Creates a namespace for tags.
 * @param {string} namespace - The namespace to create.
 * @returns {Proxy} A Proxy object that returns a function creating a DOM element with the given name and namespace.
 *
 * @description
 * This function is used to create a namespace for tags. It returns a Proxy object that intercepts and defines custom behavior for fundamental operations on objects.
 * The Proxy object is used here to allow for a more intuitive syntax when creating DOM elements.
 * Instead of calling a function with the tag name as an argument, you can use the tag name as a property on the namespace object.
 * This is achieved by defining a custom getter on the Proxy object that binds the tag name to the function that creates the DOM element.
 *
 * @example
 * // Typical usage
 * const { div } = van.tags
 */
let tagsNS = namespace => {
  // Create a new Proxy object
  return new Proxy((name, ...args) => {
    // Check if the first argument is an object
    // If the first argument is an object, it is considered as properties of the DOM element
    let firstArgIsObject = Object.getPrototypeOf(args[0] ?? 0) === objectPrototype;
    let properties = firstArgIsObject ? args[0] : {};

    // If the first argument is an object, the rest of the arguments are considered as children of the DOM element
    // Otherwise, all arguments are considered as children
    let children = firstArgIsObject ? args.slice(1) : args;

    // Create a new DOM element with the given name and namespace
    let dom = createDomElement(name, namespace);
    setProperties(dom, properties, name);

    // Add the children to the DOM element and return the DOM element
    return add(dom, ...children);
  }, {
    // Define a custom getter on the Proxy object
    // This getter binds the tag name to the function that creates the DOM element
    get: (tag, name) => tag.bind(undefined, name)
  });
}

/**
 * Creates a new DOM element
 * @param {string} name - The name of the element
 * @param {string} namespace - The namespace of the element
 * @returns {Object} The new DOM element
 */
let createDomElement = (name, namespace) => {
  return namespace ? document.createElementNS(namespace, name) : document.createElement(name)
}

/**
 * Sets properties on a DOM element
 * @param {Object} dom - The DOM element to set properties on
 * @param {Object} properties - The properties to set
 * @param {string} name - The name of the element
 */
let setProperties = (dom, properties, name) => {
  // Iterate over the properties and set them on the DOM
  for (let [key, value] of Object.entries(properties)) {
    let propSetter = getPropertySetter(dom, key, name)
    let setter = propSetter ? propSetter.bind(dom) : dom.setAttribute.bind(dom, key)
    let prototypeOfValue = Object.getPrototypeOf(value ?? 0)
    // If the value is a state, bind it to a function that sets the value on the DOM
    // If the value is a function and the key does not start with "on" or the function is a binding function, bind it to a function that sets the value on the DOM
    // Otherwise, set the value on the DOM
    if (prototypeOfValue === statePrototype) bind(() => (setter(value.val), dom))
    else if (prototypeOfValue === functionPrototype && (!key.startsWith("on") || value._isBindingfn))
      bind(() => (setter(value()), dom))
    else setter(value)
  }
}

/**
 * Gets the setter for a property on a DOM element
 * @param {Object} dom - The DOM element to get the setter from
 * @param {string} key - The key of the property
 * @param {string} name - The name of the element
 * @returns {Function} The setter for the property
 */
let getPropertySetter = (dom, key, name) => {
  let getPropDescriptor = prototype => prototype ?
    Object.getOwnPropertyDescriptor(prototype, key) ?? getPropDescriptor(Object.getPrototypeOf(prototype)) :
    undefined
  let cacheKey = name + "," + key
  // Return the cached setter or get the setter and cache it
  return propertySetterCache[cacheKey] ??
    (propertySetterCache[cacheKey] = getPropDescriptor(Object.getPrototypeOf(dom))?.set ?? 0)
}

/**
 * Replaces a DOM element with a new one
 * @param {Object} dom - The DOM element to replace
 * @param {Object} newDom - The new DOM element
 */
let replaceDom = (dom, newDom) => {
  // If the new DOM is defined and different from the current DOM, replace the current DOM with the new DOM
  // Otherwise, remove the current DOM
  if (newDom) {
    if (newDom !== dom) {
      dom.replaceWith(newDom);
    }
  } else {
    dom.remove();
  }
}

/**
 * Updates the DOM elements for changed states
 */
let updateDoms = () => {
  let changedStatesArray = Array.from(changedStates).filter(state => state._val !== state._oldVal);
  changedStates = undefined;

  // Get the bindings for the changed states
  let bindings = new Set(changedStatesArray.flatMap(state => {
    state._bindings = keepConnected(state._bindings);
    return state._bindings;
  }));

  // Replace the DOM for each binding with a new DOM bound to the binding's function
  for (let binding of bindings) {
    replaceDom(binding._dom, bind(binding.f, binding._dom));
    binding._dom = undefined;
  }

  // Set the old value of each changed state to its current value
  for (let state of changedStatesArray) {
    state._oldVal = state._val;
  }
}

/**
 * Hydrates a DOM element with a function
 * @param {Object} dom - The DOM element to hydrate
 * @param {Function} fn - The function to hydrate with
 */
let hydrate = (dom, fn) => {
  replaceDom(dom, bind(fn, dom));
}

/**
 * Exports the module's functions
 */
export default {add, _, bind, tags: tagsNS(), tagsNS, state, val, oldVal, derive, hydrate}
