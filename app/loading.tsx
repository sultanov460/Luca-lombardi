import { RotateLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <RotateLoader color="#1d293d" margin={10} size={25} />
    </div>
  );
}
