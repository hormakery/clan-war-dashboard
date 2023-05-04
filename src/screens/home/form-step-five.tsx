import React, { Fragment } from "react";
import { Controller } from "react-hook-form";
import { FormattedMessage } from "react-intl";

import messages from "./messages";
import { Input } from "../../components/input";
import { FormStepProps } from "../../../types";
import { useFormValidation, useResponsiveScreen } from "../../hooks";

import {
  Tags,
  Spacer,
  Divider,
  SubTitle,
  TagContainer,
  ContentTitle,
  GoBackButton,
  InputContents,
  NextStepButton,
  ButtonContainer,
  ContentSubTitle,
  ContentContainer,
} from "./home.styles";

export const FormStepFive: React.FC<FormStepProps> = ({
  errors,
  goNext,
  goBack,
  control,
  clearErrors,
}) => {
  const { tagsValidation } = useFormValidation();
  const { isDesktopOrLaptop } = useResponsiveScreen();

  const tags = [
    "PC",
    "Wars",
    "avengers",
    "Alkatraz",
    "God of war",
    "unchartered",
    "The Dark Knight",
  ];

  return (
    <Fragment>
      <ContentContainer>
        <ContentSubTitle>Step 1/5</ContentSubTitle>
        <Spacer size={10} />

        <ContentTitle>
          <FormattedMessage {...messages.get_started} />
        </ContentTitle>
        <Spacer size={10} />

        <ContentSubTitle>
          <FormattedMessage {...messages.get_started_subtitle} />
        </ContentSubTitle>
      </ContentContainer>

      <Spacer size={30} />

      <Divider />
      <Spacer size={30} />

      <Controller
        name="title"
        control={control}
        rules={tagsValidation}
        render={({ field: { onChange, ref, ...rest } }) => (
          <Fragment>
            {tags.length ? (
              <TagContainer>
                {tags.map((tag, index) => (
                  <Tags key={`${tag}_${index}`}>{tag}</Tags>
                ))}
              </TagContainer>
            ) : null}
          </Fragment>
        )}
      />

      <Spacer size={60} />
      <ButtonContainer>
        <GoBackButton onPress={goBack}>
          <FormattedMessage {...messages.back} />
        </GoBackButton>
        <NextStepButton
          onPress={goNext}
          style={{
            elevation: 5,
            shadowRadius: 3.84,
            shadowOpacity: 0.25,
            shadowColor: "#000",

            shadowOffset: { width: 0, height: 2 },
          }}
        >
          <FormattedMessage {...messages.next_step} />
        </NextStepButton>
      </ButtonContainer>
    </Fragment>
  );
};
