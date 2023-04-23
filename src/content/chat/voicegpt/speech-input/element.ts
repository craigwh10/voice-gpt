export { speechInput, getButton, getError, getCircle, getForceStop };

const speechInput = `
    <div voicegpt-id="button-wrapper">
        <div voicegpt-id="circle" aria-label="if this is red it is recording, grey it is not"></div>
        <button voicegpt-id="button" aria-label="click this button to start speaking into the input field">Click to speak</button>
        <style>
            @keyframes flashcirclegpt-e4uurejk {
                0% {
                    background: red;
                }
                100% {
                    background: transparent;
                }
            }
            [voicegpt-id="button"] {
                font-size: 0.9rem;
                font-family: inherit;
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