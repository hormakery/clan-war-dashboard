import { defineMessages, useIntl } from "react-intl";

const messages = defineMessages({

 host_name_required: {
    id: "form.validator.host_name_required",
    defaultMessage: "Host is required",
  },

  team_name_required: {
    id: "form.validator.team_name_required",
    defaultMessage: "Team name is required",
  },

  price_required: {
    id: "form.validator.price_required",
    defaultMessage: "Price is required",
  },

  title_required: {
    id: "form.validator.title_required",
    defaultMessage: "Title is required",
  },

  tags_required: {
    id: "form.validator.tags_required",
    defaultMessage: "Tags is required",
  },

  avatar_required: {
    id: "form.validator.avatar_required",
    defaultMessage: "Player avatar is required",
  },

  host_logo_required: {
    id: "form.validator.host_logo_required",
    defaultMessage: "Host logo is required",
  },
});

export const useFormValidation = () => {
  const intl = useIntl();


  const hostNameValidation = {
    required: {
      value: true,
      message: intl.formatMessage(messages.host_name_required),
    },
  };

  const avatarValidation = {
    required: {
      value: true,
      message: intl.formatMessage(messages.avatar_required),
    },
  };

  

  const teamNameValidation = {
    required: {
      value: true,
      message: intl.formatMessage(messages.team_name_required),
    },
  };

  const hostLogoValidation = {
    required: {
      value: true,
      message: intl.formatMessage(messages.host_logo_required),
    },
  };

  const titleValidation = {
    required: {
      value: true,
      message: intl.formatMessage(messages.title_required),
    },
  };

  const priceValidation = {
    required: {
      value: true,
      message: intl.formatMessage(messages.price_required),
    },
  };

  return {
    priceValidation,
    titleValidation,
    avatarValidation,
    hostLogoValidation,
    hostNameValidation,
    teamNameValidation,
  };
};
