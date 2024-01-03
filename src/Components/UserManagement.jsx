import React, { useEffect, useState } from "react";
import data from "../actions/datas";

import {
  Box,
  Grid,
  Button,
  TextField,
  Autocomplete,
  FormControl,
} from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";


import jsPDF from "jspdf";
import "jspdf-autotable";

import { utils, writeFile } from "xlsx";

const UserManagement = () => {
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);
  const [autocompleteOptions, setAutocompleteOptions] = React.useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCodeQuery, setSearchCodeQuery] = useState("");

// let siteNames = [];

// data.data.forEach(item => {
   
//     if (item.site && item.site.length > 0) {
     
//         item.site.forEach(site => {
//             if (site.name) {
              
//                 siteNames.push(site.name);
//             }
//         });
//     }
// });
  
  
//   const uniqueSiteNames = Array.from(new Set(siteNames));
//   const autocompleteOptions = uniqueSiteNames.map((site, index) => ({ label: site, id: index }));


  React.useEffect(()=>{
    const siteObjects = [];

data.data.forEach(item => {
  if (item.site && item.site.length > 0) {
    item.site.forEach(site => {
      if (site.name) {
        siteObjects.push(site); 
      }
    });
  }
});

const uniqueSiteObjects = Array.from(new Set(siteObjects.map(s => s.name))).map(name => {
  return siteObjects.find(s => s.name === name); // 
});


const autocompleteOptionsToSet = uniqueSiteObjects.map((site, index) => ({
  label: site.name,
  id: site.id, 
  siteObject: site, 
}));
setAutocompleteOptions(autocompleteOptionsToSet);
  }, [])



  const exportData = () => {
    let tableHeaders = ["User Details", "", "","","", "Phone Number/Email", "", "","","", "Site Access", "", "","",""];
    // let tableRows = filteredData.map((d) => [
    //   `${d.name}(${d.employeeCode})`,
    //   `${d.phoneNumber} | ${d.email}`,
      
    //   d.name,
    // ]);

    let tableRows = filteredData.flatMap((d) => [
      [
        `${d.name}(${d.employeeCode})`, "", "","" ,"",
        `${d.phoneNumber} | ${d.email}`, "", "","", "",
        
        (d.site && d.site.map((siteData) => siteData.name).join(", ")) || "",
      "", "", "",
       
      ],
     
    ]);



  
  
    let wsData = [tableHeaders, ...tableRows];

    let wb = utils.book_new();
    let ws = utils.aoa_to_sheet(wsData);

    utils.book_append_sheet(wb, ws, "items");
    writeFile(wb, "user_data.xlsx");
  };
  
  const [selectedSiteName, setSelectedSiteName] = useState(null);
  const filteredData = data.data.filter((d) => {
    const nameMatch = d.name.toLowerCase().includes(searchQuery.toLowerCase());
    const codeMatch = String(d.employeeCode)
      .toLowerCase()
      .includes(searchCodeQuery.toLowerCase());

      const siteMatch = !selectedSiteName || (
        d.site && d.site.length > 0 &&
        d.site.some((site) => site.name.toLowerCase() === selectedSiteName.label.toLowerCase())
      );

    return nameMatch && codeMatch && siteMatch;
  });

  function handleSearchCodeInputChange(event) {
    const query = event.target.value.toLowerCase();

    setSearchCodeQuery(query);
    setpg(0);
  }

  function handleSearchInputChange(event) {
    setSearchQuery(event.target.value); // Update search query state on input change
    setpg(0); // Reset pagination when the search query changes
  }

  // const handleSiteSelect = (event, value) => {
  //   setSelectedSite(value);

  //   setpg(0);
  // };

  // Filter data based on employee code

  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }

  const exportToPdf = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["User Details", "Phone Number/Email", "Site Access"]],
      body: filteredData.map((d) => [
        `${d.name}(${d.employeeCode})`,
        `${d.phoneNumber} | ${d.email}`,
        (d.site && d.site.map((siteData) => siteData.name).join(", ")) 
         
      ]),
    });

    doc.save("user_data.pdf");
  };

  const clearSearchQuery = () => {
    setSearchQuery("");
  
  };

  const clearCodeSearchQuery = () => {
  
    setSearchCodeQuery("")
  };
  


 

  // Handler function for Autocomplete value change
  const handleAutocompleteChange = (event, value) => {
    console.log(value, "valueeeeeeeee");
    setSelectedSiteName(value);
    setpg(0)
   
  };

  // console.log(selectedSite, "selected site");
  console.log(selectedSiteName,"selectedSiteName")

  return (
    <>
      {/* <Sidebar/> */}
      {/* <Navbar />  */}

      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          // p: 3,
          maxHeight: "100%",
          // width:"86%",
          flexDirection: "row-reverse",
          backgroundColor: "",
        }}
      >
        <Grid container sx={{ backgroundColor: "", width: "95%" }}>
          <Grid
            item
            sx={{
              backgroundColor: "",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            xs={12}
            md={12}
            lg={12}
          >
            {/* <Box> */}
            <h2> User Management</h2>

            {/* </Box> */}

            <Box
              sx={{
                top: "",
                backgroundColor: "",
                display: "flex",
                placeSelf: "center",
                gap: "15px",
              }}
            >
              <Button
                onClick={exportToPdf}
                variant=""
                sx={{ backgroundColor: "rgb(115, 24, 220)", color: "white" }}
              >
                Export Pdf
              </Button>
              {/* </Box> */}

              {/* <Box> */}
              <Button
                variant=""
                sx={{ backgroundColor: "rgb(115, 24, 220)", color: "white" }}
                onClick={exportData}
              >
                Export Excel
              </Button>
              {/* </Box> */}
              {/* <Box> */}
              <Button
                variant=""
                sx={{ backgroundColor: "rgb(115, 24, 220)", color: "white" }}
              >
                <AddIcon />
                Add User
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Grid container sx={{ display: "flex", flexDirection: "column" }}>
              <Grid item>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "",
                    backgroundColor: "",
                    gap: 5,
                    m: 1,
                    p: 1,
                  }}
                >
                  <Box
                    component="form"
                    sx={{
                      // m: 1,
                      // p: 1,
                      width: "20%",
                      backgroundColor: "",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <label style={{ alignSelf: "flex-start" }}>
                      Search User
                    </label>
                    <TextField
                      id="outlined-basic"
                      label="Search User"
                      variant="outlined"
                      sx={{ width: "100%", backgroundColor: "" }}
                      InputProps={{
                        endAdornment: (
                          <>
                            {searchQuery && (
                              <IconButton
                                aria-label="clear search"
                                onClick={clearSearchQuery}
                              >
                                <ClearIcon />
                              </IconButton>
                            )}
                            <IconButton aria-label="search" edge="end">
                              <SearchIcon />
                            </IconButton>
                          </>
                        ),
                      }}
                      value={searchQuery} // Controlled input value
                      onChange={handleSearchInputChange}
                    />
                  </Box>

                  <Box
                    component="form"
                    sx={{
                      // m: 1,
                      // p: 1,
                      width: "20%",
                      backgroundColor: "",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <label style={{ alignSelf: "flex-start" }}>
                      Employee Code
                    </label>
                    <TextField
                      id="outlined-basic"
                      label="Eg :C001"
                      variant="outlined"
                      value={searchCodeQuery} // Controlled input value
                      onChange={handleSearchCodeInputChange}
                      sx={{
                        width: "100%",

                        // width: "calc(100% - 40px)"

                        backgroundColor: "",
                      }}
                      InputProps={{
                        endAdornment: (
                          <>
                            {searchCodeQuery && (
                              <IconButton
                                aria-label="clear search"
                                onClick={clearCodeSearchQuery}
                              >
                                <ClearIcon />
                              </IconButton>
                            )}

                            <IconButton aria-label="search" edge="end">
                              <SearchIcon />
                            </IconButton>
                          </>
                        ),
                      }}
                    />
                  </Box>

                  {/* <Box
                    component="form"
                    sx={{
                      width: "20%",
                      backgroundColor: "",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <label style={{ alignSelf: "flex-start" }}>
                      Select Site
                    </label>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={
                        data && data.data && data.data.length > 0
                          ? data.data
                          : []
                      }
                      getOptionLabel={(option) =>
                        option.site && option.site.length > 0
                          ? option.site[0].name
                          : ""
                      }
                      value={selectedSite}
                      onChange={(event, newValue) => {
                        setSelectedSite(newValue); // Update the selectedSite state
                        setpg(0); // Reset pagination when the selected site changes
                      }}
                      sx={{
                        width: "100%",

                        backgroundColor: "",
                      }}
                      InputProps={{
                        endAdornment: (
                          <IconButton aria-label="search" edge="end">
                            <SearchIcon />
                          </IconButton>
                        ),
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Select Site" />
                      )}
                    />
                  </Box> */}

                  {/* <div> */}
                  <Box
                    component="form"
                    sx={{
                      // m: 1,
                      // p: 1,
                      width: "20%",
                      backgroundColor: "",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <label style={{ alignSelf: "flex-start" }}>
                      Select Site
                    </label>

                    {/* <Autocomplete
                      value={value}
                      onChange={(event, newValue) => {
                        setSelectedSite(newValue);
                      }}
                      inputValue={inputValue}
                      onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                      }}
                      id="controllable-states-demo"
                      options={options}

                      filterOptions={(options, { inputValue }) =>
                      options.filter(
                        (option) =>
                          option.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                      )
                    }

              
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Select Site" />
                      )}
                    /> */}


{/* <Autocomplete
      disablePortal
      id="combo-box-demo"
 
      // options={siteNames.map((site, index) => ({ label: site, id: index }))}
    value={selectedSiteName}
      onChange={handleAutocompleteChange}
      options={autocompleteOptions}
      // getOptionLabel={(option) => option.label}
      //     getOptionSelected={(option, value) => option.id === value.id} 


          getOptionLabel={(option) => option.label}
          getOptionSelected={(option, value) => option.id === value.id}
          isOptionEqualToValue={(option, value) => option.id === value.id}

      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Select Site" />}
    />
   */}


<Autocomplete
  disablePortal
  id="combo-box-demo"
  value={selectedSiteName}
  onChange={handleAutocompleteChange}
  options={autocompleteOptions}
  getOptionLabel={(option) => option.label}
  // getOptionSelected={(option, value) => option.id === value.id}
  // isOptionEqualToValue={(option, value) => option.id === value.id}
  sx={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="Select Site" />}
/>




                  </Box>
                  {/* </div> */}
                </Box>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{backgroundColor:"pink",maxWidth:"93vw"}}>
                  <TableContainer component={Paper} sx={{backgroundColor:"",maxWidth:"93vw",
                  maxHeight:"50vh"
                
                }}>
                    <Table  sx={{backgroundColor:""}}aria-label="simple table">
                      <TableHead 
                      sx={{ position: "sticky !important",
                      top: 0,
                      backgroundColor:"white"
                      }}
                      >
                        <TableRow>
                          <TableCell>Sl. No</TableCell>
                          <TableCell align="left">User Details</TableCell>
                          <TableCell align="left">Phone Number/Email</TableCell>
                          <TableCell align="left">Site Access</TableCell>
                          {/* <TableCell align="right">Networking 
                            </TableCell>  */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {/* {data.data */}
                        {filteredData
                          .slice(pg * rpg, pg * rpg + rpg)
                          .map((d, index) => (
                            <TableRow
                              key={index}

                              // sx={{ "&:last-child td,
                              // &:last-child th": { border: 0 } }}
                            >
                              <TableCell>
                                {index + 1 + pg * rpg}{" "}
                                {/* Displaying the serial number */}
                              </TableCell>
                              {/* <TableCell component="th" scope="row"> 
                                    {d.name} 
                                </TableCell>  */}
                              <TableCell
                                align="left"
                                sx={{ color: "rgb(22 140 198)" }}
                              >
                                <div style={{ display: "flex" }}>
                                  {" "}
                                  <AccountCircleIcon sx={{ color: "black" }} />
                                  {d.name}({d.employeeCode})
                                </div>
                              </TableCell>
                              <TableCell align="left">
                                {d.phoneNumber} | {d.email}
                              </TableCell>
                              {d.site ? (
  <TableCell align="left">
    {d.site.map((siteData) => (
      <span key={siteData.id}>{siteData.name}</span>
    ))}
  </TableCell>
) : (
  <TableCell align="left">NA</TableCell>
)}
                              {/* <TableCell align="right">{d.networking} 
                                </TableCell>  */}
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                
                </Paper>
                <TablePagination

                sx={{backgroundColor:"white"}}
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={data.data.length}
                    rowsPerPage={rpg}
                    page={pg}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default UserManagement;
