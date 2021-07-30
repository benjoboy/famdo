export const SavingState = Object.freeze({
  NOT_SAVED: 0,
  SAVING: 1,
  SAVED: 2,
});

const AutoSaveDisplay = ({ saving }) => {
  let display;
  switch (saving) {
    case SavingState.SAVING:
      display = <em>saving...</em>;
      break;
    case SavingState.SAVED:
      display = (
        <>
          <em className=".k-i-check">saved!</em>
        </>
      );
      break;
    default:
      display = <br />;
  }
  return <div className="auto-save-display">{display}</div>;
};

export default AutoSaveDisplay;
