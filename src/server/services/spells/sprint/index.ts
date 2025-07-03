import { Events, Functions } from "server/network";

import { Service, OnStart } from "@flamework/core";
import { Event } from "shared/eventLifecycle";
import { Players } from "@rbxts/services";
import { constants } from "./constants";

@Service({})
export class Sprint{
    sprintingPlayers: Player[] = [];

    @Event(Events.spells_sprint)
    beginSprinting(player: Player) {
        const stamina = player.WaitForChild("spellValues")?.FindFirstChild("stamina");
        const amount = stamina?.FindFirstChild("amount");
        const canReplenish = stamina?.FindFirstChild("canReplenish");

        const humanoid = player.Character?.WaitForChild("Humanoid");
        
        if (
            amount &&
            amount.IsA("NumberValue") &&
            canReplenish &&
            canReplenish.IsA("BoolValue") &&
            humanoid &&
            humanoid.IsA("Humanoid")
        ) {
            if (amount.Value > 0) {
                canReplenish.Value = false;
                this.sprintingPlayers.push(player);

                humanoid.WalkSpeed = constants.runSpeed;
                
                task.spawn(() => {
                    while(this.sprintingPlayers.find(p => p === player) && amount.Value > 0) {
                        amount.Value -= 1;
                        task.wait(constants.staminaDrainRate);
                    }

                    this.stopSprinting(player);
                })
            }
        }
    }

    @Event(Events.spells_stop_sprint)
    stopSprinting(player: Player) {
        if (!this.sprintingPlayers.find(p => p === player)) {return}

        const stamina = player.WaitForChild("spellValues")?.FindFirstChild("stamina");
        const canReplenish = stamina?.FindFirstChild("canReplenish");

        const humanoid = player.Character?.WaitForChild("Humanoid");
        if (
            humanoid &&
            humanoid.IsA("Humanoid") &&
            canReplenish &&
            canReplenish.IsA("BoolValue")
        ) {
            this.sprintingPlayers.remove(this.sprintingPlayers.findIndex(p => p === player));
            canReplenish.Value = true
            humanoid.WalkSpeed = constants.walkspeed
        }
    }
}