import { getInput, getWrapperForm } from "./chat/chatgpt/text-field";
import { getButton } from "./chat/voicegpt/speech-input/element";
import { delayToAddSpeechButton, HandlerManager, timeToWaitForLoadMS } from "./HandlerManager";

export const handleNewChatClick = () => {
    setTimeout(() => {
        const addNewChatButton = document.querySelector<HTMLAnchorElement>('nav > a');

        console.log('addnewchat- adding click listener to', addNewChatButton)

        if (!addNewChatButton) {
            throw new Error('dont worry, chatgpt removed the add chat button or its changed please raise this as an issue!')
        }

        const newChatClickHandler = () => {
            setTimeout(() => {
                console.log('clicked new chat button');

                if (HandlerManager.newChatButtonClicked || getButton()) {
                    console.log('not doing new chat handler has already clicked or has speech thang there (possibly from a load).')
                    return;
                }
    
                HandlerManager.setNewChatButtonClicked(true);
    
                // need to flush the listeners here - otherwise the navlinks you click their handlers get called.
    
                HandlerManager.clearAllNavLinkHandlers();
    
                HandlerManager.clearAllNavClickSpeechListeners();
    
    
                console.log('adding new listener to (because of click on new chat) - ', addNewChatButton);
                HandlerManager.addNewSpeechListenerToElOnTimeout(addNewChatButton);
    
                const form = getWrapperForm();
    
                if (!form) {
                    throw new Error('no form');
                }
    
               const submitHandler = (e: KeyboardEvent | MouseEvent) => {
                    console.log('submit handler hit, trying for event - ', e);
                    const input = getInput()!;
            
                    console.log('submit handler - input - ', input)
            
                    if (e instanceof MouseEvent && e.button === 0 && input.textContent!.length > 0) {
                        console.log('hit the button now adding el to form')
                        HandlerManager.addNewSpeechListenerToElOnTimeout(addNewChatButton, delayToAddSpeechButton * 2);
                        setTimeout(() => {
                            document.removeEventListener('click', submitHandler)
                            document.removeEventListener('keypress', submitHandler)
                        }, 2000)
            
                        return;
                    }
            
                    if (e instanceof KeyboardEvent ) {
                        // 400 is the code for speech input referenced in handlers for chatgpt
                        // used detail as it's not used for KeyboardEvent, and we still need Enter key to submit.
                        if (e.key === 'Enter' && e.detail === 400) {
                            console.log('hit speech enter now adding el to form')
                            HandlerManager.addNewSpeechListenerToElOnTimeout(addNewChatButton, delayToAddSpeechButton * 2);
                            setTimeout(() => {
                                document.removeEventListener('click', submitHandler)
                                document.removeEventListener('keypress', submitHandler)
                            }, 2000)
                            return;
                        }
            
                        if (e.key === 'Enter' && input.textContent!.length > 0) {
                            console.log('hit enter now adding el to form')
                            HandlerManager.addNewSpeechListenerToElOnTimeout(addNewChatButton, delayToAddSpeechButton * 2);
                            setTimeout(() => {
                                document.removeEventListener('click', submitHandler)
                                document.removeEventListener('keypress', submitHandler)
                            }, 2000)
                        }
            
                        return;
                    }
                }
    
                // submission events:
    
                // // enter button
                form.addEventListener('keydown', submitHandler)
    
                // alas not an actual type='submit' button hence why we have to do this.
                const submitButton = form.querySelector('button');
    
                if (!submitButton) {
                    throw new Error('no submit button found on form.')
                }
    
                // // click to submit
                submitButton.addEventListener('click', submitHandler); 
            }, timeToWaitForLoadMS)           
        }

        addNewChatButton.addEventListener('click', newChatClickHandler);

        HandlerManager.newChatHandler = { newChatEl: addNewChatButton, onClickHandler: newChatClickHandler };
    }, timeToWaitForLoadMS)
}