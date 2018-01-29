var ina219 = require('./ina219');

const MAXBATTERYVOLTAGE = 4.2;
const INA219_I2C_ADDRESS = 0x40;
const INA219_I2C_BUS = '3';

let getBatteryPercentage = function (batteryVoltage) {
  return (batteryVoltage / MAXBATTERYVOLTAGE) * 100;
}

ina219.init(INA219_I2C_ADDRESS, INA219_I2C_BUS);
ina219.enableLogging(false); // enable verbose logs

// ina219.calibrate32V1A(function () {
ina219.getBusVoltage_V(function (volts) {
  console.log("Voltage: " + volts, ` --  ${getBatteryPercentage(volts)}`);
});
ina219.getCurrent_mA(function (current) {
  console.log("Current (mA): " + current);
});
// });