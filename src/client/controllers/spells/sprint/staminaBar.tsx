import { Service, OnStart, Controller } from "@flamework/core";
import React from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Players } from "@rbxts/services";
import { Events } from "client/network";
import { Event } from "shared/eventLifecycle";
import { ValueBar } from "shared/ui/valuebar";
import { createBillBoardGUI } from "shared/ui/valuebar/createBillBoardGUI";

@Controller()
export class StaminaBar {
    staminaBar: BillboardGui | undefined;

    @Event(Events.response_spells_started_sprinting)
    showStaminaBar() { 
        const character = Players.LocalPlayer.Character;
        const UpperTorso = character?.WaitForChild("UpperTorso");

        const stamina = Players.LocalPlayer.FindFirstChild("spellValues")?.FindFirstChild("stamina")
        const amount = stamina?.FindFirstChild("amount")
        const max = stamina?.FindFirstChild("max")

        if (
            UpperTorso && 
            UpperTorso.IsA("MeshPart") &&
            amount &&
            amount.IsA("NumberValue") &&
            max &&
            max.IsA("NumberValue")
        ) {
            this.staminaBar = createBillBoardGUI(new Vector3(5, -1, 0));
            this.staminaBar.Parent = UpperTorso
            this.staminaBar.Name = "staminaBar";
            this.staminaBar.Adornee = UpperTorso;

            const root = createRoot(new Instance("Folder"));
            root.render(createPortal(
                <ValueBar
                    text="STAMINA"
                    colour={Color3.fromRGB(203, 203, 13)}
                    valueInstance={amount}
                    valueParam={"Value" as "Name"}
                    maximumInstance={max}
                    maximumParam={"Value" as "Name"}
                />,
                this.staminaBar
            ))
        }
    }

    @Event(Events.response_spells_stopped_sprinting)
    hideStaminaBar() { 
        if (this.staminaBar) { 
            task.wait(2);
            this.staminaBar.Destroy();
        }
    }
}