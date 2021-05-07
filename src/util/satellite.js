import * as satellite from "satellite.js";
import dayjs from "dayjs";

const EARTHRADIANS = 7.292115 * 1e-5; // 地球自转弧度
const getSatelliteOrbit = (tle1, tle2) => {
  const DIFFCIRCLE = 255;
  const geoArray = [];
  const dateTime = dayjs("2021-1-1"); // 取样以 Fri Jan 01 2021 00:00:00 GMT+0800 (香港标准时间) 为开始时间，可自由选择，防止卫星轨迹出现断点缺失
  const satrec = satellite.twoline2satrec(tle1, tle2);
  const period = ((2 * Math.PI) / satrec.no) * 60;
  const timeSlice = period / DIFFCIRCLE;
  for (let i = 0; i < DIFFCIRCLE + 1; i++) {
    const newDate = new Date(dateTime.add(i * timeSlice, "second"));
    const positionAndVelocity = satellite.propagate(satrec, newDate);
    const positionEci = positionAndVelocity.position;
    const gmst = satellite.gstime(newDate);
    const positionGd = satellite.eciToGeodetic(positionEci, gmst);
    const longitude = positionGd.longitude + EARTHRADIANS * i * timeSlice,
      latitude = positionGd.latitude,
      height = positionGd.height;
    // 过滤一周期后导致弧度纠偏溢出的无效数据
    if (longitude >= -Math.PI && longitude <= Math.PI) {
      const longitudeDeg = satellite.degreesLong(longitude),
        latitudeDeg = satellite.degreesLat(latitude);
      geoArray.push([longitudeDeg, latitudeDeg, height * 1e3]);
    }
  }
  return geoArray;
};

export { getSatelliteOrbit };
