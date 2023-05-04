import { Platform } from "react-native";
import { Chip } from "react-native-paper";
import styled, { css } from "styled-components/native";
import {
  Button as __Button,
  IconButton as __IconButton,
} from "react-native-paper";

import { ErrorMessageContainer as __ErrorMessageContainer } from "../../components/input/input.styles";
export { ErrorMessage } from "../../components/input/input.styles";

export const Container = styled.View<{ isDesktopOrLaptop: boolean }>`
  flex: 1;
  background-color: ${(p) => p.theme.palette.background};
  flex-direction: ${(p) => (p.isDesktopOrLaptop ? "row" : "column")};
`;

export const StepContainer = styled(Container)`
  flex: 0.4;
  flex-direction: column;
  background-color: ${(p) => p.theme.palette.light_background};
  padding: ${(p) => p.theme.layout.gutter}px
    ${(p) => p.theme.layout.gutter * 5}px;
`;

export const Title = styled.Text<{
  error?: boolean;
  size?: number;
  wrap?: boolean;
  isActive?: boolean;
}>`
  opacity: ${({ isActive = true }) => (isActive ? 1 : 0.5)};
  font-family: ${(p) => p.theme.fonts.variants.roboto_bold};
  font-size: ${(p) => p.theme.fonts.scale.value(p.size || 35)}px;
  color: ${(p) => (p.error ? p.theme.palette.error : p.theme.palette.text)};

  ${(p) =>
    p.wrap &&
    css`
      width: 90%;
    `}
`;

export const Spacer = styled.View<{ size?: number }>`
  height: ${(p) => p.size || 0}px;
`;

export const SubTitle = styled(Title)`
  font-family: ${(p) => p.theme.fonts.variants.roboto_regular};
  font-size: ${(p) => p.theme.fonts.scale.value(p.size || 20)}px;
`;

export const StepScrollView = styled.ScrollView.attrs<{
  isDesktopOrLaptop: boolean;
}>((p) => ({
  showsHorizontalScrollIndicator: false,
  horizontal: !p.isDesktopOrLaptop,
  scrollEnabled: !p.isDesktopOrLaptop,
  contentContainerStyle: {
    gap: 15,
  },
}))<{
  isDesktopOrLaptop: boolean;
}>``;

export const Step = styled.TouchableOpacity<{ isActive: boolean }>`
  height: 70px;
  min-width: 250px;
  border-radius: 50px;
  align-items: center;
  flex-direction: row;
  gap: ${(p) => p.theme.layout.gutter * 1.2}px;
  padding: ${(p) => p.theme.layout.gutter / 1.5}px;
  background-color: ${(p) =>
    p.isActive
      ? p.theme.hexToRGB(
          p.theme.isDarkMode
            ? p.theme.palette.background
            : p.theme.palette.text,
          p.theme.isDarkMode ? 0.6 : 0.08
        )
      : p.theme.palette.transparent};
`;

