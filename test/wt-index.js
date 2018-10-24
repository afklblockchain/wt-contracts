const assert = require('chai').assert;
const help = require('./helpers/index.js');

const WTIndex = artifacts.require('./WTIndex.sol');
const AbstractWTIndex = artifacts.require('./AbstractWTIndex.sol');
const WTAirline = artifacts.require('Airline.sol');

contract('WTIndex', (accounts) => {
  const indexOwner = accounts[1];
  const airlineAccount = accounts[2];
  const nonOwnerAccount = accounts[3];

  let index;

  // Deploy new index but use AbstractWTIndex for contract interaction
  beforeEach(async () => {
    index = await WTIndex.new({ from: indexOwner });
    index = await AbstractWTIndex.at(index.address);
  });

  describe('version', () => {
    it('should have the correct version and contract type', async () => {
      assert.equal(help.bytes32ToString(await index.version()), help.version);
      assert.equal(help.bytes32ToString(await index.contractType()), 'wtindex');
    });
  });

  describe('setLifToken', () => {
    const tokenAddress = accounts[5];

    it('should set the LifToken address', async () => {
      await (await WTIndex.at(index.address)).setLifToken(tokenAddress, { from: indexOwner });
      const setValue = await index.LifToken();

      assert.equal(setValue, tokenAddress);
    });

    it('should throw if non-owner sets the LifToken address', async () => {
      try {
        await (await WTIndex.at(index.address)).setLifToken(tokenAddress, { from: nonOwnerAccount });
        assert(false);
      } catch (e) {
        assert(help.isInvalidOpcodeEx(e));
      }
    });
  });

  describe('airlines', () => {
    describe('registerAirline', () => {
      const expectedIndexPos = 1; // Position of the first airline

      it('should not register airline with empty dataUri', async () => {
        try {
          await index.registerAirline('', { from: airlineAccount });
          throw new Error('should not have been called');
        } catch (e) {
          assert(help.isInvalidOpcodeEx(e));
        }
      });

      it('should put airline where we expect it to be', async () => {
        const indexNonce = await help.promisify(cb => web3.eth.getTransactionCount(index.address, cb));
        const airlineAddress = help.determineAddress(index.address, indexNonce);
        await index.registerAirline('dataUri', { from: airlineAccount });
        let address = await index.getAirlinesByManager(airlineAccount);
        assert.equal(airlineAddress, address[0]);
      });

      it('should add a airline to the registry', async () => {
        await index.registerAirline('dataUri', { from: airlineAccount });
        const length = await index.getAirlinesLength();

        const allAirlines = await help.jsArrayFromSolidityArray(
          index.airlines,
          length,
          help.isZeroAddress
        );

        const airlinesByManager = await index.getAirlinesByManager(airlineAccount);
        const actualIndexPos = await index.airlinesIndex(allAirlines[0]);

        const airline = allAirlines[0];
        const airlineByManager = airlinesByManager[0];

        assert.isDefined(airline);
        assert.isDefined(airlineByManager);
        assert.isFalse(help.isZeroAddress(airline));
        assert.isFalse(help.isZeroAddress(airlineByManager));

        assert.equal(actualIndexPos, expectedIndexPos);
        assert.equal(airline, airlinesByManager);

        const airlineInstance = await WTAirline.at(airline);
        assert.equal(await airlineInstance.dataUri(), 'dataUri');
      });
    });

    describe('deleteAirline', () => {
      const expectedIndexPos = 0; // Position of the airline in the managers array

      it('should remove a airline', async () => {
        await index.registerAirline('dataUri', { from: airlineAccount });
        const length = await index.getAirlinesLength();

        let allAirlines = await help.jsArrayFromSolidityArray(
          index.airlines,
          length,
          help.isZeroAddress
        );

        const airline = allAirlines[0];
        // Verify existence
        assert.isDefined(airline);
        assert.isFalse(help.isZeroAddress(airline));

        // Remove and verify non-existence of airline
        await index.deleteAirline(airline, { from: airlineAccount });
        allAirlines = await help.jsArrayFromSolidityArray(
          index.airlines,
          length,
          help.isZeroAddress
        );
        const airlinesByManager = await index.getAirlinesByManager(airlineAccount);
        const airlineDeleted = help.isZeroAddress(airlinesByManager[expectedIndexPos]);

        assert.equal(allAirlines.length, 0);
        assert.isTrue(airlineDeleted);
        const code = await help.promisify(cb => web3.eth.getCode(airline, cb));
        assert.equal(code, '0x0');
      });

      it('should throw if the airline is not registered', async () => {
        try {
          // Mocking address with existing contract
          await index.deleteAirline(nonOwnerAccount, { from: airlineAccount });
          assert(false);
        } catch (e) {
          assert(help.isInvalidOpcodeEx(e));
        }
      });

      it('should throw if airline has zero address', async () => {
        try {
          // Mocking address with existing contract
          await index.deleteAirline(help.zeroAddress, { from: airlineAccount });
          assert(false);
        } catch (e) {
          assert(help.isInvalidOpcodeEx(e));
        }
      });

      it('should throw if non-owner removes', async () => {
        await index.registerAirline('name', { from: airlineAccount });
        const airlinesByManager = await index.getAirlinesByManager(airlineAccount);
        const airline = airlinesByManager[0];

        try {
          await index.deleteAirline(airline, { from: nonOwnerAccount });
          assert(false);
        } catch (e) {
          assert(help.isInvalidOpcodeEx(e));
        }
      });
    });

    describe('callAirline', async () => {
      let wtAirline, airlineAddress;

      beforeEach(async () => {
        await index.registerAirline('dataUri', { from: airlineAccount });
        let address = await index.getAirlinesByManager(airlineAccount);
        airlineAddress = address[0];
        wtAirline = WTAirline.at(address[0]);
      });

      it('should proceed when calling as an owner', async () => {
        const data = wtAirline.contract.editInfo.getData('newDataUri');
        console.log(data);
        console.log(airlineAddress);
        await index.callAirline(airlineAddress, data, { from: airlineAccount });
        assert.equal('newDataUri', await wtAirline.contract.dataUri());
      });

      it('should throw if calling as a non-owner', async () => {
        const data = wtAirline.contract.editInfo.getData('newUri');
        try {
          await index.callAirline(airlineAddress, data, { from: nonOwnerAccount });
          throw new Error('should not have been called');
        } catch (e) {
          assert(help.isInvalidOpcodeEx(e));
        }
      });

      it('should throw if a airline has zero address', async () => {
        const data = wtAirline.contract.editInfo.getData('newUri');
        try {
          // Mocking address with existing contract
          await index.callAirline(help.zeroAddress, data, { from: airlineAccount });
          assert(false);
        } catch (e) {
          assert(help.isInvalidOpcodeEx(e));
        }
      });

      it('should throw if airline does not exist', async () => {
        const data = wtAirline.contract.editInfo.getData('newUri');
        try {
          // mocking address with existing account
          await index.callAirline(nonOwnerAccount, data, { from: airlineAccount });
          throw new Error('should not have been called');
        } catch (e) {
          assert(help.isInvalidOpcodeEx(e));
        }
      });
    });
  });

  describe('transferAirline', () => {
    let airlineAddress;

    beforeEach(async () => {
      await index.registerAirline('dataUri', { from: airlineAccount });
      let address = await index.getAirlinesByManager(airlineAccount);
      airlineAddress = address[0];
    });

    it('should throw if transferring to a zero address', async () => {
      try {
        await index.transferAirline(airlineAddress, help.zeroAddress, { from: airlineAccount });
        throw new Error('should not have been called');
      } catch (e) {
        assert(help.isInvalidOpcodeEx(e));
      }
    });

    it('should throw if transferring a non-existing airline', async () => {
      try {
        await index.transferAirline(index.address, nonOwnerAccount, { from: airlineAccount });
        throw new Error('should not have been called');
      } catch (e) {
        assert(help.isInvalidOpcodeEx(e));
      }
    });

    it('should throw if not executed from airline owner address', async () => {
      try {
        await index.transferAirline(airlineAddress, nonOwnerAccount, { from: nonOwnerAccount });
        throw new Error('should not have been called');
      } catch (e) {
        assert(help.isInvalidOpcodeEx(e));
      }
    });

    it('should change the airline manager', async () => {
      assert.equal(help.filterZeroAddresses(await index.getAirlinesByManager(airlineAccount)).length, 1);
      assert.equal(help.filterZeroAddresses(await index.getAirlinesByManager(nonOwnerAccount)).length, 0);
      const originalLength = (await index.getAirlinesLength()).toNumber();
      const originalAirlines = await index.getAirlines();
      await index.transferAirline(airlineAddress, nonOwnerAccount, { from: airlineAccount });
      assert.equal(help.filterZeroAddresses(await index.getAirlinesByManager(airlineAccount)).length, 0);
      assert.equal(help.filterZeroAddresses(await index.getAirlinesByManager(nonOwnerAccount)).length, 1);
      assert.equal((await index.getAirlinesLength()).toNumber(), originalLength);
      assert.deepEqual(await index.getAirlines(), originalAirlines);
    });

    it('should fire an event', async () => {
      const result = await index.transferAirline(airlineAddress, nonOwnerAccount, { from: airlineAccount });
      assert.equal(result.logs.length, 1);
      assert.equal(result.logs[0].event, 'AirlineTransferred');
      assert.equal(result.logs[0].args.previousManager, airlineAccount);
      assert.equal(result.logs[0].args.newManager, nonOwnerAccount);
    });
  });

  describe('data getters', () => {
    describe('getAirlinesLength', () => {
      it('should count airlines properly', async () => {
        // length is a bignumber
        let length = await index.getAirlinesLength();
        // We start with empty address on the zero index
        assert.equal(length.toNumber(), 1);
        await index.registerAirline('aaa', { from: airlineAccount });
        length = await index.getAirlinesLength();
        assert.equal(length.toNumber(), 2);
        const indexNonce = await help.promisify(cb => web3.eth.getTransactionCount(index.address, cb));
        const expectedAirlineAddress = help.determineAddress(index.address, indexNonce);
        await index.registerAirline('bbb', { from: airlineAccount });
        length = await index.getAirlinesLength();
        assert.equal(length.toNumber(), 3);
        await index.deleteAirline(expectedAirlineAddress, { from: airlineAccount });
        length = await index.getAirlinesLength();
        // length counts zero addresses
        assert.equal(length.toNumber(), 3);
      });
    });

    describe('getAirlines', () => {
      it('should return airlines properly', async () => {
        let airlines = await index.getAirlines();
        assert.equal(help.filterZeroAddresses(airlines).length, 0);
        await index.registerAirline('aaa', { from: airlineAccount });
        airlines = await index.getAirlines();
        const indexNonce = await help.promisify(cb => web3.eth.getTransactionCount(index.address, cb));
        const expectedAirlineAddress = help.determineAddress(index.address, indexNonce);
        assert.equal(help.filterZeroAddresses(airlines).length, 1);
        await index.registerAirline('bbb', { from: airlineAccount });
        airlines = await index.getAirlines();
        assert.equal(help.filterZeroAddresses(airlines).length, 2);
        await index.deleteAirline(expectedAirlineAddress, { from: airlineAccount });
        airlines = await index.getAirlines();
        assert.equal(help.filterZeroAddresses(airlines).length, 1);
      });
    });

    describe('getAirlinesByManager', () => {
      it('should return list of airlines for existing manager', async () => {
        await index.registerAirline('bbb', { from: airlineAccount });
        const airlineList = await index.getAirlinesByManager(airlineAccount);
        assert.equal(airlineList.length, 1);
      });

      it('should return empty list for a manager without airlines', async () => {
        const airlineList = await index.getAirlinesByManager(airlineAccount);
        assert.equal(airlineList.length, 0);
      });

      it('should return empty list for a non-existing manager', async () => {
        const airlineList = await index.getAirlinesByManager(nonOwnerAccount);
        assert.equal(airlineList.length, 0);
      });
    });
  });
});
