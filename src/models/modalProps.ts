export default interface ModalProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleOpenLoginModal?: () => void;
  handleCloseLoginModal?: () => void;
  handleOpenSignUpModal?: () => void;
  handleCloseSignUpModal?: () => void;
  handleOpenProfileModal?: any;
  handleCloseProfileModal?: () => void;
  user?: any;
  userFromLogin?: any;
  userInfoCallback?: any;
}
