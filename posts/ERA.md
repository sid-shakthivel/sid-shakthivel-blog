---
title: 'Easy Reading Assistant'
date: '2022-11-27'
---

### Premise

This article is about the process of writing a small ios application called ERA. The premise of ERA was to allow users to be able to scan or upload any document and be able to customise the reading experiance by for example changing font, background and font colour among other things.

### MVP

I decided to use `Swiftui` as is seemed simpler and modern compared to the dated `UIKit`. Whilst using react native would be interesting, having done plently of web development, I wanted to learn something brand new. The first step was making an MVP in which one would scan text, see the text and modify certain elements. Scanning text involves not only using the camera to capture an image but also using computer vision to perform OCR on the image to extract the exact text. Luckily apple has a view controller called `VNDocumentCameraViewController` which shows the document camera so it was a matter of showing this view when pressing a button.
Since swiftui is rather new, some views haven't been ported over so this must be done manually. To implement a view controller, it must be wrapped inside a `UIViewControllerRepresentable`. After this, it was as simple as looping through all the photos, and initiating a `VNRecognizeTextRequest`. However, I wanted to detect paragraphs. After thinking about the best way to do this, I settled on a simple algorithm: detect the spacing between each line of text and calculate the average, then loop through each line of text and if the spacing is considerably larger then the average, make it a new paragraph. To detect headings, I just checked the number of lines used (if 1 line heading else normal text).

### More development

A quick MVP is good, whats better? A proper app. From there I began creating the other main view: settings which would allow users to change colours, fonts, sizes, line spacing, etc. This involved creating a class and using `StateObject` along and passing it along using `EnvironmentObject` to contain user preferences. However this data wasn't persistent. I began investigating the best way to store this. At first, I looked into core data but it seemed overly complex, so I settled for UserDefaults in which data is seralised and stored within a small data dictionary. Why stop at just scanning documents... I began working on a more complex menu which could support the ability to upload documents too. 

### Feedback

After getting some feedback from others, I determined text to speech should exist too - why read when your iphone can read for you. This turned out to be surprisingly easy even with supporting multiple languages however it resulted in rather a long time being spent to make the play button auto close. The way I did this was making a custom class with a `@Published` and simply changing it's value like this as the class also contained a `AVSpeechSynthesizer`. 
```
func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didFinish utterance: AVSpeechUtterance) {
	isPlayingAudio = false
}
```

After browsing the app store, looking at competition, I decided to implement a simple canvas and edit tool to allow people to edit and annotate text to their liking and this had it's quirks too with a strange number of bugs when editing. It was fixed by adding logic to update text when the user had finished modifying text and having a temporary buffer. In short `TextEditor` is a massive pain to work with.

There's been some research into something called Bionic Reading in which it's easier for people to read when the first half of every word is bolded. This turned out to be another simplistic algorithm as LocalisedString's in swift use markdown so it was a matter of addding **inbe**tween words.

### Dictionary 

I wanted to work with an API this project, so what better for a reading app then an inbuilt dictionary. I was used to working with `fetch` in javascript, so making and parsing an API request seemed daunting however stack overflow came to the rescue detailing exactly how to do it. I ran into a few deserialisation bugs due to not having optional types but once those worked the dictionary worked perfectly. The API I used was https://dictionaryapi.dev/. 

### Core Data 

The final major feature I wanted to add was the ability to save work and this forced me to use core data but luckily this wasn't too complex. All I had to do was setup an entity and load it in. I used an array of transformable structs. Note that in order to update a transformable struct, it must be deleted and readded. From there, it was a matter of creating a new `File Explorer` view with a modal to edit and delete and piping `NavigationLinks` from the saved data. I ran into some weird bugs in which the Link didn't work but repositioning the `NavigationView` seemed to fix it. 

That's about it well apart from dark mode and perfecting the colours. Creating this app was quite fun and gave me a good knowledge into developing for ios, computer vision, user experiance and lot's of serialisation (unfortunately).