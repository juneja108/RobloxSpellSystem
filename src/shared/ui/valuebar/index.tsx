import { useEventListener } from "@rbxts/pretty-react-hooks";
import React, { useEffect, useState } from "@rbxts/react";

export interface ValueBarProps {
    text: string;
    colour: Color3;
    valueInstance: Instance,
    valueParam: "Name"; // then just input a string followed by `as "Name"` 
    maximumInstance: Instance,
    maximumParam: "Name"; // then just input a string followed by `as "Name"` 
}

export function ValueBar({ text, colour, valueInstance, maximumInstance, valueParam, maximumParam }: ValueBarProps) {
    const [h, s, v] = colour.ToHSV();

    const [value, setValue] = useState<number>(() => {
        const current = valueInstance as unknown as {[key: string]: number};
        return current[valueParam] ?? 0;
    })
    const [maximum, setMaximum] = useState<number>(() => {
        const current = maximumInstance as unknown as {[key: string]: number};
        return current[maximumParam] ?? 0;
    })

    useEventListener(valueInstance.GetPropertyChangedSignal(valueParam), () => {
        const current = valueInstance as unknown as {[key: string]: number};
        setValue(current[valueParam] ?? 0);
    })
    useEventListener(maximumInstance.GetPropertyChangedSignal(maximumParam), () => {
        const current = maximumInstance as unknown as {[key: string]: number};
        setValue(current[maximumParam] ?? 0);
    })

    return (
        <frame
            BackgroundColor3={Color3.fromHSV(h, s, v*0.75)}
            Size={UDim2.fromScale(1, 0.5)}
            BorderSizePixel={0}
        >  
            <frame
                BackgroundColor3={colour}
                Size={UDim2.fromScale(value / maximum, 1)}
                BorderSizePixel={0}
            />
            <textlabel
                Text={`  ${text}`}
                TextScaled={true}
                TextColor3={Color3.fromRGB(255, 255, 255)}
                ZIndex={999}
                Size={UDim2.fromScale(1, 1)} 
                TextXAlignment={"Left"}
                TextYAlignment={"Center"}
                BackgroundTransparency={1}
                BorderSizePixel={0}
            />
        </frame>
    );
}
