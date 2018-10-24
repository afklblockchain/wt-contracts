* [AbstractWTIndex](#abstractwtindex)
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
  * [transferOwnership](#function-transferownership)
  * [registerAirline](#function-registerairline)
  * [deleteAirline](#function-deleteairline)
  * [AirlineRegistered](#event-airlineregistered)
  * [AirlineDeleted](#event-airlinedeleted)
  * [AirlineCalled](#event-airlinecalled)
  * [AirlineTransferred](#event-airlinetransferred)
  * [OwnershipRenounced](#event-ownershiprenounced)
  * [OwnershipTransferred](#event-ownershiptransferred)

# AbstractWTIndex


## *function* getAirlines

AbstractWTIndex.getAirlines() `view` `0d2e677a`





## *function* callAirline

AbstractWTIndex.callAirline(airline, data) `nonpayable` `154d56db`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | airline | undefined |
| *bytes* | data | undefined |


## *function* airlinesByManagerIndex

AbstractWTIndex.airlinesByManagerIndex() `view` `189f6aef`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |


## *function* transferAirline

AbstractWTIndex.transferAirline(airline, newManager) `nonpayable` `292d64e0`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | airline | undefined |
| *address* | newManager | undefined |


## *function* version

AbstractWTIndex.version() `view` `54fd4d50`





## *function* LifToken

AbstractWTIndex.LifToken() `view` `554d8b37`





## *function* renounceOwnership

AbstractWTIndex.renounceOwnership() `nonpayable` `715018a6`

**Renouncing to ownership will leave the contract without an owner. It will not be possible to call the functions with the `onlyOwner` modifier anymore.**

> Allows the current owner to relinquish control of the contract.




## *function* airlinesByManager

AbstractWTIndex.airlinesByManager(, ) `view` `7cf2dfae`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |
| *uint256* |  | undefined |


## *function* owner

AbstractWTIndex.owner() `view` `8da5cb5b`





## *function* airlinesIndex

AbstractWTIndex.airlinesIndex() `view` `9f9bfeb8`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |


## *function* getAirlinesByManager

AbstractWTIndex.getAirlinesByManager(manager) `view` `bb979c3d`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | manager | undefined |


## *function* getAirlinesLength

AbstractWTIndex.getAirlinesLength() `view` `ca63a55b`





## *function* contractType

AbstractWTIndex.contractType() `view` `cb2ef6f7`





## *function* airlines

AbstractWTIndex.airlines() `view` `cd338265`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |


## *function* transferOwnership

AbstractWTIndex.transferOwnership(_newOwner) `nonpayable` `f2fde38b`

> Allows the current owner to transfer control of the contract to a newOwner.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _newOwner | The address to transfer ownership to. |


## *function* registerAirline

AbstractWTIndex.registerAirline(dataUri) `nonpayable` `f88a067f`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *string* | dataUri | undefined |


## *function* deleteAirline

AbstractWTIndex.deleteAirline(airline) `nonpayable` `fb6f6875`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | airline | undefined |

## *event* AirlineRegistered

AbstractWTIndex.AirlineRegistered(airline, managerIndex, allIndex) `48ef5bfc`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | airline | not indexed |
| *uint256* | managerIndex | not indexed |
| *uint256* | allIndex | not indexed |

## *event* AirlineDeleted

AbstractWTIndex.AirlineDeleted(airline, managerIndex, allIndex) `54f58abd`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | airline | not indexed |
| *uint256* | managerIndex | not indexed |
| *uint256* | allIndex | not indexed |

## *event* AirlineCalled

AbstractWTIndex.AirlineCalled(airline) `e09d7761`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | airline | not indexed |

## *event* AirlineTransferred

AbstractWTIndex.AirlineTransferred(airline, previousManager, newManager) `04dd8111`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | airline | not indexed |
| *address* | previousManager | not indexed |
| *address* | newManager | not indexed |

## *event* OwnershipRenounced

AbstractWTIndex.OwnershipRenounced(previousOwner) `f8df3114`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | previousOwner | indexed |

## *event* OwnershipTransferred

AbstractWTIndex.OwnershipTransferred(previousOwner, newOwner) `8be0079c`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | previousOwner | indexed |
| *address* | newOwner | indexed |


---