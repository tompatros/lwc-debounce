# lwc-debounce
A tiny utility class for debouncing input fields in LWCs.
## What is debounce?
The origin of "debounce" stems from devices that generate an electrical signal when two metal contacts touch with each other. A "bounce" occurs when these two contacts open or close, which could result in multiple signals being sent. "Debouncing" in these cases was the application of hardware or software corrections to ensure only one signal was sent.

A similar scenario can occur in web applications, primarily related to input fields such as a text field where a user may enter her name. The application may want to respond to the user's input to perhaps validate the text entered or send the value to a database or other service. However, the application doesn't care about _every single key_ the user presses to enter her name. Rather, it would prefer to operate more efficiently and only take action when the user appears to have stopped typing or clicking. In this case, debouncing is the act of programming an input component to perform a future action when a user appears to be finished with interacting with said input component.
## Why debounce?
Efficiency, mostly. It doesn't make sense to ask a server to do something when updated data is coming in right behind it (as in typing or multiple mouse clicks).
## Debounce Under the Hood
A typical debounce pattern involves `setTimeout` and `clearTimeout` calls in Javascript. When an event is handled (ex keypress), instead of immediately executing some function, the function is passed to a `setTimeout` call to run X milliseconds later. But if the same event is handled again, `clearTimeout` is called to cancel the previously-scheduled function, and then `setTimeout` is called again. This pattern continues until the event is no longer handled, and the most-recent `setTimeout` reaches its delayed interval of X milliseeconds.
## Why lwc-debounce?
I do a fair amount development on the Salesforce platform, including LWCs for custom UIs. There is no native debounce capability in LWC, and I got tired of writing one-off debounces, so I developed this small utility class to save my sanity.
## Using lwc-debounce  
1. Add lwc-debounce to your org. The `debounce` folder has the code and the `sample` folder includes sample implementations. If you want to test out the sample, grab `SampleController.cls` too, as it includes some aura-enabled methods that the `sample` component uses. Note: they are calls against Account objects, so you probably don't want to test the sample in production.

2. Import debounce.js into your LWC:
```
import Debounce from 'c/debounce';
```
3. Assign an instance of the Debounce class to a property of your LWC:
```
debounce = new Debounce();
```
4. Register debounces in your LWC's JS code in frequently-called event handlers (ex: "handleNameChange" on a text field) with the `Debounce` object's `register` method. The parameters are:

   1. `name (String)` - a unique name for your debounce. You can register multiple debounced methods in a single component, you just need to give them each a unique name for the `Debounce` object to manage them. 
   2. `method (Function)` - pass the function/method you want to call when the debounce interval is reached (see next parameter)
   3. `interval (Number)` - number of milliseconds to debounce and delay calling the method that's passed.

```
this.debounce.register('your_debounce_name', myDebouncedMethod, 3000);
```

> A note about the `method` parameter: you may need to keep track of your `this` reference with a `bind` call or similar. In the sample, the method passed looks like `this.call_updateDescription.bind(this)` because I pass a method of the current component as the debounced function. Note the `.bind(this)` to preserve the context of `this` in the debounce's logic. Without the reference, the method was undefined when called.

That's about it. I like this class because it doesn't get in the way of existing logic and has very limited responsibilities alongside other code. With all this in place, you should be on your way to debounce joy!