* [WTIndex](#wtindex)
  * [getAirlines](#function-getairlines)
  * [callAirline](#function-callairline)
  * [airlinesByManagerIndex](#function-airlinesbymanagerindex)
  * [transferAirline](#function-transferairline)
  * [version](#function-version)
  * [LifToken](#function-liftoken)
  * [renounceOwnership](#function-renounceownership)
  * [airlinesByManager](#function-airlinesbymanager)
  * [owner](#function-owner)
  * [airlinesIndex](#function-airlinesindex)
  * [getAirlinesByManager](#function-getairlinesbymanager)
  * [getAirlinesLength](#function-getairlineslength)
  * [contractType](#function-contracttype)
  * [airlines](#function-airlines)
  * [setLifToken](#function-setliftoken)
  * [transferOwnership](#function-transferownership)
  * [registerAirline](#function-registerairline)
  * [deleteAirline](#function-deleteairline)
  * [AirlineRegistered](#event-airlineregistered)
  * [AirlineDeleted](#event-airlinedeleted)
  * [AirlineCalled](#event-airlinecalled)
  * [AirlineTransferred](#event-airlinetransferred)
  * [OwnershipRenounced](#event-ownershiprenounced)
  * [OwnershipTransferred](#event-ownershiptransferred)

# WTIndex


## *function* getAirlines

WTIndex.getAirlines() `view` `0d2e677a`

> `getAirlines` get `airlines` array



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *address[]* |  | undefined |

## *function* callAirline

WTIndex.callAirline(airline, data) `nonpayable` `154d56db`

> `callAirline` Call airline in the index, the airline can only be called by its manager. Effectively proxies a airline call. Emits AirlineCalled on success.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | airline | Airline's address |
| *bytes* | data | Encoded method call to be done on Airline contract. |


## *function* airlinesByManagerIndex

WTIndex.airlinesByManagerIndex() `view` `189f6aef`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |


## *function* transferAirline

WTIndex.transferAirline(airline, newManager) `nonpayable` `292d64e0`

> `transferAirline` Allows to change ownership of the airline contract. Emits AirlineTransferred on success.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | airline | Airline's address |
| *address* | newManager | Address to which the airline will belong after transfer. |


## *function* version

WTIndex.version() `view` `54fd4d50`





## *function* LifToken

WTIndex.LifToken() `view` `554d8b37`





## *function* renounceOwnership

WTIndex.renounceOwnership() `nonpayable` `715018a6`

**Renouncing to ownership will leave the contract without an owner. It will not be possible to call the functions with the `onlyOwner` modifier anymore.**

> Allows the current owner to relinquish control of the contract.




## *function* airlinesByManager

WTIndex.airlinesByManager(, ) `view` `7cf2dfae`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |
| *uint256* |  | undefined |


## *function* owner

WTIndex.owner() `view` `8da5cb5b`





## *function* airlinesIndex

WTIndex.airlinesIndex() `view` `9f9bfeb8`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |


## *function* getAirlinesByManager

WTIndex.getAirlinesByManager(manager) `view` `bb979c3d`

> `getAirlinesByManager` get all the airlines belonging to one manager

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | manager | Manager address |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *address[]* |  | undefined |

## *function* getAirlinesLength

WTIndex.getAirlinesLength() `view` `ca63a55b`

> `getAirlinesLength` get the length of the `airlines` array



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* contractType

WTIndex.contractType() `view` `cb2ef6f7`





## *function* airlines

WTIndex.airlines() `view` `cd338265`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |


## *function* setLifToken

WTIndex.setLifToken(_lifToken) `nonpayable` `f2f0967b`

> `setLifToken` allows the owner of the contract to change the address of the LifToken contract

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _lifToken | The new contract address |


## *function* transferOwnership

WTIndex.transferOwnership(_newOwner) `nonpayable` `f2fde38b`

> Allows the current owner to transfer control of the contract to a newOwner.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _newOwner | The address to transfer ownership to. |


## *function* registerAirline

WTIndex.registerAirline(dataUri) `nonpayable` `f88a067f`

> `registerAirline` Register new airline in the index. Emits `AirlineRegistered` on success.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *string* | dataUri | Airline's data pointer |


## *function* deleteAirline

WTIndex.deleteAirline(airline) `nonpayable` `fb6f6875`

> `deleteAirline` Allows a manager to delete a airline, i. e. call destroy on the target Airline contract. Emits `AirlineDeleted` on success.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | airline | Airline's address |


## *event* AirlineRegistered

WTIndex.AirlineRegistered(airline, managerIndex, allIndex) `48ef5bfc`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | airline | not indexed |
| *uint256* | managerIndex | not indexed |
| *uint256* | allIndex | not indexed |

## *event* AirlineDeleted

WTIndex.AirlineDeleted(airline, managerIndex, allIndex) `54f58abd`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | airline | not indexed |
| *uint256* | managerIndex | not indexed |
| *uint256* | allIndex | not indexed |

## *event* AirlineCalled

WTIndex.AirlineCalled(airline) `e09d7761`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | airline | not indexed |

## *event* AirlineTransferred

WTIndex.AirlineTransferred(airline, previousManager, newManager) `04dd8111`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | airline | not indexed |
| *address* | previousManager | not indexed |
| *address* | newManager | not indexed |

## *event* OwnershipRenounced

WTIndex.OwnershipRenounced(previousOwner) `f8df3114`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | previousOwner | indexed |

## *event* OwnershipTransferred

WTIndex.OwnershipTransferred(previousOwner, newOwner) `8be0079c`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | previousOwner | indexed |
| *address* | newOwner | indexed |


---