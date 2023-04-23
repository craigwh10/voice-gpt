export const getWrapperForm = () => {
    return document.querySelector('form');
}

export const getInput = (): HTMLTextAreaElement | null => {
    return document.querySelector('form textarea');
}

export const getSendButton = (): HTMLButtonElement | null => {
    return document.querySelector('form textarea + button');
}