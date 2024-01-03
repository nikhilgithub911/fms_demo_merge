import React, { useEffect, useState } from "react";

const FuelProgressBar = ({ currentFuelValue, fuelTankCapacity }) => {
  const [progressValue, setProgressValue] = useState(0);
  const calculateFuelPercentage = () => {
    if (
      isNaN(currentFuelValue) ||
      isNaN(fuelTankCapacity) ||
      fuelTankCapacity === 0
    ) {
      return 0;
    }

    return (currentFuelValue / fuelTankCapacity) * 100;
  };

  useEffect(() => {
    let value = ((currentFuelValue / fuelTankCapacity) * 100).toFixed(1);
    setProgressValue(value);
  }, [currentFuelValue, fuelTankCapacity]);

  // console.log('progressValue', progressValue)

  const getProgressBarColor = (percentage) => {
    if (percentage >= 75) {
      return "#12E11E";
    } else if (percentage >= 50) {
      return "#F1F119";
    } else if (percentage >= 25) {
      return "#FFAD16";
    } else {
      return "#FF5050";   //RED
    }
  };

  const percentage = calculateFuelPercentage();
  const progressBarColor = getProgressBarColor(percentage);

  const formattedFuelValue = isNaN(currentFuelValue)
    ? "NA"
    : Number(currentFuelValue).toFixed(1);

  // const progressBarStyle = {
  //   // width: "120px",
  //   height: "28px",
  //   borderRadius: "20px",
  //   // background: `linear-gradient(${progressBarColor} 0 0) 0/${progressValue}% no-repeat lightblue`,
  //   // transition: 'width 0.5s ease-in-out',
  //   background: `linear-gradient(${progressBarColor} 0 0) lightblue`,
  //   width: `${progressValue}%`,

  //   // position: 'relative',
  //   display: "flex",
  //   justifyContent: "left",
  //   alignItems: "center",
  //   backgroundColor: "#DAF4F7",
  //   gap: 0,
  //   // marginBottom:0
  // };


// const progressBarStyle = {
//   height: "28px",
//   borderRadius: "20px",
//   background: `linear-gradient(${progressBarColor} 0 0) lightblue`,
//   width: `${progressValue}%`,
//   display: "flex",
//   justifyContent: "flex-start",
//   alignItems: "center",
//   backgroundColor: "#DAF4F7",
//   gap: 0,
//   position: 'relative',
//   transition: 'width 0.5s ease-in-out',
// };

const progressBarStyle = {
  height: "28px",
  borderRadius: "20px",
  backgroundImage: `linear-gradient(${progressBarColor} 0 0)`,
  width: `${progressValue}%`,
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
  backgroundColor: "#DAF4F7",
  gap: 0,
  position: 'relative',
  transition: 'width 0.5s ease-in-out',
};


const spanStyle = {
  width: "110px",
  paddingLeft: "5px",
  fontSize: "16px",
  fontWeight: 600,
  position: 'absolute',
  left:0,
};

  

  return (
    <>
      {formattedFuelValue !== "NA" ? (
        <div style={{ height: "5em", position: "relative", paddingTop: "1em" }}>
          <div
            style={{
              width: "120px",
              height: "28px",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              backgroundColor: "#DAF4F7",
              gap: 0,
              position:'relative'
            }}
          >
                       {/* <span style={spanStyle}>
                {formattedFuelValue !== "NA" ? `${formattedFuelValue} L` : "NA"}
              </span> */}
            <div style={progressBarStyle}>
              <span style={spanStyle}>
                {formattedFuelValue !== "NA" ? `${formattedFuelValue} L` : "NA"}
              </span>
            </div>
            
          </div>
          {/* <div style={progressBarStyle}>
            <span style={{ width:'100%',paddingLeft:'5px', fontSize:'16px', fontWeight:600, }}>{formattedFuelValue !== 'NA' ? `${formattedFuelValue} L` : "NA"}</span>
          </div> */}
          {formattedFuelValue !== "NA" ? (
            <p
              style={{
                fontSize: "12px",
                position: "absolute",
                top: "2.5em",
                left: "5px",
              }}
            >
              Total:{" "}
              <span>{fuelTankCapacity ? `${fuelTankCapacity} L` : "N/A"}</span>
            </p>
          ) : null}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span style={{ textAlign: "center" }}>NA</span>
        </div>
      )}
    </>
  );
};

export default FuelProgressBar;

// import React, { useEffect, useState } from 'react';

// const FuelProgressBar = ({ currentFuelValue, fuelTankCapacity }) => {
//   const calculateFuelPercentage = () => {
//     if (isNaN(currentFuelValue) || isNaN(fuelTankCapacity) || fuelTankCapacity === 0) {
//       return 0;
//     }

//     return (currentFuelValue / fuelTankCapacity) * 100;
//   };

//   const [progressValue, setProgressValue] = useState(0);

//   useEffect(() => {
//     const value = ((currentFuelValue / fuelTankCapacity) * 100).toFixed(1);
//     setProgressValue(value);
//   }, [currentFuelValue, fuelTankCapacity]);

//   const getProgressBarColor = (percentage) => {
//     if (percentage >= 75) {
//       return 'green';
//     } else if (percentage >= 50) {
//       return 'yellow';
//     } else if (percentage >= 25) {
//       return 'orange';
//     } else {
//       return 'red';
//     }
//   };

//   const percentage = calculateFuelPercentage();
//   const progressBarColor = getProgressBarColor(percentage);

//   const formattedFuelValue = isNaN(currentFuelValue) ? 'NA' : Number(currentFuelValue).toFixed(1);

//   const progressBarStyle = {
//     width: `${progressValue}%`,
//     height: '28px',
//     borderRadius: '20px',
//     background: `linear-gradient(${progressBarColor} 0 0) lightblue`,
//     transition: 'width 0.5s ease-in-out',
//     display: 'flex',
//     justifyContent: 'left',
//     alignItems: 'center',
//     backgroundColor: '#DAF4F7',
//     gap: 0,
//   };

//   return (
//     <>
//       {formattedFuelValue !== 'NA' ? (
//         <div style={{ height: '5em', position: 'relative', paddingTop: '1em' }}>
//           <div style={progressBarStyle}>
//             <span style={{ paddingLeft: '5px', fontSize: '16px', fontWeight: 600 }}>
//               {formattedFuelValue} L
//             </span>
//           </div>
//           {formattedFuelValue !== 'NA' ? (
//             <p style={{ fontSize: '12px', position: 'absolute', top: '2.5em', left: '5px' }}>
//               Total: <span>{fuelTankCapacity ? `${fuelTankCapacity} L` : 'N/A'}</span>
//             </p>
//           ) : null}
//         </div>
//       ) : (
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <span style={{ textAlign: 'center' }}>NA</span>
//         </div>
//       )}
//     </>
//   );
// };

// export default FuelProgressBar;
