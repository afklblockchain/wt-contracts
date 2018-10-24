pragma solidity 0.4.24;

import "../AbstractBaseContract.sol";


/**
 * @title AbstractAirline
 * @dev Interface of Airline contract, inherits from
 * WT's 'AbstractBaseContract'.
 */
contract AbstractAirline is AbstractBaseContract {

    // Who owns this Airline and can manage it.
    address public manager;

    // Base Uri to access the Airline NDC API
    string public dataUri;

    // Number of blocks when the Airline was created
    uint public created;

    // WTIndex address
    address public index;

    /**
     * Allows calling such methods only when msg.sender is equal
     * to previously set index propert.y
     */
    modifier onlyFromIndex() {
        require(msg.sender == index);
        _;
    }

    /**
     * @dev `editInfo` Allows owner to change airline's dataUri.
     * @param  _dataUri New dataUri pointer of this hotel
     */
    function editInfo(string _dataUri) public onlyFromIndex {
        _editInfoImpl(_dataUri);
    }

    /**
     * @dev `destroy` allows the owner to delete the Airline
     */
    function destroy() public onlyFromIndex {
        _destroyImpl();
    }

    /**
     * @dev Allows owner to change hotel manager.
     * @param _newManager New manager's address
     */
    function changeManager(address _newManager) public onlyFromIndex {
        _changeManagerImpl(_newManager);
    }

    function _editInfoImpl(string _dataUri) internal;
    function _destroyImpl() internal;
    function _changeManagerImpl(address _newManager) internal;
}
