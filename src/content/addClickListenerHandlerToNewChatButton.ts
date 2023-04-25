import { getWrapperForm } from "./chat/chatgpt/text-field";
import { getButton } from "./chat/voicegpt/speech-input/element";
import { HandlerManager, timeToWaitForLoadMS } from "./HandlerManager";
import { submitHandler } from "./handleSubmitEvent";

export const addClickListenerHandlerToNewChatButton = () => {
    setTimeout(() => {
        const addNewChatButton = document.querySelector<HTMLAnchorElement>('nav > a');

        if (!addNewChatButton) {
            throw new Error('dont worry, chatgpt removed the add chat button or its changed please raise this as an issue!')
        }

        const newChatClickHandler = () => {
            console.log('(newChatClickHandler) new chat button clicked');
            setTimeout(() => {
                console.log('(newChatClickHandler) timeout hit, checking if new chat button clicked - ', HandlerManager.newChatButtonClicked)
                if (HandlerManager.newChatButtonClicked || getButton()) {
                    console.log('(newChatClickHandler) new chat button clicked or button already added, returning', HandlerManager.newChatButtonClicked, getButton());
                    return;
                }
    
                HandlerManager.setNewChatButtonClicked(true);
    
                // need to flush the listeners here - otherwise the navlinks you click their handlers get called.
                HandlerManager.clearAllNavLinkHandlers();
                HandlerManager.clearAllNavClickSpeechListeners();
    
                HandlerManager.addNewSpeechListenerToElOnTimeout(addNewChatButton);
    
                const form = getWrapperForm();
    
                if (!form) {
                    throw new Error('no form');
                }
    
                // submission events:
    
                // // enter button
                console.log('(newChatClickHandler) adding keydown listener to form', form);
                form.addEventListener('keydown', submitHandler)
    
                // alas not an actual type='submit' button hence why we have to do this.
                const submitButton = form.querySelector('button');
    
                if (!submitButton) {
                    throw new Error('no submit button found on form.')
                }
    
                // // click to submit

                console.log('(newChatClickHandler) adding click listener to submit button', submitButton);
                submitButton.addEventListener('click', submitHandler); 
            }, timeToWaitForLoadMS)           
        }

        addNewChatButton.addEventListener('click', newChatClickHandler);

        HandlerManager.newChatHandler = { newChatEl: addNewChatButton, onClickHandler: newChatClickHandler };
    }, timeToWaitForLoadMS)
}