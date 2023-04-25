import { addClickListenerHandlersToChatItems } from "./addClickListenerHandlersToChatItems";
import { addClickListenerHandlerToNewChatButton } from "./addClickListenerHandlerToNewChatButton";
import { handleNewChatTextField } from "./handleNewChatTextField";
import { handleOnLoad } from "./handleOnLoad";
import { HandlerManager, timeToWaitForLoadMS } from "./HandlerManager";

console.log = process.env.NODE_ENV === 'development' ? console.log : () => {}

const isOnlyBaseUrl = () => {
    const url = window.location.href;

    if (url.includes('/c/')) {
        return false;
    }

    if (url.includes('?model=')) {
        return true;
    }

    return true;
}

window.onload = function () {
    let isFirstRender = true;
    let landedOnFirstPageHandled = false;
    /**
     * Using events over purely href's is my preferred way forward
     * as purely using href's feels fragile and is overtly complex to think around.
     */
    let urlState = window.location.href;
    setInterval(() => {
        setTimeout(() => {
            const urlOnPossibleLoad = window.location.href;

            const userLandsOnFirstPage = isFirstRender && isOnlyBaseUrl() && !landedOnFirstPageHandled;
            if (userLandsOnFirstPage) {
                console.log('(onload) user landed on first page, handling new chat');
                handleNewChatTextField();
                landedOnFirstPageHandled = true;
            }

            // On nav state state, we regenerate the handlers for nav items and new chat.
            const urlChanged = urlOnPossibleLoad !== urlState;
            if (urlChanged) {
                console.log('(onload) url changed, regenerating handlers');
                isFirstRender = false;
                HandlerManager.clearAllNavLinkHandlers(); // as dom can reset
                HandlerManager.clearAllNavClickSpeechListeners(); // as dom can reset
                HandlerManager.clearNewChatHandler(); // so that on change we always have a fresh new chat handler
                HandlerManager.setNewChatButtonClicked(false); // to allow user to click new button again if this is valid

                addClickListenerHandlersToChatItems();
                addClickListenerHandlerToNewChatButton();
                urlState = urlOnPossibleLoad;
            }
        }, timeToWaitForLoadMS);
    })

    /**
     * PURELY ON LOAD PAGE
     */
    addClickListenerHandlersToChatItems();
    handleOnLoad();
    addClickListenerHandlerToNewChatButton();
}

window.onbeforeunload = function () {
    console.log('(onbeforeunload) clearing all handlers');
    HandlerManager.clearAllNavLinkHandlers();
    HandlerManager.clearAllNavClickSpeechListeners();
    HandlerManager.clearNewChatHandler();
    HandlerManager.setNewChatButtonClicked(false);
}