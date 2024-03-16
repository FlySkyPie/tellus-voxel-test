import { ColorPicker } from "primereact/colorpicker";
import { Dropdown } from "primereact/dropdown";
import { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Edges,
  Environment,
  GizmoHelper,
  GizmoViewport,
  Grid,
  OrbitControls,
} from "@react-three/drei";

import { UnitCells } from "./unit-cells";

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
  const [color, setColore] = useState(0x0000);

  const colorCode = useMemo(
    () => `#${color.toString(16).padStart(6, "0")}`,
    [color]
  );

  const unitCellsView = useMemo(() => {
    if (value.code === SymmetrieTypes.Solid) {
      const colors = Array.from({ length: 8 }, () => color);
      return <UnitCells colors={colors} />;
    }

    if (value.code === SymmetrieTypes.XZ_Reflection) {
      const down = color;
      const up = color + 1;
      const colors = [down, down, up, up, down, down, up, up];
      return <UnitCells colors={colors} />;
    }

    if (value.code === SymmetrieTypes.Y_Rotation) {
      const corner0 = color;
      const corner1 = color + 1;
      const corner2 = color + 2;
      const corner3 = color + 3;
      const colors = [
        corner0,
        corner1,
        corner0,
        corner1,
        corner2,
        corner3,
        corner2,
        corner3,
      ];
      return <UnitCells colors={colors} />;
    }

    if (value.code === SymmetrieTypes.Y_Symmetric_Rotation) {
      const colors = [
        color,
        color + 1,
        color + 2,
        color + 3,
        color + 4,
        color + 5,
        color + 6,
        color + 7,
      ];
      return <UnitCells colors={colors} />;
    }

    return null;
  }, [color, value.code]);

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
        <Canvas camera={{ position: [3, 2, 3], fov: 25 }}>
          <Environment preset="city" />

          {unitCellsView}

          <mesh renderOrder={999999}>
            <boxGeometry args={[1.01, 1.01, 1.01]} />
            <meshStandardMaterial transparent opacity={0} />
            <Edges linewidth={5} scale={1} threshold={15} color={colorCode} />
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
