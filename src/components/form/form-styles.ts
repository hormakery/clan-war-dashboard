import styled, { css } from "styled-components/native";
import { IconButton as __IconButton } from "react-native-paper";

import { NextStepButton as __NextStepButton } from "../../screens/signup/signup.styles";

export { Spacer } from "../../screens/signup/signup.styles";
export {
  Label,
  ErrorMessage,
  ErrorMessageContainer,
} from "../input/input.styles";



// export const StepContainer = styled.View`
//   flex-direction: column;
//   background-color: ${(p) => p.theme.palette.light_background};
//   padding: ${(p) =>
//     p.theme.layout.gutter * (p.isScreenLessThanMaxWidth ? 2 : 1)}px;
// `;

export const InputContents = styled.View`
  flex-direction: column;
  background-color: ${(p) => p.theme.palette.transparent};
  padding: ${(p) => p.theme.layout.gutter}px;
  width: ${(p) => p.theme.layout.screen.width}%;
`;

export const LogoContainer = styled.View`
  padding: ${(p) => p.theme.layout.gutter}px;
  border-radius: ${(p) => p.theme.layout.radius * 2}px;
  background-color: ${(p) => p.theme.palette.card_background};
`;

export const Title = styled(Text)<{ error?: boolean; size?: number }>`
  font-family: ${(p) => p.theme.fonts.variants.roboto_bold};
  font-size: ${(p) => p.theme.fonts.scale.value(p.size || 35)}px;
  color: ${(p) => (p.error ? p.theme.palette.error : p.theme.palette.text)};
`;

export const SubTitle = styled(Title)<{ opacity?: number }>`
  margin-top: 10px;
  opacity: ${({ opacity }) => opacity || 0.6};
  font-family: ${(p) => p.theme.fonts.variants.roboto_regular};
  font-size: ${(p) => p.theme.fonts.scale.value(p.size || 20)}px;
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

export const NextStepButton = styled(__NextStepButton).attrs((p) => ({
  buttonColor: p.theme.hexToRGB(
    p.theme.isDarkMode ? p.theme.palette.background : p.theme.palette.text,
    p.theme.isDarkMode ? 0.6 : 0.3
  ),
}))`
  border-radius: ${(p) => p.theme.layout.radius * 5}px;
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

// export const ErrorMessageContainer = styled(__ErrorMessageContainer)`
//   margin-bottom: 8px;
//   padding-right: 8px;
//   align-items: flex-end;
//   flex-direction: column;
// `;




// export const Container = styled.View<{ isScreenLessThanMaxWidth: boolean }>`
//   flex: 1;
//   background-color: ${(p) => p.theme.palette.background};
//   flex-direction: ${(p) => (p.isScreenLessThanMaxWidth ? "row" : "column")};
// `;

// export const Title = styled.Text<{ wrap?: boolean; isActive?: boolean }>`
//   color: ${(p) => p.theme.palette.text};
//   font-size: ${(p) => p.theme.fonts.scale.value(30)}px;
//   opacity: ${({ isActive = true }) => (isActive ? 1 : 0.5)};
//   font-family: ${(p) => p.theme.fonts.variants.roboto_bold};

//   ${(p) =>
//     p.wrap &&
//     css`
//       width: 90%;
//     `}
// `;

// export const SubTitle = styled(Title)`
//   font-size: ${(p) => p.theme.fonts.scale.value(20)}px;
//   font-family: ${(p) => p.theme.fonts.variants.roboto_regular};
// `;



// export const InputContainer = styled(StepContainer)`
//   background-color: ${(p) => p.theme.palette.card_background};
// `;

// export const StepScrollView = styled.ScrollView.attrs<{
//   isScreenLessThanMaxWidth: boolean;
// }>((p) => ({
//   showsHorizontalScrollIndicator: false,
//   horizontal: !p.isScreenLessThanMaxWidth,
//   scrollEnabled: !p.isScreenLessThanMaxWidth,
//   contentContainerStyle: {
//     gap: 15,
//   },
// }))<{
//   isScreenLessThanMaxWidth: boolean;
// }>``;

