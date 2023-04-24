# VoiceGPT: ChatGPT web extension for voice to text

**Version 1.0.2**

This is a **very** early release of a fun side project I'm working on, it adds click to speak to ChatGPT.

<img width="858" alt="example of the extension working" src="https://user-images.githubusercontent.com/53788596/234129943-dcf5a3f7-5427-4480-a59d-f7ec6a6b271c.png">

## To install

- [Chrome Web Browser](https://chrome.google.com/webstore/detail/voicegpt/ibjjfclikmebdbiafbmhfpicbpkeolki)

## To run

Installing depedencies and dev build distribution:

```sh
yarn && yarn build:dev
```

Then:

- [Navigate to chrome://extensions](chrome://extensions)
- Enable developer mode
- Add unpacked
- Then select `./build` directory as the unpacked location.

## Considerations

> **Note**
> Automation isn't possible as ChatGPT is an authed journey, so the effort has to be made to ensure we have DOM integration tests that reflect user behavior and order of execution as closely as possible.

> **Warning**
> These sorts of projects are fragile by nature as they are wholly reliant on the state of the DOM and elements being available, so be conscious of this if things are broken.

Thanks for checking this out, this is purely a fun project for myself so feel free to fork, copy and paste code or whatever an MIT license allows - feedback is appreciated too & if you find things are broken be nice but do give me a bit of stick to fix it and I will try my best - or if you want to open a PR feel free to do so.

## Learnings

- Probably use Preact next, handling user events in vanilla JS can be a bit bothersome.
- The usage of `Map` within a singleton is a nice way to provide some state for synchronization.

Have a nice day :)
