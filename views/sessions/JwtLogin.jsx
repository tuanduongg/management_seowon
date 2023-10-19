import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField, Typography } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { Paragraph } from 'components/Typography';
import useAuth from 'hooks/useAuth';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { NavLink, Navigate as NavigateTo, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Logo from '../../assets/images/logo.png';
import { ConfigRouter } from 'ConfigRouter';
import { useTranslation } from 'react-i18next';


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

const JwtLogin = () => {

  const [messageErr, setMessageErr] = useState('');
  const theme = useTheme();


  let {
    isAuthenticated,
    // user
  } = useAuth();

  const { t, i18n } = useTranslation();

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(3, t('password-min'))
      .required(t('required-password')),
    username: Yup.string().required(t('required-username')),
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ConfigRouter.home);
    }
  }, []);


  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    setMessageErr('');
    setLoading(true);
    try {
      const data = await login(values.username, values.password);
      if (data) {

        navigate(ConfigRouter.home);
        return;
      }
      setMessageErr('Invalid Username or Password!');
      setLoading(false);


    } catch (e) {
      setMessageErr('Invalid Username or Password!');
      setLoading(false);
    }
  };
  if (isAuthenticated) {
    return <NavigateTo to={ConfigRouter.home} />
  }
  return (

    <JWTRoot>
      <Card className="card">
        <Grid container sx={{ display: 'block' }}>
          <Grid item sm={12} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
              <img src={Logo} width="100%" alt="logo" />
              <Typography component={'h4'} variant={'h4'}>Seowonintech</Typography>
            </JustifyBox>
          </Grid>

          <Grid item sm={12} xs={12}>
            <ContentBox>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="username"
                      label={t('username')}
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
                      label={t('password')}
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 1.5 }}
                    />

                    <FlexBox justifyContent="space-between">
                      <Typography sx={{ color: 'red' }}>{messageErr}</Typography>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ margin: 'auto' }}
                    >
                      {t('login')}
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
