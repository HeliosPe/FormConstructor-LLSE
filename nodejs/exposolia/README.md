# FormConstructor-LLSE

---------------------------------------------------------

### Description

Formiсraft is a library that will simplify your work with forms in your JavaScript/NodeJS plugin for LiteLoaderBDS.

---------------------------------------------------------

### Work in Progress

For now it supports only Simple Forms. Are planned for future also the support of the Modal and Custom Forms. The author is a lazy piece of..

---------------------------------------------------------

### How do I use it?

Import via require() the library to your plugin. Create an instance of the provided Form classes and use all the methods that you can check directly in the library file.

#### Example:
``` javascript
const { SimpleForm } = require("./FormConstructor");

let form = new SimpleForm();
form.setTitle("Нора");

//Add button with some text an image and no callback
form.addButton({
    content: "Вставить свой большой пистолет",
    image_path: "textures/items/stick.png"
});

//Add button with some text and a callback
form.addButton({
    content: "Залить полимеры",
    handler: () => { /* function body */ }
});

form.setOnClosedHandler(() => {
    player.sendText("Зачем ты меня закрылб мой сладкий! Я жду тебя, входи в меня почаще!");
});

form.sendForm(player);
```
