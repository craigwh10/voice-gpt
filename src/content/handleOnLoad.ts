import { handleSpeechInput } from "./chat/voicegpt/speech-input/handlers";
import { addSpeechInputToForm } from "./chat/voicegpt/speech-input/setters";
import { HandlerManager, delayToAddSpeechButton, timeToWaitForLoadMS } from "./HandlerManager";

export const handleOnLoad = () => {
    setTimeout(() => {
        HandlerManager.clearAllNavClickSpeechListeners();
        console.log(`(handleOnLoad) loaded`);

        const newChatLoad = setTimeout(() => { // wait for new page to load
            console.log(`(handleOnLoad) adding speechButton`);

            const speechButton = addSpeechInputToForm()!;
                
            const speechButtonHandler = handleSpeechInput(speechButton);

            // assumption, always has text content (observed).
            console.log(`(handleOnLoad) adding handler to `, speechButton);

            HandlerManager.speechHandlerMap.set('new-load', { speechButton, speechButtonHandler })
            clearTimeout(newChatLoad);
        }, delayToAddSpeechButton)
    }, timeToWaitForLoadMS)
}