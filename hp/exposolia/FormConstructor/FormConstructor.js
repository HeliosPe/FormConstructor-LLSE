class SimpleForm{
    constructor(){
        this.title = "";
        this.content = "";
        this.buttons = new Array();
        this.onClosedHandler = () => {}
    }

    /**
    * @param {String} title The title of the form
    */
    setTitle(title){
        if(typeof title === "string") this.title = title;
        return this;
    }


    /**
    * @param {Button} button An instance of the Button, or an object {content: string, image_path: string, handler: function}
    */
    addButton(button){
        if(button instanceof Button) {
            this.buttons.push(button);
            return this;
        }
        this.buttons.push(new Button(button));
        return this;
    }

    /**
    * @param {String} content The content of the form
    */    
    setContent(content){
        if(typeof content === "string") this.content = content;
        return this;
    }

    /**
    * @param {String} additionalContent The content of the form to be added
    */    
    addContent(additionalContent){
        if(typeof additionalContent === "string") this.content += additionalContent;
        return this;
    }

    /**
    * @param {function} handler The action after the form been closed.
    */    
    setOnClosedHandler(handler){
        if(typeof handler === "function") this.onClosedHandler = handler;
        return this;
    }

    sendForm(player){
        let form = mc.newSimpleForm();
        form.setTitle(this.title);
        form.setContent(this.content)
        this.buttons.forEach(button => {
            if(button instanceof Button) {
                if(typeof button.image_path === "string") form.addButton(button.content, button.image_path);
                else form.addButton(button.content);  
            }
        });

        player.sendForm(form, (player, id) => {
            if(id == null) {
                this.onClosedHandler();
                return this;
            }
            if(this.buttons[id].handler != null){
                this.buttons[id].handler();
                return this;
            }
        });
    }
}

class Button{
    /**
    * @param {Object} obj The object {content: string, image_path: string, handler: function}
    */  
    constructor(obj){
        this.content = obj.content == null ? "" : obj.content;
        this.image_path = obj.image_path == null ? "" : obj.image_path;
        this.handler = obj.handler == null ? () => {} : obj.handler;
    }
    /**
    * @param {String} content The content of the button
    */ 
    setContent(content){
        this.content = content;
        return this;
    }

    /**
    * @param {String} path The URL to the image OR the path to the .png displayed on the button, relative to the root folfer of the resource pack
    */ 
    setImagePath(path){
        this.image_path = path;
        return this;
    }

    /**
    * @param {function} handler The function performing after this button been clicked
    */ 
    setHandler(handler){
        this.handler = handler;
        return this;
    }
}

module.exports = {
    SimpleForm,
    Button
}