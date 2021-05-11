import { useParams } from "react-router-dom";

export default function Folder() {
  const { folder } = useParams();
  return <div>Folder: {folder}</div>;
}
