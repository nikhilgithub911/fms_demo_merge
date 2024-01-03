import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';

const BreadCrumb = ({ breadcrumbs, activeElement }) => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <Link
          key={index}
          underline="none"
          color={breadcrumb.name === activeElement ? 'text.primary' : 'inherit'}
          onClick={() => handleClick(breadcrumb.path)}
          sx={{ fontSize: '0.9rem',cursor:"pointer" }}
        >
          {breadcrumb.name}
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default BreadCrumb;
