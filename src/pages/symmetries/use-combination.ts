import { useEffect, useState } from "react";

import { SymmetrieTypes } from "./symmetrie-types";

const getCombination = (type: SymmetrieTypes) => {
  if (type === SymmetrieTypes.Solid) {
    return [[0, 0, 0, 0, 0, 0, 0, 0]];
  }
  if (type === SymmetrieTypes.XZ_Reflection) {
    return [
      [0, 0, 1, 1, 0, 0, 1, 1],
      [1, 1, 0, 0, 1, 1, 0, 0],
    ];
  }
  if (type === SymmetrieTypes.Y_Rotation) {
    return [
      [0, 1, 0, 1, 2, 3, 2, 3],
      [1, 3, 1, 3, 0, 2, 0, 2],
      [3, 2, 3, 2, 1, 0, 1, 0],
      [2, 0, 2, 0, 3, 1, 3, 1],
    ];
  }
  /**
   * @todo Finish the Combination
   */
  return [[0, 1, 2, 3, 4, 5, 6, 7]];
};

const getOptions = (type: SymmetrieTypes) => {
  const list = getCombination(type);
  return list.map((item, index) => ({ name: `C-${index}`, offsets: item }));
};

type IProps = {
  type: SymmetrieTypes;
};

export const useCombination = ({ type }: IProps) => {
  const [options, setOptions] = useState(() => getOptions(type));
  const [value, setValue] = useState(() => getOptions(type)[0]);
  useEffect(() => {
    const nextOptions = getOptions(type);
    setOptions(nextOptions);
    setValue(nextOptions[0]);
  }, [type]);

  return { options, combination: value, setCombination: setValue };
};
