import { HandlerManager, timeToWaitForLoadMS } from "./HandlerManager";
import { getButton } from "./chat/voicegpt/speech-input/element";

export const handleChatItemsClick = () => {
    setTimeout(() => {
        const chatGptNavigationChatList = document.querySelector<HTMLAnchorElement>('nav a:nth-of-type(2)')?.parentElement?.querySelectorAll('a');

        if (!chatGptNavigationChatList) {
            throw new Error('dont worry, chatgpt removed the add chat button or its changed please raise this as an issue!')
        }

        const onClickNavChatListHandler = (chatNavigationEl: HTMLAnchorElement) => {
            console.log('(onClickNavChatListHandler) clicked nav chat list item ', chatNavigationEl)
            setTimeout(() => {
                const existingHandlerMap = HandlerManager.navLinkHandlerMap.get(chatNavigationEl.textContent!);
                const wasClickedAlready = existingHandlerMap?.wasClicked === true;

                console.log('(onClickNavChatListHandler) deciding whether to ', chatNavigationEl, { wasClickedAlready, button: getButton() });
                if (wasClickedAlready || getButton()) {
                    console.log('(onClickNavChatListHandler) not allowing the click because', {wasClickedAlready, button: getButton() })
                    return; // do not allow duplicate clicks
                }
    
                // set to not allow duplicate clicks.
                HandlerManager.navLinkHandlerMap.set(chatNavigationEl.textContent!, {...existingHandlerMap!, wasClicked: true});
    
                // clear others.
                chatGptNavigationChatList.forEach((navitem) => navitem.removeAttribute('vgpt-active-tab'));
    
                // set this as active if clicked
                chatNavigationEl.setAttribute('vgpt-active-tab', 'true'); // mainly for debugging purposes.
    
                // clear all existing speech handlers for cleanup.
                HandlerManager.clearAllNavClickSpeechListeners();
    
                console.log('(onClickNavChatListHandler) adding new speech listener to ', chatNavigationEl);
                HandlerManager.addNewSpeechListenerToElOnTimeout(chatNavigationEl);
            }, timeToWaitForLoadMS)
        }

        console.log('(handleChatItemsClick) adding click listener to', chatGptNavigationChatList);
        chatGptNavigationChatList.forEach((chatNavigationEl) => {
            chatNavigationEl.setAttribute('has-vgpt-listener', 'true');
            const individualChatLinkHandler = () => onClickNavChatListHandler(chatNavigationEl);

            chatNavigationEl.addEventListener('click', individualChatLinkHandler);

            // set the state that this handler has been registered.
            HandlerManager.navLinkHandlerMap.set(chatNavigationEl.textContent!, { navEl: chatNavigationEl, onClickHandler: individualChatLinkHandler, wasClicked: false })
        })
    }, timeToWaitForLoadMS);
}