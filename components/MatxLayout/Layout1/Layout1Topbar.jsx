import { Avatar, Hidden, Icon, IconButton, MenuItem, useMediaQuery, Tooltip } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { MatxMenu, MatxSearchBox, MultipleSelect } from 'components';
import { themeShadows } from 'components/MatxTheme/themeColors';
import { NotificationProvider } from 'contexts/NotificationContext';
import useAuth from 'hooks/useAuth';
import useSettings from 'hooks/useSettings';
import { topBarHeight } from 'utils/constant';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Span } from '../../../components/Typography';
import NotificationBar from '../../NotificationBar/NotificationBar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import ModalProfile from 'components/ModalProfile';
import { ConfigRouter } from 'ConfigRouter';
import { ShowAlert, ShowQuestion } from 'utils/confirm';
import { useTranslation } from 'react-i18next';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const TopbarRoot = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 96,
  transition: 'all 0.3s ease',
  boxShadow: themeShadows[8],
  height: topBarHeight,
}));

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: '8px',
  paddingLeft: 18,
  paddingRight: 20,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: 14,
    paddingRight: 16,
  },
}));

const UserMenu = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  borderRadius: 24,
  padding: 4,
  '& span': { margin: '0 8px' },
}));

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 185,
  '& a': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  '& span': { marginRight: '10px', color: theme.palette.text.primary },
}));

const IconBox = styled('div')(({ theme }) => ({
  display: 'inherit',
  [theme.breakpoints.down('md')]: { display: 'none !important' },
}));


const getFirstUsername = (username) => {
  return username[0] ?? 'User';
}
const Layout1Topbar = () => {

  const [openModalProfile, setOpenModalProfile] = useState(false);
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const { logout, user } = useAuth();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { t, i18n } = useTranslation();


  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({
      layout1Settings: { leftSidebar: { ...sidebarSettings } },
    });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close';
    } else {
      mode = layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full';
    }
    updateSidebarMode({ mode });
  };

  const onCloseModal = () => {
    setOpenModalProfile(false);
  }
  const onOpenModalProfile = () => {
    setOpenModalProfile(true);
  }

  const hanldeClickLogout = () => {
    ShowQuestion({ titleProp: 'Thông báo', content: 'Bạn chắc chắn muốn đăng xuất ?', showCancelButton: true, onClickYes: logout });
  }

  return (
    <>
      <TopbarRoot>
        <TopbarContainer>
          <Box display="flex">
            <MultipleSelect />
            {/* <StyledIconButton onClick={handleSidebarToggle}>
              <Tooltip title="Đóng/mở menu">
                <Icon>menu</Icon>
              </Tooltip>
          </StyledIconButton> */}

            {/* <IconBox>
            <StyledIconButton>
              <Icon>mail_outline</Icon>
            </StyledIconButton>

            <StyledIconButton>
              <Icon>web_asset</Icon>
            </StyledIconButton>

            <StyledIconButton>
              <Icon>star_outline</Icon>
            </StyledIconButton>
          </IconBox> */}
          </Box>

          <Box display="flex" alignItems="center">

            <MatxMenu
              menuButton={
                <UserMenu>
                  <Hidden xsDown>
                    <Icon> person </Icon>
                    <Span><strong>{user.username}</strong>
                    </Span>
                  </Hidden>
                </UserMenu>
              }
            >
              <StyledItem>
                <Link to={ConfigRouter.home}>
                  <Icon> home</Icon>
                  <Span> {t('home')} </Span>
                </Link>
              </StyledItem>

              <StyledItem>
                <Link to={ConfigRouter.profile}>
                  <Icon> person </Icon>
                  <Span> {t('profile')} </Span>
                </Link>
              </StyledItem>

              <StyledItem onClick={hanldeClickLogout}>
                <Icon> power_settings_new </Icon>
                <Span>{t('logout')} </Span>
              </StyledItem>
            </MatxMenu>
          </Box>
        </TopbarContainer>
        {/* <ModalProfile open={openModalProfile} onCloseModal={onCloseModal} /> */}
      </TopbarRoot>
    </>
  );
};

export default React.memo(Layout1Topbar);
