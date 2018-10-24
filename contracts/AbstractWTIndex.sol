pragma solidity 0.4.24;

import "./AbstractBaseContract.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


/**
 * @title AbstractWTIndex
 * @dev Interface of WTIndex contract, inherits from OpenZeppelin's Ownable and
 * from WT's 'AbstractBaseContract'.
 */
contract AbstractWTIndex is Ownable, AbstractBaseContract {
    address[] public airlines;
    mapping(address => uint) public airlinesIndex;
    //mapping(address => address[]) public airlinesByManager;
    //mapping(address => uint) public airlinesByManagerIndex;
    // solhint-disable-next-line var-name-mixedcase
    address public LifToken;

    function registerAirline(string dataUri) external;
    //function deleteAirline(address airline) external;
    function callAirline(address airline, bytes data) external;
    //function transferAirline(address airline, address newManager) external;
    function getAirlinesLength() public view returns (uint);
    function getAirlines() public view returns (address[]);
    //function getAirlinesByManager(address manager) public view returns (address[]);

    event AirlineRegistered(address airline, uint managerIndex, uint allIndex);
    //event AirlineDeleted(address airline, uint managerIndex, uint allIndex);
    event AirlineCalled(address airline);
    //event AirlineTransferred(address airline, address previousManager, address newManager);
}
