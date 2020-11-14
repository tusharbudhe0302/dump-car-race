const mongoose = require('mongoose');

jest.mock('mongoose');

describe('connectDatabase', () => {
  const dbModule = require('.');

  it('should connect database succesfully', done => {
    const consoleLogSpyOn = jest.spyOn(console, 'log');
    const mongooseConnectSpyOn = jest
      .spyOn(mongoose, 'connect')
      .mockImplementationOnce((uris, options, callback) => {
        if (callback) {
          callback();
          done();
        }
        return Promise.resolve(mongoose);
      });

    dbModule.connectDatabase();
    expect(mongooseConnectSpyOn).toBeCalledWith(
      'mongodb://localhost:27017/f1race',
      { useCreateIndex: true, useNewUrlParser: true },
      dbModule.callback
    );
    expect(consoleLogSpyOn).toBeCalledWith('Succesfully Connected!');
    consoleLogSpyOn.mockRestore();
  });

  it('connect database error', done => {
    const consoleLogSpyOn = jest.spyOn(console, 'log');
    const mongooseConnectSpyOn = jest
      .spyOn(mongoose, 'connect')
      .mockImplementationOnce((uris, options, callback) => {
        if (callback) {
          callback(new Error('connect error'));
          done();
        }
        return Promise.resolve(mongoose);
      });

    dbModule.connectDatabase();
    expect(mongooseConnectSpyOn).toBeCalledWith(
      'mongodb://localhost:27017/f1race',
      { useCreateIndex: true, useNewUrlParser: true },
      dbModule.callback
    );
    expect(consoleLogSpyOn).toBeCalledWith('connect error');
    consoleLogSpyOn.mockRestore();
  });
  afterEach(()=>{
    jest.clearAllMocks(); 
    jest.resetAllMocks();
    // jest.resetModules();
  })
});