export const StepNumber = styled.View<{ isActive: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  background-color: ${(p) =>
    p.isActive ? p.theme.colors.dark.text : p.theme.palette.transparent};
  border: 1px
    ${(p) =>
      p.isActive
        ? p.theme.palette.transparent
        : p.theme.hexToRGB(p.theme.palette.text, 0.1)}
    solid;
`;

export const StepIndex = styled(Title)`
  opacity: 1;
  font-size: ${(p) => p.theme.fonts.scale.value(20)}px;
  color: ${(p) =>
    p.isActive && p.theme.isDarkMode
      ? p.theme.colors.light.text
      : p.theme.palette.text};
`;

export const StepDivider = styled(Container)`
  width: ${(p) => (p.isDesktopOrLaptop ? 1 : 50)}px;
  height: ${(p) => (p.isDesktopOrLaptop ? 30 : 1)}px;
  background-color: ${(p) => p.theme.hexToRGB(p.theme.palette.text, 0.1)};
  align-self: ${(p) => (p.isDesktopOrLaptop ? "flex-start" : "center")};
  margin-left: ${(p) =>
    p.isDesktopOrLaptop
      ? p.theme.layout.gutter * 2.2
      : p.theme.layout.gutter / 1.5}px;
`;

export const InputContainer = styled(StepContainer)`
  flex: 1;
  background-color: ${(p) => p.theme.palette.card_background};
`;

export const MaxWidthWrapper = styled.View`
  overflow: hidden;
  max-width: ${(p) => p.theme.breakpoints.tablet_viewport}px;
  width: ${(p) => p.theme.layout.screen.width - p.theme.layout.gutter * 2}px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin: 50px ${(p) => p.theme.layout.gutter}px;
`;

export const NextStepButton = styled(__Button).attrs((p) => ({
  textColor: p.theme.colors.dark.text,
  buttonColor: p.theme.palette.primary,
  contentStyle: {
    paddingVertical: 8,
    paddingHorizontal: p.theme.layout.gutter,
  },
  labelStyle: {
    textTransform: "capitalize",
    fontSize: p.theme.fonts.scale.value(15),
    fontFamily: p.theme.fonts.variants.roboto_regular,
  },
}))`
  width: 150px;
  align-self: flex-end;
  border-radius: ${(p) => p.theme.layout.radius / 2}px;
`;

export const GoBackButton = styled(NextStepButton).attrs<{
  $buttonColor: string;
}>((p) => ({
  icon: "keyboard-backspace",
  buttonColor: p.theme.palette.transparent,
  textColor: p.theme.hexToRGB(p.theme.palette.text, 0.5),
}))`
  margin: 0px ${(p) => p.theme.layout.gutter}px;
`;

export const InputContents = styled(StepContainer)`
  background-color: ${(p) => p.theme.palette.transparent};
  width: ${(p) => (p.isDesktopOrLaptop ? 95 : 100)}%;
  padding: ${(p) => (p.isDesktopOrLaptop ? 80 : 20)}px 0px 0px 0px;
`;

export const LogoContainer = styled.View`
  padding: ${(p) => p.theme.layout.gutter}px;
  border-radius: ${(p) => p.theme.layout.radius * 2}px;
  background-color: ${(p) => p.theme.palette.card_background};
`;

export const ErrorMessageContainer = styled(__ErrorMessageContainer)<{
  maxWidth?: number;
  teamSize?: number;
}>`
  margin-bottom: 8px;
  padding-right: 8px;
  align-items: flex-end;

  ${(p) => {
    if (p.maxWidth && p.teamSize) {
      return css`
        max-width: ${p.maxWidth * p.teamSize +
        p.theme.layout.radius *
          (p.teamSize - Platform.select({ default: 1, web: 0 }))}px;
      `;
    }
  }}
`;

export const LogoContents = styled.TouchableOpacity<{ error: boolean }>`
  height: 150px;
  align-items: center;
  padding-bottom: 20px;
  justify-content: center;
  border-radius: ${(p) => p.theme.layout.radius}px;
  border: 1.5px
    ${(p) =>
      p.theme.hexToRGB(
        p.error ? p.theme.palette.error : p.theme.palette.text,
        p.error ? 0.7 : 0.2
      )}
    dashed;
`;

export const Image = styled.Image`
  width: 50px;
  height: 50px;
  margin: ${(p) => p.theme.layout.gutter}px;
`;

export const LogoUploadContainer = styled.View`
  margin-top: 20px;
  overflow: hidden;
  padding: ${(p) => p.theme.layout.gutter}px;
  border-radius: ${(p) => p.theme.layout.radius}px;
  border: 1.5px ${(p) => p.theme.hexToRGB(p.theme.palette.text, 0.05)} solid;
`;

export const UploadProgress = styled.View<{
  progress: number;
  isUploadComplete: boolean;
}>`
  top: 0;
  bottom: 0;
  left: 0.5px;
  right: 0.5px;
  position: absolute;
  width: ${(p) => p.progress}px;
  background-color: ${(p) => p.theme.palette.background};
  border-top-left-radius: ${(p) => p.theme.layout.radius - 2}px;
  border-bottom-left-radius: ${(p) => p.theme.layout.radius - 2}px;
  border-top-right-radius: ${(p) =>
    p.isUploadComplete ? p.theme.layout.radius - 2 : 0}px;
  border-bottom-right-radius: ${(p) =>
    p.isUploadComplete ? p.theme.layout.radius - 2 : 0}px;
`;

export const ProgressSubTitle = styled(SubTitle)`
  margin: 0px;
  margin-top: 6px;
`;

export const UploadProgressBar = styled.View<{ progress: number }>`
  height: 2px;
  margin-top: 10px;
  width: ${(p) => p.progress}px;
  border-radius: ${(p) => p.theme.layout.radius}px;
  background-color: ${(p) => p.theme.palette.primary};
`;

export const UploadIcon = styled(__IconButton)<{ isUploadComplete: boolean }>`
  transform: scale(0.8);
  margin-bottom: ${(p) => (p.isUploadComplete ? 7 : p.theme.layout.gutter)}px;
`;

export const UploadIconContainer = styled.View`
  top: 0;
  bottom: 0;
  position: absolute;
  align-items: center;
  justify-content: center;
  right: ${(p) => p.theme.layout.gutter - 10}px;
`;

export const UserContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${(p) => p.theme.layout.gutter}px;
  border-radius: ${(p) => p.theme.layout.radius}px;
  background-color: ${(p) =>
    p.theme.hexToRGB(
      p.theme.isDarkMode ? p.theme.palette.background : p.theme.palette.text,
      p.theme.isDarkMode ? 0.6 : 0.08
    )};
`;

export const UserContents = styled.View`
  gap: 3px;
  margin-left: ${(p) => p.theme.layout.radius * 2}px;
`;

export const ContentContainer = styled.View`
  flex-direction: column;
`;

export const ContentTitle = styled(Title)`
  font-size: ${(p) => p.theme.fonts.scale.value(30)}px;
`;
export const ContentSubTitle = styled(SubTitle)`
  font-size: ${(p) => p.theme.fonts.scale.value(15)}px;
`;

export const Divider = styled.View`
  height: 1px;
  margin: ${(p) => p.theme.layout.gutter}px 0px;
  background-color: ${(p) => p.theme.hexToRGB(p.theme.palette.text, 0.1)};
`;

export const TagContainer = styled.View`
  flex-direction: row;
  gap: ${(p) => p.theme.layout.gutter / 2}px;
  margin-top: ${(p) => p.theme.layout.gutter / 2}px;
`;

export const Tags = styled(Chip).attrs((p) => ({
  textStyle: {
    color: p.theme.palette.text,
    fontSize: p.theme.fonts.scale.value(14),
    fontFamily: p.theme.fonts.variants.roboto_regular,
  },
}))`
  border-radius: ${(p) => p.theme.layout.radius / 2}px;
  background-color: ${(p) => p.theme.palette.light_card_background};
  border: 1px ${(p) => p.theme.hexToRGB(p.theme.palette.text, 0.05)} solid;
`;

export const DateContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: ${(p) => p.theme.layout.gutter}px;
  margin-bottom: ${(p) => p.theme.layout.gutter * 2.5}px;
`;

export const DateLabel = styled(SubTitle)``;
export const DateButton = styled(NextStepButton)`
  background-color: ${(p) => p.theme.palette.background};
`;

export const Wrapper = styled.View`
  flex-direction: column;
`;
