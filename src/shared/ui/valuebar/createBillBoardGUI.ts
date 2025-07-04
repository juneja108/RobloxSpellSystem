export function createBillBoardGUI(offset: Vector3) : BillboardGui {
    /*
        Utility function that creates the BillBoard GUI for the `valuebar` componenet

        Make sure to set the:
            - Parent
            - Name
            - Adornee
        of the BillBoardGUI because this function simply returns an `Instance` that has certain properties configured for the game!
    */

    let billBoardGUI = new Instance("BillboardGui");
    billBoardGUI.Size = UDim2.fromScale(4, 1);
    billBoardGUI.ExtentsOffset = offset;
    billBoardGUI.AlwaysOnTop = false;

    return billBoardGUI;
}