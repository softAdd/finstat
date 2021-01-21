import React, { FC } from 'react';
import { Select as MaterialSelect, SelectProps, FormControl, InputLabel } from '@material-ui/core';

export const Select: FC<SelectProps> = ({ children, label, ...props }) => (
  <FormControl variant="outlined" margin="dense" style={{ width: 250 }}>
    {label && <InputLabel>{label}</InputLabel>}
    <MaterialSelect
      label={label?.toString()}
      {...props}
    >
      {children}
    </MaterialSelect>
  </FormControl>
);
