import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button
} from "@chakra-ui/react";

export interface ModalCenterProps {
  title: string;
  buttonText?: string;
  modalContent: JSX.Element;
  onClose: () => void;
}

const ModalCenter: React.FC<ModalCenterProps> = ({ title, buttonText, modalContent, onClose }) => {
  const { isOpen, onOpen, onClose: handleClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>{buttonText}</Button>

      <Modal onClose={handleClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalContent}</ModalBody>
          <ModalFooter>
            <Button onClick={handleClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCenter;
