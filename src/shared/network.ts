import { Networking } from "@flamework/networking";

interface ClientToServerEvents {
    spells_sprint() : null
    spells_stop_sprint() : null

    test(): null
}

interface ServerToClientEvents {}

interface ClientToServerFunctions {}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
