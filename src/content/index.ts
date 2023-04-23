import { handleChatItemsClick } from "./handleChatItemsClick";
import { handleNewChatClick } from "./handleNewChatClick";
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
        // const urlOnInterval = window.location.href;

        setTimeout(() => {
            const urlOnPossibleLoad = window.location.href;

            if (isFirstRender && isOnlyBaseUrl() && !landedOnFirstPageHandled) { // If a user lands on chatgpt initial page.
                handleNewChatTextField();
                landedOnFirstPageHandled = true;
            }

            // On nav state state, we regenerate the handlers for nav items and new chat.
            if (urlOnPossibleLoad !== urlState) {
                isFirstRender = false;
                HandlerManager.clearAllNavLinkHandlers(); // as dom can reset
                HandlerManager.clearAllNavClickSpeechListeners(); // as dom can reset
                HandlerManager.clearNewChatHandler(); // so that on change we always have a fresh new chat handler
                HandlerManager.setNewChatButtonClicked(false);
                // additionally I'll need to clear all the click listeners from the dissapeared nav a's

                handleChatItemsClick();
                handleNewChatClick();
                urlState = urlOnPossibleLoad;
            }
        }, timeToWaitForLoadMS);
    })

    /**
     * PURELY ON LOAD ADD LISTENERS
     */
    handleChatItemsClick();

    // handleJustLoadedApp
    handleOnLoad();

    // captcha sitch
    // here I need to check if there is a <table> component, if there is then I dont run handleOnLoad, if there isnt a table on document then I run handleOnLoad

    // handleNewChatClick
    handleNewChatClick();
}

window.onbeforeunload = function () {
    HandlerManager.clearAllNavLinkHandlers(); // as dom can reset
    HandlerManager.clearAllNavClickSpeechListeners(); // as dom can reset
    HandlerManager.clearNewChatHandler(); // so that on change we always have a fresh new chat handler
    HandlerManager.setNewChatButtonClicked(false);
}