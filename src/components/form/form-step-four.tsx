import React from "react";
import { FormattedMessage } from "react-intl";
import { Controller, useFieldArray } from "react-hook-form";

import messages from "./messages";
import { Icon } from "../../components/icon";
import { FormStepProps } from "../../helpers";
import { useFormValidation, useDispatch } from "../../hooks";
import { settingsActions } from "../../providers/store/reducers";

import {
  Spacer,
  TeamButton,
  PlayerName,
  TeamScrollView,
  FormStepWrapper,
} from "./form-styles"

export const FormStepFour: React.FC<FormStepProps> = ({
  errors,
  control,
  clearErrors,
}) => {
  const dispatch = useDispatch();
  const { clanNameValidation } = useFormValidation();
  const { fields, append, prepend } = useFieldArray({
    control,
    name: "team",
  });

  const onTeamClick = () => {
    dispatch(settingsActions.toggleAddPlayerModalVisibility());
  };

  return (
    <FormStepWrapper>
      
      <Spacer size={40} />
      <TeamScrollView>
        <Controller
          name="team"
          control={control}
          rules={clanNameValidation}
          render={({ field: { onChange } }) => (
            <TeamButton onPress={onTeamClick}>
              <Icon name="user" />
              <PlayerName>
                <FormattedMessage {...messages.add_team_leader} />
              </PlayerName>
            </TeamButton>
          )}
        />

      </TeamScrollView>
    </FormStepWrapper>
  );
};
