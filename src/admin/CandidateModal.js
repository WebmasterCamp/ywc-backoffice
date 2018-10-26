import React from "react";
import {Modal, Button} from "antd";
import CopyToClipboard from "react-copy-to-clipboard";
import styled from "styled-components";

const Header = styled.h1`
  margin: 0;
  color: #333;
  padding: 7px 0;
  font-size: 25px;
  font-family: "Kanit";
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 1fr 3fr;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 7px;
  margin-bottom: 20px;
`;

const CandidateModal = ({showCandidateModal, closeModal, candidate}) => {
  return (
    <div>
      <Modal
        width={1000}
        title={
          <Header>
            {candidate.firstName || candidate.firstNameEN}{" "}
            {candidate.lastName || candidate.lastNameEN} ({candidate._id})
          </Header>
        }
        visible={showCandidateModal}
        onOk={closeModal}
        onCancel={closeModal}>
        <ProfileGrid>
          <div>
            <Image src={candidate.picture} />
            <CopyToClipboard text={JSON.stringify(candidate, 2, 2)}>
              <Button type="dashed" block>
                Copy to clipboard as JSON
              </Button>
            </CopyToClipboard>
          </div>
          <div>
            <pre>{JSON.stringify(candidate, 2, 2)}</pre>
          </div>
        </ProfileGrid>
      </Modal>
    </div>
  );
};

export default CandidateModal;
