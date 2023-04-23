import { handleSpeechInput } from "./chat/voicegpt/speech-input/handlers";
import { addSpeechInputToForm } from "./chat/voicegpt/speech-input/setters";
import { HandlerManager, delayToAddSpeechButton, timeToWaitForLoadMS } from "./HandlerManager";

export const handleOnLoad = () => {
    setTimeout(() => {
        HandlerManager.clearAllNavClickSpeechListeners();

        const newChatLoad = setTimeout(() => { // wait for new page to load
            const speechButton = addSpeechInputToForm()!;
                
            const speechButtonHandler = handleSpeechInput(speechButton);

            // assumption, always has text content (observed).
            HandlerManager.speechHandlerMap.set('new-load', { speechButton, speechButtonHandler })
            clearTimeout(newChatLoad);
        }, delayToAddSpeechButton)
    }, timeToWaitForLoadMS)
}