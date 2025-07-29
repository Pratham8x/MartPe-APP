//PARSE F1D

import { parse } from "iso8601-duration";

// 'P1Y1M1DT1H1M1S', 'PT1H', 'P1DT3H' // Example duration string
// 'P1Y1M1D1H1M1S', 'P1H', 'P1D3H' // invalid duration string
export default function getDuration(durationString: string): string {
  const validatedDurationString = addMissingTInDurationString(durationString);
  const td = parse(validatedDurationString);
  let timeHrs = 0;
  let timeMins = 0;
  if (td.hours && td.hours > 0) {
    timeHrs = td.hours;
  }
  if (td.minutes && td.minutes > 0) {
    timeMins = td.minutes;
  } 

  return timeHrs > 0 ? `${timeHrs}h ${timeMins}m` : `${timeMins}m`;
}

// const addMissingTInDurationString = (durationString: string): string => {
//   if (!durationString.includes('T')) {
//     if (durationString.includes('H')) {
//       const indexOfHours = durationString.search(/\d+H/);
//       return `${durationString.slice(0, indexOfHours)}T${durationString.slice(
//         indexOfHours
//       )}`;
//     }

//     if (durationString.includes('M')) {
//       const indexOfMinutes = durationString.search(/\d+M/);
//       return `${durationString.slice(0, indexOfMinutes)}T${durationString.slice(
//         indexOfMinutes
//       )}`;
//     }

//     if (durationString.includes('S')) {
//       const indexOfSeconds = durationString.search(/\d+S/);
//       return `${durationString.slice(0, indexOfSeconds)}T${durationString.slice(
//         indexOfSeconds
//       )}`;
//     }
//   }
//   return durationString;
// };

const addMissingTInDurationString = (durationString: string): string => {
  if (!durationString.includes("T")) {
    const timeUnits = ["H", "M", "S"];
    for (const unit of timeUnits) {
      const index = durationString.indexOf(unit);
      if (index !== -1) {
        return `${durationString.slice(0, index)}T${durationString.slice(
          index
        )}`;
      }
    }
  }
  return durationString;
};
