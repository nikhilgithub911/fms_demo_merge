import React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Box,
  Paper,
  Grid,
  InputAdornment,
  TextField,
  Button,
  TableFooter,
  Typography,
  IconButton,
  Autocomplete,
  DialogActions,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import InfoIcon from "@mui/icons-material/Info";
import PlaceIcon from "@mui/icons-material/Place";
import AddIcon from '@mui/icons-material/Add';
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import ClearIcon from '@mui/icons-material/Clear';

import data from "../data/data";
import Navbar from "./Navbar";
import Sidebar from './Sidebar'
import FuelProgressBar from "./FuelProgressBar";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DynamicBreadcrumb from "./DynamicBreadcrumb";

const VehicleList = () => {
  // const [rawTableData, setRawTableData] = useState(data ? data : null);
  const rawTableData = data ? data : null
  const [filteredTableData, setFilteredTableData] = useState([]);
  // const [actualTableData, setActualTableData] = useState(
  //   rawTableData ? rawTableData.data : null
  // );
  const actualTableData = rawTableData ? rawTableData.data : null
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [totalElements, setTotalElements] = useState(
  //   rawTableData ? rawTableData.totalElements ? rawTableData.totalElements : 0 : 0
  // );

  const totalElements = rawTableData ? rawTableData.totalElements ? rawTableData.totalElements : 0 : 0

  // const [totalGpsEquiptedVehicle, setTotalGpsEquiptedVehicle] = useState(
  //   rawTableData ? rawTableData.totalGpsEquiptedVehicle ? rawTableData.totalGpsEquiptedVehicle : 0 : 0
  // );
  
  const totalGpsEquiptedVehicle = rawTableData ? rawTableData.totalGpsEquiptedVehicle ? rawTableData.totalGpsEquiptedVehicle : 0 : 0

  const [vehicleNumberValue, setVehicleNumberValue] = useState("");
  const [transporterOptionsValue, setTransporterOptionsValue] = useState(null);
  const [driverValue, setDriverValue] = useState("")
  const [siteOptionsValue, setSiteOptionsValue] = useState(null);
  const [gpsStatusOptionsValue, setGpsStatusOptionsValue] = useState(null);
  const [fuelSensorStatusOptionsValue, setFuelSensorStatusOptionsValue] = useState(null);

  const [transporterOptions, setTransporterOptions] = useState([]);
  const [siteOptions, setSiteOptions] = useState([]);
  const [gpsStatusOptions, setGpsStatusOptions] = useState([]);
  const [fuelSensorStatusOptions, setFuelSensorStatusOptions] = useState([]);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(true)

  const isSideBarPinned = false;
  const isOpenforGridTable = false;
  const breadcrumbs = [
    { name: 'Dashboard', path: '/' },
    { name: 'Vehicle Management', path: '/vehiclelist' },
    
  ];

  let dialogText = "Export PDF"
  if(isExportingPDF === false){
    dialogText = "Export EXCEL"
  }

  if(isExportingPDF === true) {
    dialogText = "Export PDF"
  }

  const btnStyle = {fontSize:'12px', height:'40px', bgcolor:'#542F85', color: "#FFFFFF", "&:hover":{backgroundColor:'#6A21CC'}}

  const fetchAutocompleteOptions = () => {
    if (actualTableData && actualTableData.length > 0) {
      const uniqueTransporters = [...new Set(actualTableData.map((item) => item.transporter?.name || ""))].filter(Boolean);
      const uniqueSites = [...new Set(actualTableData.map((item) => item.site?.name || ""))].filter(Boolean)
      // const uniqueGpsStatus = [...new Set(actualTableData.map((item) => item?.status || ""))].filter(Boolean);
      const uniqueGpsStatus = [...new Set(actualTableData.map((item) => (item.gps?.isActive !== undefined ? item.gps.isActive : "")))].filter(Boolean);
      const uniqueFuelSensorStatus = Array.from(new Set(actualTableData.map(item => item?.fuelSensorEnabled || ''))).filter(Boolean);

      if (!uniqueGpsStatus.includes(false)) {
        uniqueGpsStatus.push(false);
      }

      if (!uniqueFuelSensorStatus.includes(false)) {
        uniqueFuelSensorStatus.push(false);
      }
  
      setTransporterOptions(uniqueTransporters);
      setSiteOptions(uniqueSites);
      setGpsStatusOptions(uniqueGpsStatus);
      setFuelSensorStatusOptions(uniqueFuelSensorStatus);
    }
  };

  // console.log('vehicleNumberValue', vehicleNumberValue)

  // console.log('fuelSensorStatusOptions . . .', fuelSensorStatusOptions)
  
  useEffect(() => {
    fetchAutocompleteOptions();
  }, [actualTableData]);

  const applyFilters = () => {
    let filteredData = rawTableData.data;

    setPage(0);

    // console.log('vehicleNumberValue', vehicleNumberValue)
    // console.log('transporterOptionsValue', transporterOptionsValue)
    // console.log('driverValue', driverValue)
    // console.log('siteOptionsValue', siteOptionsValue)
    // console.log('gpsStatusOptionsValue', gpsStatusOptionsValue)
    // console.log('fuelSensorStatusOptionsValue', fuelSensorStatusOptionsValue)
  
  
    // console.log('filteredData . . .  before if conditions', filteredData);
  
    if (vehicleNumberValue !== undefined && vehicleNumberValue !== "") {
      filteredData = filteredData.filter(
        (item) => item.number?.toLowerCase().includes(vehicleNumberValue?.toLowerCase())
      );
    }

    // if (vehicleNumberValue !== undefined && vehicleNumberValue !== "") {
    //   const regex = new RegExp(`^${vehicleNumberValue}`, 'i');
    //   filteredData = filteredData.filter(
    //     (item) => 
    //       item.number &&
    //       regex.test(item.number)
    //   );
    // } 
  
    if (transporterOptionsValue !== undefined && transporterOptionsValue) {
      filteredData = filteredData.filter(
        (item) => item.transporter?.name === transporterOptionsValue
      );
    }
  
    if (driverValue !== undefined && driverValue !== "") {
      filteredData = filteredData.filter(
        (item) => item.driver?.name.toLowerCase().includes(driverValue?.toLowerCase())
      );
    }

    // if (driverValue !== undefined && driverValue !== "") {
    //   const regex = new RegExp(`^${driverValue}`, 'i');
    //   filteredData = filteredData.filter(
    //     (item) => 
    //       item.driver &&
    //       item.driver.name &&
    //       regex.test(item.driver.name)
    //   );
    // }
    

    if (siteOptionsValue !== undefined && siteOptionsValue) {
      // console.log('i got hit');
      filteredData = filteredData.filter(
        (item) => siteOptionsValue.includes(item.site?.name)
      );
    }
  
    // if (gpsStatusOptionsValue !== undefined && gpsStatusOptionsValue) {
    //   filteredData = filteredData.filter(
    //     (item) => item.status === gpsStatusOptionsValue
    //   );
    // }

    if (gpsStatusOptionsValue !== null) {
      filteredData = filteredData.filter(
        (item) => item.gps && item.gps.isActive === gpsStatusOptionsValue
      );
    }

    if (fuelSensorStatusOptionsValue !== null) {
      if (Array.isArray(fuelSensorStatusOptions)) {
        filteredData = filteredData.filter(
          (item) => item.fuelSensorEnabled === fuelSensorStatusOptionsValue
        );
      }
    }

        // console.log('filteredData . . . after if conditions', filteredData);

        // const notMatchingItems = rawTableData.data.filter(item => !filteredData.includes(item));
        // console.log(' Outboxed Items:', notMatchingItems);
      
  
    setFilteredTableData(filteredData);
  };

  useEffect(() => {
    applyFilters();
    // console.log('filteredTableData inside useeffect', filteredTableData)
  }, [vehicleNumberValue, transporterOptionsValue, driverValue, siteOptionsValue, gpsStatusOptionsValue, fuelSensorStatusOptionsValue]);
  
  
  // console.log('filteredTableData outside useeffect', filteredTableData)

  const handleOpenDialogForExportPDF = () => {
    setIsExportingPDF(true)
    setExportDialogOpen(true);
  }

  const handleOpenDialogForExportExcel = () => {
    setIsExportingPDF(false)
    setExportDialogOpen(true);
  }

  const handleCloseDialog = () => {
    setExportDialogOpen(false);
    // setIsExportingPDF(true)
  }

  
  // console.log('actualTableData', actualTableData)

  // console.log('page', page)
  // console.log('rowsPerPage', rowsPerPage)
  // console.log('totalElements', totalElements)

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  function formatMeetingStartDateTime(timestamp) {
    if (timestamp === "") {
      return " NA";
    }
    const date = new Date(timestamp);

    // Converting the date to IST
    date.setUTCHours(date.getUTCHours() - 5); // Adding 5 hours for IST
    date.setUTCMinutes(date.getUTCMinutes() - 30); // Adding 30 minutes for IST

    const formattedDate = new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);

    const formattedTime = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date);

    const formattedDateWithHyphen = formattedDate.replace(/\//g, "-");

    return `${formattedDateWithHyphen} ${formattedTime}`;
  }



  const calculateIndex = (pageIndex, rowIndex, rowsPerPage) => {
    return pageIndex * rowsPerPage + rowIndex + 1;
  };



const XLSX_HEADER_STYLE = { font: { bold: true, size: 24 } };

function fitToColumn(arrayOfObjects) {
  if (!Array.isArray(arrayOfObjects) || arrayOfObjects.length === 0) {
    return [];
  }

  const keys = Object.keys(arrayOfObjects[0]);

  const columnWidths = keys.map((key) => ({
    wch: key.toString().length,
  }));

  keys.forEach((key, index) => {
    columnWidths[index].wch = Math.max(
      columnWidths[index].wch,
      key.toString().length
    );
  });

  arrayOfObjects.forEach((obj) => {
    keys.forEach((key, index) => {
      const cellValue = obj[key] ? obj[key].toString() : '';
      columnWidths[index].wch = Math.max(
        columnWidths[index].wch,
        cellValue.length
      );
    });
  });

  return columnWidths;
}

const handleExportExcelCurrentPage = () => {

  const startIndex = page * rowsPerPage;
  const currentPageData = filteredTableData?.slice(startIndex, startIndex + rowsPerPage);

  
  if (Array.isArray(currentPageData) && currentPageData.length > 0) {
    const headers = ["Sl.no", "Vehicle Number", "Vehicle Type", "Tank Capacity (Ltr.)", "Current Fuel (Ltr.)", "Driver Details (Name/Phone)", "Transporter Details", "Site", "GPS (IMEI)", "Speed (Km/Hr)", "Status", "Location", "Last Polling", "Model", "Mileage"];

    const data = currentPageData?.map((dataItem, index) => ({
      "Sl.no": calculateIndex(page, index, rowsPerPage),
      "Vehicle Number": dataItem.number ? dataItem.number : "NA",
      "Vehicle Type": dataItem.vehicleType ? (dataItem.vehicleType.id ? dataItem.vehicleType.name : "NA") : "NA",
      "Tank Capacity (Ltr.)": dataItem.fuelTankCapacity ? dataItem.fuelTankCapacity : "NA",
      "Current Fuel (Ltr.)": dataItem.currentFuelValue ? (Math.round(dataItem.currentFuelValue * 100) / 100).toFixed(2) : "NA",
      "Driver Details (Name/Phone)": dataItem.driver.name ? `${dataItem.driver.name} / ${dataItem.driver.phoneNumber ? dataItem.driver.phoneNumber : "NA"}` : "NA",
      "Transporter Details": dataItem.transporterDetails ? dataItem.transporterDetails : "NA",
      "Site": dataItem.site ? (dataItem.site.name ? dataItem.site.name : "NA") : "NA",
      "GPS (IMEI)": dataItem.gps ? (dataItem.gps.id ? dataItem.gps.serialNumber : "NA") : "NA",
      "Speed (Km/Hr)": dataItem.speed ? Math.round(parseFloat(dataItem.speed)) : "NA",
      "Status": dataItem.runningStatus ? dataItem.runningStatus : "NA",
      "Location": `${dataItem.lat ? dataItem.lat : "NA"}, ${dataItem.lang ? dataItem.lang : "NA"}`,
      "Last Polling": dataItem.lastPollingDate ? formatMeetingStartDateTime(dataItem.lastPollingDate) : "NA",
      "Model": dataItem.model ? dataItem.model : "NA",
      "Mileage": dataItem.kmPerLitreString ? dataItem.kmPerLitreString : "NA",
    }));

    const ws = XLSX.utils.json_to_sheet(data, {
      header: headers, 
    });

    headers.forEach((key, index) => {
      const headerCell = ws[XLSX.utils.encode_col(index) + '1'];
      if (headerCell) {
        headerCell.s = XLSX_HEADER_STYLE;
      }
    });

    ws['!cols'] = fitToColumn(data);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    XLSX.writeFile(wb, 'Vehicle_List_Current_Page.xlsx');

    handleCloseDialog()
  } else {
    // console.error('Invalid data format for export.');
    alert('Invalid data format for export.')
  }
};

const handleExportExcelAllData = () => {
  
  if (Array.isArray(filteredTableData) && filteredTableData.length > 0) {
    const headers = ["Sl.no", "Vehicle Number", "Vehicle Type", "Tank Capacity (Ltr.)", "Current Fuel (Ltr.)", "Driver Details (Name/Phone)", "Transporter Details", "Site", "GPS (IMEI)", "Speed (Km/Hr)", "Status", "Location", "Last Polling", "Model", "Mileage"];

    const data = filteredTableData?.map((dataItem, index) => ({
      "Sl.no": calculateIndex(page, index, rowsPerPage),
      "Vehicle Number": dataItem.number ? dataItem.number : "NA",
      "Vehicle Type": dataItem.vehicleType ? (dataItem.vehicleType.id ? dataItem.vehicleType.name : "NA") : "NA",
      "Tank Capacity (Ltr.)": dataItem.fuelTankCapacity ? dataItem.fuelTankCapacity : "NA",
      "Current Fuel (Ltr.)": dataItem.currentFuelValue ? (Math.round(dataItem.currentFuelValue * 100) / 100).toFixed(2) : "NA",
      "Driver Details (Name/Phone)": dataItem.driver.name ? `${dataItem.driver.name} / ${dataItem.driver.phoneNumber ? dataItem.driver.phoneNumber : "NA"}` : "NA",
      "Transporter Details": dataItem.transporterDetails ? dataItem.transporterDetails : "NA",
      "Site": dataItem.site ? (dataItem.site.name ? dataItem.site.name : "NA") : "NA",
      "GPS (IMEI)": dataItem.gps ? (dataItem.gps.id ? dataItem.gps.serialNumber : "NA") : "NA",
      "Speed (Km/Hr)": dataItem.speed ? Math.round(parseFloat(dataItem.speed)) : "NA",
      "Status": dataItem.runningStatus ? dataItem.runningStatus : "NA",
      "Location": `${dataItem.lat ? dataItem.lat : "NA"}, ${dataItem.lang ? dataItem.lang : "NA"}`,
      "Last Polling": dataItem.lastPollingDate ? formatMeetingStartDateTime(dataItem.lastPollingDate) : "NA",
      "Model": dataItem.model ? dataItem.model : "NA",
      "Mileage": dataItem.kmPerLitreString ? dataItem.kmPerLitreString : "NA",
    }));

    const ws = XLSX.utils.json_to_sheet(data, {
      header: headers, 
    });

    headers.forEach((key, index) => {
      const headerCell = ws[XLSX.utils.encode_col(index) + '1'];
      if (headerCell) {
        headerCell.s = XLSX_HEADER_STYLE;
      }
    });

    ws['!cols'] = fitToColumn(data);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    XLSX.writeFile(wb, 'Vehicle_List_All_Data.xlsx');
    handleCloseDialog()
  } else {
    // console.error('Invalid data format for export.');
    alert('Invalid data format for export.');
  }
};

const handleExportPDFCurrentPage = () => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a2",
  });

  const startIndex = page * rowsPerPage;
  const currentPageData = filteredTableData?.slice(startIndex, startIndex + rowsPerPage);

  const data = currentPageData?.map((dataItem, index) => [
    calculateIndex(page, index, rowsPerPage),
    dataItem.number ? dataItem.number : "NA",
    dataItem.vehicleType ? (dataItem.vehicleType.id ? dataItem.vehicleType.name : "NA") : "NA",
    dataItem.fuelTankCapacity ? dataItem.fuelTankCapacity : "NA",
    dataItem.currentFuelValue ? (Math.round(dataItem.currentFuelValue * 100) / 100).toFixed(2) : "NA",
    dataItem.driver.name ? `${dataItem.driver.name} / ${dataItem.driver.phoneNumber ? dataItem.driver.phoneNumber : "NA"}` : "NA",
    dataItem.transporterDetails ? dataItem.transporterDetails : "NA",
    dataItem.site ? (dataItem.site.name ? dataItem.site.name : "NA") : "NA",
    dataItem.gps ? (dataItem.gps.id ? dataItem.gps.serialNumber : "NA") : "NA",
    dataItem.speed ? Math.round(parseFloat(dataItem.speed)) : "NA",
    dataItem.runningStatus ? dataItem.runningStatus : "NA",
    `${dataItem.lat ? dataItem.lat : "NA"}, ${dataItem.lang ? dataItem.lang : "NA"}`,
    dataItem.lastPollingDate ? formatMeetingStartDateTime(dataItem.lastPollingDate) : "NA",
    dataItem.model ? dataItem.model : "NA",
    dataItem.kmPerLitreString ? dataItem.kmPerLitreString : "NA",
  ]);

  const columnStyles = {
    5: { cellWidth: 40, fontSize: 8 },
  };

  const tableHead = ["Sl.no", "Vehicle Number", "Vehicle Type", "Tank Capacity (Ltr.)", "Current Fuel (Ltr.)", "Driver Details (Name/Phone)", "Transporter Details", "Site", "GPS (IMEI)", "Speed (Km/Hr)", "Status", "Location", "Last Polling", "Model", "Mileage"];

  const headStyles = { fillColor: [200, 200, 200], fontSize: 8 };

  const pageMargin = 10;

  doc.autoTable({
    head: [tableHead],
    body: data,
    startY: pageMargin,
    theme: "striped",
    columnStyles,
    columns: tableHead.map((header, index) => ({ header, index })),
    headStyles,
    didDrawPage: function (data) {
      if (doc.autoTable.previous.finalY + 20 > doc.internal.pageSize.height - pageMargin) {
        doc.addPage();
      }
    },
  });

  doc.save("Vehicle_List_Current_Page.pdf");

  handleCloseDialog()
};

