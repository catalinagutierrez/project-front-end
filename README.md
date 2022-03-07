# Web Dev Project Front End

This is the front end for CS5610 class. It contains

### Redux

The general files for redux consist of:

- store is the container that applies middleware and exports the state
- root-reducer is the file where all the sections of the state come together into one reducer that combines them.

Context-specific files:

- actions.js is a file that defines what that reducer can do. It specifies the arguments, type and payload for each.
- reducer.js is where the state is mutated and returned depending on the action that fired. It contains an INITIAL_STATE that is always loaded when the application first instantiates it.
- selectors.js breaks down the state into smaller value sets so that components that are subscribed to that state but not that particular attribute don't get rerendered every time.
- types.js is a file that defines the action types in order to avoid spelling mistakes.
- utils.js is a file that add an intermediary functionality to an action so that actions themselves are more reusable.

- Redux persist in order to store our state in the local storage of the browser so that the user doesn't delete everything if the page refreshes.
