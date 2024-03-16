import { Html } from "@react-three/drei";
import { Fragment } from "react/jsx-runtime";

const positions = [
  [-1, -1, -1],
  [-1, -1, 1],
  [-1, 1, -1],
  [-1, 1, 1],
  [1, -1, -1],
  [1, -1, 1],
  [1, 1, -1],
  [1, 1, 1],
];

type IProps = {
  color: number;
  //   colorCode: string;
};

export const UnitCells: React.FC<IProps> = ({ color }) => {
  return (
    <>
      {positions.map((position, index) => (
        <Fragment key={index}>
          <mesh
            position={[
              0.25 * position[0],
              0.25 * position[1],
              0.25 * position[2],
            ]}
          >
            <boxGeometry args={[0.45, 0.45, 0.45]} />
            <meshStandardMaterial color={color} opacity={0.5} transparent />
          </mesh>
          <Html
            position={[
              0.25 * position[0],
              0.25 * position[1],
              0.25 * position[2],
            ]}
            as="div"
            prepend
            wrapperClass="select-none"
            center
          >
            <p className="">Unit Cell</p>
          </Html>
        </Fragment>
      ))}
    </>
  );
};
