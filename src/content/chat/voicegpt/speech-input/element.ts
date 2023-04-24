export { speechInput, getButton, getError, getCircle, getForceStop };

export const defaultButtonHTML = `Click or hold <kbd voicegpt-id="keyboard">space</kbd> to speak`;

const speechInput = `
    <div voicegpt-id="button-wrapper">
        <div voicegpt-id="circle" aria-label="if this is red it is recording, grey it is not"></div>
        <button voicegpt-id="button" aria-label="click this button or hold space to start speaking into the input field">${defaultButtonHTML}</button>
        <style>
            @keyframes flashcirclegpt-e4uurejk {
                0% {
                    background: red;
                }
                100% {
                    background: transparent;
                }
            }
            [voicegpt-id="keyboard"] {
                background-color: rgb(238, 238, 238);
                border-radius: 3px;
                border: 1px solid rgb(180, 180, 180);
                box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 1px, rgba(255, 255, 255, 0.7) 0px 2px 0px 0px inset;
                color: rgb(51, 51, 51);
                display: inline-block;
                font-weight: 700;
                font-size: 0.7rem;
                line-height: 1;
                padding: 0px 2px 2px 2px;
                white-space: nowrap;
                margin-left: 4px;
                margin-bottom: 2px;
                vertical-align: middle;
                margin-right: 4px;
                font-family: inherit;
            }
            [voicegpt-id="button"] {
                font-size: 0.9rem;
                font-family: inherit;
                color: white;
            }
            [voicegpt-id="button-wrapper"] {
                border: 1px solid #565869;
                display: flex;
                flex-direction: row;
                align-items:center;
                background: rgba(0,0,0,0.3);
                border-radius: .375rem;
                padding: .425rem 1.2rem;
                margin: auto;
            }
            [voicegpt-id="circle"] {
                animation-duration: 2s;
                animation-iteration-count: infinite;
                animation-play-state: paused;
                width: 10px;
                height: 10px;
                background: grey;
                margin-right: 8px;
                border-radius: 100px;
            }
            [voicegpt-id="error"] {
                color: red;
            }
        </style> 
    </div>
    <div style='margin: auto;'>
        <p voicegpt-id="error" aria-label="displays the warning from the voicegpt extension"></p>
    </div>
`

const getButton = (): HTMLButtonElement | null => {
    return document.querySelector('button[voicegpt-id="button"]');
}

const getCircle = (): HTMLDivElement | null => {
    return document.querySelector('div[voicegpt-id="circle"]')
}

const getError = (): HTMLParagraphElement | null => {
    return document.querySelector('p[voicegpt-id="error"]')
}

const getForceStop = (): HTMLButtonElement | null => {
    return document.querySelector('button[voicegpt-id="force-stop"]')
}