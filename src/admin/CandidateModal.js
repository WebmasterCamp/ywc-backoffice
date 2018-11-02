import React from "react";
import moment from "moment";
import {Modal, Button, Divider} from "antd";
import CopyToClipboard from "react-copy-to-clipboard";
import styled from "styled-components";

import Label from "./Label";
import QuestionStore from "../common/QuestionStore";

const Header = styled.h1`
  margin: 0;
  color: #333;
  padding: 7px 0;
  font-size: 25px;
  font-family: "Kanit";
`;

const SubHeader = styled.h2`
  margin: 0;
  color: #333;
  font-size: 20px;
  font-weight: bold;

  margin-bottom: 20px;
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
            <Label title="Status">{candidate.status}</Label>
            <Label title="Completed At">
              {moment(new Date(candidate.completed_at || "")).format(
                "YYYY-MM-DD HH:mm:ss",
              )}
            </Label>

            <Divider />

            <SubHeader>Personal Information</SubHeader>
            <Label title="Facebook ID">{candidate.facebook}</Label>
            <Label title="Major">{candidate.major}</Label>
            <Label title="Nickname">{candidate.nickname}</Label>
            <Label title="Sex">{candidate.sex}</Label>
            <Label title="Blood">{candidate.blood}</Label>
            <Label title="Religion">{candidate.religion}</Label>
            <Label title="Birthdate">
              {moment(new Date(candidate.birthdate || "")).format(
                "YYYY-MM-DD HH:mm:ss",
              )}{" "}
              (Age:{" "}
              {moment().diff(new Date(candidate.birthdate || ""), "years")})
            </Label>
            <Label title="Name">
              {candidate.title} {candidate.firstName} {candidate.lastName}
            </Label>
            <Label title="Name (English)">
              {candidate.firstNameEN} {candidate.lastNameEN}
            </Label>
            <Label title="Phone">{candidate.phone}</Label>
            <Label title="Province">{candidate.province}</Label>
            <Label title="Postal Code">{candidate.postalCode}</Label>
            <Label title="Address">{candidate.address}</Label>
            <Label title="Activities">{candidate.activities}</Label>

            <Divider />

            <SubHeader>Education</SubHeader>
            <Label title="Education Status">{candidate.educationStatus}</Label>
            <Label title="Equivalent Education Degree">
              {candidate.equivalentEducationDegree}
            </Label>
            <Label title="University">{candidate.university}</Label>
            <Label title="Department">{candidate.department}</Label>
            <Label title="Faculty">{candidate.faculty}</Label>
            <Label title="Academic Year">{candidate.academicYear}</Label>
            <Label title="Current Working Status">
              {candidate.currentWorkingStatus}
            </Label>
            <Label title="Current Working Description">
              {candidate.workingStatusDescription}
            </Label>

            <Divider />

            <SubHeader>Other Information</SubHeader>
            <Label title="Disease">{candidate.disease}</Label>
            <Label title="Emergency Name">{candidate.emergencyName}</Label>
            <Label title="Emergency Phone">{candidate.emergencyPhone}</Label>
            <Label title="Emergency Phone Related">
              {candidate.emergencyPhoneRelated}
            </Label>
            <Label title="Food / Food Allergy">
              {candidate.food} / {candidate.foodAllergy}
            </Label>
            <Label title="Med / Med Allergy">
              {candidate.med} / {candidate.medAllergy}
            </Label>
            <Label title="Shirt Size">{candidate.shirtSize}</Label>
            <Label title="Skype">{candidate.skype}</Label>
            <Label title="Know Camp">
              {(candidate.knowCamp || []).join(", ")}
            </Label>

            <Divider />

            <SubHeader>General Question</SubHeader>
            {QuestionStore.questions.general.map((question, i) => {
              return (
                <Label key={i} title={question}>
                  {candidate.questions !== undefined &&
                    (
                      candidate.questions.generalQuestions[i] || {
                        answer: "Undefined",
                      }
                    ).answer}
                </Label>
              );
            })}

            <Divider />

            <SubHeader>Major Question</SubHeader>
            {QuestionStore.questions[candidate.major || "programming"].map(
              (question, i) => {
                return (
                  <Label key={i} title={question}>
                    {candidate.questions !== undefined &&
                      (
                        candidate.questions.majorQuestions[i] || {
                          answer: "Undefined",
                        }
                      ).answer}
                  </Label>
                );
              },
            )}
          </div>
        </ProfileGrid>
      </Modal>
    </div>
  );
};

export default CandidateModal;
