import { Button, Modal } from "antd";
import React, { useState } from "react";

type ModalProps = {
  title: string;
  children?: React.ReactNode | React.ReactElement;
  openModal: boolean;
};

const DeleteModal = ({ openModal = true, title, children }: ModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(openModal);

  //   const showModal = () => {
  //     setIsModalOpen(true);
  //   };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h1 style={{ color: "red" }}>Are you really want to delete this?</h1>
      </Modal>
    </div>
  );
};

export default DeleteModal;
