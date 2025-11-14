import { ScaleLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <ScaleLoader id="react-spinners-ScaleLoader" color="#4299e1" />
    </div>
  );
}
