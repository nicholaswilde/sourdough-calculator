import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const useStyles = makeStyles({
  tableCell: {
    fontSize: 16
  }
});

const Result = ({ resultData }) => {
  const classes = useStyles();

  const numberFormatter = new Intl.NumberFormat('en-US');

  return (
    <Table aria-label="result">
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableCell} colSpan={2} align="center">
            RESULT
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {resultData.map(i => (
          <TableRow key={i.name} hover>
            <TableCell className={classes.tableCell}>{i.name} </TableCell>
            <TableCell className={classes.tableCell} align="right">
              {numberFormatter.format(i.value)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Result;
