import { Service, OnStart } from "@flamework/core";
import { Events } from "server/network";
import { Event } from "shared/eventLifecycle";

@Service({})
export class Test {
    @Event(Events.test)
    test_event(player: Player) {
        print(player.Name)
    }
}