/* 
Module for managing "valuebar" objects that are visible on top of a Player's head
Includes functions for both clientside and serverside management of this UI. 
    - Servers must provide the player that they wish to manage!

Information regarding `uniqueId(string)`
    - The uniqueId is used to manage the indivual valueBars. 

Functions exported:
    - Server:
        - newHeadUI(player: Player) -> `BillBoardGUI`
        - addUI(player: Player, valueBar: ValueBar, uniqueId: string)
        - removeUI(player: Player, valueBar: ValueBar, unique: Id: string)
    - Client: 
        - addUI(valueBar: ValueBar, uniqueId: string)
        - removeUI(valueBar: ValueBar, unique: Id: string)
*/

import React from "@rbxts/react";
import { createBillBoardGUI } from "./valuebar/createBillBoardGUI";
import { createPortal, createRoot, Root } from "@rbxts/react-roblox";
import { ValueBar } from "./valuebar";
import { Players } from "@rbxts/services";

// FILE STATE MANGEMENT / UTILITIES
const headUIs = new Map<Player, {
    billBoardGui: BillboardGui,
    root: Root,
    children: Map<string, React.ReactElement<typeof ValueBar>> // string represents unique ID
}>

// SERVER
function newHeadUI(player: Player): BillboardGui {
    /*
    A function that creates a `BillBoardGui` above the players head.
    */

    const head = player.CharacterAdded.Wait()[0].WaitForChild("Head") as MeshPart;
    const billBoardGUI = createBillBoardGUI(new Vector3(0, 2, 0)); 
    billBoardGUI.Parent = head;
    billBoardGUI.Name = billBoardGUI.Name = "headUI" 
    billBoardGUI.Adornee = head
    
    // create a list view

    const root = createRoot(new Instance("Folder"));
    headUIs.set(
        player,
        {
            billBoardGui: billBoardGUI,
            root: root,
            children: new Map<string, React.ReactElement<typeof ValueBar>>
        }
    );

    root.render(createPortal(
        <uilistlayout
            
        >

        </uilistlayout>, 
        billBoardGUI
    ))

    return billBoardGUI
}

// TODO: implement thee functions

function addUI(player: Player, valueBar: React.Element<typeof ValueBar>, uniqueId: string) {
    const ui = headUIs.get(player);
    if (!ui || ui.children.get(uniqueId)) {return};
    
    ui.children.set(uniqueId, valueBar);

    ui.root.render(createPortal(
        <>
            
        </>,
        ui.billBoardGui
    ))
}

function removeUI(player: Player, uniqueId: string) {
    const ui = headUIs.get(player);
    if (!ui || ui.children.get(uniqueId)) {return};
    
    ui.children.delete(uniqueId);

    ui.root.render(createPortal(
        <>
            
        </>,
        ui.billBoardGui
    ))
}