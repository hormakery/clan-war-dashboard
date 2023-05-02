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
} from "./home.styles";

export const FormStepOne: React.FC<FormStepProps> = ({
  errors,
  goNext,
  control,
  clearErrors,
}) => {
  const { titleValidation } = useFormValidation();

  return (
    <Fragment>
      <ContentContainer>
      <ContentSubTitle isActive={false}>
          Step 1/5
        </ContentSubTitle>
      <Spacer size={10} />

        <ContentTitle>
          <FormattedMessage {...messages.get_started} />
        </ContentTitle>
      <Spacer size={10} />

        <ContentSubTitle isActive={false}>
          <FormattedMessage {...messages.get_started_subtitle} />
        </ContentSubTitle>
      </ContentContainer>

      <Spacer size={30} />

    <Divider/>
      <Spacer size={30} />

      <Controller
        name="title"
        control={control}
        rules={titleValidation}
        render={({ field: { onChange, ref, ...rest } }) => (
          <Input
            {...rest}
            maxLength={14}
            onChangeText={onChange}
            label="Enter Tournament Title"
            placeholder="Private Alcatraz"
            // error={errors.host_name}
          />
        )}
      />

      <Spacer size={60} />
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
    </Fragment>
  );
};
