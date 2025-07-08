import { Controller, OnStart } from "@flamework/core";
import { UserInputService } from "@rbxts/services";
import { Events } from "client/network";
import { Event } from "shared/eventLifecycle";

@Controller({})
export class Cloak {
    @Event(UserInputService.InputBegan) 
    cloak(input: InputObject, gameProcessed: boolean) {
        if (gameProcessed) {return};
        if (input.KeyCode = Enum.KeyCode.Q) { 
            Events.spells_cloak()
        }
    }
}