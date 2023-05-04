import React, { Fragment, useState } from "react";
import dayjs from "dayjs";

import { Controller } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import messages from "./messages";
import { Input } from "../../components/input";
import { FormStepProps } from "../../../types";
import { useFormValidation, useResponsiveScreen } from "../../hooks";

import {
  Tags,
  Hour,
  Spacer,
  Divider,
  Wrapper,
  SubTitle,
  DateLabel,
  DateButton,
  TagContainer,
  ContentTitle,
  GoBackButton,
  InputContents,
  DateContainer,
  NextStepButton,
  ButtonContainer,
  ContentSubTitle,
  ContentContainer,
} from "./home.styles";
import { Platform } from "react-native";

export const FormStepSix: React.FC<FormStepProps> = ({
  errors,
  goNext,
  goBack,
  control,
  clearErrors,
}) => {
  const { timeValidation } = useFormValidation();
  const { isDesktopOrLaptop } = useResponsiveScreen();

  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  return (
    <Fragment>
      <ContentContainer>
        <ContentSubTitle>Step 6/5</ContentSubTitle>
        <Spacer size={10} />

        <ContentTitle>
          <FormattedMessage {...messages.enter_date} />
        </ContentTitle>
        <Spacer size={10} />

        <ContentSubTitle>
          <FormattedMessage {...messages.enter_Date} />
        </ContentSubTitle>
      </ContentContainer>

      <Spacer size={30} />

      <Divider />
      <Spacer size={30} />

      <Controller
        name="title"
        control={control}
        rules={timeValidation}
        render={({ field: { onChange, ref, ...rest } }) => (
          <DateContainer>
            <Wrapper>
              <DateLabel>Start Date</DateLabel>
              <Spacer size={30} />

              <DateButton
                onPress={() => {
                  setIsDatePickerVisible(true);
                }}
              >
                <DateLabel>pick date</DateLabel>
              </DateButton>

              {isDatePickerVisible && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode={Platform.OS === "ios" ? "datetime" : "date"}
                  is24Hour={true}
                  onChange={onChange}
                />
              )}
            </Wrapper>

            <Wrapper>
              <DateLabel>End Date</DateLabel>
              <Spacer size={30} />

              <DateButton
                onPress={() => {
                  setIsDatePickerVisible(true);
                }}
              >
                <DateLabel>pick date</DateLabel>
              </DateButton>

              {isDatePickerVisible && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode={Platform.OS === "ios" ? "datetime" : "date"}
                  is24Hour={true}
                  onChange={onChange}
                />
              )}
            </Wrapper>
          </DateContainer>
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
