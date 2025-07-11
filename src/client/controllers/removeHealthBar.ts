import { Controller, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Event } from "shared/eventLifecycle";

@Controller({})
export class RemoveHealthBar {
    /*
    The healthbar will already be displayed on the player's screen
    so it can be removed from the 3D viewport(from the local player's prespective)
    */

    @Event(Players.LocalPlayer.CharacterAdded)
    removeHealthBar(character: Model) {
        const head = character.WaitForChild("Head") as MeshPart;
        const healthBar = head.WaitForChild("HealthBar") as BillboardGui;
        
        healthBar.Destroy();
    }
}