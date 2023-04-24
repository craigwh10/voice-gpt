import { handleSpeechInput } from "./chat/voicegpt/speech-input/handlers";
import { addSpeechInputToForm } from "./chat/voicegpt/speech-input/setters";

interface Helpers {
    speechHandlerMap: Map<string, {timeout?: any, speechButton: HTMLButtonElement, speechButtonHandler: () => void}>,
    navLinkHandlerMap: Map<string, {navEl: HTMLAnchorElement, onClickHandler: () => void, wasClicked: boolean}>,
    newChatHandler: {newChatEl: HTMLAnchorElement, onClickHandler: () => void} | null,
    newChatButtonClicked: boolean,
    setNewChatButtonClicked: (this: Helpers, val: boolean) => void,
    clearNewChatHandler: (this: Helpers) => void,
    clearAllNavClickSpeechListeners: (this: Helpers) => void,
    clearAllNavLinkHandlers: (this: Helpers) => void,
    addNewSpeechListenerToElOnTimeout: (this: Helpers, el: HTMLAnchorElement, timeout?: number) => void,
    clearJustLoadedListener: (this: Helpers) => void,
    hasVGPTListenersOnNavButtons: () => boolean,
}

// Shared constants for timing
export const timeToWaitForLoadMS = 800;
export const delayToAddSpeechButton = 1200;

/**
 * This in effect is the brain of the navigation portion of the extension and holds state and mutators.
 */
export const HandlerManager: Helpers = {
    speechHandlerMap: new Map(),
    navLinkHandlerMap: new Map(),
    newChatHandler: null,
    newChatButtonClicked: false,
    setNewChatButtonClicked: function (val) {
        console.log(`(setNewChatButtonClicked)`, val);
        this.newChatButtonClicked = val;
    },
    clearNewChatHandler: function () {
        console.log(`(clearNewChatHandler)`, this.newChatHandler);
        this.newChatHandler?.newChatEl.removeEventListener('click', this.newChatHandler.onClickHandler);
    },
    clearAllNavClickSpeechListeners: function () {
        Array.from(this.speechHandlerMap.entries()).forEach(([key, handler]) => {
            console.log(`(clearAllNavClickSpeechListeners) individual-item`, handler, key);
            handler.speechButton.removeEventListener('click', handler.speechButtonHandler);
            this.speechHandlerMap.delete(key);
        })
    },
    clearAllNavLinkHandlers: function () {
        Array.from(this.navLinkHandlerMap.entries()).forEach(([key, handler]) => {
            console.log(`(clearAllNavLinkHandlers) individual-item`, handler, key);
            handler.navEl.removeEventListener('click', handler.onClickHandler);
            this.navLinkHandlerMap.delete(key);
        })
    },
    addNewSpeechListenerToElOnTimeout: function (el, timeout = delayToAddSpeechButton) {
        console.log(`(addNewSpeechListenerToElOnTimeout) trying`, el, timeout);
        const newChatLoad = setTimeout(() => { // wait for new page to load
            const speechButton = addSpeechInputToForm()!;
            const speechButtonHandler = handleSpeechInput(speechButton);
            console.log(`(addNewSpeechListenerToElOnTimeout) added to`, speechButton);

            // assumption, always has text content (observed).
            this.speechHandlerMap.set(el.textContent!, { speechButton, speechButtonHandler })
            console.log(`(addNewSpeechListenerToElOnTimeout) set handler for`, el.textContent!);
            clearTimeout(newChatLoad);
        }, timeout)
    },
    hasVGPTListenersOnNavButtons: function () {
        return document.querySelectorAll('[has-vgpt-listener="true"]').length > 0;
    },
    clearJustLoadedListener: function () {
        const handlerRes = this.speechHandlerMap.get('new-load');
    
        handlerRes?.speechButton.removeEventListener('click', handlerRes.speechButtonHandler);
        
        console.log(`(clearJustLoadedListener) event listener and handler removed for `, handlerRes?.speechButton);

        this.speechHandlerMap.delete('new-load');
    }
}