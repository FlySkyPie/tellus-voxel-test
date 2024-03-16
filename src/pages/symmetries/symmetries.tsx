import { ColorPicker } from "primereact/colorpicker";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  GizmoHelper,
  GizmoViewport,
  Grid,
  OrbitControls,
} from "@react-three/drei";

enum SymmetrieTypes {
  Solid = "S",
  XZ_Reflection = "XZR",
  Y_Rotation = "YR",
  Y_Symmetric_Rotation = "YSR",
}

const symmetrieOptions = [
  { name: "Solid", code: SymmetrieTypes.Solid },
  { name: "XZ-Reflection", code: SymmetrieTypes.XZ_Reflection },
  { name: "Y-Rotation", code: SymmetrieTypes.Y_Rotation },
  { name: "Y-Symmetric-Rotation", code: SymmetrieTypes.Y_Symmetric_Rotation },
];

export const Symmetries: React.FC = () => {
  const [value, setValue] = useState(symmetrieOptions[0]);
  const [color, setColore] = useState(0);

  return (
    <div className="flex flex-col h-lvh">
      <div className="flex flex-row p-4 justify-between">
        <div>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">#</span>
            </div>
            <input
              type="text"
              readOnly
              value={color.toString(16).padStart(6, "0")}
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <ColorPicker
                inputId="cp-hex"
                format="hex"
                value={color.toString(16)}
                onChange={(e) => setColore(parseInt(e.value as string, 16))}
              />
            </div>
          </div>
        </div>
        <Dropdown
          value={value}
          onChange={(e) => setValue(e.value)}
          options={symmetrieOptions}
          optionLabel="name"
          placeholder="Select a Symmetry type"
          className="md:w-14rem"
        />
      </div>
      <div id="canvas-container" className="flex-grow p-4">
        <Canvas camera={{ position: [10, 12, 12], fov: 25 }}>
          <Environment preset="city" />
          <mesh>
            <boxGeometry />
            <meshStandardMaterial color={color} />
          </mesh>

          <Grid
            position={[0, -1, 0]}
            cellSize={0.6}
            cellThickness={1}
            cellColor={"#6f6f6f"}
            sectionSize={3.3}
            sectionThickness={1.5}
            sectionColor={"#9d4b4b"}
            fadeDistance={25}
            fadeStrength={1}
            followCamera={false}
            infiniteGrid={true}
          />
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport
              axisColors={["#9d4b4b", "#2f7f4f", "#3b5b9d"]}
              labelColor="white"
              disabled
            />
          </GizmoHelper>

          <OrbitControls enablePan={false} />
        </Canvas>
      </div>
    </div>
  );
};
