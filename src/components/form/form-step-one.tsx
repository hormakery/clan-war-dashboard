import React, { Fragment, useMemo } from "react";
import { Image, Linking } from "react-native";
import { FormattedMessage } from "react-intl";
import { useTheme } from "styled-components/native";
import * as ImagePicker from "expo-image-picker";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";


import { Controller, useForm } from "react-hook-form";

import { Icon } from "../icon";
import messages from "./messages";
import { getLogoSize } from "../../helpers";
import { FormStepProps } from "../../../types";
const { isMinScreenSize, isDesktopOrLaptop } = useResponsiveScreen();

import { useLogoUpload, useFormValidation, useOnLayout, useResponsiveScreen } from "../../hooks";


import {
  Label,
  Spacer,
  Avatar,
  FormTitle,
  FormSubTitle,
  ErrorMessage,
  InputContents,
  NextStepButton,
  AvatarScrollView,
  ErrorMessageContainer,
  LogoContainer,
  LogoContents,
  SubTitle,
  Title,
  LogoUploadContainer,
  UploadProgress,
  ProgressSubTitle,
  UploadProgressBar,
  UploadIconContainer,
  UploadIcon,
} from "./form-styles";


type FormStepProps = {
  onButtonPress: VoidFunction;
  isScreenLessThanMaxWidth: boolean;
} 

export const FormStepOne: React.FC<FormStepProps> = ({
  errors,
  control,
  setValue,
  setError,
  getValues,
  clearErrors,
}) => {
  const { layout, palette, hexToRGB } = useTheme();
  const [progressLayout, onLayout] = useOnLayout();
  const { hostLogoValidation } = useFormValidation();
  const [_, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const {
    isLoading,
    isComplete,
    uploadLogo,
    cancelUpload,
    progress: uploadedProgress,
  } = useLogoUpload();

  const progress =
    (Number(progressLayout?.width || 0) / 100) * uploadedProgress;

  const host_logo = getValues("host_logo");
  const host_name = getValues("host_name");

  const MAX_WIDTH = breakpoints.tablet_viewport;
  const isScreenLessThanMaxWidth = isMinScreenSize(MAX_WIDTH);

  const pickLogo = async (): Promise<void> => {
    const status = await requestPermission();

    if (!status?.granted && status?.canAskAgain) {
      // ask for permission again
      return pickLogo();
    }

    if (!status?.canAskAgain) {
      // redirect user to setting
      return Linking.openSettings();
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      base64: true,
      aspect: [4, 3],
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.canceled) return;

    const file = result.assets[0];
    const EXTENSIONS = ["png", "jpeg", "jpg", "gif"];
    const extension = file.uri?.split(";")[0].split("/")[1];

    if (!EXTENSIONS.includes(extension)) {
      return setError("host_logo", { message: "Image format not supported" });
    }

    const fileSize = getLogoSize(file.uri!, file.fileSize);

    if (fileSize > 600) {
      return setError("host_logo", { message: "Max file size is 500kb" });
    }

    if (errors.host_logo) {
      clearErrors("host_logo");
    }

    const fileName = `${host_name.trim().split(" ").join("-")}-${
      file.fileName || Date.now()
    }`.toLowerCase();

    uploadLogo({ ...file, extension, fileName })
      .then((url) => setValue("host_logo", url))
      .catch((error) => setError("host_logo", { message: error.message }));
  };

  const handleCancelUpload = () => {
    setValue("host_logo", "");
    cancelUpload();
  };

  return (
    <InputContents>
      <Controller
        name="host_logo"
        control={control}
        rules={hostLogoValidation}
        render={() => (
          <Fragment>
            <ErrorMessageContainer>
              {<Label error={!!errors.avatar}>Select an image</Label>}
              {errors.avatar && (
                <ErrorMessage>{errors.host_logo.message}</ErrorMessage>
              )}
            </ErrorMessageContainer>

            
            <LogoContainer>
              <LogoContents onPress={pickLogo} error={!!errors.clan_logo}>
                <Image source={require("../../../../assets/gallery.png")} />
                <Title size={16} error={!!errors.clan_logo}>
                  <FormattedMessage {...messages.click_to_add_image} />
                </Title>
                <SubTitle size={12}>
                  <FormattedMessage {...messages.image_support} />
                </SubTitle>
              </LogoContents>

              {isLoading || host_logo ? (
                <Animated.View entering={FadeInUp} exiting={FadeOutUp}>
                  <LogoUploadContainer onLayout={onLayout}>
                    <UploadProgress
                      progress={progress}
                      isUploadComplete={isComplete}
                    />

                    <Title size={16}>
                      <FormattedMessage
                        {...messages[
                          isComplete ? "upload_completed" : "uploading_logo"
                        ]}
                      />
                    </Title>

                    {!isComplete && (
                      <Fragment>
                        <ProgressSubTitle size={12}>
                          {uploadedProgress}%{/* • {timeLeft} seconds left */}
                        </ProgressSubTitle>
                        <UploadProgressBar
                          progress={progress ? progress - layout.gutter * 2 : 0}
                        />
                      </Fragment>
                    )}

                    <UploadIconContainer>
                      <UploadIcon
                        size={15}
                        mode="contained"
                        onPress={handleCancelUpload}
                        isUploadComplete={isComplete}
                        icon={
                          isComplete
                            ? "checkbox-marked-circle-outline"
                            : "window-close"
                        }
                        iconColor={hexToRGB(
                          isComplete ? palette.success : palette.error,
                          0.8
                        )}
                        containerColor={hexToRGB(
                          isComplete ? palette.success : palette.error,
                          0.04
                        )}
                      />
                    </UploadIconContainer>
                  </LogoUploadContainer>
                </Animated.View>
              ) : null}
            </LogoContainer>
            
          </Fragment>
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
        <FormattedMessage {...messages.save} />
      </NextStepButton>
    </InputContents>
  );
};
