import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {Link} from 'react-router-dom';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}


export default function BasicBreadcrumbs({data}) {
  return (
    <div role="presentation" style={{"marginLeft":"1000px"}}>
      <Breadcrumbs aria-label="breadcrumb">
        {data.map((item,index) => <Link key={index} underline="hover" color="inherit" to={item.key}>
          {item.value}
        </Link>
        )}
        <Typography color="text.primary">{data[0].component}</Typography>
      </Breadcrumbs>
    </div>
  );
}
