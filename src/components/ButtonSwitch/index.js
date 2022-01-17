import React, { useCallback, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { CustomInput } from 'reactstrap';

function ButtonSwitch({
  dispatch, opcao1, opcao2, switchChecked, top,
}) {
  const [switchValue, setValue] = useState(false);
  const [class1, setClass1] = useState('text-primary font-italic');
  const [class2, setClass2] = useState('');

  const handleSwitch = useCallback((value) => {
    switch (value) {
      case true:
        setValue(true);
        setClass1('');
        setClass2('text-primary font-italic');
        dispatch({ type: '@SET_SWITCH_CHECKED_TRUE' });
        break;
      case false:
        setValue(false);
        setClass1('text-primary font-italic');
        setClass2('');
        dispatch({ type: '@SET_SWITCH_CHECKED_FALSE' });
        break;
      default:
        setValue(false);
        setClass1('text-primary font-italic');
        setClass2('');
        dispatch({ type: '@SET_SWITCH_CHECKED_FALSE' });
        break;
    }
  }, [dispatch]);

  useEffect(() => {
    handleSwitch(switchChecked);
  }, [switchChecked, handleSwitch]);

  return (
    <>
      <div className="button-switch-container">
        <span className={`button-switch-text noselect ${class1}`}>{ opcao1 }</span>
        <CustomInput
          type="switch"
          id="projeto-switch-button"
          name="projeto-switch-button"
          checked={switchValue}
          className={`noselect mt-${top} ml-2 mr-1`}
          onClick={(e) => handleSwitch(e.target.checked)}
        />
        <span className={`button-switch-text noselect ${class2}`}>{ opcao2 }</span>
      </div>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  switchChecked: state.buttonSwitch.switchChecked,
});
export default connect(() => (mapState))(ButtonSwitch);
