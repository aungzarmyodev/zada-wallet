const ErrorHandler = (err, t) => {
  let message = t('errors.something_went_wrong');

  if (err.response) {
    const status = err.response.status;

    switch (status) {
      case 400:
        message = t('errors.error_400');
        break;
      case 401:
        message = t('errors.error_401');
        break;
      case 403:
        message = t('errors.error_403');
        break;
      case 404:
        message = t('errors.error_404');
        break;
      case 500:
        message = t('errors.error_500');
        break;
      default:
        message = t('errors.something_went_wrong');
    }
  }
  return message;
};

export default ErrorHandler;
