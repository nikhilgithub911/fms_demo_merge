import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import data from "../data/Data";
import { TablePagination } from "@mui/material";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import BreadCrumb from "./BreadCrumb";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E3F0E9",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
  "&.singleLineHeader": {
    whiteSpace: "nowrap",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableData = () => {
  const breadcrumbs = [
    { name: "Dashboard", path: "/" },
    { name: "Site", path: "/tabledata" },
  ];
  
  const [pg, setPg] = useState(0);
  const [rpg, setRpg] = useState(8);
  const [nameFilter, setNameFilter] = useState("");
  const [siteTypeFilter, setSiteTypeFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);

  // usestate for export types 
  const [anchorEl, setAnchorEl] = useState(null);
  const [exportType, setExportType] = useState(null);

  // functions for exports
  const handleMenuOpen = (event, type) => {
    console.log("this option is getting called")
    setAnchorEl(event.currentTarget);
    setExportType(type);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setExportType(null);
  };

  const handleExportOption = (option) => {
    if (exportType === "pdf") {
      if (option === "all") {
        exportAllDataToPDF();
      } else if (option === "table") {
        exportToPDF();
      }
    } else if (exportType === "excel") {
      if (option === "all") {
        exportAllDataToExcel();
      } else if (option === "table") {
        exportToExcel();
      }
    }
    handleMenuClose();
  };

  function handleChangePage(_, newPage) {
    setPg(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRpg(parseInt(event.target.value, 10));
    setPg(0);
  }

  const response = data.data;


  const uniqueSiteTypes = [
    ...new Set(response.map((item) => item.siteTypeDTO?.name || "")),
  ];
  const uniqueStatusFilter = [
    ...new Set(
      response.map((item) => String(item.siteTypeDTO?.isActive) || "")
    ),
  ];

  const filteredData = response.filter((item) => {
    const nameMatch = item.name
      .toLowerCase()
      .includes(nameFilter.toLowerCase());
    const siteTypeMatch =
      !siteTypeFilter ||
      item.siteTypeDTO?.name.toLowerCase() === siteTypeFilter.toLowerCase();
    const statusTypeMatch =
      !statusFilter || String(item.siteTypeDTO?.isActive) === statusFilter;

    return nameMatch && siteTypeMatch && statusTypeMatch;
  });

  const exportToExcel = () => {
    const wsData = [
      [
        "S.No.",
        "Site Name",
        "Site Address",
        "Area Name",
        "Total Vehicles",
        "Site Type",
      ],
      ...filteredData
        .slice(pg * rpg, (pg + 1) * rpg)
        .map((item, index) => [
          index + 1,
          item.name,
          item.address,
          item.parentSite,
          item.vehicleCount,
          item.siteTypeDTO?.name,
        ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Calculate column widths based on content
    const colWidths = wsData[0].map((col, i) => {
      const maxLength = Math.max(
        ...wsData.slice(1).map((row) => String(row[i]).length)
      );
      return { wch: maxLength + 2 };
    });

    ws["!cols"] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    XLSX.writeFile(wb, "table_data.xlsx");
  };


  // export all data in excel

  const exportAllDataToExcel = () => {
    const wsData = [
      [
        "S.No.",
        "Site Name",
        "Site Address",
        "Area Name",
        "Total Vehicles",
        "Site Type",
      ],
      ...response.map((item, index) => [
        index + 1,
        item.name,
        item.address,
        item.parentSite,
        item.vehicleCount,
        item.siteTypeDTO?.name,
      ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Calculate column widths based on content
    const colWidths = wsData[0].map((col, i) => {
      const maxLength = Math.max(
        ...wsData.slice(1).map((row) => String(row[i]).length)
      );
      return { wch: maxLength + 2 };
    });

    ws["!cols"] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    XLSX.writeFile(wb, "all_data.xlsx");
  };
  // export all pdf data

  const exportAllDataToPDF = () => {
    const doc = new jsPDF();

    const tableData = response.map((item, index) => [
      index + 1,
      item.name,
      item.address,
      item.parentSite,
      item.vehicleCount,
      item.siteTypeDTO?.name,
    ]);

    doc.autoTable({
      head: [
        [
          "Sl.no",
          "Site Name",
          "Site Address",
          "Area Name",
          "Total Vehicles",
          "Site Type",
        ],
      ],
      body: tableData,
      startY: 20,
    });

    doc.save("all_data.pdf");
  };


  const exportToPDF = () => {
    const doc = new jsPDF();

    const startRow = pg * rpg;
    const endRow = (pg + 1) * rpg;

    const tableData = filteredData
      .slice(startRow, endRow)
      .map((item, index) => [
        index + 1,
        item.name,
        item.address,
        item.parentSite,
        item.vehicleCount,
        item.siteTypeDTO?.name,
      ]);

    doc.autoTable({
      head: [
        [
          "Sl.no",
          "Site Name",
          "Site Address",
          "Area Name",
          "Total Vehicles",
          "Site Type",
        ],
      ],
      body: tableData,
      startY: 20,
    });

    doc.save("table_data.pdf");
  };

  return (
    <>
      <Navbar />
      <Sidebar />

      <Box
        sx={{
          height: "100vh",
          bgcolor: "lavenderblush",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* second parent container */}
        <Box
          sx={{
            height: "80vh",
            width: "90vw",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* button box */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 16px",
              mb: "0.1em",
            }}
          >
            {/* box for site management label */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>Site Management</Typography>
              {/* Breadcrumbs */}
              <BreadCrumb
                breadcrumbs={breadcrumbs}
                activeElement={breadcrumbs[breadcrumbs.length - 1].name}
              />{" "}
            </Box>
            {/* Stack with three buttons */}


            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                size="small"
                sx={{
                  textTransform: "lowercase",
                  backgroundColor: "#662d91",
                  "&:hover": {
                    backgroundColor: "#452c63",
                  },
                }}
                onClick={(e) => handleMenuOpen(e, "pdf")}
              // onClick={exportAllDataToPDF}
              >
                Export Pdf
              </Button>
              <Button
                variant="contained"
                size="small"
                sx={{
                  textTransform: "lowercase",
                  backgroundColor: "#662d91",
                  "&:hover": {
                    backgroundColor: "#452c63",
                  },
                }}
                onClick={(e) => handleMenuOpen(e, "excel")}
              // onClick={exportAllDataToExcel}
              >
                Export Excel
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                sx={{
                  textTransform: "lowercase",
                  backgroundColor: "#662d91",
                  "&:hover": {
                    backgroundColor: "#452c63",
                  },
                }}
              >
                Add Site
              </Button>
            </Stack>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{ style: { width: '10em' } }}

            >
              <MenuItem onClick={() => handleExportOption("all")}>
                Export All Data
              </MenuItem>
              <MenuItem onClick={() => handleExportOption("table")}>
                Export Table Data
              </MenuItem>
            </Menu>
          </Box>
          {/* Paper for filters */}

          <Paper elevation={4} sx={{ height: "100%", padding: "16px" }}>
            <Grid container spacing={2} sx={{ marginBottom: "1em" }}>
              <Grid item xs={12} md={3}>
                <Typography sx={{ fontSize: "0.75em", mb: "0.5em" }}>
                  Search Site Name
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Select Name"
                  size="small"
                  variant="outlined"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Typography sx={{ fontSize: "0.75em", mb: "0.5em" }}>
                  Select Status
                </Typography>
                <Autocomplete
                  size="small"
                  options={uniqueStatusFilter}
                  value={statusFilter}
                  onChange={(_, value) => setStatusFilter(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Status" />
                  )}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Typography sx={{ fontSize: "0.75em", mb: "0.5em" }}>
                  Select Type
                </Typography>
                <Autocomplete
                  size="small"
                  options={uniqueSiteTypes}
                  value={siteTypeFilter}
                  onChange={(_, value) => setSiteTypeFilter(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Type" />
                  )}
                  fullWidth
                />
              </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ height: "55vh" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">S.No.</StyledTableCell>
                    <StyledTableCell align="left">Site Name</StyledTableCell>
                    <StyledTableCell align="left">Site Address</StyledTableCell>
                    <StyledTableCell align="left" className="singleLineHeader">
                      Area Name
                    </StyledTableCell>
                    <StyledTableCell align="left" className="singleLineHeader">
                      Total Vehicles
                    </StyledTableCell>
                    <StyledTableCell align="left" className="singleLineHeader">
                      Site Type
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData
                    .slice(pg * rpg, (pg + 1) * rpg)
                    .map((item, index) => (
                      <StyledTableRow key={item.id}>
                        <StyledTableCell component="th" scope="row">
                          {pg * rpg + index + 1}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {item.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {item.address}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {item.parentSite}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {item.vehicleCount}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {item.siteTypeDTO?.name}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 8, 10, 25]}
              component="div"
              count={filteredData.length}
              rowsPerPage={rpg}
              page={pg}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default TableData;




// here question mark is used to show that siteTypeDTO.name can be a null value

// const uniqueSiteTypes = [
//   ...new Set(response.map((item) => item.siteTypeDTO?.name || "")),
// ];





// .slice(startIndex, endIndex) is a method used to extract a portion of an array.
// pg is the current page, and rpg is the number of rows per page.
// (pg * rpg) calculates the starting index of the slice, representing the first row of the current page.
// (pg + 1) * rpg calculates the ending index of the slice, representing the row just beyond the last row of the current page.
// Putting it together, .slice(pg * rpg, (pg + 1) * rpg) is extracting a subset of rows from the array, specifically the rows that belong to the current page based on the specified number of rows per page.

// For example, if pg is 2 and rpg is 8, it would slice rows 16 to 24 (assuming a zero-based index). This subset represents the rows that should be displayed on the current page.