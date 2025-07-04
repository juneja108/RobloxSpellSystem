import React from "@rbxts/react";

export interface ValueBarProps {
    text: string;
    colour: Color3;
    value: number;
    maximum: number;
}

export function ValueBar({ text, colour, value, maximum }: ValueBarProps) {
    const [colourHue, colourSaturation, colourValue] = colour.ToHSV();

    return (
        <frame
            BackgroundColor3={Color3.fromHSV(
                colourHue,
                colourSaturation,
                colourValue - 5
            )}
            Size={UDim2.fromScale(1, 0.5)}
        >  
            <frame
                BackgroundColor3={colour}
                Size={UDim2.fromScale(value / maximum, 1)}
            />
            <textlabel
                Text={`    ${text}`}
                TextScaled={true}
                TextColor3={Color3.fromRGB(255, 255, 255)}
                ZIndex={999}
                Size={UDim2.fromScale(1, 1)} 
                TextXAlignment={"Left"}
                TextYAlignment={"Center"}
                BackgroundTransparency={1}
            />
        </frame>
    );
}
