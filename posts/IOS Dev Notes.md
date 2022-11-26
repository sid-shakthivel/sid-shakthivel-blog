---
title: 'IOS Dev Notes'
date: '2022-11-26'
---

A view is a piece of UI like a component and complex views are made out of multiple views.

There are a number of stacks including `ZStack` (allows views to overlap one another), `HStack` (Horizontal - useful for a menu bar), and `VStack` (vertical). There is spacing/padding automatically.

To customise a specific view, you can attach modifiers which can be chained. For example `Image()` has a number of modifiers including `.foregroundColour()` and `.font()`. Custom modifiers can be created by making an `Extension`. `Extensions` are used to add new functionality to an existing class.

Computed properties in enums can replace functions which can be useful at times like below:
```
enum days {
	case Monday
	Case Tuesday
	
	var dayType: String {
		self == .Monday ? "Bad Day": "Good Day"
	}
}

days.Monday.dayType // Bad Day
days.Tuesday.dayType // Good Day
```

Constants are defined with `let` and variables are defined with `var`. Since swift is dynamic yet strongly typed, at compile time, swift does check for correct types.

`@State` defines a mutable piece of data, when changed, it re-renders any component in which the data is used.
`@Binding` is like a pipeline in which you can update the property in one view and all other views will update. It declares a variable comes from a certain point

Modal views completely overlay a view and can be set by using the `sheet` modifer. For example, you can create some state which triggers the opening of a modal view and this can be useful for edit menues.

The `Form` container automatically adapts the appearance of controls when it renders on different platforms.
`Sections` are used semantically to create visual distinctions and chunk content together.

Data can be refered with or without a dollar prefix depending on whether the raw value needs to refered to or the binding like `showMenu` and `$showMenu`.

`UserDefaults` is used to store basic types which is a inbuilt data dictionary and it automatically loads when an app runs and this can be useful for saving user preferences like dark mode.

`EnvironmentObjects` are objects which views can use but they stay persistent even when the view is goes away.

`@StateObject` property wrapper is responsible for keeping an object alive and the type must be a class which inherits `ObservableObject`. Within this class, properties which should trigger updates must use the `@Published` property wrapper. For example:
```
public class Scan: ObservableObject {
	@Published var scannedTextList: [SavedParagraph]
	@Published var scannedText: String
}
```

