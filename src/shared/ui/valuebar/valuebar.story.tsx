// sourced from https://ui-labs.luau.page/docs/stories/advanced/react#using-the-story-creator

import React from "@rbxts/react"
import ReactRoblox from "@rbxts/react-roblox"

import { CreateReactStory } from "@rbxts/ui-labs"
import { ValueBar, ValueBarProps } from "."

const controls = {
    text: "Health",
    colour: Color3.fromRGB(222, 28, 28),
    value: 50,
    maximum: 100
}

const props = controls as ValueBarProps

const story = CreateReactStory({
   react: React,
   reactRoblox: ReactRoblox,
   controls: controls,
}, () => {
   const component = <ValueBar {...props} />
   return component
})

export = story;