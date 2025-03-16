import { Sightings } from "./sightings";

export default interface ModalProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleOpenLoginModal?: () => void;
  handleCloseLoginModal?: () => void;
  handleOpenSignUpModal?: () => void;
  handleCloseSignUpModal?: () => void;
  handleOpenProfileModal?: () => void | (() => void | undefined);
  handleCloseProfileModal?: () => void;
  sightings?: Sightings[];
}
