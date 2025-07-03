import { Controller, OnStart } from "@flamework/core";
import { Players, UserInputService } from "@rbxts/services";
import { Events } from "client/network";
import { Event } from "shared/eventLifecycle";

@Controller({})
export class Sprint {
    @Event(UserInputService.InputBegan)
    startSprinting(input: InputObject, gameProcessed: boolean) {
        if (gameProcessed) {return}
        if (input.KeyCode === Enum.KeyCode.LeftShift) {
            Events.spells_sprint.fire();
        }
    }
    
    @Event(UserInputService.InputEnded)
    stopSprinting(input: InputObject, gameProcessed: boolean) {
        if (gameProcessed) {return}
        if (input.KeyCode === Enum.KeyCode.LeftShift) {
            Events.spells_stop_sprint.fire()
        }
    }
}