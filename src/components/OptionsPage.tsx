import { useAppDispatch, useAppSelector } from "../hooks/useReduxTypes";
import { initializeCategories } from "../reducers/categoryReducer";
import { updateCheckedId } from "../reducers/checkboxReducer";
import { setStorage } from "../services/storageService";
import { OptionsPageStyles } from "./styles/OptionsPageStyles";

export const OptionsPage = () => {
  const checkbox = useAppSelector(({ checkbox }) => {
    return checkbox;
  });
  const dispatch = useAppDispatch();

  const clearStorageOnClick = async () => {
    if (window.confirm('This will clear all your saved notes, are you sure you want to proceed?')) {
      await setStorage('storedData', []);

      if (checkbox[0]) {
        dispatch(updateCheckedId([]));
      }

      void dispatch(initializeCategories());
    }
  };

  return (
    <OptionsPageStyles>
      <h1>Notersy settings</h1>
      <div>
        <h2>Clear Storage</h2>
        <p>You can clear your storage here, this will delete all your saved data.</p>
        <button type="button" onClick={clearStorageOnClick}>
          Clear
        </button>
        <h2>
          Have a problem or a suggestion?
        </h2>
        <p>
          You can send it through the official repository <a href="https://github.com/Exoldarium/notersy-v2">here</a>,
          or you can send me an e-mail at <a href="mailto:shandoo91@gmail.com">shandoo91@gmail.com</a>
        </p>
        <h2>Get Notersy for</h2>
        <a href="https://chromewebstore.google.com/detail/notersy/ffpmjnpjajlkfaidlonjegneehmccaja?pli=1">Chrome</a>
        <br></br>
        <a href="https://microsoftedge.microsoft.com/addons/detail/notersy/kmakjohiodknfghojeadaalgilbnndha">Edge</a>
        <h2>Check my other work</h2>
        <a href="https://github.com/Exoldarium">My github</a>
        <h2>Buy me a coffee!</h2>
        <a href="https://ko-fi.com/dusan36845">You can donate here if you'd like to support my work</a>
        <p>v2.0.0</p>
      </div>
    </OptionsPageStyles>
  );
};