import React from "react";
import { Controller } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";

import messages from "./messages";
import { FormStepProps } from "../../helpers"
import { Input } from "../../components/input";
import { useFormValidation } from "../../hooks";

import { InputContents, NextStepButton, Spacer } from "./form-styles";
import { UserContainer } from "../add-player-modal/add-player-modal.styles";
import { Icon } from "../icon";

export const FormStepTwo: React.FC<FormStepProps> = ({
  errors,
  control,
  clearErrors,
}) => {
  const { formatMessage } = useIntl();
  const { titleValidation } = useFormValidation();

  return (
    <InputContents>
    {/* <UserContainer>
      <Icon name="name" />
      <UserContents>
        {player_ign && <UserIGN>{player_ign}</UserIGN>}
        <SubTitle isActive={false}>
          {user_id.substring(0, 8)}...{user_id.substring(10, 22)}
        </SubTitle>
      </UserContents>
    </UserContainer>

    <Spacer size={15} /> */}
    <Controller
      name="host_name"
      control={control}
      rules={titleValidation}
      render={({ field: { onChange, ref, ...rest } }) => (
        <Input
          {...rest}
          maxLength={14}
          onChangeText={onChange}
          label="Enter Host Name"
          placeholder="十・Drifter"
          error={errors.host_name}
        />
      )}
    />

    <Spacer size={60} />
    <NextStepButton
      onPress={onButtonPress}
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
  </InputContents>
    // </FormStepWrapper>
  );
};
