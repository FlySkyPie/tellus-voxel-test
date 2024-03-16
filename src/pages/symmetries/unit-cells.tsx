import { Html } from "@react-three/drei";
import { Fragment } from "react/jsx-runtime";

const positions = [
  [-1, -1, -1], //000
  [1, -1, -1], //100
  [-1, 1, -1], //010
  [1, 1, -1], //110
  [-1, -1, 1], //001
  [1, -1, 1], //101
  [-1, 1, 1], //011
  [1, 1, 1], //111
];

type IProps = {
  colors: number[];
};

export const UnitCells: React.FC<IProps> = ({ colors }) => {
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
            <boxGeometry args={[0.49999, 0.49999, 0.49999]} />
            <meshStandardMaterial
              color={colors[index]}
              opacity={0.5}
              transparent
            />
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
            <div
              className="flex flex-col items-center"
              style={{
                color:
                  "#" +
                  (0xffffff ^ colors[index]).toString(16).padStart(6, "0"),
              }}
            >
              <p className="">Unit Cell</p>
              <p className="">
                #{colors[index].toString(16).padStart(6, "0").toUpperCase()}
              </p>
            </div>
          </Html>
        </Fragment>
      ))}
    </>
  );
};
