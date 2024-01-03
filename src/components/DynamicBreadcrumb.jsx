import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const DynamicBreadcrumb = ({ breadcrumbs }) => {
  const navigate = useNavigate();
  const hasSecondLastBreadcrumb = breadcrumbs && breadcrumbs.length >= 2;
  const secondLastBreadcrumb = hasSecondLastBreadcrumb ? breadcrumbs[breadcrumbs.length - 2] : null;
  const lastBreadcrumb = breadcrumbs && breadcrumbs[breadcrumbs.length - 1];

  const handleBack = () => {
    if (hasSecondLastBreadcrumb) {
      navigate(secondLastBreadcrumb.path);
    }
  };

  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const handleClick = (index) => {
    const newPath = `/${pathnames.slice(0, index + 1).join('')}`;

    if (newPath === location.pathname) {
      navigate('/', { replace: true });
    } else {
      navigate(newPath);
    }
  };

  const linkStyles = {
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  };

  const activeLinkStyles = {
    fontWeight: 600,
    color: '#6D6D6D',
    textDecoration: 'none',
    cursor: 'default',
    '&:hover': {
      textDecoration: 'none',
    },
  };

  const links = breadcrumbs.map((breadcrumb, index) => (
    index === breadcrumbs.length - 1 ? (
      <Link
        key={index}
        color="inherit"
        to={breadcrumb.path}
        sx={{ ...linkStyles, ...activeLinkStyles }}
      >
        {breadcrumb.name}
      </Link>
    ) : (
      <Link
        key={index}
        color="inherit"
        onClick={() => handleClick(index)}
        sx={{ ...linkStyles }}
      >
        {breadcrumb.name}
      </Link>
    )
  ));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap:1, justifyContent:'center', alignItems:'center', }}>
      {hasSecondLastBreadcrumb && (
        <IconButton onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', }}>
        <Typography sx={{ fontWeight: 600, color: '#6D6D6D', fontSize: '15px' }}>{lastBreadcrumb.name}</Typography>
        <Breadcrumbs separator="›">
          {links}
        </Breadcrumbs>
      </Box>
    </Box>
  );
};

export default DynamicBreadcrumb;