// export const Step = styled.TouchableOpacity<{ isActive: boolean }>`
//   height: 70px;
//   min-width: 250px;
//   border-radius: 50px;
//   align-items: center;
//   flex-direction: row;
//   gap: ${(p) => p.theme.layout.gutter * 1.2}px;
//   padding: ${(p) => p.theme.layout.gutter / 1.5}px;
//   background-color: ${(p) =>
//     p.isActive
//       ? p.theme.hexToRGB(
//           p.theme.isDarkMode
//             ? p.theme.palette.background
//             : p.theme.palette.text,
//           p.theme.isDarkMode ? 0.6 : 0.08
//         )
//       : p.theme.palette.transparent};
// `;

// export const StepDivider = styled(Container)`
//   width: ${(p) => (p.isScreenLessThanMaxWidth ? 1 : 50)}px;
//   height: ${(p) => (p.isScreenLessThanMaxWidth ? 30 : 1)}px;
//   background-color: ${(p) => p.theme.hexToRGB(p.theme.palette.text, 0.1)};
//   align-self: ${(p) => (p.isScreenLessThanMaxWidth ? "flex-start" : "center")};
//   margin-left: ${(p) =>
//     p.isScreenLessThanMaxWidth
//       ? p.theme.layout.gutter * 2.2
//       : p.theme.layout.gutter / 1.5}px;
// `;

// export const StepNumber = styled.View<{ isActive: boolean }>`
//   width: 50px;
//   height: 50px;
//   border-radius: 25px;
//   align-items: center;
//   justify-content: center;
//   background-color: ${(p) =>
//     p.isActive ? p.theme.colors.dark.text : p.theme.palette.transparent};
//   border: 1px
//     ${(p) =>
//       p.isActive
//         ? p.theme.palette.transparent
//         : p.theme.hexToRGB(p.theme.palette.text, 0.1)}
//     solid;
// `;

// export const StepIndex = styled(Title)`
//   opacity: 1;
//   font-size: ${(p) => p.theme.fonts.scale.value(20)}px;
//   color: ${(p) =>
//     p.isActive && p.theme.isDarkMode
//       ? p.theme.colors.light.text
//       : p.theme.palette.text};
// `;

// export const CloseButton = styled(__IconButton)`
//   position: absolute;
//   top: ${(p) => p.theme.layout.gutter / 2}px;
//   right: ${(p) => p.theme.layout.gutter / 2}px;
//   background-color: ${(p) => p.theme.hexToRGB(p.theme.palette.text, 0.08)};
// `;





// export const UserContainer = styled.View`
//   flex-direction: row;
//   align-items: center;
//   padding: ${(p) => p.theme.layout.gutter}px;
//   border-radius: ${(p) => p.theme.layout.radius}px;
//   background-color: ${(p) =>
//     p.theme.hexToRGB(
//       p.theme.isDarkMode ? p.theme.palette.background : p.theme.palette.text,
//       p.theme.isDarkMode ? 0.6 : 0.08
//     )};
// `;

// export const UserIGN = styled(Title)`
//   font-size: ${(p) => p.theme.fonts.scale.value(20)}px;
// `;



// export const AvatarScrollView = styled.ScrollView.attrs({
//   horizontal: true,
//   showsHorizontalScrollIndicator: false,
//   contentContainerStyle: {
//     gap: 10,
//     flexWrap: "wrap",
//     flexDirection: "row",
//   },
// })<{}>`
//   margin: 8px 0px;
// `;

// export const Avatar = styled.TouchableOpacity`
//   border-radius: 100%;
// `;


// export const FormTitle = styled(Title)`
//   font-size: ${(p) => p.theme.fonts.scale.value(32)}px;

// `;

// export const FormSubTitle = styled(SubTitle)`

// `;