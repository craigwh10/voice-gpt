import { HandlerManager, delayToAddSpeechButton } from "./HandlerManager";
import { getInput } from "./chat/chatgpt/text-field";

export const submitHandler = (e: KeyboardEvent | MouseEvent) => {
    console.log('(submitHandler) submit handler hit, trying for event ', e);
    const addNewChatButton = document.querySelector<HTMLAnchorElement>('nav > a');

    if (!addNewChatButton) {
        throw new Error('panik, chatgpt removed the add chat button or its changed raise this as an issue!')
    }
    
    const input = getInput()!;

    console.log('(submitHandler) got input ', input)

    if (e instanceof MouseEvent && e.button === 0 && input.textContent!.length > 0) {
        console.log('(submitHandler) clicked button now adding el to form')
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
            console.log('(submitHandler) speech enter hit - adding speech listener to ', addNewChatButton);
            HandlerManager.addNewSpeechListenerToElOnTimeout(addNewChatButton, delayToAddSpeechButton * 2);
            setTimeout(() => {
                console.log('(submitHandler) removing event listeners');
                document.removeEventListener('click', submitHandler)
                document.removeEventListener('keypress', submitHandler)
            }, 2000)
            return;
        }

        if (e.key === 'Enter' && input.textContent!.length > 0) {
            console.log('(submitHandler) enter hit - adding speech listener to ', addNewChatButton);
            HandlerManager.addNewSpeechListenerToElOnTimeout(addNewChatButton, delayToAddSpeechButton * 2);
            setTimeout(() => {
                console.log('(submitHandler) removing event listeners');
                document.removeEventListener('click', submitHandler)
                document.removeEventListener('keypress', submitHandler)
            }, 2000)
        }

        return;
    }
}