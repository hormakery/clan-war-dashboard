import React, { useState, useRef, Fragment } from "react";
import { shallowEqual } from "react-redux";
import { FormattedMessage } from "react-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";

import messages from "./messages";
import { useSelector } from "../../hooks";
import { IFormStep } from "../../../types";
import { generateId } from "../../helpers";
import { RootStackScreenProps } from "../../../types/navigation";
// import { ITournamentClan } from "../../providers/store/reducers/tournament/interfaces";
import {
  FormStepIndicator,
  FormStepOne,
  // FormStepTwo,
  // FormStepFive,
  // FormStepFour,
  // FormStepThree,
  // FormStepIndicator,
} from "../../components/form";

import {
  Step,
  Title,
  Spacer,
  SubTitle,
  StepIndex,
  Container,
  StepNumber,
  StepDivider,
  GoBackButton,
  StepContainer,
  InputContainer,
  StepScrollView,
  NextStepButton,
  ButtonContainer,
  MaxWidthContainer,
  // FormStepScrollViewWrapper,
} from "./home.styles";
import { ScrollView } from "react-native";
import { useTheme } from "styled-components";

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
  // FormStepTwo,
  // FormStepThree,
  // FormStepFour,
  // FormStepFive,
];

export const HomeScreen: React.FC<RootStackScreenProps<"HomeScreen">> = ({
  navigation,
}) => {
  const [isNext, setIsNext] = useState(true);
  const scrollRef = useRef<ScrollView>(null);
  const { palette, layout, breakpoints } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formSteps, setFormSteps] = useState(defaultFormSteps);
  const [clan, setClan] = useState<ITournamentClan | null>(null);

  const { selectedTournament } = useSelector(
    ({ tournament }) => tournament,
    shallowEqual
  );

  const {
    control,
    trigger,
    setError,
    setValue,
    getValues,
    clearErrors,
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
    // const error = await validateCurrentFormBeforeRoute();
    // if (error) return;

    const nextIndex = currentIndex + 1;
    const newFormSteps = formSteps.map((step, i) => ({
      ...step,
      isViewable: step.isViewable || i === nextIndex,
    }));

    setFormSteps(newFormSteps);
    setCurrentIndex(nextIndex);
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  const onRoutePress = (index: number) => {
    setCurrentIndex(index);

    if (index === 0) {
      scrollRef.current?.scrollTo({ x: 0, animated: true });
    } else {
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  };


  const onSubmit: SubmitHandler<ITournamentClan> = (data) => {
    setHost(data);
  };

  const MAX_WIDTH = breakpoints.tablet_viewport;
  const isScreenLessThanMaxWidth = isMinScreenSize(MAX_WIDTH);

  

  return (
    <Container  isScreenLessThanMaxWidth={isScreenLessThanMaxWidth}>
      <MaxWidthContainer>
        <FormStepIndicator
          steps={formSteps}
          onChange={handleFormStep}
          currentIndex={currentIndex}
        />

        <StepContainer isScreenLessThanMaxWidth={isScreenLessThanMaxWidth}>
          <Title wrap>Anonymous eSport</Title>
          <Spacer size={15} />
          <SubTitle>Register your player</SubTitle>
          <Spacer size={30} />

          <StepScrollView
            ref={scroll}
            isScreenLessThanMaxWidth={isScreenLessThanMaxWidth}
          >
            {formSteps.map(({ id, isViewable, title }, index) => (
              <Fragment key={id}>
                <Step
                  isActive={currentIndex === index}
                  onPress={() => onRoutePress(index)}
                  disabled={!isViewable || currentIndex === index}
                >
                  <StepNumber isActive={currentIndex === index}>
                    <StepIndex isActive={currentIndex === index}>
                      {index + 1}
                    </StepIndex>
                  </StepNumber>
                  <SubTitle isActive={currentIndex === index}>{title}</SubTitle>
                </Step>

                {index === 0 && (
                  <StepDivider
                    isScreenLessThanMaxWidth={isScreenLessThanMaxWidth}
                  />
                )}
              </Fragment>
            ))}
          </StepScrollView>
        </StepContainer>

        <InputContainer isScreenLessThanMaxWidth={isScreenLessThanMaxWidth}>
          {forms.map((Form, index) =>
            currentIndex === index ? (
              <Animated.View
                key={`${index}_form_step`}
                entering={index === 0 ? FadeInRight : FadeInLeft}
              >
                <Form
                  errors={errors}
                  control={control}
                  isScreenLessThanMaxWidth={isScreenLessThanMaxWidth}
                  onButtonPress={() =>
                    index === 0 ? goNext() : handleSubmit(onSubmit)
                  }
                />
              </Animated.View>
            ) : null
          )}
        </InputContainer>

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


