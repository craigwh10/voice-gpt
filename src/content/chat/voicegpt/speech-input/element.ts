export { speechInput, getButton, getError, getCircle, getForceStop };

const speechInput = `
    <div voicegpt-id="voicegpt-wrapper">
        <div voicegpt-id="button-wrapper">
            <div voicegpt-id="circle" aria-label="if this is red it is recording, grey it is not"></div>
            <button voicegpt-id="button" aria-label="click this button to start speaking into the input field">Click to speak</button>
        </div>
        <div voicegpt-id="info-box">
            <p>Hey 👋, thanks for using VoiceGPT, please note this is an early alpha - so if things break, try refresh, if there's no luck then please raise an issue <a href="https://github.com/craigwh10/voice-gpt/issues" target="_blank" rel="noopener">here</a>.</p>
        </div>
        <style>
            @keyframes flashcirclegpt-e4uurejk {
                0% {
                    background: red;
                }
                100% {
                    background: transparent;
                }
            }
            @keyframes fadein-voicegpt {
                0% {
                    opacity: 0;
                }
                100% {
                    opacity: 1;
                }
            }
            [voicegpt-id="button"] {
                font-size: 0.9rem;
                font-family: inherit;
                color: white;
                line-height: 1;
                animation: fadein-voicegpt;
                animation-duration: 1s;
                animation-iteration-count: 1;
            }
            [voicegpt-id="info-box"] {
                flex: 8;
                display: flex;
                margin-left: 1.5rem;
                align-items: center;
                & p {
                    font-size: 0.8rem;
                }
                & a {
                    text-decoration: underline;
                }
            }
            [voicegpt-id="voicegpt-wrapper"] {
                flex: 12;
                display: flex;
                max-width: 48rem;
                margin: auto;
            }
            [voicegpt-id="button-wrapper"] {
                border: 1px solid #565869;
                flex-direction: row;
                background: rgba(0,0,0,0.3);
                border-radius: .375rem;
                padding: 0.725rem 1.5rem;
                flex: 4;
                display: flex;
                align-items: center;
                margin: 0.85rem 0em;
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
                color: #d29922;
                font-size: 0.8rem;
            }
            [voicegpt-id="error-box"] {
                margin: auto;
            }
        </style> 
    </div>
    <div voicegpt-id="error-box">
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