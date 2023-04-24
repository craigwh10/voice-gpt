import { getInput } from "../../chatgpt/text-field";
import { getButton, getCircle } from "./element";
import { setErrorMsgText, resetButtonStylesToDefault, addListenerToSpeechButton, removeListenerFromSpeechButton } from "./setters";

let forceToStop = false;
let isHoldingSpace = false;

export const handleSpeechInput = (buttonEl: HTMLButtonElement) => {
    console.log('(handleSpeechInput) adding listener to ', buttonEl);

    buttonEl.addEventListener('click', handleSpeech);

    window.addEventListener('keydown', (e: KeyboardEvent) => {
        // if user is unfocused on anything dont run below code
        if (document.activeElement !== document.body) return;

        console.log('key pressed', e.key);
        if (e.key === ' ') {
            buttonEl.removeEventListener('click', handleSpeech);
            isHoldingSpace = true;
            handleSpeech();
        }

        // make it so if they let go it cancels the speech
        window.addEventListener('keyup', (e: KeyboardEvent) => {
            if (e.key === ' ') {
                forceToStop = true;
                buttonEl.addEventListener('click', handleSpeech);
                resetButtonStylesToDefault();
            }
        }
    )
        
    });

    return handleSpeech;
}

let handleSpeechPaused = false;
const handleSpeech = () => {
    if (handleSpeechPaused) return;

    const SpeechRecognition = window?.SpeechRecognition || webkitSpeechRecognition
    const SpeechGrammarList = window?.SpeechGrammarList || window?.webkitSpeechGrammarList
    const recognition = new SpeechRecognition();

    var speechRecognitionList = new SpeechGrammarList();
    recognition.grammars = speechRecognitionList;

    const handleClickToStopVoice = () => {
        recognition.stop();
        removeListenerFromSpeechButton(handleClickToStopVoice);
    }

    if (forceToStop) {
        handleClickToStopVoice(); 
        forceToStop = false;
        isHoldingSpace = false;
    }

    recognition.start();

    recognition.onstart = () => {
        handleSpeechPaused = true;
        const inputField = getInput();
        const speakButton = getButton();
        if (inputField) {
            inputField.textContent = '';
            setErrorMsgText('');
            const circle = getCircle();

            if (circle && speakButton) {
                !isHoldingSpace && addListenerToSpeechButton(handleClickToStopVoice);
                speakButton.textContent = isHoldingSpace ? 'Let go of space to send' : 'Stop speaking or click here to send';
                circle.style.backgroundColor = 'red';
                circle.style.animationName = 'flashcirclegpt-e4uurejk';
                circle.style.animationPlayState = 'running';
            }
        }
    }

    recognition.onresult = (e: SpeechRecognitionEvent) => {
        const inputField = getInput();
        handleSpeechPaused = false;

        if (inputField) {
            const event = new Event('change');
            // enter is necessary as clicking the button does not trigger
            // (the button isn't enabled even after change-event).
            const enterKeyEvent = new KeyboardEvent('keydown', {
                bubbles: true,
                cancelable: true,
                keyCode: 13,
                which: 13,
                key: 'Enter',
                detail: 400, // 400 in this theoretical case is just a signal for speech event.
              });
            
            inputField.value = e.results[0][0].transcript;
            inputField.dispatchEvent(event);
            inputField.dispatchEvent(enterKeyEvent);
            removeListenerFromSpeechButton(handleClickToStopVoice);
            resetButtonStylesToDefault();
        }
    };

    recognition.onnomatch = (_e: SpeechRecognitionEvent) => {
        handleSpeechPaused = false;

        resetButtonStylesToDefault();
        setErrorMsgText('No result from speech, try again.');
        removeListenerFromSpeechButton(handleClickToStopVoice);
    }

    recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
        handleSpeechPaused = false;

        setErrorMsgText(e.error);
        resetButtonStylesToDefault();
        removeListenerFromSpeechButton(handleClickToStopVoice);
    }

    recognition.onaudioend = () => {
        handleSpeechPaused = false;

        removeListenerFromSpeechButton(handleClickToStopVoice);
        recognition.stop();
    }
}
