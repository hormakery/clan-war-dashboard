import React, { useRef } from "react";
import { FormattedMessage } from "react-intl";
import { Controller, useForm } from "react-hook-form";

import { Icon } from "../icon";
import { Input } from "../input";
import messages from "./messages";
import { generateId } from "../../helpers";
import { useFormValidation } from "../../hooks";
import { ITournamentTeam } from "../../providers/store/reducers/tournament/interfaces";

import {
  Spacer,
  UserIGN,
  SubTitle,
  UserContents,
  InputContents,
  UserContainer,
  NextStepButton,
} from "./form-styles";
import { FormStepProps } from "../../../types";

type FormStepOneProps = {
  onButtonPress: VoidFunction;
  isScreenLessThanMaxWidth: boolean;
} & FormStepProps<Partial<ITournamentTeam>>;

export const FormStepOne: React.FC<FormStepOneProps> = ({
  errors,
  control,
  onButtonPress,
  isScreenLessThanMaxWidth,
}) => {
  const user_id = useRef(generateId()).current;
  const { titleValidation } = useFormValidation();
  const { watch } = useForm<Partial<ITournamentTeam>>();

  const player_ign = watch("player_ign");

  return (
    <InputContents isScreenLessThanMaxWidth={isScreenLessThanMaxWidth}>
  
      <UserContainer>
        <Icon name="avatar" />
        <UserContents>
          <SubTitle isActive={false}>
            {subtitle}
          </SubTitle>
        </UserContents>
      </UserContainer>

      <Spacer size={15} />
      <Controller
        name="title"
        control={control}
        rules={titleValidation}
        render={({ field: { onChange, ref, ...rest } }) => (
          <Input
            {...rest}
            maxLength={14}
            onChangeText={onChange}
            label="Enter title"
            placeholder="十・Drifter"
            error={errors.title}
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
  );
};
