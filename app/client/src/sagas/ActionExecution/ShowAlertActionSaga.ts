import AppsmithConsole from "utils/AppsmithConsole";
import { ActionValidationError } from "sagas/ActionExecution/errorUtils";
import { getType, Types } from "utils/TypeHelpers";
import type { ToastKind } from "@appsmith/ads";
import type { TShowAlertDescription } from "workers/Evaluation/fns/showAlert";
import { call } from "redux-saga/effects";
import showToast from "sagas/ToastSagas";
import { uniqueId } from "lodash";
import type { SourceEntity } from "entities/AppsmithConsole";

export default function* showAlertSaga(
  action: TShowAlertDescription,
  source?: SourceEntity,
) {
  const { payload } = action;

  if (typeof payload.message !== "string") {
    throw new ActionValidationError(
      "SHOW_ALERT",
      "message",
      Types.STRING,
      getType(payload.message),
    );
  }

  // This is the toast that is rendered which is user generated by using `showAlert` platform function. This is forceDisplayed no matter the conditions.
  yield call(
    showToast,
    payload.message,
    {
      kind: payload.style as ToastKind,
      toastId: uniqueId("ToastId"),
    },
    { forceDisplay: true },
  );
  AppsmithConsole.info({
    source,
    text: "showAlert triggered",
    state: {
      message: payload.message,
      style: payload.style,
    },
  });
}
