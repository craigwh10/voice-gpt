import { getWrapperForm } from "./chat/chatgpt/text-field";
import { submitHandler } from "./handleSubmitEvent";

export const handleNewChatTextField = () => {
    const form = getWrapperForm();
    
    if (!form) {
        throw new Error('no form');
    }

    // submission events:

    // // enter button
    console.log('(handleNewChatTextField) adding keydown listener to form', form);
    form.addEventListener('keydown', submitHandler)

    // alas not an actual type='submit' button hence why we have to do this.
    const submitButton = form.querySelector('button');

    if (!submitButton) {
        throw new Error('no submit button found on form.')
    }

    // // click to submit
    console.log('(handleNewChatTextField) adding click listener to submit button', submitButton);
    submitButton.addEventListener('click', submitHandler); 
}