import { forwardRef, useEffect } from "react";
import { useSnackbar, SnackbarContent, CustomContentProps } from "notistack";

const ToastComponent = forwardRef<HTMLDivElement, CustomContentProps>(
  ({ id, ...props }, ref) => {
    const { closeSnackbar } = useSnackbar();
    const color = {
      default: "blue",
      info: "blue",
      error: "red",
      success: "green",
      warning: "orange",
    };

    return (
      <SnackbarContent ref={ref}>
        <div
          className={`w-96 bg-${color[props.variant]}-100 border border-${
            color[props.variant]
          }-400 text-${
            color[props.variant]
          }-700 pl-4 pr-12 py-3 rounded-xl relative`}
          role="alert"
        >
          <p>{props.message}</p>

          <span
            onClick={() => closeSnackbar()}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <svg
              className={`fill-current h-6 w-6 text-${
                color[props.variant]
              }-500`}
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      </SnackbarContent>
    );
  }
);

export default ToastComponent;
