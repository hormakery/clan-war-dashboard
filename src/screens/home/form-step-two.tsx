import React, { Fragment } from "react";
import { Controller } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useTheme } from "styled-components/native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";

import messages from "./messages";
import { getLogoSize } from "../../helpers";
import { FormStepProps } from "../../../types";
import * as ImagePicker from "expo-image-picker";
import { Linking, Platform } from "react-native";
import {
  useOnLayout,
  useLogoUpload,
  useFormValidation,
} from "../../hooks";

import {
  Title,
  Image,
  Spacer,
  Divider,
  SubTitle,
  UploadIcon,
  GoBackButton,
  ErrorMessage,
  ContentTitle,
  LogoContents,
  LogoContainer,
  UploadProgress,
  NextStepButton,
  ContentSubTitle,
  ButtonContainer,
  ProgressSubTitle,
  ContentContainer,
  UploadProgressBar,
  UploadIconContainer,
  LogoUploadContainer,
  ErrorMessageContainer,
} from "./home.styles";

export const FormStepTwo: React.FC<FormStepProps> = ({
  watch,
  errors,
  goNext,
  goBack,
  control,
  setValue,
  setError,
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
    (Number(progressLayout?.width || 0) / 100) *
    (isComplete ? 100 : uploadedProgress);

  const [cover_image, title] = watch(["cover_image", "title"]);

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
    const extension = Platform.select({
      web: file.uri?.split(";")[0].split("/")[1],
      default: file.uri.substring(file.uri.length - 4).split(".")[1],
    });

    if (!EXTENSIONS.includes(extension)) {
      return setError("cover_image", { message: "Image format not supported" });
    }

    const fileSize = getLogoSize(file.uri!, file.fileSize);

    if (fileSize > 600) {
      return setError("cover_image", { message: "Max file size is 500kb" });
    }

    if (errors.cover_image) {
      clearErrors("cover_image");
    }

    const fileName = `${cover_image?.trim().split(" ").join("-")}-${
      file.fileName || Date.now()
    }`.toLowerCase();

    uploadLogo({ ...file, extension, fileName })
      .then((url) => setValue("cover_image", url))
      .catch((error) => setError("cover_image", { message: error.message }));
  };

  const handleCancelUpload = () => {
    setValue("cover_image", "");
    cancelUpload();
  };

  return (
    <Fragment>
      <ContentContainer>
        <ContentSubTitle isActive={false}>Step 2/5</ContentSubTitle>
        <Spacer size={10} />

        <ContentTitle>
          <FormattedMessage {...messages.click_to_add_image} />
        </ContentTitle>
        <Spacer size={10} />

        <ContentSubTitle isActive={false}>
          <FormattedMessage {...messages.image_support} />
        </ContentSubTitle>
      </ContentContainer>

      <Spacer size={30} />

      <Divider />
      <Spacer size={30} />

      <Controller
        name="cover_image"
        control={control}
        // rules={clanLogoValidation}
        render={() => (
          <Fragment>
            {errors.cover_image && (
              <ErrorMessageContainer>
                <ErrorMessage>{errors.cover_image.message}</ErrorMessage>
              </ErrorMessageContainer>
            )}

            <LogoContainer>
              <LogoContents onPress={pickLogo} error={!!errors.cover_image}>
                <Image source={require("../../../assets/gallery.png")} />
                <Title size={16} error={!!errors.cover_image}>
                  <FormattedMessage {...messages.click_to_add_image} />
                </Title>
                <Spacer size={10} />
                <SubTitle size={12}>
                  <FormattedMessage {...messages.image_support} />
                </SubTitle>
              </LogoContents>

              {isLoading || cover_image ? (
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
