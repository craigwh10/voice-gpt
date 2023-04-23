import { getWrapperForm } from "../../chatgpt/text-field";
import { getButton, getCircle, getError, speechInput } from "./element";

export const addSpeechInputToForm = () => {
    const form = getWrapperForm();

    if (!form) {
        throw new Error('chatgpt does not contain the necessary form.')
    }

    const speechInputElement = document.createElement('div');

    speechInputElement.innerHTML = speechInput;
    speechInputElement.style.display = 'flex';
    speechInputElement.style.margin = 'auto';
    speechInputElement.style.flexDirection = 'column';
    speechInputElement.style.paddingTop = '1rem';
    speechInputElement.style.paddingBottom = '1rem';
    speechInputElement.style.background = '#1d1e20';

    form.parentElement?.appendChild(speechInputElement);

    return speechInputElement.querySelector('button');
}

export const resetButtonStylesToDefault = () => {
    const speakButtonEl = getButton();
    const circleEl = getCircle();

    if (speakButtonEl && circleEl) {
        speakButtonEl.textContent = 'Click to speak';
        circleEl.style.animationPlayState = 'paused';
        circleEl.style.backgroundColor = 'grey';
        circleEl.style.animationName = '';
    }
}

export const removeListenerFromSpeechButton = (handler: () => void) => {
    const speakButtonEl = getButton();

    if (!speakButtonEl) {
        throw new Error('cannot find speak button for voicegpt');
    }

    speakButtonEl.removeEventListener('click', handler);
}

export const addListenerToSpeechButton = (handler: () => void) => {
    const speakButtonEl = getButton();

    if (!speakButtonEl) {
        throw new Error('cannot find speak button for voicegpt');
    }

    speakButtonEl.addEventListener('click', handler);

    return handler;
}

export const setErrorMsgText = (msg: string) => {
    const error = getError();
    if (!error) {
        throw new Error('No error element to give error to.')
    }

    console.log('msg', msg);

    switch (msg) {
        case 'no-content':
            error.textContent = 'No speech heard, please try again.'
            return;
        case 'aborted':
            error.textContent = 'Voice listener aborted, please try again.'
            return;
        case 'network':
            error.textContent = 'Network issue, please try again.'
            return;
        case 'no-speech':
            error.textContent = 'No speech heard, please try again.'
            return;
        default:
            error.textContent = msg;
            return;
    }
}