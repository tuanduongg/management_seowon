import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField, Typography } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { Paragraph } from 'components/Typography';
import useAuth from 'hooks/useAuth';
import { Formik } from 'formik';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Logo from '../../assets/images/logo.png';
import { ConfigRouter } from 'ConfigRouter';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '32px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)',
}));

const JWTRoot = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100% !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
  },
}));

// inital login credentials
const initialValues = {
  username: '',
  password: '',
  remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(3, 'Mật khẩu ít nhất 3 ký tự')
    .required('Bắt buộc nhập mật khẩu!'),
    username: Yup.string().required('Bắt buộc nhập tên tài khoản!'),
});

const JwtLogin = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values.username, values.username);
      navigate(ConfigRouter.home);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <JWTRoot>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
              <img src={Logo} width="100%" alt="logo" />
            <Typography component={'h4'} variant={'h4'}>Seowonintech</Typography>
            </JustifyBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ContentBox>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="username"
                      label="Tên tài khoản"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.username}
                      onChange={handleChange}
                      helperText={touched.username && errors.username}
                      error={Boolean(errors.username && touched.username)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Mật khẩu"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 1.5 }}
                    />

                    {/* <FlexBox justifyContent="space-between">
                      <FlexBox gap={1}>
                        <Checkbox
                          size="small"
                          name="remember"
                          onChange={handleChange}
                          checked={values.remember}
                          sx={{ padding: 0 }}
                        />

                        <Paragraph>Remember Me</Paragraph>
                      </FlexBox>

                      <NavLink
                        to="/session/forgot-password"
                        style={{ color: theme.palette.primary.main }}
                      >
                        Forgot password?
                      </NavLink>
                    </FlexBox> */}

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ my: 2 }}
                    >
                      Login
                    </LoadingButton>

                    {/* <Paragraph>
                      Don't have an account?
                      <NavLink
                        to="/session/signup"
                        style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                      >
                        Register
                      </NavLink>
                    </Paragraph> */}
                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default JwtLogin;
