import Reactotron from "reactotron-react-native";
import {
  Control,
  useForm,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
  UseFormSetError,
  UseFormGetValues,
} from "react-hook-form";
import {
  ITournament,
  ITournamentTeam,
} from "./tournament";

declare global {
  interface Console {
    tron: (typeof Reactotron)["log"];
  }
}

console.tron = reactotron.log;

export interface IFormStep {
  id: string;
  icon: string;
  title: string;
  isViewable: boolean;
  highlighted: boolean;
  key: keyof ITournament;
}

export type FormStepProps<T = ITournament> = {
  goNext: VoidFunction
  goBack: VoidFunction
  watch: UseFormWatch<T>;
  errors: FieldErrors<T>;
  control: Control<T, any>;
  setValue: UseFormSetValue<T>;
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
  getValues: UseFormGetValues<ITournament>;
};
