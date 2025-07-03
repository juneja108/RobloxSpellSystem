/*
Manages values that are used in spells:
    - Stamina
    - Mana
Data Structure:
player
    spellValues (folder)
        stamina (folder)
            max (NumberValue)
            amount  (NumberValue)
            canReplenish (BoolValue)
        mana    (folder)
            max (NumberValue)
            amount  (NumberValue)
            canReplenish (BoolValue)
*/

import { OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Event } from "shared/eventLifecycle";

@Service({})
export class ValueHandler implements OnStart{
    onStart(): void {
        task.spawn(() => {
            while(true) {
                for (const player of Players.GetPlayers()) {
                    const spellValues = player.FindFirstChild("spellValues");
                    
                    const stamina = spellValues?.FindFirstChild("stamina");
                    const amountStamina = stamina?.FindFirstChild("amount")
                    const maxStamina =  stamina?.FindFirstChild("max")
                    const canReplenishStamina = stamina?.FindFirstChild("canReplenish")

                    const mana = spellValues?.FindFirstChild("mana");
                    const amountMana = mana?.FindFirstChild("amount");
                    const maxMana = mana?.FindFirstChild("max");
                    const canReplenishMana = mana?.FindFirstChild("canReplenish");

                    if (
                        amountStamina &&
                        amountStamina.IsA("NumberValue") &&
                        maxStamina && 
                        maxStamina.IsA("NumberValue") &&
                        canReplenishStamina &&
                        canReplenishStamina.IsA("BoolValue") &&
                        amountMana &&
                        amountMana.IsA("NumberValue") &&
                        maxMana && 
                        maxMana.IsA("NumberValue") &&
                        canReplenishMana &&
                        canReplenishMana.IsA("BoolValue")
                    ) {
                        if (canReplenishStamina.Value === true && amountStamina.Value < maxStamina.Value) {
                            amountStamina.Value += 1
                        }
                        if (canReplenishMana.Value === true && amountMana.Value < maxMana.Value) {
                            amountMana.Value += 1
                        }
                    }
                }

                task.wait(1);
            }
        })
    }
    
    @Event(Players.PlayerAdded)
    playerAdded(player: Player) {
        const spellValues = new Instance("Folder", player);
        spellValues.Name = "spellValues";

        // STAMINA DECLERATIONS
        const stamina = new Instance("Folder", spellValues)
        stamina.Name = "stamina"

        const maxStamina = new Instance("NumberValue", stamina);
        maxStamina.Name = "max";
        maxStamina.Value = 100;

        const amountStamina = new Instance("NumberValue", stamina);
        amountStamina.Name = "amount";
        amountStamina.Value = maxStamina.Value;

        const canReplenishStamina = new Instance("BoolValue", stamina);
        canReplenishStamina.Name = "canReplenish";
        canReplenishStamina.Value = true;

        // MANA DECLERATIONS
        const mana = new Instance("Folder", spellValues)
        mana.Name = "mana"

        const maxMana = new Instance("NumberValue", mana);
        maxMana.Name = "max";
        maxMana.Value = 25;

        const amountMana = new Instance("NumberValue", mana);
        amountMana.Name = "amount"
        amountMana.Value = maxMana.Value
        
        const canReplenishMana = new Instance("BoolValue", mana);
        canReplenishMana.Name = "canReplenish";
        canReplenishMana.Value = true;
    }
}
