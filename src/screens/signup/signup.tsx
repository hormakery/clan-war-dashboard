import React, { useState, useRef } from "react";
import { FormattedMessage } from "react-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { LayoutRectangle, ScrollView } from "react-native";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";

import messages from "./messages";
import { IFormStep } from "../../../types";
import { generateId } from "../../helpers";
import { RootStackScreenProps } from "../../../types/navigation";
import { ITournamentClan } from "../../providers/store/reducers/session/interfaces";
import {
  FormStepOne,
  FormStepTwo,
  FormStepFive,
  FormStepFour,
  FormStepThree,
  FormStepIndicator,
} from "./form";

import {
  Container,
  GoBackButton,
  NextStepButton,
  ButtonContainer,
  MaxWidthContainer,
  FormStepScrollViewWrapper,
} from "./signup.styles";

const defaultFormSteps: IFormStep[] = [
  {
    isViewable: true,
    icon: "android",
    id: generateId(),
    key: "clan_name",
    highlighted: true,
    title: "Clan name",
  },
  {
    id: generateId(),
    key: "team_name",
    isViewable: false,
    highlighted: true,
    icon: "basketball",
    title: "Team name",
  },
  {
    icon: "ansible",
    key: "clan_logo",
    id: generateId(),
    isViewable: false,
    highlighted: true,
    title: "Clan logo",
  },
  {
    key: "team",
    id: generateId(),
    highlighted: true,
    isViewable: false,
    icon: "alarm-bell",
    title: "Build your team",
  },
  {
    id: generateId(),
    isViewable: false,
    highlighted: false,
    icon: "gauge-full",
    title: "confirmation",
    key: "contact_email_address",
  },
];

const forms = [
  FormStepOne,
  FormStepTwo,
  FormStepThree,
  FormStepFour,
  FormStepFive,
];

export const SignUpScreen: React.FC<RootStackScreenProps<"SignUpScreen">> = ({
  navigation,
}) => {
  const [isNext, setIsNext] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formSteps, setFormSteps] = useState(defaultFormSteps);
  const {
    control,
    trigger,
    handleSubmit,
    getFieldState,
    formState: { errors },
  } = useForm<ITournamentClan>();

  const isFirstPageOfFormActive = currentIndex === 0;
  const isLastPageOfFormActive = currentIndex === formSteps.length - 1;

  const handleFormStep = (stepId: IFormStep["id"]) => {
    const index = formSteps.findIndex(({ id }) => id === stepId);
    setIsNext(index > currentIndex);
    setCurrentIndex(index);
  };

  const onSubmit: SubmitHandler<ITournamentClan> = (data) => {};

  const validateCurrentFormBeforeRoute = async () => {
    const { key } = formSteps[currentIndex];
    await trigger(key);
    return getFieldState(key).error?.message;
  };

  const goBack = () => {
    setIsNext(false);
    const index = currentIndex - 1;
    setCurrentIndex(index);
  };

  const goNext = async () => {
    // return if error only route to next form if no errors
    const error = await validateCurrentFormBeforeRoute();
    if (error) return;

    const nextIndex = currentIndex + 1;

    const newFormSteps = formSteps.map((step, i) => ({
      ...step,
      isViewable: step.isViewable || i === nextIndex,
    }));

    setFormSteps(newFormSteps);
    setIsNext(true);
    setCurrentIndex(nextIndex);
  };

  return (
    <Container>
      <MaxWidthContainer>
        <FormStepIndicator
          steps={formSteps}
          onChange={handleFormStep}
          currentIndex={currentIndex}
        />

        <FormStepScrollViewWrapper>
          {forms.map((Form, index) =>
            currentIndex === index ? (
              <Animated.View
                key={`${index}_form_step`}
                entering={isNext ? FadeInRight : FadeInLeft}
              >
                <Form errors={errors} control={control} />
              </Animated.View>
            ) : null
          )}
        </FormStepScrollViewWrapper>

        <ButtonContainer>
          {!isFirstPageOfFormActive && (
            <GoBackButton onPress={goBack}>
              <FormattedMessage {...messages.back} />
            </GoBackButton>
          )}

          <NextStepButton
            onPress={isLastPageOfFormActive ? handleSubmit(onSubmit) : goNext}
          >
            <FormattedMessage
              {...messages[
                isLastPageOfFormActive ? "complete_submission" : "next_step"
              ]}
            />
          </NextStepButton>
        </ButtonContainer>
      </MaxWidthContainer>
    </Container>
  );
};