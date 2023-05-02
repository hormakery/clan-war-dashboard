import React, { Fragment } from "react";
import { Controller } from "react-hook-form";
import { FormattedMessage } from "react-intl";

import messages from "./messages";
import { Input } from "../../components/input";
import { FormStepProps } from "../../../types";
import { useFormValidation, useResponsiveScreen } from "../../hooks";

import {
  Spacer,
  Divider,
  SubTitle,
  ContentTitle,
  InputContents,
  NextStepButton,
  ContentSubTitle,
  ContentContainer,
  ButtonContainer,
  GoBackButton,
} from "./home.styles";

export const FormStepThree: React.FC<FormStepProps> = ({
  errors,
  goNext,
  goBack,
  control,
  clearErrors,
}) => {
  const { hostNameValidation } = useFormValidation();
  const { isDesktopOrLaptop } = useResponsiveScreen();

 

  return (
    <Fragment>
      <ContentContainer>
      <ContentSubTitle>
          Step 3/5
        </ContentSubTitle>
      <Spacer size={10} />

        <ContentTitle>
          <FormattedMessage {...messages.enter_host_name} />
        </ContentTitle>
      <Spacer size={10} />

        <ContentSubTitle>
          <FormattedMessage {...messages.fill_host_details} />
        </ContentSubTitle>
      </ContentContainer>

      <Spacer size={30} />

    <Divider/>
      <Spacer size={30} />

      <Controller
        name="title"
        control={control}
        rules={hostNameValidation}
        render={({ field: { onChange, ref, ...rest } }) => (
          <Input
            {...rest}
            maxLength={14}
            onChangeText={onChange}
            label="Enter Host Name "
            placeholder="Drifter"
            // error={errors.host_name}
          />
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
