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
  GoBackButton,
  InputContents,
  ButtonContainer,
  NextStepButton,
  ContentSubTitle,
  ContentContainer,
} from "./home.styles";

export const FormStepFour: React.FC<FormStepProps> = ({
  goNext,
  goBack,
  errors,
  control,
  clearErrors,
}) => {
  const { priceValidation } = useFormValidation();
  const { isDesktopOrLaptop } = useResponsiveScreen();

  return (
    <Fragment>
      <ContentContainer>
      <ContentSubTitle>
          Step 4/5
        </ContentSubTitle>
      <Spacer size={10} />

        <ContentTitle>
          <FormattedMessage {...messages.enter_price} />
        </ContentTitle>
      <Spacer size={10} />

        <ContentSubTitle>
          <FormattedMessage {...messages.enter_tornament_price} />
        </ContentSubTitle>
      </ContentContainer>

      <Spacer size={30} />

    <Divider/>
      <Spacer size={30} />

      <Controller
        name="title"
        control={control}
        rules={priceValidation}
        render={({ field: { onChange, ref, ...rest } }) => (
          <Input
            {...rest}
            maxLength={14}
            onChangeText={onChange}
            label="Enter Tournament Price"
            placeholder="N5000"
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
