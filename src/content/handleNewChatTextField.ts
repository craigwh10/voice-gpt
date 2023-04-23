import { HandlerManager, delayToAddSpeechButton } from "./HandlerManager";
import { getInput, getWrapperForm } from "./chat/chatgpt/text-field";

export const handleNewChatTextField = () => {
    const addNewChatButton = document.querySelector<HTMLAnchorElement>('nav > a');

    console.log('addnewchat- adding click listener to', addNewChatButton)

    if (!addNewChatButton) {
        throw new Error('panik, chatgpt removed the add chat button or its changed raise this as an issue!')
    }

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
}