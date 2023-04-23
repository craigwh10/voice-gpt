import { HandlerManager, timeToWaitForLoadMS } from "./HandlerManager";
import { getButton } from "./chat/voicegpt/speech-input/element";

export const handleChatItemsClick = () => {
    setTimeout(() => {
        const chatGptNavigationChatList = document.querySelectorAll<HTMLAnchorElement>('nav > div:first-of-type a');
        console.log('adding nav item click listeners');

        const onClickNavChatListHandler = (chatNavigationEl: HTMLAnchorElement) => {
            setTimeout(() => {
                console.log('tryna click nav chat list item')
                const existingHandlerMap = HandlerManager.navLinkHandlerMap.get(chatNavigationEl.textContent!);
                const wasClickedAlready = existingHandlerMap?.wasClicked === true
                console.log('tryna click chatlisthandler - ', {wasClickedAlready, button: getButton() })
                if (wasClickedAlready || getButton()) {
                    console.log('not allowing the click because', {wasClickedAlready, button: getButton() })
                    return; // do not allow duplicate clicks
                }
    
                // set to not allow duplicate clicks.
                HandlerManager.navLinkHandlerMap.set(chatNavigationEl.textContent!, {...existingHandlerMap!, wasClicked: true});
    
                // clear others.
                chatGptNavigationChatList.forEach((navitem) => navitem.removeAttribute('vgpt-active-tab'));
    
                // set this as active if clicked
                chatNavigationEl.setAttribute('vgpt-active-tab', 'true'); // mainly for debugging purposes.
                console.log('clicked nav item in list');
    
                // clear all existing speech handlers for cleanup.
                HandlerManager.clearAllNavClickSpeechListeners();
    
                HandlerManager.addNewSpeechListenerToElOnTimeout(chatNavigationEl);
            }, timeToWaitForLoadMS)
        }

        chatGptNavigationChatList.forEach((chatNavigationEl) => {
            chatNavigationEl.setAttribute('has-vgpt-listener', 'true');
            const individualChatLinkHandler = () => onClickNavChatListHandler(chatNavigationEl);

            chatNavigationEl.addEventListener('click', individualChatLinkHandler);

            // set the state that this handler has been registered.
            HandlerManager.navLinkHandlerMap.set(chatNavigationEl.textContent!, { navEl: chatNavigationEl, onClickHandler: individualChatLinkHandler, wasClicked: false })
        })
    }, timeToWaitForLoadMS);
}