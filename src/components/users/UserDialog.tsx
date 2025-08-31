import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import type { UserType } from './type';
import { useActionState, useState } from 'react';
import type { ActionState } from '../../interfaces';
import type { UserFormValues } from '../../models';
import { createInitialState } from '../../helpers';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export type UserActionState = ActionState<UserFormValues>;

interface Props {
  open: boolean;
  user?: UserType | null;
  onClose: () => void;
  handleCreateEdit: (
    _: UserActionState | undefined,
    formData: FormData,
  ) => Promise<UserActionState | undefined>;
}

export const UsersDialog = ({
  onClose,
  open,
  user,
  handleCreateEdit,
}: Props) => {
  const initialState = createInitialState<UserFormValues>();
  const [state, submitAction, isPending] = useActionState(
    handleCreateEdit,
    initialState,
  );
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>{user ? 'Editar usuario' : 'Nuevo usuario'}</DialogTitle>
      <Box key={user?.id ?? 'new'} component='form' action={submitAction}>
        <DialogContent>
          <TextField
            name='username'
            autoFocus
            margin='dense'
            label='Usuario'
            fullWidth
            required
            variant='outlined'
            disabled={isPending}
            defaultValue={state?.formData?.username || user?.username || ''}
            error={!!state?.errors?.username}
            helperText={state?.errors?.username}
            sx={{ mb: 2 }}
          />
          {/* {!user && ( */}
          <>
            <TextField
              name='password'
              margin='dense'
              label='Contraseña'
              // type='password'
              type={showPassword ? 'text' : 'password'}
              fullWidth
              required
              variant='outlined'
              disabled={isPending}
              error={!!state?.errors?.password}
              helperText={state?.errors?.password}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleTogglePassword} edge='end'>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              name='confirmPassword'
              margin='dense'
              label='Confirmar contraseña'
              // type='password'
              type={showPassword ? 'text' : 'password'}
              fullWidth
              required
              variant='outlined'
              disabled={isPending}
              error={!!state?.errors?.confirmPassword}
              helperText={state?.errors?.confirmPassword}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleTogglePassword} edge='end'>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </>
          {/* )} */}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} color='inherit' disabled={isPending}>
            Cancelar
          </Button>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={isPending}
            startIcon={isPending ? <CircularProgress size={16} /> : null}
          >
            {user ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
