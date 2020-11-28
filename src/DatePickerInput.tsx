import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import AdapterDayjs from '@material-ui/lab/AdapterDayjs';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';

export default function BasicDatePicker() {
  const [value, setValue] = React.useState<Date | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Basic example"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} variant="standard" />}
      />
    </LocalizationProvider>
  );
}