import React, { useState, useRef, Fragment } from "react";
import { ScrollView } from "react-native";
import { useTheme } from "styled-components/native";
import { SubmitHandler, useForm } from "react-hook-form";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";

import { IFormStep } from "../../../types";
import { generateId } from "../../helpers";
import { useResponsiveScreen } from "../../hooks";
import { ITournament } from "../../../types/tournament";
import { RootStackScreenProps } from "../../../types/navigation";

import { FormStepOne } from "./form-step-one";
import { FormStepTwo} from "./form-step-two";
import { FormStepFour } from "./form-step-four";
import { FormStepFive } from "./form-step-five";
import { FormStepThree } from "./form-step-three";

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
  MaxWidthWrapper
} from "./home.styles";

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

export const HomeScreen: React.FC<RootStackScreenProps<"HomeScreen">> = ({
  navigation,
}) => {
  const [isNext, setIsNext] = useState(true);
  const scrollRef = useRef<ScrollView>(null);
  const { palette, layout, breakpoints } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isDesktopOrLaptop } = useResponsiveScreen();
  const [formSteps, setFormSteps] = useState(defaultFormSteps);

  const {
    watch,
    control,
    trigger,
    setError,
    setValue,
    getValues,
    clearErrors,
    handleSubmit,
    getFieldState,
    formState: { errors },
  } = useForm<ITournament>();


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


  const onSubmit: SubmitHandler<ITournament> = (data) => {
    // setHost(data);
  };

  return (
    <Container isDesktopOrLaptop={isDesktopOrLaptop}>
        <StepContainer isDesktopOrLaptop={isDesktopOrLaptop}>
          <Spacer size={15} />
          <Title size={25}>Create new tournament</Title>
          <Spacer size={50} />

          <StepScrollView
            ref={scrollRef}
            isDesktopOrLaptop={isDesktopOrLaptop}
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
                    isDesktopOrLaptop={isDesktopOrLaptop}
                  />
                )}
              </Fragment>
            ))}
          </StepScrollView>
        </StepContainer>

        <InputContainer isDesktopOrLaptop={isDesktopOrLaptop}>
         <Spacer size={90} />
          <MaxWidthWrapper>
          {forms.map((Form, index) =>
            currentIndex === index ? (
              <Animated.View
                key={`${index}_form_step`}
                entering={index === 0 ? FadeInRight : FadeInLeft}
              >
                <Form
                  goNext={goNext}
                  goBack={goBack}
                  watch={watch}
                  errors={errors}
                  control={control}
                  setError={setError}
                  setValue={setValue}
                  getValues={getValues}
                  clearErrors={clearErrors}
                />
              </Animated.View>
            ) : null
          )}
          </MaxWidthWrapper>
        </InputContainer>
    </Container>
  );
};


