var ina219 = require('./ina219');

const MAX_BAT_V = 4.2;
const MIN_BAT_V = 3.4;
const INA219_I2C_ADDRESS = 0x40;
const INA219_I2C_BUS = '3';
const COUNTER_OVERFLOW = 1300; 

let getBatteryPercentage = function (batteryVoltage) {
  return parseFloat(((batteryVoltage - MIN_BAT_V) / (MAX_BAT_V - MIN_BAT_V)) * 100).toFixed(0);
}

ina219.init(INA219_I2C_ADDRESS, INA219_I2C_BUS);

ina219.enableLogging(false); // enable verbose logs

ina219.calibrate32V1A(function () {
   ina219.getBusVoltage_V(function (volts) {
      console.log(`Battery Voltage Level: ${parseFloat(volts).toFixed(3)}v`);
      console.log(`Battery Percentage Level: ${getBatteryPercentage(volts)}%`);

      ina219.getCurrent_mA(function (current) {
         console.log(`Current Disharge: ${current}mA`);
         console.log(`Charging: ${ current > COUNTER_OVERFLOW }`);
      });
   });
});