const handleExportPDFAllData = () => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a2",
  });

  const data = filteredTableData?.map((dataItem, index) => [
    calculateIndex(page, index, rowsPerPage),
    dataItem.number ? dataItem.number : "NA",
    dataItem.vehicleType ? (dataItem.vehicleType.id ? dataItem.vehicleType.name : "NA") : "NA",
    dataItem.fuelTankCapacity ? dataItem.fuelTankCapacity : "NA",
    dataItem.currentFuelValue ? (Math.round(dataItem.currentFuelValue * 100) / 100).toFixed(2) : "NA",
    dataItem.driver.name ? `${dataItem.driver.name} / ${dataItem.driver.phoneNumber ? dataItem.driver.phoneNumber : "NA"}` : "NA",
    dataItem.transporterDetails ? dataItem.transporterDetails : "NA",
    dataItem.site ? (dataItem.site.name ? dataItem.site.name : "NA") : "NA",
    dataItem.gps ? (dataItem.gps.id ? dataItem.gps.serialNumber : "NA") : "NA",
    dataItem.speed ? Math.round(parseFloat(dataItem.speed)) : "NA",
    dataItem.runningStatus ? dataItem.runningStatus : "NA",
    `${dataItem.lat ? dataItem.lat : "NA"}, ${dataItem.lang ? dataItem.lang : "NA"}`,
    dataItem.lastPollingDate ? formatMeetingStartDateTime(dataItem.lastPollingDate) : "NA",
    dataItem.model ? dataItem.model : "NA",
    dataItem.kmPerLitreString ? dataItem.kmPerLitreString : "NA",
  ]);

  const columnStyles = {
    5: { cellWidth: 40, fontSize: 8 },
  };

  const tableHead = ["Sl.no", "Vehicle Number", "Vehicle Type", "Tank Capacity (Ltr.)", "Current Fuel (Ltr.)", "Driver Details (Name/Phone)", "Transporter Details", "Site", "GPS (IMEI)", "Speed (Km/Hr)", "Status", "Location", "Last Polling", "Model", "Mileage"];

  const headStyles = { fillColor: [200, 200, 200], fontSize: 8 };

  const pageMargin = 10;

  doc.autoTable({
    head: [tableHead],
    body: data,
    startY: pageMargin,
    theme: "striped",
    columnStyles,
    columns: tableHead.map((header, index) => ({ header, index })),
    headStyles,
    didDrawPage: function (data) {
      if (doc.autoTable.previous.finalY + 20 > doc.internal.pageSize.height - pageMargin) {
        doc.addPage();
      }
    },
  });

  doc.save("Vehicle_List_All_Data.pdf");

  handleCloseDialog()
};


 
  
  return (
    <>
    <Navbar />
      <Sidebar />
      <Box
        sx={{
          height: "100vh",
          bgcolor: "#f1f1f1",
          display: "flex",
          flexGrow: 1,
          px: 3,
          pl:'4em'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}></Grid>
         
          <Grid item xs={12} md={12} lg={12}>
          <Box sx={{flexGrow:1, display:"flex", justifyContent:'space-between', mb:'2em', gap:2}}>
            <Box sx={{display:'flex', flexDirection:'row'}}>

            <DynamicBreadcrumb breadcrumbs={breadcrumbs} />
            </Box>
            <Box sx={{display:'flex', justifyContent:'space-between', gap:2}}>
            <Button variant="contained" sx={btnStyle} onClick={handleOpenDialogForExportPDF}>
                Export PDF
              </Button>

              <Button variant="contained"  sx={btnStyle} onClick={handleOpenDialogForExportExcel}>
                Export Excel
              </Button>

              <Button variant="contained"  sx={btnStyle}>
                Import Vehicle
              </Button>

              <Button variant="contained"  sx={btnStyle}>
                <AddIcon /> Add Vehicle
              </Button>
            </Box>

            </Box>
            <Paper
              elevation={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                overflowX: "hidden",
                flexDirection: "column",
                // bgcolor:'orange',
                maxWidth: isSideBarPinned
                  ? isOpenforGridTable
                    ? "83.5vw"
                    : "95.5vw"
                  : "95.5vw",
                flexGrow: 1,
                minHeight: "75vh",
                // pb: "0.5em",
              }}
            >
              <Box sx={{flexGrow:1, width:'98%', textAlign:'right'}}><Typography sx={{fontWeight:600, fontSize:'14px'}}><Typography component="span" sx={{color:'#6BB063', fontWeight:600, fontSize:'13px'}}>GPS Installed: {totalGpsEquiptedVehicle}</Typography><Typography component="span" sx={{fontWeight:600, fontSize:'13px'}}> || </Typography><Typography component="span" sx={{color:'#5A41FF', fontWeight:600, fontSize:'13px'}}>Total Vehicles: {totalElements}</Typography></Typography></Box>
              <Box sx={{ width: "100%", flexGrow: 1, display:'flex', justifyContent:'center', mt:'1em'}}>
              <Grid container spacing={1} sx={{ width: '99%' }}>
      <Grid item xs={6} sm={6} md={4} lg={2}>
        <Typography sx={{ textAlign: 'left', fontSize: '12px', fontWeight: 500, color: '#717171', mb: '5px' }}>
          Search Vehicle Number
        </Typography>
        <TextField
          id="search-vehicle-number"
          placeholder="Search Vehicle Number"
          variant="outlined"
          size="small"
          sx={{ width: '100%' }}
          value={vehicleNumberValue}
          onChange={(e) => setVehicleNumberValue(e.target.value)}
          inputProps={{
            maxLength: 60,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {vehicleNumberValue && (
                  <IconButton edge="end" onClick={() => setVehicleNumberValue('')} size="small">
                    <ClearIcon />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={4} lg={2}>
        <Typography sx={{ textAlign: 'left', fontSize: '12px', fontWeight: 500, color: '#717171', mb: '5px' }}>
          Search Transporter
        </Typography>
        <Autocomplete
          size="small"
          disablePortal
          id="combo-box-transporter"
          options={transporterOptions}
          getOptionLabel={(option) => option.name || ""}
          sx={{ width: '100%' }}
          value={transporterOptionsValue}
          onChange={(_,value) => setTransporterOptionsValue(value)}
          renderInput={(params) => <TextField {...params} placeholder="Select Transporter" />}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={4} lg={2}>
        <Typography sx={{ textAlign: 'left', fontSize: '12px', fontWeight: 500, color: '#717171', mb: '5px' }}>Driver</Typography>
        <TextField
          id="search-driver"
          placeholder="Driver Name"
          variant="outlined"
          size="small"
          sx={{ width: '100%' }}
          value={driverValue}
          inputProps={{
            maxLength: 50,
          }}
          onChange={(e) =>{
            let value = e.target.value;
                  
            // Remove characters other than lowercase, uppercase, and spaces
            value = value.replace(/[^a-zA-Z\s]/g, '');
      
            // Replace consecutive spaces with a single space
            value = value.replace(/\s{2,}/g, ' ');
      
            // Ensure the length does not exceed maxLength
            if (value.length > 50) {
              value = value.slice(0, 50);
            }
             setDriverValue(value)
            }}

            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {driverValue && (
                    <IconButton edge="end" onClick={() => setDriverValue('')} size="small">
                      <ClearIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={4} lg={2}>
        <Typography sx={{ textAlign: 'left', fontSize: '12px', fontWeight: 500, color: '#717171', mb: '5px' }}>Site</Typography>
        <Autocomplete
          size="small"
          sx={{ width: '100%' }}
          options={siteOptions}
          getOptionLabel={(option) => option}
          value={siteOptionsValue}
          onChange={(_,value) => setSiteOptionsValue(value)}
          renderInput={(params) => <TextField {...params} placeholder="Select Site" />}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={4} lg={2}>
        <Typography sx={{ textAlign: 'left', fontSize: '12px', fontWeight: 500, color: '#717171', mb: '5px' }}>GPS Status</Typography>
        <Autocomplete
          size="small"
          disablePortal
          id="combo-box-gps"
          options={gpsStatusOptions}
          getOptionLabel={(option) => option === true ? 'ON' : option === false ? 'OFF' : String(option)}
          sx={{ width: '100%' }}
          value={gpsStatusOptionsValue}
          onChange={(_,value) => setGpsStatusOptionsValue(value)}
          renderInput={(params) => <TextField {...params} placeholder="Select GPS Status" />}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={4} lg={2}>
        <Typography sx={{ textAlign: 'left', fontSize: '12px', fontWeight: 500, color: '#717171', mb: '5px' }}>Fuel Sensor Status</Typography>

<Autocomplete
  size="small"
  disablePortal
  id="combo-box-fuel-sensor"
  options={fuelSensorStatusOptions}
  getOptionLabel={(option) => option === true ? 'ON' : option === false ? 'OFF' : String(option)}
  sx={{ width: '100%' }}
  value={fuelSensorStatusOptionsValue}
  onChange={(_, value) => setFuelSensorStatusOptionsValue(value)}
  renderInput={(params) => <TextField {...params} placeholder="Select Fuel Sensor Status" />}
/>

      </Grid>
    </Grid>
              </Box>
              <TableContainer
                sx={{
                  width: "99%",
                  minHeight: "55vh",
                  maxHeight: { sm: "55vh", lg: "61vh" },
                  "& .css-dwuj3p-MuiTableCell-root": {
                    backgroundColor: "#e9f1f1",
                    color: "#656565",
                    height: "5em",
                  },
                  overflow: "auto",
                  paddingTop:0,
                  mt:'1em'
                }}
              >
                <Table
                  // aria-label="sticky table"
                  aria-label="simple table"
                  // sx={{border:'1px solid #C6C6C6'}}
                >
                  <TableHead
                    // stickyHeader
                    sx={{
                      backgroundColor: "#e9f1f1",
                      // border: "10px solid black",
                      fontWeight: "600",
                      position: "sticky !important",
                      top: 0,
                      zIndex: 1,
                      color: "#656565",
                      height: "5em !important",
                      // border:'2px solid #A7A7A7'
                      
                    }}
                  >
                    <TableRow
                      sx={{
                        minheight: "unset",
                        height: "5em !important",
                        color: "#656565",
                        // border:'1px solid #A7A7A7'
                        
                      }}
                    >
                      <TableCell align="center" sx={{ minWidth: "40px" }}>
                        Sr No
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "130px" }}>
                        Vehicle Number
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "80px" }}>
                        Vehicle Type
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "90px" }}>
                        Tank Capacity (Ltr.)
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "90px" }}>
                        Current Fuel (Ltr.)
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "90px" }}>
                        Driver Details (Name/Phone)
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "90px" }}>
                        Transporter Details
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "150px" }}>
                        Site
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "153px" }}>
                        GPS (IMEI)
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "100px" }}>
                        Speed (Km/Hr)
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "90px" }}>
                        Status
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "170px" }}>
                        Location
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "90px" }}>
                        Last Polling
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "100px" }}>
                        Model
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "90px" }}>
                        Live Tracking
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "80px" }}>
                        Fuel Details
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "120px" }}>
                        Fuel Details Bar
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "90px" }}>
                        Mileage
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(filteredTableData) &&
                    filteredTableData.length > 0 ? (
                      filteredTableData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )

                        .map((dataItem, index) => {
                          const requiredData = {
                            number: dataItem.number ? dataItem.number : "NA",
                            vehicleType: dataItem.vehicleType
                              ? dataItem.vehicleType.id
                                ? dataItem.vehicleType.name
                                : "NA"
                              : "NA",
                            fuelTankCapacity: dataItem.fuelTankCapacity
                              ? dataItem.fuelTankCapacity
                              : "NA",
                            currentFuelValue: dataItem.currentFuelValue
                              ? (
                                  Math.round(dataItem.currentFuelValue * 100) /
                                  100
                                ).toFixed(2)
                              : "NA",
                            driverName: dataItem.driver.name
                              ? dataItem.driver.name
                              : "NA",
                            driverPhoneNumber: dataItem.driver.phoneNumber
                              ? dataItem.driver.phoneNumber
                              : "NA",
                            transporterDetails: dataItem.transporterDetails
                              ? dataItem.transporterDetails
                              : null,
                            siteName: dataItem.site
                              ? dataItem.site.name
                                ? dataItem.site.name
                                : "NA"
                              : "NA",
                            gpsIMEI: dataItem.gps
                              ? dataItem.gps.id
                                ? dataItem.gps.serialNumber
                                : "NA"
                              : "NA",
                            speed: dataItem.speed
                              ? Math.round(parseFloat(dataItem.speed))
                              : "NA",
                            status: dataItem.runningStatus
                              ? dataItem.runningStatus
                              : "NA",
                            locationLongitude: dataItem.lang
                              ? dataItem.lang
                              : "NA",
                            locationLatitude: dataItem.lat
                              ? dataItem.lat
                              : "NA",
                            lastPollingDate: dataItem.lastPollingDate
                              ? formatMeetingStartDateTime(
                                  dataItem.lastPollingDate
                                )
                              : "NA",
                            model: dataItem.model ? dataItem.model : "NA",
                            mileage: dataItem.kmPerLitreString
                              ? dataItem.kmPerLitreString
                              : "NA",
                          };

                          const actualIndex = calculateIndex(page, index, rowsPerPage);


                          let statusColor = '#000000'

                          if(requiredData.status === "RUNNING") {
                            statusColor = "green"
                          }

                          if(requiredData.status === "HALT") {
                            statusColor = "#EFC000"
                          }

                          if(requiredData.status === "STOP") {
                            statusColor = "red"
                          }

                          const rowBackgroundColor = index % 2 !== 0 ? "#F7F7F7" : "inherit";

                          return (
                            <TableRow
                              key={index}
                              sx={{
                                color: "#000000",
                                minheight: "unset",
                                maxHeight: "2em !important",
                                backgroundColor: rowBackgroundColor,
                              }}
                            >
                              <TableCell
                                align="center"
                                sx={{ paddingTop: 0, paddingBottom: 0 }}
                              >
                                {/* {index + 1} */}
                                {actualIndex}
                              </TableCell>

                              <TableCell
                                align="center"
                                sx={{ paddingTop: 0, paddingBottom: 0 , fontSize: '16px', color:'#1A8BD3'}}
                              >
                                {requiredData.number}
                              </TableCell>

                              <TableCell
                                align="center"
                                sx={{ paddingTop: 0, paddingBottom: 0, fontSize:'12px', }}
                              >
                                {requiredData.vehicleType}
                              </TableCell>

                              <TableCell
                                align="center"
                                sx={{ paddingTop: 0, paddingBottom: 0, fontSize:'12px', }}
                              >
                                {requiredData.fuelTankCapacity}
                              </TableCell>

                              <TableCell
                                align="center"
                                sx={{ paddingTop: 0, paddingBottom: 0, fontSize:'12px', }}
                              >
                                {requiredData.currentFuelValue}
                              </TableCell>

                              <TableCell
                                align="center"
                                sx={{ paddingTop: 0, paddingBottom: 0, fontSize:'12px', }}
                              >
                                {requiredData.driverName}{" "}
                                {requiredData.driverPhoneNumber}
                              </TableCell>

                              <TableCell
                                align="center"
                                sx={{ paddingTop: 0, paddingBottom: 0, fontSize:'12px', }}
                              >
                                {requiredData.transporterDetails}
                              </TableCell>

                              <TableCell
                                align="center"
                                sx={{ paddingTop: 0, paddingBottom: 0, fontSize:'12px', }}
                              >
                                {requiredData.siteName}
                              </TableCell>

                              <TableCell
                                align="center"
                                sx={{ paddingTop: 0, paddingBottom: 0, fontSize:'12px', }}
                              >
                                {requiredData.gpsIMEI}
                              </TableCell>

                              <TableCell
                                align="center"
                                sx={{ paddingTop: 0, paddingBottom: 0, fontSize:'12px', }}
                              >
                                {requiredData.speed}
                              </TableCell>

                              <TableCell
                                align="center"
                                sx={{ paddingTop: 0, paddingBottom: 0, fontSize:'12px', color:statusColor, }}
                              >
                                {requiredData.status}
                              </TableCell>

                              <TableCell
                                align="center"
                                sx={{ paddingTop: 1, paddingBottom: 1, fontSize:'12px', }}
                              >
                                {requiredData.locationLatitude},{" "}
                                {requiredData.locationLongitude}{" "}
                                <IconButton sx={{ color: "#000000" }}>
                                  <InfoIcon />
                                </IconButton>
                              </TableCell>

                              <TableCell
                                align="center"
                                sx={{ paddingTop: 0, paddingBottom: 0, fontSize:'12px', }}
                              >
                                {requiredData.lastPollingDate}
                              </TableCell>

                              <TableCell
                                align="center"
                                sx={{ paddingTop: 0, paddingBottom: 0, fontSize:'12px', }}
                              >
                                {requiredData.model}
                              </TableCell>

                              <TableCell
                                align="center"
                                sx={{ paddingTop: 0, paddingBottom: 0 }}
                              >
                                <IconButton sx={{ color: "#000000" }}>
                                  <PlaceIcon sx={{ fontSize: "27px" }} />
                                </IconButton>
                              </TableCell>

                              <TableCell
                                align="center"
                                sx={{ paddingTop: 0, paddingBottom: 0 }}
                              >
                                <IconButton sx={{ color: "#000000" }}>
                                  <LocalGasStationIcon
                                    sx={{ fontSize: "29px" }}
                                  />
                                </IconButton>
                              </TableCell>

                              <TableCell
                                align="left"
                                sx={{ paddingTop: 0, paddingBottom: 0, fontSize:'12px', }}
                              >
                                <FuelProgressBar
                                  currentFuelValue={
                                    requiredData.currentFuelValue
                                  }
                                  fuelTankCapacity={
                                    requiredData.fuelTankCapacity
                                  }
                                />
                              </TableCell>

                              <TableCell
                                align="center"
                                sx={{ paddingTop: 0, paddingBottom: 0, fontSize:'12px', }}
                              >
                                {requiredData.mileage}
                              </TableCell>
                              

                            </TableRow>
                          );
                        })
                    ) : (
                      <TableRow>
                      <TableCell colSpan={18} sx={{}}>
                        <Typography sx={{ textAlign:'center', fontSize:'20px'}}>

                          No Data Found
                        </Typography>
                    </TableCell>
                    </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ flexGrow: 1, width: "100%" }}>
                <TablePagination
                  // sx={{bgcolor:'orange'}}
                  rowsPerPageOptions={[5, 10, 25, 50, 100, 250, 500, 1000]}
                  component="div"
                  count={filteredTableData?.length}
                  // count={totalElements}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={exportDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{dialogText}</DialogTitle>
        <DialogContent>
          <p>Do you want to export the current page or all data?</p>
        </DialogContent>
        <DialogActions>
          <Button sx={btnStyle} onClick={isExportingPDF ? handleExportPDFCurrentPage : handleExportExcelCurrentPage} color="primary">
            Current Page
          </Button>
          <Button sx={btnStyle} onClick={isExportingPDF ? handleExportPDFAllData : handleExportExcelAllData} color="primary">
            All Data
          </Button>
          <Button onClick={handleCloseDialog} variant="contained" color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VehicleList;
