import { Networking } from "@flamework/networking";

interface ClientToServerEvents {
    spells_sprint() : null
    spells_stop_sprint() : null

    test(): null
}

interface ServerToClientEvents {
    response_spells_started_sprinting() : null
    response_spells_stopped_sprinting() : null
}

interface ClientToServerFunctions {}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
 